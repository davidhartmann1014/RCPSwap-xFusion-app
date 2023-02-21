import { Blockchain } from '@venomswap/sdk'
import useBlockchain from './useBlockchain'

export default function usePlatformName(): string {
  const blockchain = useBlockchain()
  switch (blockchain) {
    case Blockchain.BINANCE_SMART_CHAIN:
      return 'RCPSwap | Reddit Community Points Swap'
    case Blockchain.HARMONY:
      return 'RCPSwap | Reddit Community Points Swap'
    case Blockchain.ETHEREUM:
      return 'RCPSwap | Reddit Community Points Swap'
    default:
      return 'RCPSwap | Reddit Community Points Swap'
  }
}
