export const FUSION_CONTRACT = {
  address: '0x2C707726feeeBf45e65eC2a330F95B7E4988aB61',
  abi: [
    {
      inputs: [
        { internalType: 'address', name: '_weth', type: 'address' },
        { internalType: 'address', name: '_feeAddress', type: 'address' },
        { internalType: 'uint256', name: '_fee', type: 'uint256' }
      ],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'factory', type: 'address' },
        { indexed: true, internalType: 'address', name: 'router', type: 'address' }
      ],
      name: 'DexAdded',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'factory', type: 'address' },
        { indexed: true, internalType: 'address', name: 'router', type: 'address' }
      ],
      name: 'DexRemoved',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
        { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' }
      ],
      name: 'OwnershipTransferred',
      type: 'event'
    },
    {
      inputs: [],
      name: 'WETH',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: '_factory', type: 'address' },
        { internalType: 'address', name: '_router', type: 'address' }
      ],
      name: 'addDex',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'dexList',
      outputs: [
        { internalType: 'address', name: 'factory', type: 'address' },
        { internalType: 'address', name: 'router', type: 'address' }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'fee',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'feeAddress',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
      name: 'removeDex',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
      inputs: [{ internalType: 'uint256', name: '_fee', type: 'uint256' }],
      name: 'setFee',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: '_feeAddress', type: 'address' }],
      name: 'setFeeAddress',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
        { internalType: 'address', name: 'tokenOut', type: 'address' },
        { internalType: 'uint256', name: 'dexIndex', type: 'uint256' },
        { internalType: 'address[]', name: 'path_', type: 'address[]' }
      ],
      name: 'swapExactETHForTokensWithMultiDex',
      outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
        { internalType: 'address', name: 'tokenIn', type: 'address' },
        { internalType: 'address', name: 'tokenOut', type: 'address' },
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'dexIndex', type: 'uint256' },
        { internalType: 'address[]', name: 'path_', type: 'address[]' }
      ],
      name: 'swapExactTokensForTokensWithMultiDex',
      outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
        { internalType: 'address', name: 'tokenIn', type: 'address' },
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'dexIndex', type: 'uint256' },
        { internalType: 'address[]', name: 'path_', type: 'address[]' }
      ],
      name: 'swapExactTokensforETHWithMultiDex',
      outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    { stateMutability: 'payable', type: 'receive' }
  ]
}

export const SWAP_CONTRACT = {
  abi: [
    {
      inputs: [
        { internalType: 'address', name: '_factory', type: 'address' },
        { internalType: 'address', name: '_WETH', type: 'address' }
      ],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      inputs: [],
      name: 'WETH',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'amountADesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBDesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'addLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'amountTokenDesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'addLiquidityETH',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' }
      ],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'factory',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveIn', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveOut', type: 'uint256' }
      ],
      name: 'getAmountIn',
      outputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }],
      stateMutability: 'pure',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveIn', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveOut', type: 'uint256' }
      ],
      name: 'getAmountOut',
      outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
      stateMutability: 'pure',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' }
      ],
      name: 'getAmountsIn',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' }
      ],
      name: 'getAmountsOut',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveA', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveB', type: 'uint256' }
      ],
      name: 'quote',
      outputs: [{ internalType: 'uint256', name: 'amountB', type: 'uint256' }],
      stateMutability: 'pure',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'removeLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'removeLiquidityETH',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'removeLiquidityETHSupportingFeeOnTransferTokens',
      outputs: [{ internalType: 'uint256', name: 'amountETH', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' }
      ],
      name: 'removeLiquidityETHWithPermit',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' }
      ],
      name: 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
      outputs: [{ internalType: 'uint256', name: 'amountETH', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' }
      ],
      name: 'removeLiquidityWithPermit',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'swapETHForExactTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'swapExactETHForTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'payable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'swapExactTokensForETH',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'swapExactTokensForTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'amountInMax', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'swapTokensForExactETH',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'amountInMax', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' }
      ],
      name: 'swapTokensForExactTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    { stateMutability: 'payable', type: 'receive' }
  ]
}