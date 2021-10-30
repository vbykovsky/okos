import { generateAction, generateAsyncAction } from "./okos.helpers";
import {
  OkosActionsType,
  OkosAsyncActionsType,
  OkosResultActionsType,
  OkosSubscriberType,
  _OkosActionType,
  __OkosResultActionType,
} from "./okos.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Okos<StateType = any> {
  private _state: StateType;

  private _subscribers: OkosSubscriberType<StateType>[] = [];

  private _notify(state: StateType) {
    this._subscribers.forEach((subscriber) => subscriber(state));
  }

  public constructor(initialState: StateType) {
    this._state = initialState;
  }

  public get state() {
    return this._state;
  }

  public subscribe(subscriber: OkosSubscriberType<StateType>) {
    this._subscribers.push(subscriber);

    return () => {
      this._subscribers = this._subscribers.filter((_subscriber) => _subscriber !== subscriber);
    };
  }

  public dispatch(newState: StateType) {
    this._state = newState;
    this._notify(this._state);
  }
}

export const createStore = <
  StateType,
  ActionsType extends OkosActionsType<StateType>,
  AsyncActionsType extends OkosAsyncActionsType<StateType, ActionsType>,
  ResultActions = OkosResultActionsType<StateType, ActionsType, AsyncActionsType>
>(
  initialState: StateType,
  actions: ActionsType = <ActionsType>{},
  asyncActions: AsyncActionsType = <AsyncActionsType>{}
): {
  store: Okos<StateType>;
  actions: ResultActions;
} => {
  const store = new Okos(initialState);

  const resultActions: [keyof ActionsType | keyof AsyncActionsType, __OkosResultActionType][] = [];

  for (const [actionName, actionCB] of Object.entries(actions)) {
    resultActions.push([actionName, generateAction(actionCB.bind(actions), store)]);
  }

  for (const [actionName, actionCB] of Object.entries(asyncActions)) {
    resultActions.push([actionName, generateAsyncAction(actionCB.bind(asyncActions), actions, store)]);
  }

  return {
    store,
    actions: Object.fromEntries(resultActions) as unknown as ResultActions,
  };
};
