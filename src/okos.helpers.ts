import produce from "immer";
import { OkosActionPayloadType, _OkosActionType, __OkosResultActionType } from "@okos/okos.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAsyncFunction = (func: any) => (func as any).__proto__ === ((async () => 0) as any).__proto__;

export function generateAction<StateType>(
  action: _OkosActionType<StateType>,
  store: { state: StateType; dispatch: (state: StateType) => void }
): __OkosResultActionType {
  return ((payload: OkosActionPayloadType) => {
    const newState = produce(store.state, (draftState) => {
      action(draftState, payload);
    });

    store.dispatch(newState);
  }) as __OkosResultActionType;
}

export function generateAsyncAction<StateType>(
  action: _OkosActionType<StateType>,
  store: { state: StateType; dispatch: (state: StateType) => void }
): __OkosResultActionType {
  return (async (payload: OkosActionPayloadType) => {
    const newState = await produce(store.state, async (draftState) => {
      await action(draftState, payload);
    });

    store.dispatch(newState);
  }) as __OkosResultActionType;
}
