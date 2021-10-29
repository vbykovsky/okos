import produce from "immer";
import { OkosActionPayloadType, OkosActionsType, OkosActionType, OkosAsyncActionPromiseType, OkosAsyncActionType, _OkosActionType, __OkosResultActionType } from "./okos.types";

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

export function generateAsyncAction<StateType, ActionsType extends OkosActionsType<StateType>>(
  action: OkosAsyncActionType<StateType, ActionsType>,
  actions: ActionsType,
  store: { state: StateType; dispatch: (state: StateType) => void }
): __OkosResultActionType {
  return (async (payload: OkosActionPayloadType) => {
    let actionCB: OkosAsyncActionPromiseType<StateType>;

    await produce(store.state, async (draftState) => {
      actionCB = await action(draftState, payload, actions);
    });

    if(actionCB !== undefined){
      const newState = produce(store.state, (draftState) => {
        if(actionCB !== undefined){
          actionCB(draftState);
        }
      });

      store.dispatch(newState);
    }
  }) as __OkosResultActionType;
};