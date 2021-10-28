import produce from "immer";
import { OkosActionPayloadType, OkosActionType, OkosAsyncActionType, _OkosActionType, __OkosResultActionType } from "./okos.types";

export const isAsyncFunction = (func: Function) => {
  try{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (func() as any).__proto__ === Promise.prototype;
  }
  catch(e){
    return false;
  }
};

export function generateAction<StateType>(
  action: OkosActionType<StateType>,
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
  action: OkosAsyncActionType<StateType>,
  store: { state: StateType; dispatch: (state: StateType) => void }
): __OkosResultActionType {
  return (async (payload: OkosActionPayloadType) => {
    const actionCB = await action(payload);

    const newState = produce(store.state, (draftState) => {
      actionCB(draftState);
    });

    store.dispatch(newState);
  }) as __OkosResultActionType;
}
