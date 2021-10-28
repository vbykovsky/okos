import { Draft } from "immer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OkosActionPayloadType = any;

export type OkosSubscriberType<StateType> = (state: StateType) => void;

export type OkosAsyncActionPromiseType<StateType> = (state: Draft<StateType>) => void;

export type OkosActionType<StateType> = (state: Draft<StateType>, payload: OkosActionPayloadType) => void;
export type OkosAsyncActionType<StateType> = (payload: OkosActionPayloadType) => Promise<OkosAsyncActionPromiseType<StateType>>;

export type _OkosActionType<StateType> = OkosActionType<StateType> | OkosAsyncActionType<StateType>;

export type OkosActionsType<StateType> = {
  [T in string]: OkosActionType<StateType> | OkosAsyncActionType<StateType>;
};

export type OkosResultActionType = () => void;
export type OkosResultAsyncActionType = () => Promise<void>;
export type _OkosResultActionType = OkosResultActionType | OkosResultAsyncActionType;

export type OkosResultActionWithPayloadType<PayloadType> = (payload: PayloadType) => void;
export type OkosResultAsyncActionWithPayloadType<PayloadType> = (payload: PayloadType) => Promise<void>;
export type _OkosResultActionWithPayloadType<PayloadType> =
  | OkosResultActionWithPayloadType<PayloadType>
  | OkosResultAsyncActionWithPayloadType<PayloadType>;

export type __OkosResultActionType = _OkosResultActionType | _OkosResultActionWithPayloadType<OkosActionPayloadType>;

export type OkosResultActionsType<StateType, ActionsType extends OkosActionsType<StateType>> = {
  [T in keyof ActionsType]: ReturnType<ActionsType[T]> extends Promise<OkosAsyncActionPromiseType<StateType>>
  ? Parameters<ActionsType[T]> extends [infer PayloadType] ? OkosResultAsyncActionWithPayloadType<PayloadType>
  : OkosResultAsyncActionType
  : Parameters<ActionsType[T]> extends [Draft<StateType>, infer PayloadType] ? OkosResultActionWithPayloadType<PayloadType>
  :
  OkosResultActionType;
};
