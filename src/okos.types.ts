import { Draft } from "immer";

// HELPERS
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OkosActionPayloadType = any;
export type OkosSubscriberType<StateType> = (state: StateType) => void;
export type OkosAsyncActionPromiseType<StateType> = ((state: Draft<StateType>) => void) | undefined;

// Action type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OkosActionType<StateType, ActionsType = any> = (
  state: Draft<StateType>,
  payload: OkosActionPayloadType,
  actions: ActionsType
) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OkosActionsType<StateType, ActionsType = any> = {
  [T in string]: OkosActionType<StateType, ActionsType>;
};

// Async action type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OkosAsyncActionType<StateType, ActionsType = any> = (
  state: Draft<StateType>,
  payload: OkosActionPayloadType,
  actions: ActionsType
) => Promise<OkosAsyncActionPromiseType<StateType>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OkosAsyncActionsType<StateType, ActionsType = any> = {
  [T in string]: OkosAsyncActionType<StateType, ActionsType>;
};

// Union action type
export type _OkosActionType<StateType> = OkosActionType<StateType> | OkosAsyncActionType<StateType>;

// Result action type
export type OkosResultActionType = () => void;
export type OkosResultActionWithPayloadType<PayloadType> = (payload: PayloadType) => void;

// Result async action type
export type OkosResultAsyncActionType = () => Promise<void>;
export type OkosResultAsyncActionWithPayloadType<PayloadType> = (payload: PayloadType) => Promise<void>;

// Union result action type without payload
export type _OkosResultActionType = OkosResultActionType | OkosResultAsyncActionType;

// Union result action type with payload
export type _OkosResultActionWithPayloadType<PayloadType> =
  | OkosResultActionWithPayloadType<PayloadType>
  | OkosResultAsyncActionWithPayloadType<PayloadType>;

// Union result action type
export type __OkosResultActionType = _OkosResultActionType | _OkosResultActionWithPayloadType<OkosActionPayloadType>;

export type OkosResultActionsType<
  StateType,
  ActionsType extends OkosActionsType<StateType>,
  AsyncActionsType extends OkosAsyncActionsType<StateType>
> = {
  [T in keyof ActionsType]: Parameters<ActionsType[T]> extends [Draft<StateType>, infer PayloadType]
    ? OkosResultActionWithPayloadType<PayloadType>
    : OkosResultActionType;
} & {
  [T in keyof AsyncActionsType]: Parameters<AsyncActionsType[T]> extends [Draft<StateType>, infer PayloadType]
    ? OkosResultAsyncActionWithPayloadType<PayloadType>
    : OkosResultAsyncActionType;
};
