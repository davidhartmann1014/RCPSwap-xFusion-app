/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface XfusionRouterInterface extends utils.Interface {
  contractName: "XfusionRouter";
  functions: {
    "feeWallet()": FunctionFragment;
    "owner()": FunctionFragment;
    "pause()": FunctionFragment;
    "processRoute(address,uint256,address,uint256,uint256,address,bytes)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "resume()": FunctionFragment;
    "setFeeWallet(address)": FunctionFragment;
    "setPriviledge(address,bool)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "transferValueAndprocessRoute(address,uint256,address,uint256,address,uint256,uint256,address,bytes)": FunctionFragment;
    "uniswapV3SwapCallback(int256,int256,bytes)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "feeWallet", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "processRoute",
    values: [
      string,
      BigNumberish,
      string,
      BigNumberish,
      BigNumberish,
      string,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "resume", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setFeeWallet",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setPriviledge",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferValueAndprocessRoute",
    values: [
      string,
      BigNumberish,
      string,
      BigNumberish,
      string,
      BigNumberish,
      BigNumberish,
      string,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "uniswapV3SwapCallback",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "feeWallet", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "processRoute",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "resume", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setFeeWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPriviledge",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferValueAndprocessRoute",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniswapV3SwapCallback",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "Route(address,address,address,address,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Route"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type RouteEvent = TypedEvent<
  [string, string, string, string, BigNumber, BigNumber, BigNumber],
  {
    from: string;
    to: string;
    tokenIn: string;
    tokenOut: string;
    amountIn: BigNumber;
    amountOutMin: BigNumber;
    amountOut: BigNumber;
  }
>;

export type RouteEventFilter = TypedEventFilter<RouteEvent>;

export interface XfusionRouter extends BaseContract {
  contractName: "XfusionRouter";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: XfusionRouterInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    feeWallet(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    processRoute(
      tokenIn: string,
      amountIn: BigNumberish,
      tokenOut: string,
      amountOutMin: BigNumberish,
      estimatedFee: BigNumberish,
      to: string,
      route: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    resume(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setFeeWallet(
      wallet: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setPriviledge(
      user: string,
      priviledge: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferValueAndprocessRoute(
      transferValueTo: string,
      amountValueTransfer: BigNumberish,
      tokenIn: string,
      amountIn: BigNumberish,
      tokenOut: string,
      amountOutMin: BigNumberish,
      estimatedFee: BigNumberish,
      to: string,
      route: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    uniswapV3SwapCallback(
      amount0Delta: BigNumberish,
      amount1Delta: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  feeWallet(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  pause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  processRoute(
    tokenIn: string,
    amountIn: BigNumberish,
    tokenOut: string,
    amountOutMin: BigNumberish,
    estimatedFee: BigNumberish,
    to: string,
    route: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  resume(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setFeeWallet(
    wallet: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setPriviledge(
    user: string,
    priviledge: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferValueAndprocessRoute(
    transferValueTo: string,
    amountValueTransfer: BigNumberish,
    tokenIn: string,
    amountIn: BigNumberish,
    tokenOut: string,
    amountOutMin: BigNumberish,
    estimatedFee: BigNumberish,
    to: string,
    route: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  uniswapV3SwapCallback(
    amount0Delta: BigNumberish,
    amount1Delta: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    feeWallet(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    pause(overrides?: CallOverrides): Promise<void>;

    processRoute(
      tokenIn: string,
      amountIn: BigNumberish,
      tokenOut: string,
      amountOutMin: BigNumberish,
      estimatedFee: BigNumberish,
      to: string,
      route: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    resume(overrides?: CallOverrides): Promise<void>;

    setFeeWallet(wallet: string, overrides?: CallOverrides): Promise<void>;

    setPriviledge(
      user: string,
      priviledge: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferValueAndprocessRoute(
      transferValueTo: string,
      amountValueTransfer: BigNumberish,
      tokenIn: string,
      amountIn: BigNumberish,
      tokenOut: string,
      amountOutMin: BigNumberish,
      estimatedFee: BigNumberish,
      to: string,
      route: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    uniswapV3SwapCallback(
      amount0Delta: BigNumberish,
      amount1Delta: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "Route(address,address,address,address,uint256,uint256,uint256)"(
      from?: string | null,
      to?: null,
      tokenIn?: string | null,
      tokenOut?: string | null,
      amountIn?: null,
      amountOutMin?: null,
      amountOut?: null
    ): RouteEventFilter;
    Route(
      from?: string | null,
      to?: null,
      tokenIn?: string | null,
      tokenOut?: string | null,
      amountIn?: null,
      amountOutMin?: null,
      amountOut?: null
    ): RouteEventFilter;
  };

  estimateGas: {
    feeWallet(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    processRoute(
      tokenIn: string,
      amountIn: BigNumberish,
      tokenOut: string,
      amountOutMin: BigNumberish,
      estimatedFee: BigNumberish,
      to: string,
      route: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    resume(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setFeeWallet(
      wallet: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setPriviledge(
      user: string,
      priviledge: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferValueAndprocessRoute(
      transferValueTo: string,
      amountValueTransfer: BigNumberish,
      tokenIn: string,
      amountIn: BigNumberish,
      tokenOut: string,
      amountOutMin: BigNumberish,
      estimatedFee: BigNumberish,
      to: string,
      route: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    uniswapV3SwapCallback(
      amount0Delta: BigNumberish,
      amount1Delta: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    feeWallet(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    processRoute(
      tokenIn: string,
      amountIn: BigNumberish,
      tokenOut: string,
      amountOutMin: BigNumberish,
      estimatedFee: BigNumberish,
      to: string,
      route: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    resume(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setFeeWallet(
      wallet: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setPriviledge(
      user: string,
      priviledge: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferValueAndprocessRoute(
      transferValueTo: string,
      amountValueTransfer: BigNumberish,
      tokenIn: string,
      amountIn: BigNumberish,
      tokenOut: string,
      amountOutMin: BigNumberish,
      estimatedFee: BigNumberish,
      to: string,
      route: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    uniswapV3SwapCallback(
      amount0Delta: BigNumberish,
      amount1Delta: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
