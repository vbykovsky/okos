import produce from "immer";
import {
  OkosActionPayloadType,
  OkosActionsType,
  OkosActionType,
  OkosAsyncActionPromiseType,
  OkosAsyncActionType,
  _OkosActionType,
  __OkosResultActionType,
} from "./okos.types";

export const generateAction =
  <StateType>(
    action: OkosActionType<StateType>,
    store: { state: StateType; dispatch: (state: StateType) => void }
  ): __OkosResultActionType =>
  (payload: OkosActionPayloadType) => {
    const newState = produce(store.state, (draftState) => {
      action(draftState, payload);
    });

    store.dispatch(newState);
  };

export const generateAsyncAction =
  <StateType, ActionsType extends OkosActionsType<StateType>>(
    action: OkosAsyncActionType<StateType, ActionsType>,
    actions: ActionsType,
    store: { state: StateType; dispatch: (state: StateType) => void }
  ): __OkosResultActionType =>
  async (payload: OkosActionPayloadType) => {
    let actionCB: OkosAsyncActionPromiseType<StateType>;

    await produce(store.state, async (draftState) => {
      actionCB = await action(draftState, payload, actions);
    });

    if (actionCB !== undefined) {
      const newState = produce(store.state, (draftState) => {
        if (actionCB !== undefined) {
          actionCB(draftState);
        }
      });

      store.dispatch(newState);
    }
  };
