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
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IzumiQuoterInterface extends utils.Interface {
  contractName: "IzumiQuoter";
  functions: {
    "WETH9()": FunctionFragment;
    "factory()": FunctionFragment;
    "multicall(bytes[])": FunctionFragment;
    "pool(address,address,uint24)": FunctionFragment;
    "refundETH()": FunctionFragment;
    "swapAmount(uint128,bytes)": FunctionFragment;
    "swapDesire(uint128,bytes)": FunctionFragment;
    "swapX2Y(address,address,uint24,uint128,int24)": FunctionFragment;
    "swapX2YCallback(uint256,uint256,bytes)": FunctionFragment;
    "swapX2YDesireY(address,address,uint24,uint128,int24)": FunctionFragment;
    "swapY2X(address,address,uint24,uint128,int24)": FunctionFragment;
    "swapY2XCallback(uint256,uint256,bytes)": FunctionFragment;
    "swapY2XDesireX(address,address,uint24,uint128,int24)": FunctionFragment;
    "sweepToken(address,uint256,address)": FunctionFragment;
    "unwrapWETH9(uint256,address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "WETH9", values?: undefined): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "multicall",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "pool",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "refundETH", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "swapAmount",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "swapDesire",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "swapX2Y",
    values: [string, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swapX2YCallback",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "swapX2YDesireY",
    values: [string, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swapY2X",
    values: [string, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swapY2XCallback",
    values: [BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "swapY2XDesireX",
    values: [string, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "sweepToken",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "unwrapWETH9",
    values: [BigNumberish, string]
  ): string;

  decodeFunctionResult(functionFragment: "WETH9", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "refundETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swapAmount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swapDesire", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swapX2Y", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "swapX2YCallback",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapX2YDesireY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swapY2X", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "swapY2XCallback",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapY2XDesireX",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sweepToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "unwrapWETH9",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IzumiQuoter extends BaseContract {
  contractName: "IzumiQuoter";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IzumiQuoterInterface;

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
    WETH9(overrides?: CallOverrides): Promise<[string]>;

    factory(overrides?: CallOverrides): Promise<[string]>;

    multicall(
      data: BytesLike[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pool(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    refundETH(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapAmount(
      amount: BigNumberish,
      path: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapDesire(
      desire: BigNumberish,
      path: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapX2Y(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      amount: BigNumberish,
      lowPt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapX2YCallback(
      x: BigNumberish,
      y: BigNumberish,
      path: BytesLike,
      overrides?: CallOverrides
    ): Promise<[void]>;

    swapX2YDesireY(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      desireY: BigNumberish,
      lowPt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapY2X(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      amount: BigNumberish,
      highPt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapY2XCallback(
      x: BigNumberish,
      y: BigNumberish,
      path: BytesLike,
      overrides?: CallOverrides
    ): Promise<[void]>;

    swapY2XDesireX(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      desireX: BigNumberish,
      highPt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sweepToken(
      token: string,
      minAmount: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unwrapWETH9(
      minAmount: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  WETH9(overrides?: CallOverrides): Promise<string>;

  factory(overrides?: CallOverrides): Promise<string>;

  multicall(
    data: BytesLike[],
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pool(
    tokenX: string,
    tokenY: string,
    fee: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  refundETH(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapAmount(
    amount: BigNumberish,
    path: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapDesire(
    desire: BigNumberish,
    path: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapX2Y(
    tokenX: string,
    tokenY: string,
    fee: BigNumberish,
    amount: BigNumberish,
    lowPt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapX2YCallback(
    x: BigNumberish,
    y: BigNumberish,
    path: BytesLike,
    overrides?: CallOverrides
  ): Promise<void>;

  swapX2YDesireY(
    tokenX: string,
    tokenY: string,
    fee: BigNumberish,
    desireY: BigNumberish,
    lowPt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapY2X(
    tokenX: string,
    tokenY: string,
    fee: BigNumberish,
    amount: BigNumberish,
    highPt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapY2XCallback(
    x: BigNumberish,
    y: BigNumberish,
    path: BytesLike,
    overrides?: CallOverrides
  ): Promise<void>;

  swapY2XDesireX(
    tokenX: string,
    tokenY: string,
    fee: BigNumberish,
    desireX: BigNumberish,
    highPt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sweepToken(
    token: string,
    minAmount: BigNumberish,
    recipient: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unwrapWETH9(
    minAmount: BigNumberish,
    recipient: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    WETH9(overrides?: CallOverrides): Promise<string>;

    factory(overrides?: CallOverrides): Promise<string>;

    multicall(data: BytesLike[], overrides?: CallOverrides): Promise<string[]>;

    pool(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    refundETH(overrides?: CallOverrides): Promise<void>;

    swapAmount(
      amount: BigNumberish,
      path: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number[]] & { acquire: BigNumber; pointAfterList: number[] }
    >;

    swapDesire(
      desire: BigNumberish,
      path: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number[]] & { cost: BigNumber; pointAfterList: number[] }
    >;

    swapX2Y(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      amount: BigNumberish,
      lowPt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number] & { amountY: BigNumber; finalPoint: number }
    >;

    swapX2YCallback(
      x: BigNumberish,
      y: BigNumberish,
      path: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    swapX2YDesireY(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      desireY: BigNumberish,
      lowPt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number] & { amountX: BigNumber; finalPoint: number }
    >;

    swapY2X(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      amount: BigNumberish,
      highPt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number] & { amountX: BigNumber; finalPoint: number }
    >;

    swapY2XCallback(
      x: BigNumberish,
      y: BigNumberish,
      path: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    swapY2XDesireX(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      desireX: BigNumberish,
      highPt: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, number] & { amountY: BigNumber; finalPoint: number }
    >;

    sweepToken(
      token: string,
      minAmount: BigNumberish,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unwrapWETH9(
      minAmount: BigNumberish,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    WETH9(overrides?: CallOverrides): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<BigNumber>;

    multicall(
      data: BytesLike[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pool(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    refundETH(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapAmount(
      amount: BigNumberish,
      path: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapDesire(
      desire: BigNumberish,
      path: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapX2Y(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      amount: BigNumberish,
      lowPt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapX2YCallback(
      x: BigNumberish,
      y: BigNumberish,
      path: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapX2YDesireY(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      desireY: BigNumberish,
      lowPt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapY2X(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      amount: BigNumberish,
      highPt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapY2XCallback(
      x: BigNumberish,
      y: BigNumberish,
      path: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapY2XDesireX(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      desireX: BigNumberish,
      highPt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sweepToken(
      token: string,
      minAmount: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unwrapWETH9(
      minAmount: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    WETH9(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    multicall(
      data: BytesLike[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pool(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    refundETH(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapAmount(
      amount: BigNumberish,
      path: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapDesire(
      desire: BigNumberish,
      path: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapX2Y(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      amount: BigNumberish,
      lowPt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapX2YCallback(
      x: BigNumberish,
      y: BigNumberish,
      path: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    swapX2YDesireY(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      desireY: BigNumberish,
      lowPt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapY2X(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      amount: BigNumberish,
      highPt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapY2XCallback(
      x: BigNumberish,
      y: BigNumberish,
      path: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    swapY2XDesireX(
      tokenX: string,
      tokenY: string,
      fee: BigNumberish,
      desireX: BigNumberish,
      highPt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sweepToken(
      token: string,
      minAmount: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unwrapWETH9(
      minAmount: BigNumberish,
      recipient: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}