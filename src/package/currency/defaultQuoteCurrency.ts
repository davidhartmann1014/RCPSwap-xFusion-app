import { ChainId } from '../chain'

import { ARB, SUSHI, USDC } from './constants'
import { Token } from './Token'

export const defaultQuoteCurrency = {
  [ChainId.ETHEREUM]: SUSHI[ChainId.ETHEREUM],
  [ChainId.ROPSTEN]: SUSHI[ChainId.ROPSTEN],
  [ChainId.RINKEBY]: SUSHI[ChainId.RINKEBY],
  [ChainId.GÖRLI]: SUSHI[ChainId.GÖRLI],
  [ChainId.KOVAN]: SUSHI[ChainId.KOVAN],
  [ChainId.POLYGON]: SUSHI[ChainId.POLYGON],
  // [ChainId.POLYGON_TESTNET]: SUSHI[ChainId.POLYGON_TESTNET],
  [ChainId.FANTOM]: SUSHI[ChainId.FANTOM],
  // [ChainId.FANTOM_TESTNET]: SUSHI[ChainId.FANTOM_TESTNET],
  // [ChainId.BSC_TESTNET]: SUSHI[ChainId.BSC_TESTNET],
  [ChainId.ARBITRUM]: ARB[ChainId.ARBITRUM],
  [ChainId.ARBITRUM_NOVA]: ARB[ChainId.ARBITRUM_NOVA],
  // [ChainId.ARBITRUM_TESTNET]: 'SUSHI',
  [ChainId.AVALANCHE]: SUSHI[ChainId.AVALANCHE],
  // [ChainId.AVALANCHE_TESTNET]: 'SUSHI',
  [ChainId.HECO]: SUSHI[ChainId.HECO],
  // [ChainId.HECO_TESTNET]: 'SUSHI',
  [ChainId.HARMONY]: SUSHI[ChainId.HARMONY],
  // [ChainId.HARMONY_TESTNET]: 'SUSHI',
  [ChainId.OKEX]: SUSHI[ChainId.OKEX],
  // [ChainId.OKEX_TESTNET]: 'SUSHI',
  [ChainId.CELO]: SUSHI[ChainId.CELO],
  // [ChainId.PALM]: SUSHI[ChainId.PALM],
  [ChainId.MOONRIVER]: SUSHI[ChainId.MOONRIVER],
  [ChainId.FUSE]: SUSHI[ChainId.FUSE],
  [ChainId.TELOS]: SUSHI[ChainId.TELOS],
  [ChainId.MOONBEAM]: SUSHI[ChainId.MOONBEAM],
  [ChainId.KAVA]: SUSHI[ChainId.KAVA],
  [ChainId.METIS]: SUSHI[ChainId.METIS],
  [ChainId.BOBA]: USDC[ChainId.BOBA],
  [ChainId.BOBA_AVAX]: new Token({
    chainId: ChainId.BOBA_AVAX,
    address: '0x4200000000000000000000000000000000000023',
    decimals: 18,
    symbol: 'AVAX',
    name: 'Avalanche'
  }),
  [ChainId.BOBA_BNB]: new Token({
    chainId: ChainId.BOBA_BNB,
    address: '0x4200000000000000000000000000000000000023',
    decimals: 18,
    symbol: 'BNB',
    name: 'Binance Coin'
  }),
  [ChainId.BTTC]: SUSHI[ChainId.BTTC],
  [ChainId.THUNDERCORE]: USDC[ChainId.THUNDERCORE],
  // [ChainId.SEPOLIA]: USDT[ChainId.SEPOLIA],
  // [ChainId.CONSENSUS_ZKEVM_TESTNET]: WETH9[ChainId.CONSENSUS_ZKEVM_TESTNET],
  // [ChainId.SCROLL_ALPHA_TESTNET]: WETH9[ChainId.SCROLL_ALPHA_TESTNET],
  // [ChainId.BASE_TESTNET]: WETH9[ChainId.BASE_TESTNET],
  [ChainId.POLYGON_ZKEVM]: USDC[ChainId.POLYGON_ZKEVM]
} as const
