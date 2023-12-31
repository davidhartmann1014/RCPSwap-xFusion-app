import { ChainId, CurrencyAmount, Fraction, JSBI, Percent, Token, TokenAmount, Trade } from '@rcpswap/sdk'
import React, { useCallback, useContext, useEffect, useMemo, useState, useRef } from 'react'
import { ArrowDown, Repeat } from 'react-feather'
import ReactGA from 'react-ga'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import AddressInputPanel from '../../components/AddressInputPanel'
import { ButtonError, ButtonLight, ButtonPrimary, ButtonConfirmed } from '../../components/Button'
import Card, { GreyCard } from '../../components/Card'
import Column, { AutoColumn } from '../../components/Column'
import ConfirmSwapModal from '../../components/swap/ConfirmSwapModal'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import Row, { AutoRow, RowBetween } from '../../components/Row'
import AdvancedSwapDetailsDropdown from '../../components/swap/AdvancedSwapDetailsDropdown'
import BetterTradeLink, { DefaultVersionLink } from '../../components/swap/BetterTradeLink'
import confirmPriceImpactWithoutFee from '../../components/swap/confirmPriceImpactWithoutFee'
import {
  ArrowWrapper,
  BottomGrouping,
  StyledBalanceMaxMini,
  SwapCallbackError,
  Wrapper
} from '../../components/swap/styleds'
import TradePrice from '../../components/swap/TradePrice'
import TokenWarningModal from '../../components/TokenWarningModal'
import ProgressSteps from '../../components/ProgressSteps'
import SwapHeader from '../../components/swap/SwapHeader'

import { INITIAL_ALLOWED_SLIPPAGE, ROUTER_ADDRESSES } from '../../constants'
import { getTradeVersion } from '../../data/V1'
import { useActiveWeb3React } from '../../hooks'
import { useCurrency, useAllTokens } from '../../hooks/Tokens'
import {
  ApprovalState,
  useApproveCallback,
  useApproveCallbackFromTrade,
  useFusionApproveCallback
} from '../../hooks/useApproveCallback'
import useENSAddress from '../../hooks/useENSAddress'
import { useSwapCallback } from '../../hooks/useSwapCallback'
import useToggledVersion, { DEFAULT_VERSION, Version } from '../../hooks/useToggledVersion'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { useToggleSettingsMenu, useWalletModalToggle } from '../../state/application/hooks'
import { Field } from '../../state/swap/actions'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
  useXFusionSwap
} from '../../state/swap/hooks'
import { useExpertModeManager, useUserSlippageTolerance, useUserSingleHopOnly } from '../../state/user/hooks'
import { LinkStyledButton, TYPE, ToggleStyledText } from '../../theme'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from '../../utils/prices'
import AppBody from '../AppBody'
import { ClickableText } from '../Pool/styleds'
import Loader from '../../components/Loader'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import UnsupportedCurrencyFooter from 'components/swap/UnsupportedCurrencyFooter'
import { isTradeBetter } from 'utils/trades'
import FusionPrice from 'components/swap/FusionPrice'
import { BigNumber, ethers } from 'ethers'
import { FUSION_CONTRACT } from 'contracts'
import AdvancedFusionDetailsDropdown from 'components/swap/AdvancedFusionDetailsDropdown'
import { calculateSlippageAmount, isAddress, shortenAddress } from 'utils'
import TailLoader from '../../components/Loader/TailLoader'
import Toggle from 'components/Toggle'
import { useTransactionAdder } from 'state/transactions/hooks'
import Banner from 'components/Banner'
import StepSlider from 'components/StepSlider'
import toFormat from 'toformat'
import _Big from 'big.js'
import useParsedTokenPrice from 'hooks/useParsedTokenPrice'
import { NETWORK_CHAIN_ID } from 'connectors'
import setupNetwork from 'utils/setupNetwork'
// import AlertSound from '../../assets/sounds/alert.mp3'

export default function Swap() {
  const loadedUrlParams = useDefaultsFromURLSearch()

  const { library } = useActiveWeb3React()
  // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [
    useCurrency(loadedUrlParams?.inputCurrencyId),
    useCurrency(loadedUrlParams?.outputCurrencyId)
  ]
  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
    [loadedInputCurrency, loadedOutputCurrency]
  )
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])

  // dismiss warning if all imported tokens are in active lists
  const defaultTokens = useAllTokens()
  const importTokensNotInDefault =
    urlLoadedTokens &&
    urlLoadedTokens.filter((token: Token) => {
      return !Boolean(token.address in defaultTokens)
    })

  const { account, chainId } = useActiveWeb3React()
  const theme = useContext(ThemeContext)

  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle()

  // for expert mode
  const toggleSettings = useToggleSettingsMenu()
  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // sound

  // const [alertSound] = useState(new Audio(AlertSound))

  // useEffect(() => {
  //   return () => {
  //     alertSound.pause()
  //   }
  // }, [])

  // swap state
  const {
    independentField,
    typedValue,
    recipient,
    swapMode,
    INPUT: { currencyId: inputCurrencyId, chainId: inputChainId },
    OUTPUT: { currencyId: outputCurrencyId, chainId: outputChainId },
    isUltra
  } = useSwapState()
  const {
    v1Trade,
    v2Trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError
  } = useDerivedSwapInfo()

  const fusionSwap = useXFusionSwap()

  const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(
    currencies[Field.INPUT],
    currencies[Field.OUTPUT],
    typedValue
  )
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const { address: recipientAddress } = useENSAddress(recipient)
  const toggledVersion = useToggledVersion()
  const tradesByVersion = {
    [Version.v1]: v1Trade,
    [Version.v2]: v2Trade
  }
  const trade = showWrap ? undefined : tradesByVersion[toggledVersion]
  const defaultTrade = showWrap ? undefined : tradesByVersion[DEFAULT_VERSION]

  const betterTradeLinkV2: Version | undefined =
    toggledVersion === Version.v1 && isTradeBetter(v1Trade, v2Trade) ? Version.v2 : undefined

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount
      }

  const {
    onSwitchTokens,
    onCurrencySelection,
    onUserInput,
    onChangeRecipient,
    onChainSelection,
    onSwitchUltraMode
  } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined
  })

  // const { fusionSwap, loading: bestLoading } = useFusionSwap(showConfirm)

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? ''
  }

  const route = trade?.route
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  )
  const noRoute = !route
  // const dexes = useDexList()

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage, ChainId.ARBITRUM_NOVA)
  const [fusionApproval, fusionApproveCallback] = useApproveCallback(
    fusionSwap.parsedAmount,
    fusionSwap.swapType === 0 ? FUSION_CONTRACT.address : fusionSwap.result?.tx?.to,
    inputChainId
  )

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  const addTransaction = {
    [ChainId.ARBITRUM_NOVA]: useTransactionAdder(ChainId.ARBITRUM_NOVA),
    [ChainId.POLYGON]: useTransactionAdder(ChainId.POLYGON)
  }

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (
      (swapMode === 0 && approval === ApprovalState.PENDING) ||
      (swapMode === 1 && fusionApproval === ApprovalState.PENDING)
    ) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted, swapMode])

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient)

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const [singleHopOnly] = useUserSingleHopOnly()

  const handleSwap = useCallback(async () => {
    if (swapMode === 0) {
      if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee)) {
        return
      }
      if (!swapCallback) {
        return
      }
      if (chainId !== NETWORK_CHAIN_ID) {
        await setupNetwork()
      }
      setSwapState({ attemptingTxn: true, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: undefined })
      swapCallback()
        .then(hash => {
          setSwapState({ attemptingTxn: false, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: hash })

          ReactGA.event({
            category: 'Swap',
            action:
              recipient === null
                ? 'Swap w/o Send'
                : (recipientAddress ?? recipient) === account
                ? 'Swap w/o Send + recipient'
                : 'Swap w/ Send',
            label: [
              trade?.inputAmount?.currency?.symbol,
              trade?.outputAmount?.currency?.symbol,
              getTradeVersion(trade)
            ].join('/')
          })

          ReactGA.event({
            category: 'Routing',
            action: singleHopOnly ? 'Swap with multihop disabled' : 'Swap with multihop enabled'
          })
        })
        .catch(error => {
          setSwapState({
            attemptingTxn: false,
            tradeToConfirm,
            showConfirm,
            swapErrorMessage: error.message,
            txHash: undefined
          })
        })
    } else {
      try {
        const signer = library?.getSigner(account ?? undefined)
        if (!fusionSwap.result || !fusionSwap.result.tx || !signer) return
        setSwapState({
          attemptingTxn: true,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: undefined,
          txHash: undefined
        })
        let tx
        if (fusionSwap.swapType === 0) {
          const fusionContract = new ethers.Contract(FUSION_CONTRACT.address, FUSION_CONTRACT.abi, signer)

          tx = await fusionContract.processRoute(
            fusionSwap.result.tx?.tokenIn,
            ethers.BigNumber.from(fusionSwap.result.tx.amountIn ?? '0'),
            fusionSwap.result.tx.tokenOut,
            new TokenAmount(
              currencies.OUTPUT as Token,
              calculateSlippageAmount(
                new TokenAmount(
                  currencies.OUTPUT as Token,
                  BigNumber.from(fusionSwap.result.tx.amountOutMin ?? '0').toString()
                ),
                allowedSlippage
              )[0]
            ).raw.toString(),
            fusionSwap.result.route?.fee?.amountOutBN ?? '0',
            fusionSwap.result.tx.to,
            fusionSwap.result.tx.routeCode,
            fusionSwap.result.route?.fromToken?.isNative && fusionSwap.result.tx.amountIn
              ? { value: BigNumber.from(fusionSwap.result.tx.amountIn) }
              : {}
          )

          await tx.wait()
        } else if (fusionSwap.swapType === 1) {
          tx = await signer.sendTransaction({
            to: fusionSwap.result.tx.to,
            data: fusionSwap.result.tx.data,
            value: fusionSwap.result.tx.value
          })

          await tx.wait()
        }

        const inputAmount = parsedAmount?.toSignificant(3)
        const outputAmount = new TokenAmount(
          currencies.OUTPUT as Token,
          ethers.BigNumber.from(fusionSwap.result.route?.amountOutBN ?? '0')
            .sub(fusionSwap.result.route?.fee?.amountOutBN ?? '0')
            .toString()
        ).toSignificant(3)

        const base = `Swap ${inputAmount} ${currencies.INPUT?.symbol} for ${outputAmount} ${currencies.OUTPUT?.symbol}`
        const withRecipient =
          recipient === null || recipient === account
            ? base
            : `${base} to ${
                recipientAddress && isAddress(recipientAddress) ? shortenAddress(recipientAddress) : recipientAddress
              }`
        const withVersion = `${withRecipient} on ${fusionSwap.swapType === 0 ? 'xFusion' : 'Cross-Chain'}`

        addTransaction[inputChainId as ChainId.ARBITRUM_NOVA | ChainId.POLYGON](tx, { summary: withVersion })

        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: undefined,
          txHash: tx.hash
        })
      } catch (err) {
        console.log(err)
        if (JSON.parse(JSON.stringify(err))?.code === 4001) {
          setSwapState({
            attemptingTxn: false,
            tradeToConfirm,
            showConfirm,
            swapErrorMessage: undefined,
            txHash: undefined
          })
        } else {
          setSwapState({
            attemptingTxn: false,
            tradeToConfirm,
            showConfirm,
            swapErrorMessage: 'Transaction failed, this can be caused by prices changes - try increasing slippage', //(err as any)?.message ?? JSON.stringify(err),
            txHash: undefined
          })
        }
      }
    }
  }, [
    priceImpactWithoutFee,
    swapCallback,
    tradeToConfirm,
    showConfirm,
    recipient,
    recipientAddress,
    account,
    trade,
    singleHopOnly
  ])

  const handleTypeInput = useCallback(
    (value: string) => {
      const index = value.indexOf('.')
      if (index > -1 && value.length - index - 1 > (currencies[Field.INPUT]?.decimals ?? 10)) {
        value = parseInt(value) + '.' + value.slice(index + 1, index + (currencies[Field.INPUT]?.decimals ?? 10) + 1)
      }

      onUserInput(Field.INPUT, value)
    },
    [onUserInput]
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      if (swapMode === 0) onUserInput(Field.OUTPUT, value)
    },
    [onUserInput, swapMode]
  )

  // percentage slide
  const [percentageSlide, setPercentageSlide] = useState(0)

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  const priceImpactSeverity = swapMode === 0 ? warningSeverity(priceImpactWithoutFee) : 0

  useEffect(() => {
    if (maxAmountInput) {
      if (maxAmountInput.equalTo('0')) {
        setPercentageSlide(0)
      } else {
        const percenage =
          parseFloat(parsedAmounts[Field.INPUT]?.toExact() ?? '0') / parseFloat(maxAmountInput.toExact())
        setPercentageSlide(Math.min(Math.floor(percenage * 100), 100))
      }
    }
  }, [maxAmountInput?.toExact(), parsedAmounts[Field.INPUT]?.toExact()])

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    ((swapMode === 0 &&
      (approval === ApprovalState.NOT_APPROVED ||
        approval === ApprovalState.PENDING ||
        (approvalSubmitted && approval === ApprovalState.APPROVED))) ||
      (swapMode === 1 &&
        fusionSwap?.result &&
        ethers.BigNumber.from(fusionSwap?.result?.route?.amountOutBN ?? '0').gte('0') &&
        (fusionApproval === ApprovalState.NOT_APPROVED ||
          fusionApproval === ApprovalState.PENDING ||
          (approvalSubmitted && fusionApproval === ApprovalState.APPROVED)))) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const outputTokenValue =
    swapMode === 0 || showWrap
      ? formattedAmounts[Field.OUTPUT]
      : currencies.OUTPUT
      ? new TokenAmount(
          currencies.OUTPUT as Token,
          ethers.BigNumber.from(fusionSwap?.result?.route?.amountOutBN ?? '0').gt(
            ethers.BigNumber.from(fusionSwap?.result?.route?.fee?.amountOutBN ?? '0')
          )
            ? ethers.BigNumber.from(fusionSwap?.result?.route?.amountOutBN ?? '0')
                .sub(ethers.BigNumber.from(fusionSwap?.result?.route?.fee?.amountOutBN ?? '0'))
                .toString()
            : '0'
        ).toSignificant(6)
      : '0'

  // token prices
  const inputTokenPrice = useParsedTokenPrice(
    swapMode === 0 ? ChainId.ARBITRUM_NOVA : inputChainId ?? ChainId.ARBITRUM_NOVA,
    currencies[Field.INPUT],
    formattedAmounts[Field.INPUT]
  )
  const outputTokenPrice = useParsedTokenPrice(
    swapMode === 0 ? ChainId.ARBITRUM_NOVA : outputChainId ?? ChainId.ARBITRUM_NOVA,
    currencies[Field.OUTPUT],
    outputTokenValue
  )

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ showConfirm: false, tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn, showConfirm })
  }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash])

  const handleInputSelect = useCallback(
    inputCurrency => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency, inputChainId ?? ChainId.ARBITRUM_NOVA)
    },
    [onCurrencySelection, inputChainId]
  )

  const handleOutputSelect = useCallback(
    outputCurrency => {
      onCurrencySelection(Field.OUTPUT, outputCurrency, outputChainId ?? ChainId.ARBITRUM_NOVA)
    },
    [onCurrencySelection, outputChainId]
  )

  const handleInputChainSelect = useCallback(
    chainId => {
      if (chainId !== inputChainId) {
        onChainSelection(Field.INPUT, chainId)
        if (chainId !== ChainId.ARBITRUM_NOVA && outputChainId !== ChainId.ARBITRUM_NOVA) {
          onChainSelection(Field.OUTPUT, ChainId.ARBITRUM_NOVA)
        }
      }
    },
    [onChainSelection, inputChainId, outputChainId]
  )

  const handleOutputChainSelect = useCallback(
    chainId => {
      if (outputChainId !== chainId) {
        onChainSelection(Field.OUTPUT, chainId)
        if (chainId !== ChainId.ARBITRUM_NOVA && inputChainId !== ChainId.ARBITRUM_NOVA) {
          onChainSelection(Field.INPUT, ChainId.ARBITRUM_NOVA)
        }
      }
    },
    [onChainSelection, inputChainId, outputChainId]
  )

  const slideTimerRef = useRef<number | null>(null)
  const [tempInputValue, setTempInputValue] = useState(0)
  const [percentageSliding, setPercentageSliding] = useState(false)

  const handlePercentageSlideChange = useCallback(
    (step: number) => {
      setPercentageSlide(step)
      setPercentageSliding(true)

      if (slideTimerRef.current) {
        clearTimeout(slideTimerRef.current)
        slideTimerRef.current = null
      }

      slideTimerRef.current = (setTimeout(() => {
        if (maxAmountInput) {
          const particalAmount = maxAmountInput.multiply(step.toString()).divide('100')
          const Big = toFormat(_Big)
          Big.DP = maxAmountInput.currency.decimals
          let value = new Big(particalAmount.numerator.toString())
            .div(particalAmount.denominator.toString())
            .toFormat({ groupSeparator: '' })

          const index = value.indexOf('.')
          if (index > -1 && value.length - index - 1 > (currencies[Field.INPUT]?.decimals ?? 10)) {
            value =
              parseInt(value) + '.' + value.slice(index + 1, index + (currencies[Field.INPUT]?.decimals ?? 10) + 1)
          }
          setTempInputValue(value)
        }
      }, 20) as unknown) as number
    },
    [maxAmountInput?.toExact(), setTempInputValue]
  )

  const handlePercentageSlideAfterChange = useCallback(
    (step: number) => {
      setPercentageSlide(step)
      setPercentageSliding(false)

      if (slideTimerRef.current) {
        clearTimeout(slideTimerRef.current)
        slideTimerRef.current = null
      }

      if (maxAmountInput) {
        const particalAmount = maxAmountInput.multiply(step.toString()).divide('100')
        const Big = toFormat(_Big)
        Big.DP = maxAmountInput.currency.decimals
        let value = new Big(particalAmount.numerator.toString())
          .div(particalAmount.denominator.toString())
          .toFormat({ groupSeparator: '' })

        const index = value.indexOf('.')
        if (index > -1 && value.length - index - 1 > (currencies[Field.INPUT]?.decimals ?? 10)) {
          value = parseInt(value) + '.' + value.slice(index + 1, index + (currencies[Field.INPUT]?.decimals ?? 10) + 1)
        }
        onUserInput(Field.INPUT, value)
      }
    },
    [maxAmountInput?.toExact(), onUserInput]
  )

  const swapIsUnsupported = useIsTransactionUnsupported(
    currencies?.INPUT,
    currencies?.OUTPUT,
    inputChainId,
    outputChainId
  )

  const isFusionFetching = swapMode === 1 && fusionSwap.loading && !account

  const isNetworkError =
    (swapMode === 0 && account && chainId !== NETWORK_CHAIN_ID) ||
    (swapMode === 1 && account && chainId !== inputChainId)

  const fusionSaving =
    swapMode === 1 &&
    fusionSwap &&
    fusionSwap?.result &&
    fusionSwap.result?.route &&
    fusionSwap.result.route?.amountOut &&
    fusionSwap.currencies?.OUTPUT &&
    fusionSwap.result.route.fee?.amountOutBN
      ? parseFloat(
          new TokenAmount(
            fusionSwap.currencies?.OUTPUT as Token,
            ethers.BigNumber.from(fusionSwap.result.route.amountOutBN ?? '0').toString()
          ).toExact()
        ) -
        parseFloat(
          new TokenAmount(
            fusionSwap.currencies?.OUTPUT as Token,
            ethers.BigNumber.from(fusionSwap.result.route.fee.amountOutBN ?? '0').toString()
          ).toExact()
        ) -
        parseFloat(
          new TokenAmount(
            fusionSwap.currencies.OUTPUT as Token,
            ethers.BigNumber.from(fusionSwap.result.route.singleProviderRoute?.amountOutBN ?? '0').toString()
          ).toExact()
        )
      : 0

  return (
    <>
      <TokenWarningModal
        isOpen={importTokensNotInDefault.length > 0 && !dismissTokenWarning}
        tokens={importTokensNotInDefault}
        onConfirm={handleConfirmTokenWarning}
      />
      <SwapPoolTabs active={'swap'} />
      <AppBody>
        <SwapHeader />
        <Wrapper id="swap-page">
          <ConfirmSwapModal
            swapMode={swapMode}
            fusionSwap={fusionSwap}
            isOpen={showConfirm}
            trade={trade}
            originalTrade={tradeToConfirm}
            onAcceptChanges={handleAcceptChanges}
            attemptingTxn={attemptingTxn}
            txHash={txHash}
            recipient={recipient}
            allowedSlippage={allowedSlippage}
            onConfirm={handleSwap}
            swapErrorMessage={swapErrorMessage}
            onDismiss={handleConfirmDismiss}
          />
          <AutoColumn gap={'md'}>
            <CurrencyInputPanel
              label={independentField === Field.OUTPUT && !showWrap && trade ? 'From (estimated)' : 'From'}
              value={percentageSliding ? tempInputValue.toString() : formattedAmounts[Field.INPUT]}
              currency={currencies[Field.INPUT]}
              chainId={inputChainId}
              onChainSelect={handleInputChainSelect}
              hideChain={swapMode === 0}
              onUserInput={handleTypeInput}
              onCurrencySelect={handleInputSelect}
              otherCurrency={currencies[Field.OUTPUT]}
              inPrice={inputTokenPrice}
              outPrice={outputTokenPrice}
              id="swap-currency-input"
            />
            <StepSlider
              step={percentageSlide}
              onChange={handlePercentageSlideChange}
              onAfterChange={handlePercentageSlideAfterChange}
              enabled={Boolean(maxAmountInput)}
            />
            <AutoColumn justify="space-between">
              <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                <ArrowWrapper clickable>
                  <ArrowDown
                    size="16"
                    onClick={() => {
                      setApprovalSubmitted(false) // reset 2 step UI for approvals
                      onSwitchTokens(
                        swapMode === 1 && !showWrap ? 1 : undefined,
                        swapMode === 1 && !showWrap
                          ? fusionSwap.result
                            ? currencies.OUTPUT
                              ? new TokenAmount(
                                  currencies.OUTPUT as Token,
                                  ethers.BigNumber.from(fusionSwap.result.route?.amountOutBN ?? '0').toString()
                                ).toExact()
                              : undefined
                            : undefined
                          : undefined
                      )
                    }}
                    color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? theme.primary1 : theme.text2}
                  />
                </ArrowWrapper>
                {recipient === null && !showWrap && isExpertMode ? (
                  <LinkStyledButton id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                    + Add a send (optional)
                  </LinkStyledButton>
                ) : null}
              </AutoRow>
            </AutoColumn>
            <CurrencyInputPanel
              value={outputTokenValue}
              onUserInput={handleTypeOutput}
              label={independentField === Field.INPUT && !showWrap && trade ? 'To (estimated)' : 'To'}
              showMaxButton={false}
              currency={currencies[Field.OUTPUT]}
              onCurrencySelect={handleOutputSelect}
              hideChain={swapMode === 0}
              chainId={outputChainId}
              onChainSelect={handleOutputChainSelect}
              otherCurrency={currencies[Field.INPUT]}
              id="swap-currency-output"
              // disabled={swapMode === 1}
              inPrice={outputTokenPrice}
              outPrice={inputTokenPrice}
              showPriceImpact
              loading={swapMode === 1 && fusionSwap.loading}
              saving={fusionSaving}
            />

            {recipient !== null && !showWrap ? (
              <>
                <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                  <ArrowWrapper clickable={false}>
                    <ArrowDown size="16" color={theme.text2} />
                  </ArrowWrapper>
                  <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                    - Remove send
                  </LinkStyledButton>
                </AutoRow>
                <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
              </>
            ) : null}

            {showWrap ? null : (
              <Card padding={showWrap ? '.25rem 1rem 0 1rem' : '0px'} borderRadius={'20px'}>
                <AutoColumn gap="8px" style={{ padding: '0 16px' }}>
                  {swapMode === 1 && (
                    <RowBetween>
                      <ToggleStyledText disabled={!isUltra}>Ultra Saving </ToggleStyledText>
                      <Toggle id="toggle-expert-mode-button" isActive={isUltra} toggle={() => onSwitchUltraMode()} />
                    </RowBetween>
                  )}
                  {Boolean(trade) && (
                    <RowBetween align="center">
                      <Text fontWeight={500} fontSize={14} color={theme.text2}>
                        Price
                      </Text>
                      {swapMode === 0 ? (
                        <TradePrice
                          price={trade?.executionPrice}
                          showInverted={showInverted}
                          setShowInverted={setShowInverted}
                        />
                      ) : (
                        <FusionPrice
                          fusionSwap={fusionSwap}
                          showInverted={showInverted}
                          setShowInverted={setShowInverted}
                        ></FusionPrice>
                      )}
                    </RowBetween>
                  )}
                  {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
                    <RowBetween align="center">
                      <ClickableText fontWeight={500} fontSize={14} color={theme.text2} onClick={toggleSettings}>
                        Slippage Tolerance
                      </ClickableText>
                      <ClickableText fontWeight={500} fontSize={14} color={theme.text2} onClick={toggleSettings}>
                        {allowedSlippage / 100}%
                      </ClickableText>
                    </RowBetween>
                  )}
                  {isFusionFetching ? (
                    <Row align="center" color={theme.text3} style={{ justifyContent: 'end' }}>
                      <TailLoader r={8} />
                      <TYPE.main color={theme.text3} style={{ marginLeft: '8px' }} fontSize={14}>
                        Fetching the best price...
                      </TYPE.main>
                    </Row>
                  ) : (
                    ''
                  )}
                </AutoColumn>
              </Card>
            )}
          </AutoColumn>
          <BottomGrouping>
            {swapIsUnsupported ? (
              <ButtonPrimary disabled={true}>
                <TYPE.main mb="4px">Unsupported Asset</TYPE.main>
              </ButtonPrimary>
            ) : !account ? (
              <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
            ) : isNetworkError ? (
              <ButtonLight onClick={() => setupNetwork(inputChainId)}>Switch Network</ButtonLight>
            ) : fusionSwap.error && swapMode === 1 ? (
              <ButtonPrimary disabled={true}>
                <TYPE.main mb="4px">{fusionSwap.error}</TYPE.main>
              </ButtonPrimary>
            ) : showWrap ? (
              <ButtonPrimary disabled={Boolean(wrapInputError)} onClick={onWrap}>
                {wrapInputError ??
                  (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
              </ButtonPrimary>
            ) : (swapMode === 0 && noRoute && userHasSpecifiedInputOutput) ||
              (swapMode === 1 && (fusionSwap.result?.route?.amountOut === 0 || fusionSwap.loading)) ? (
              <GreyCard style={{ textAlign: 'center' }}>
                {swapMode === 1 && fusionSwap.loading ? (
                  <TYPE.main display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <TailLoader r={13} />
                    <span style={{ marginLeft: '8px' }}>Fetching the best price.</span>
                  </TYPE.main>
                ) : (
                  <>
                    <TYPE.main mb="4px">Insufficient liquidity for this trade.</TYPE.main>
                    {singleHopOnly && <TYPE.main mb="4px">Try enabling multi-hop trades.</TYPE.main>}
                  </>
                )}
              </GreyCard>
            ) : showApproveFlow ? (
              <RowBetween>
                <ButtonConfirmed
                  onClick={swapMode === 0 ? approveCallback : fusionApproveCallback}
                  disabled={
                    (swapMode === 0 && approval !== ApprovalState.NOT_APPROVED) ||
                    approvalSubmitted ||
                    (swapMode === 1 && fusionApproval !== ApprovalState.NOT_APPROVED) ||
                    approvalSubmitted
                  }
                  width="48%"
                  altDisabledStyle={
                    (swapMode === 0 && approval === ApprovalState.PENDING) ||
                    (swapMode === 1 && fusionApproval === ApprovalState.PENDING)
                  } // show solid button while waiting
                  confirmed={
                    (swapMode === 0 && approval === ApprovalState.APPROVED) ||
                    (swapMode === 1 && fusionApproval === ApprovalState.APPROVED)
                  }
                >
                  {(swapMode === 0 && approval === ApprovalState.PENDING) ||
                  (swapMode === 1 && fusionApproval === ApprovalState.PENDING) ? (
                    <AutoRow gap="6px" justify="center">
                      Approving <Loader stroke="white" />
                    </AutoRow>
                  ) : approvalSubmitted &&
                    ((swapMode === 0 && approval === ApprovalState.APPROVED) ||
                      (swapMode === 1 && fusionApproval === ApprovalState.APPROVED)) ? (
                    'Approved'
                  ) : (
                    'Approve ' + currencies[Field.INPUT]?.symbol
                  )}
                </ButtonConfirmed>
                <ButtonError
                  onClick={() => {
                    if (isExpertMode) {
                      handleSwap()
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        showConfirm: true,
                        txHash: undefined
                      })
                    }
                  }}
                  width="48%"
                  id="swap-button"
                  disabled={
                    !isValid ||
                    (swapMode === 0 && approval !== ApprovalState.APPROVED) ||
                    (swapMode === 1 && fusionApproval !== ApprovalState.APPROVED) ||
                    (priceImpactSeverity > 3 && !isExpertMode && swapMode === 0)
                  }
                  error={isValid && priceImpactSeverity > 2}
                >
                  <Text fontSize={16} fontWeight={500}>
                    {priceImpactSeverity > 3 && swapMode === 0 && !isExpertMode
                      ? `Price Impact High`
                      : `Swap${priceImpactSeverity > 2 ? ' Anyway' : ''}`}
                  </Text>
                </ButtonError>
              </RowBetween>
            ) : (
              <ButtonError
                onClick={() => {
                  if (isExpertMode) {
                    handleSwap()
                  } else {
                    setSwapState({
                      tradeToConfirm: trade,
                      attemptingTxn: false,
                      swapErrorMessage: undefined,
                      showConfirm: true,
                      txHash: undefined
                    })
                  }
                }}
                id="swap-button"
                disabled={
                  !isValid ||
                  (swapMode === 0 && priceImpactSeverity > 3 && !isExpertMode) ||
                  (swapMode === 0 && !!swapCallbackError)
                }
                error={isValid && priceImpactSeverity > 2 && !swapCallbackError}
              >
                <Text fontSize={20} fontWeight={500}>
                  {swapInputError
                    ? swapInputError
                    : priceImpactSeverity > 3 && !isExpertMode
                    ? `Price Impact Too High`
                    : `Swap${priceImpactSeverity > 2 ? ' Anyway' : ''}`}
                </Text>
              </ButtonError>
            )}
            {showApproveFlow && (
              <Column style={{ marginTop: '1rem' }}>
                <ProgressSteps
                  steps={[
                    (swapMode === 0 && approval === ApprovalState.APPROVED) ||
                      (swapMode === 1 && fusionApproval === ApprovalState.APPROVED)
                  ]}
                />
              </Column>
            )}
            {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null}
            {betterTradeLinkV2 && !swapIsUnsupported && toggledVersion === Version.v1 ? (
              <BetterTradeLink version={betterTradeLinkV2} />
            ) : toggledVersion !== DEFAULT_VERSION && defaultTrade ? (
              <DefaultVersionLink />
            ) : null}
          </BottomGrouping>
        </Wrapper>
      </AppBody>
      {swapMode === 0 ? (
        !swapIsUnsupported ? (
          <AdvancedSwapDetailsDropdown trade={trade} />
        ) : (
          <UnsupportedCurrencyFooter
            show={swapIsUnsupported}
            currencies={[currencies.INPUT, currencies.OUTPUT]}
            chainId={ChainId.ARBITRUM_NOVA}
          />
        )
      ) : swapMode === 1 ? (
        <AdvancedFusionDetailsDropdown swap={fusionSwap} currency={fusionSwap.currencies?.OUTPUT} />
      ) : null}
      <Banner />
    </>
  )
}
