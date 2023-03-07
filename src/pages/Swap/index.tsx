import { CurrencyAmount, JSBI, Percent, Token, TokenAmount, Trade } from '@venomswap/sdk'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ArrowDown, Type } from 'react-feather'
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
import { AutoRow, RowBetween } from '../../components/Row'
import AdvancedSwapDetailsDropdown from '../../components/swap/AdvancedSwapDetailsDropdown'
import BetterTradeLink, { DefaultVersionLink } from '../../components/swap/BetterTradeLink'
import confirmPriceImpactWithoutFee from '../../components/swap/confirmPriceImpactWithoutFee'
import { ArrowWrapper, BottomGrouping, SwapCallbackError, Wrapper } from '../../components/swap/styleds'
import TradePrice from '../../components/swap/TradePrice'
import TokenWarningModal from '../../components/TokenWarningModal'
import ProgressSteps from '../../components/ProgressSteps'
import SwapHeader from '../../components/swap/SwapHeader'

import { BIPS_BASE, INITIAL_ALLOWED_SLIPPAGE } from '../../constants'
import { getTradeVersion } from '../../data/V1'
import { useActiveWeb3React } from '../../hooks'
import { useCurrency, useAllTokens } from '../../hooks/Tokens'
import {
  ApprovalState,
  useApproveCallbackFromTrade,
  useDexList,
  useFusionApproveCallback
} from '../../hooks/useApproveCallback'
import useENSAddress from '../../hooks/useENSAddress'
import { useSwapCallback } from '../../hooks/useSwapCallback'
import useToggledVersion, { DEFAULT_VERSION, Version } from '../../hooks/useToggledVersion'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'
import { useToggleSettingsMenu, useWalletModalToggle } from '../../state/application/hooks'
import { Field } from '../../state/swap/actions'
import {
  useFusionSwap,
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState
} from '../../state/swap/hooks'
import { useExpertModeManager, useUserSlippageTolerance, useUserSingleHopOnly } from '../../state/user/hooks'
import { LinkStyledButton, TYPE } from '../../theme'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { computeTradePriceBreakdown, warningSeverity } from '../../utils/prices'
import AppBody from '../AppBody'
import { ClickableText } from '../Pool/styleds'
import Loader from '../../components/Loader'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import UnsupportedCurrencyFooter from 'components/swap/UnsupportedCurrencyFooter'
import { isTradeBetter } from 'utils/trades'
import FusionPrice from 'components/swap/FusionPrice'
import { ethers } from 'ethers'
import { FUSION_CONTRACT, SWAP_CONTRACT } from 'contracts'
import AdvancedFusionDetailsDropdown from 'components/swap/AdvancedFusionDetailsDropdown'
import { useTokenPrice } from 'hooks/useTokenPrice'
import { calculateSlippageAmount } from 'utils'

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

  const { account } = useActiveWeb3React()
  const theme = useContext(ThemeContext)

  // toggle wallet when disconnected
  const toggleWalletModal = useWalletModalToggle()

  // for expert mode
  const toggleSettings = useToggleSettingsMenu()
  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()
  // swap state
  const {
    independentField,
    typedValue,
    recipient,
    swapMode,
    INPUT: { currencyId: inputCurrencyId },
    OUTPUT: { currencyId: outputCurrencyId }
  } = useSwapState()
  const {
    v1Trade,
    v2Trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError
  } = useDerivedSwapInfo()
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

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const isValid = !swapInputError
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

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
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput]
  )

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

  const { bestSwap, loading: bestLoading } = useFusionSwap(showConfirm)

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
  const dexes = useDexList()
  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)
  const [fusionApproval, fusionApproveCallback] = useFusionApproveCallback(bestSwap)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  const tokenOutPrice = useTokenPrice(bestSwap?.tokenOut, swapMode === 1)

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
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

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
        setSwapState({
          attemptingTxn: true,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: undefined,
          txHash: undefined
        })
        const fusionContract = new ethers.Contract(
          FUSION_CONTRACT.address,
          FUSION_CONTRACT.abi,
          library?.getSigner(account ?? undefined)
        )
        if (bestSwap?.type === 0) {
          if (inputCurrencyId === 'ETH') {
            console.log(
              bestSwap.amounts?.map(amount => amount.raw.toString()),
              outputCurrencyId,
              bestSwap.price
                ? new TokenAmount(
                    (bestSwap.price as TokenAmount).token,
                    calculateSlippageAmount(bestSwap.price, allowedSlippage)[0]
                  ).raw.toString()
                : 0,
              bestSwap.maxMultihop?.index,
              bestSwap.maxMultihop?.trade.route.path.map(path => path.address),
              { value: parsedAmount?.raw.toString() }
            )

            const tx = await fusionContract.swapExactETHForTokensWithMultiDex(
              bestSwap.amounts?.map(amount => amount.raw.toString()),
              outputCurrencyId,
              bestSwap.price
                ? new TokenAmount(
                    (bestSwap.price as TokenAmount).token,
                    calculateSlippageAmount(bestSwap.price, allowedSlippage)[0]
                  ).raw.toString()
                : 0,
              bestSwap.maxMultihop?.index,
              bestSwap.maxMultihop?.trade.route.path.map(path => path.address),
              { value: parsedAmount?.raw.toString() }
            )
            await tx.wait()
            setSwapState({
              attemptingTxn: false,
              tradeToConfirm,
              showConfirm,
              swapErrorMessage: undefined,
              txHash: tx.hash
            })
          } else if (outputCurrencyId === 'ETH') {
            console.log(
              bestSwap.amounts?.map(amount => amount.raw.toString()),
              inputCurrencyId,
              parsedAmount?.raw.toString(),
              bestSwap.price
                ? new TokenAmount(
                    (bestSwap.price as TokenAmount).token,
                    calculateSlippageAmount(bestSwap.price, allowedSlippage)[0]
                  ).raw.toString()
                : 0,
              bestSwap.maxMultihop?.index,
              bestSwap.maxMultihop?.trade.route.path.map(path => path.address)
            )

            const tx = await fusionContract.swapExactTokensForETHWithMultiDex(
              bestSwap.amounts?.map(amount => amount.raw.toString()),
              inputCurrencyId,
              parsedAmount?.raw.toString(),
              bestSwap.price
                ? new TokenAmount(
                    (bestSwap.price as TokenAmount).token,
                    calculateSlippageAmount(bestSwap.price, allowedSlippage)[0]
                  ).raw.toString()
                : 0,
              bestSwap.maxMultihop?.index,
              bestSwap.maxMultihop?.trade.route.path.map(path => path.address)
            )
            await tx.wait()
            setSwapState({
              attemptingTxn: false,
              tradeToConfirm,
              showConfirm,
              swapErrorMessage: undefined,
              txHash: tx.hash
            })
          } else {
            console.log(
              bestSwap.amounts?.map(amount => amount.raw.toString()),
              inputCurrencyId,
              outputCurrencyId,
              parsedAmount?.raw.toString(),
              bestSwap.price
                ? new TokenAmount(
                    (bestSwap.price as TokenAmount).token,
                    calculateSlippageAmount(bestSwap.price, allowedSlippage)[0]
                  ).raw.toString()
                : 0,
              bestSwap.maxMultihop?.index,
              bestSwap.maxMultihop?.trade.route.path.map(path => path.address)
            )

            const tx = await fusionContract.swapExactTokensForTokensWithMultiDex(
              bestSwap.amounts?.map(amount => amount.raw.toString()),
              inputCurrencyId,
              outputCurrencyId,
              parsedAmount?.raw.toString(),
              bestSwap.price
                ? new TokenAmount(
                    (bestSwap.price as TokenAmount).token,
                    calculateSlippageAmount(bestSwap.price, allowedSlippage)[0]
                  ).raw.toString()
                : 0,
              bestSwap.maxMultihop?.index,
              bestSwap.maxMultihop?.trade.route.path.map(path => path.address)
            )
            await tx.wait()
            setSwapState({
              attemptingTxn: false,
              tradeToConfirm,
              showConfirm,
              swapErrorMessage: undefined,
              txHash: tx.hash
            })
          }
        } else if (bestSwap?.type === 1) {
          if (inputCurrencyId === 'ETH') {
            console.log(
              bestSwap.maxMultihop?.trade
                .minimumAmountOut(new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE))
                .raw.toString(),
              bestSwap.dex,
              bestSwap.trade,
              parsedAmount?.raw.toString()
            )

            const tx = await fusionContract.swapExactETHForTokensWithMultiHops(
              bestSwap.maxMultihop?.trade
                .minimumAmountOut(new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE))
                .raw.toString(),
              bestSwap.dex,
              bestSwap.trade,
              {
                value: parsedAmount?.raw.toString()
              }
            )
            await tx.wait()
            setSwapState({
              attemptingTxn: false,
              tradeToConfirm,
              showConfirm,
              swapErrorMessage: undefined,
              txHash: tx.hash
            })
          } else if (outputCurrencyId === 'ETH') {
            console.log(
              (bestSwap.amountIn as TokenAmount).token.address,
              parsedAmount?.raw.toString(),
              bestSwap.maxMultihop?.trade
                .minimumAmountOut(new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE))
                .raw.toString(),
              bestSwap.dex,
              bestSwap.trade
            )

            const tx = await fusionContract.swapExactTokensForETHWithMultiHops(
              (bestSwap.amountIn as TokenAmount).token.address,
              parsedAmount?.raw.toString(),
              bestSwap.maxMultihop?.trade
                .minimumAmountOut(new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE))
                .raw.toString(),
              bestSwap.dex,
              bestSwap.trade
            )
            await tx.wait()
            setSwapState({
              attemptingTxn: false,
              tradeToConfirm,
              showConfirm,
              swapErrorMessage: undefined,
              txHash: tx.hash
            })
          } else {
            console.log(
              (bestSwap.amountIn as TokenAmount).token.address,
              parsedAmount?.raw.toString(),
              bestSwap.maxMultihop?.trade
                .minimumAmountOut(new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE))
                .raw.toString(),
              bestSwap.dex,
              bestSwap.trade
            )

            const tx = await fusionContract.swapExactTokensForTokensWithMultiHops(
              (bestSwap.amountIn as TokenAmount).token.address,
              parsedAmount?.raw.toString(),
              bestSwap.maxMultihop?.trade
                .minimumAmountOut(new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE))
                .raw.toString(),
              bestSwap.dex,
              bestSwap.trade
            )
            await tx.wait()
            setSwapState({
              attemptingTxn: false,
              tradeToConfirm,
              showConfirm,
              swapErrorMessage: undefined,
              txHash: tx.hash
            })
          }
        }
      } catch (err) {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: JSON.stringify(err), //(err as any)?.message ?? JSON.stringify(err),
          txHash: undefined
        })
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

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  const priceImpactSeverity = swapMode === 0 ? warningSeverity(priceImpactWithoutFee) : 0

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    ((swapMode === 0 &&
      (approval === ApprovalState.NOT_APPROVED ||
        approval === ApprovalState.PENDING ||
        (approvalSubmitted && approval === ApprovalState.APPROVED))) ||
      (swapMode === 1 &&
        (fusionApproval === ApprovalState.NOT_APPROVED ||
          fusionApproval === ApprovalState.PENDING ||
          (approvalSubmitted && fusionApproval === ApprovalState.APPROVED)))) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

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
      onCurrencySelection(Field.INPUT, inputCurrency)
    },
    [onCurrencySelection]
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      let value = maxAmountInput.toExact()
      const index = value.indexOf('.')
      if (index > -1 && value.length - index - 1 > (currencies[Field.INPUT]?.decimals ?? 10)) {
        value = parseInt(value) + '.' + value.slice(index + 1, index + (currencies[Field.INPUT]?.decimals ?? 10) + 1)
      }
      onUserInput(Field.INPUT, value)
    }
  }, [maxAmountInput, onUserInput])

  const handleOutputSelect = useCallback(outputCurrency => onCurrencySelection(Field.OUTPUT, outputCurrency), [
    onCurrencySelection
  ])

  const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT)

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
            fusionSwap={bestSwap}
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
            outPrice={tokenOutPrice}
            loading={swapMode === 0 ? false : bestLoading}
            dexes={dexes}
          />
          {bestSwap?.maxMultihop && bestSwap?.price?.subtract(bestSwap.maxMultihop?.trade.outputAmount).toExact}

          <AutoColumn gap={'md'}>
            <CurrencyInputPanel
              label={independentField === Field.OUTPUT && !showWrap && trade ? 'From (estimated)' : 'From'}
              value={formattedAmounts[Field.INPUT]}
              showMaxButton={!atMaxAmountInput}
              currency={currencies[Field.INPUT]}
              onUserInput={handleTypeInput}
              onMax={handleMaxInput}
              onCurrencySelect={handleInputSelect}
              otherCurrency={currencies[Field.OUTPUT]}
              id="swap-currency-input"
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
                          ? bestSwap?.price
                            ? bestSwap.price.toExact()
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
              value={
                swapMode === 0 || showWrap
                  ? formattedAmounts[Field.OUTPUT]
                  : bestLoading
                  ? '0'
                  : bestSwap?.price?.toExact() ?? '0'
              }
              onUserInput={handleTypeOutput}
              label={independentField === Field.INPUT && !showWrap && trade ? 'To (estimated)' : 'To'}
              showMaxButton={false}
              currency={currencies[Field.OUTPUT]}
              onCurrencySelect={handleOutputSelect}
              otherCurrency={currencies[Field.INPUT]}
              id="swap-currency-output"
              disabled={swapMode === 1}
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
                          loading={bestLoading}
                          fusionSwap={bestSwap}
                          showInverted={showInverted}
                          setShowInverted={setShowInverted}
                          tokenIn={bestSwap?.tokenIn}
                          tokenOut={bestSwap?.tokenOut}
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
            ) : showWrap ? (
              <ButtonPrimary disabled={Boolean(wrapInputError)} onClick={onWrap}>
                {wrapInputError ??
                  (wrapType === WrapType.WRAP ? 'Wrap' : wrapType === WrapType.UNWRAP ? 'Unwrap' : null)}
              </ButtonPrimary>
            ) : swapMode === 1 && (bestLoading || bestSwap?.type === -1) ? (
              <ButtonPrimary disabled={true}>
                <TYPE.main mb="4px">Loading</TYPE.main>
              </ButtonPrimary>
            ) : swapMode === 0 && noRoute && userHasSpecifiedInputOutput ? (
              <GreyCard style={{ textAlign: 'center' }}>
                <TYPE.main mb="4px">Insufficient liquidity for this trade.</TYPE.main>
                {singleHopOnly && <TYPE.main mb="4px">Try enabling multi-hop trades.</TYPE.main>}
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
          <UnsupportedCurrencyFooter show={swapIsUnsupported} currencies={[currencies.INPUT, currencies.OUTPUT]} />
        )
      ) : swapMode === 1 && bestSwap?.type === 0 ? (
        <AdvancedFusionDetailsDropdown swap={bestSwap} price={tokenOutPrice} dexes={dexes} />
      ) : null}
    </>
  )
}
