import { ChainId } from '../../chain'

export const ARB_ADDRESS = {
  [ChainId.ARBITRUM]: '0x912CE59144191C1204E64559FE8253a0e49E6548',
  [ChainId.ARBITRUM_NOVA]: '0xf823C3cD3CeBE0a1fA952ba88Dc9EEf8e0Bf46AD',
  [ChainId.ETHEREUM]: '0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1'
} as const

export const WBTC_ADDRESS = {
  [ChainId.AVALANCHE]: '0x50b7545627a5162F82A992c33b87aDc75187B218',
  [ChainId.ARBITRUM]: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
  [ChainId.ETHEREUM]: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  [ChainId.FANTOM]: '0x321162Cd933E2Be498Cd2267a90534A804051b11',
  [ChainId.POLYGON]: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
  [ChainId.OPTIMISM]: '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
  [ChainId.ARBITRUM_NOVA]: '0x1d05e4e72cD994cdF976181CfB0707345763564d',
  [ChainId.BOBA]: '0xdc0486f8bf31DF57a952bcd3c1d3e166e3d9eC8b',
  [ChainId.KAVA]: '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b',
  [ChainId.METIS]: '0xa5B55ab1dAF0F8e1EFc0eB1931a957fd89B918f4',
  [ChainId.FUSE]: '0x33284f95ccb7B948d9D352e1439561CF83d8d00d',
  [ChainId.POLYGON_ZKEVM]: '0xEA034fb02eB1808C2cc3adbC15f447B93CbE08e1',
  [ChainId.THUNDERCORE]: '0x18fB0A62f207A2a082cA60aA78F47a1af4985190'
} as const

export const WETH9_ADDRESS = {
  [ChainId.ETHEREUM]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [ChainId.ROPSTEN]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  [ChainId.RINKEBY]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  [ChainId.GÖRLI]: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  [ChainId.KOVAN]: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
  [ChainId.ARBITRUM]: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  [ChainId.ARBITRUM_TESTNET]: '0xf8456e5e6A225C2C1D74D8C9a4cB2B1d5dc1153b',
  [ChainId.BSC]: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  [ChainId.FANTOM]: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
  [ChainId.POLYGON]: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  [ChainId.POLYGON_TESTNET]: '0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323',
  [ChainId.OKEX]: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  [ChainId.HECO]: '0x64FF637fB478863B7468bc97D30a5bF3A428a1fD',
  [ChainId.HARMONY]: '0x6983D1E6DEf3690C4d616b13597A09e6193EA013',
  [ChainId.GNOSIS]: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
  [ChainId.AVALANCHE]: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
  [ChainId.PALM]: '0x726138359C17F1E56bA8c4F737a7CAf724F6010b',
  [ChainId.CELO]: '0x122013fd7dF1C6F636a5bb8f03108E876548b455',
  [ChainId.MOONRIVER]: '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
  [ChainId.TELOS]: '0xfA9343C3897324496A05fC75abeD6bAC29f8A40f',
  [ChainId.FUSE]: '0xa722c13135930332Eb3d749B2F0906559D2C5b99',
  [ChainId.MOONBEAM]: '0x30D2a9F5FDf90ACe8c17952cbb4eE48a55D916A7',
  [ChainId.OPTIMISM]: '0x4200000000000000000000000000000000000006',
  [ChainId.METIS]: '0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481',
  [ChainId.KAVA]: '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D',
  [ChainId.METIS]: '0x420000000000000000000000000000000000000A',
  [ChainId.ARBITRUM_NOVA]: '0x722E8BdD2ce80A4422E880164f2079488e115365',
  [ChainId.BOBA]: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
  // [ChainId.SEPOLIA]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  // [ChainId.CONSENSUS_ZKEVM_TESTNET]: '0x2C1b868d6596a18e32E61B901E4060C872647b6C',
  // [ChainId.SCROLL_ALPHA_TESTNET]: '0xa1EA0B2354F5A344110af2b6AD68e75545009a03',
  // [ChainId.BASE_TESTNET]: '0x4200000000000000000000000000000000000006',
  [ChainId.BTTC]: '0x1249C65AfB11D179FFB3CE7D4eEDd1D9b98AD006',
  [ChainId.THUNDERCORE]: '0x6576Bb918709906DcbFDCeae4bB1e6df7C8a1077',
  [ChainId.POLYGON_ZKEVM]: '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9'
} as const

export const WNATIVE_ADDRESS = {
  [ChainId.ETHEREUM]: WETH9_ADDRESS[ChainId.ETHEREUM],
  [ChainId.ROPSTEN]: WETH9_ADDRESS[ChainId.ROPSTEN],
  [ChainId.RINKEBY]: WETH9_ADDRESS[ChainId.RINKEBY],
  [ChainId.GÖRLI]: WETH9_ADDRESS[ChainId.GÖRLI],
  [ChainId.KOVAN]: WETH9_ADDRESS[ChainId.KOVAN],
  [ChainId.OPTIMISM]: WETH9_ADDRESS[ChainId.OPTIMISM],
  [ChainId.ARBITRUM]: WETH9_ADDRESS[ChainId.ARBITRUM],
  [ChainId.ARBITRUM_TESTNET]: WETH9_ADDRESS[ChainId.ARBITRUM_TESTNET],
  [ChainId.FANTOM]: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
  [ChainId.FANTOM_TESTNET]: '0xf1277d1Ed8AD466beddF92ef448A132661956621',
  [ChainId.POLYGON]: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  [ChainId.POLYGON_TESTNET]: '0x5B67676a984807a212b1c59eBFc9B3568a474F0a',
  [ChainId.GNOSIS]: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  [ChainId.BSC]: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  [ChainId.BSC_TESTNET]: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
  [ChainId.AVALANCHE]: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  [ChainId.AVALANCHE_TESTNET]: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
  [ChainId.HECO]: '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F',
  [ChainId.HECO_TESTNET]: '0x5B2DA6F42CA09C77D577a12BeaD0446148830687',
  [ChainId.HARMONY]: '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a',
  [ChainId.HARMONY_TESTNET]: '0x7a2afac38517d512E55C0bCe3b6805c10a04D60F',
  [ChainId.OKEX]: '0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15',
  [ChainId.OKEX_TESTNET]: '0x2219845942d28716c0F7C605765fABDcA1a7d9E0',
  [ChainId.PALM]: '0xF98cABF0a963452C5536330408B2590567611a71',
  [ChainId.CELO]: '0x471EcE3750Da237f93B8E339c536989b8978a438',
  [ChainId.MOONRIVER]: '0xf50225a84382c74CbdeA10b0c176f71fc3DE0C4d',
  [ChainId.FUSE]: '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629',
  [ChainId.TELOS]: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
  [ChainId.MOONBEAM]: '0xAcc15dC74880C9944775448304B263D191c6077F',
  [ChainId.KAVA]: '0xc86c7C0eFbd6A49B35E8714C5f59D99De09A225b',
  [ChainId.METIS]: '0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481',
  [ChainId.ARBITRUM_NOVA]: WETH9_ADDRESS[ChainId.ARBITRUM_NOVA],
  [ChainId.BOBA]: WETH9_ADDRESS[ChainId.BOBA],
  [ChainId.BOBA_AVAX]: '0x26c319B7B2cF823365414d082698C8ac90cbBA63',
  [ChainId.BOBA_BNB]: '0xC58aaD327D6D58D979882601ba8DDa0685B505eA',
  [ChainId.BTTC]: '0x23181F21DEa5936e24163FFABa4Ea3B316B57f3C',
  // [ChainId.SEPOLIA]: WETH9_ADDRESS[ChainId.SEPOLIA],
  // [ChainId.CONSENSUS_ZKEVM_TESTNET]: WETH9_ADDRESS[ChainId.CONSENSUS_ZKEVM_TESTNET],
  // [ChainId.SCROLL_ALPHA_TESTNET]: WETH9_ADDRESS[ChainId.SCROLL_ALPHA_TESTNET],
  // [ChainId.BASE_TESTNET]: WETH9_ADDRESS[ChainId.BASE_TESTNET],
  [ChainId.POLYGON_ZKEVM]: WETH9_ADDRESS[ChainId.POLYGON_ZKEVM],
  [ChainId.THUNDERCORE]: '0x413cEFeA29F2d07B8F2acFA69d92466B9535f717'
  // [ChainId.FILECOIN]: '0x60E1773636CF5E4A227d9AC24F20fEca034ee25A',
} as const

export const SUSHI_ADDRESS = {
  [ChainId.ETHEREUM]: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
  [ChainId.ROPSTEN]: '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F',
  [ChainId.RINKEBY]: '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F',
  [ChainId.GÖRLI]: '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F',
  [ChainId.KOVAN]: '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F',
  [ChainId.FANTOM]: '0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC',
  [ChainId.POLYGON]: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
  [ChainId.GNOSIS]: '0x2995D1317DcD4f0aB89f4AE60F3f020A4F17C7CE',
  [ChainId.BSC]: '0x986cdF0fd180b40c4D6aEAA01Ab740B996D8b782',
  [ChainId.ARBITRUM]: '0xd4d42F0b6DEF4CE0383636770eF773390d85c61A',
  [ChainId.AVALANCHE]: '0x37B608519F91f70F2EeB0e5Ed9AF4061722e4F76',
  [ChainId.HECO]: '0x52E00B2dA5Bd7940fFe26B609A42F957f31118D5',
  [ChainId.HARMONY]: '0xBEC775Cb42AbFa4288dE81F387a9b1A3c4Bc552A',
  [ChainId.OKEX]: '0x2218E0D5E0173769F5b4939a3aE423f7e5E4EAB7',
  [ChainId.MOONRIVER]: '0xf390830DF829cf22c53c8840554B98eafC5dCBc2',
  [ChainId.CELO]: '0x29dFce9c22003A4999930382Fd00f9Fd6133Acd1',
  [ChainId.TELOS]: '0x922D641a426DcFFaeF11680e5358F34d97d112E1',
  [ChainId.FUSE]: '0x90708b20ccC1eb95a4FA7C8b18Fd2C22a0Ff9E78',
  [ChainId.MOONBEAM]: '0x2C78f1b70Ccf63CDEe49F9233e9fAa99D43AA07e',
  [ChainId.KAVA]: '0x7C598c96D02398d89FbCb9d41Eab3DF0C16F227D',
  [ChainId.METIS]: '0x17Ee7E4dA37B01FC1bcc908fA63DF343F23B4B7C',
  [ChainId.BOBA]: '0x5fFccc55C0d2fd6D3AC32C26C020B3267e933F1b',
  [ChainId.ARBITRUM_NOVA]: '0xfe60A48a0bCf4636aFEcC9642a145D2F241A7011',
  [ChainId.BTTC]: '0x53C56ece35f8CaB135e13D6d00499Dfc7c07A92e',
  [ChainId.OPTIMISM]: '0x3eaEb77b03dBc0F6321AE1b72b2E9aDb0F60112B',
  [ChainId.THUNDERCORE]: '0xABd380327Fe66724FFDa91A87c772FB8D00bE488'
} as const

export const USDC_ADDRESS = {
  [ChainId.ETHEREUM]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [ChainId.RINKEBY]: '0x1717A0D5C8705EE89A8aD6E808268D6A826C97A4',
  [ChainId.ROPSTEN]: '0x0D9C8723B343A8368BebE0B5E89273fF8D712e3C',
  [ChainId.KOVAN]: '0xb7a4F3E9097C08dA09517b5aB877F7a917224ede',
  [ChainId.POLYGON]: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  [ChainId.POLYGON_TESTNET]: '0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7',
  [ChainId.FANTOM]: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
  [ChainId.BSC]: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  [ChainId.HARMONY]: '0x985458E523dB3d53125813eD68c274899e9DfAb4',
  [ChainId.HECO]: '0x9362Bbef4B8313A8Aa9f0c9808B80577Aa26B73B',
  [ChainId.OKEX]: '0xc946DAf81b08146B1C7A8Da2A851Ddf2B3EAaf85',
  [ChainId.GNOSIS]: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
  [ChainId.ARBITRUM]: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  [ChainId.AVALANCHE]: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  [ChainId.MOONRIVER]: '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D',
  [ChainId.CELO]: '0xef4229c8c3250C675F21BCefa42f58EfbfF6002a',
  [ChainId.TELOS]: '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b',
  [ChainId.FUSE]: '0x620fd5fa44BE6af63715Ef4E65DDFA0387aD13F5',
  [ChainId.MOONBEAM]: '0x8f552a71EFE5eeFc207Bf75485b356A0b3f01eC9',
  [ChainId.OPTIMISM]: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  [ChainId.KAVA]: '0xfA9343C3897324496A05fC75abeD6bAC29f8A40f',
  [ChainId.METIS]: '0xEA32A96608495e54156Ae48931A7c20f0dcc1a21',
  [ChainId.ARBITRUM_NOVA]: '0x750ba8b76187092B0D1E87E28daaf484d1b5273b',
  [ChainId.BOBA]: '0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc',
  [ChainId.BOBA_AVAX]: '0x12bb1A120dcF8Cb7152eDAC9f04d176DD7f41F7e',
  [ChainId.BOBA_BNB]: '0x9F98f9F312D23d078061962837042b8918e6aff2',
  [ChainId.BTTC]: '0xAE17940943BA9440540940DB0F1877f101D39e8b', // USDC.e
  [ChainId.POLYGON_ZKEVM]: '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035',
  [ChainId.THUNDERCORE]: '0x22e89898A04eaf43379BeB70bf4E38b1faf8A31e'
} as const

export const USDT_ADDRESS = {
  [ChainId.ETHEREUM]: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  [ChainId.ROPSTEN]: '0x110a13FC3efE6A245B50102D2d79B3E76125Ae83',
  [ChainId.KOVAN]: '0x07de306FF27a2B630B1141956844eB1552B956B5',
  [ChainId.POLYGON]: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  [ChainId.FANTOM]: '0x049d68029688eAbF473097a2fC38ef61633A3C7A',
  [ChainId.BSC]: '0x55d398326f99059fF775485246999027B3197955',
  [ChainId.BSC_TESTNET]: '0xF49E250aEB5abDf660d643583AdFd0be41464EfD',
  [ChainId.HARMONY]: '0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f',
  [ChainId.HECO]: '0xa71EdC38d189767582C38A3145b5873052c3e47a',
  [ChainId.OKEX]: '0x382bB369d343125BfB2117af9c149795C6C65C50',
  [ChainId.GNOSIS]: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6',
  [ChainId.ARBITRUM]: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  [ChainId.AVALANCHE]: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
  [ChainId.CELO]: '0x88eeC49252c8cbc039DCdB394c0c2BA2f1637EA0',
  [ChainId.MOONRIVER]: '0xB44a9B6905aF7c801311e8F4E76932ee959c663C',
  [ChainId.TELOS]: '0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73',
  [ChainId.FUSE]: '0xFaDbBF8Ce7D5b7041bE672561bbA99f79c532e10',
  [ChainId.MOONBEAM]: '0x8e70cd5b4ff3f62659049e74b6649c6603a0e594',
  [ChainId.OPTIMISM]: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
  [ChainId.KAVA]: '0xB44a9B6905aF7c801311e8F4E76932ee959c663C',
  [ChainId.METIS]: '0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC',
  [ChainId.ARBITRUM_NOVA]: '0xeD9d63a96c27f87B07115b56b2e3572827f21646',
  [ChainId.BOBA]: '0x5DE1677344D3Cb0D7D465c10b72A8f60699C062d',
  [ChainId.BOBA_AVAX]: '0xfaA13D82756f1e0e4dec9416b83121db3Fc35199',
  [ChainId.BOBA_BNB]: '0x1E633Dcd0d3D349126983D58988051F7c62c543D',
  [ChainId.BTTC]: '0xE887512ab8BC60BcC9224e1c3b5Be68E26048B8B', // USDT.e
  [ChainId.POLYGON_ZKEVM]: '0x1E4a5963aBFD975d8c9021ce480b42188849D41d',
  [ChainId.THUNDERCORE]: '0x4f3C8E20942461e2c3Bdd8311AC57B0c222f2b82'
} as const

export const DAI_ADDRESS = {
  [ChainId.ETHEREUM]: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  [ChainId.ROPSTEN]: '0xc2118d4d90b274016cB7a54c03EF52E6c537D957',
  [ChainId.KOVAN]: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
  [ChainId.POLYGON]: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  [ChainId.FANTOM]: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
  [ChainId.BSC]: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
  [ChainId.HARMONY]: '0xEf977d2f931C1978Db5F6747666fa1eACB0d0339',
  [ChainId.HECO]: '0x3D760a45D0887DFD89A2F5385a236B29Cb46ED2a',
  [ChainId.OKEX]: '0x21cDE7E32a6CAF4742d00d44B07279e7596d26B9',
  [ChainId.GNOSIS]: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  [ChainId.ARBITRUM]: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  [ChainId.AVALANCHE]: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
  [ChainId.CELO]: '0x90Ca507a5D4458a4C6C6249d186b6dCb02a5BCCd',
  [ChainId.MOONRIVER]: '0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844',
  // [ChainId.TELOS]: '',
  [ChainId.FUSE]: '0x94Ba7A27c7A95863d1bdC7645AC2951E0cca06bA',
  [ChainId.MOONBEAM]: '0xc234A67a4F840E61adE794be47de455361b52413',
  [ChainId.OPTIMISM]: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  [ChainId.KAVA]: '0x765277EebeCA2e31912C9946eAe1021199B39C61',
  [ChainId.METIS]: '0x4c078361FC9BbB78DF910800A991C7c3DD2F6ce0',
  [ChainId.ARBITRUM_NOVA]: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  [ChainId.BOBA]: '0xf74195Bb8a5cf652411867c5C2C5b8C2a402be35',
  [ChainId.POLYGON_ZKEVM]: '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4'
} as const

export const MOON_ADDRESS = {
  [ChainId.ARBITRUM_NOVA]: '0x0057ac2d777797d31cd3f8f13bf5e927571d6ad0'
}

export const BRICK_ADDRESS = {
  [ChainId.ARBITRUM_NOVA]: '0x6dcb98f460457fe4952e12779ba852f82ecc62c1'
}
