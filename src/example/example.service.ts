import { Draft } from "immer";
import { createStore, selectorFactory } from "../index";

export interface ICounterService {
  counter: number;
}

const initialState: ICounterService = {
  counter: 0,
};

export const counterService = createStore(initialState, {
  increment(state, additive: number = 1) {
    state.counter += additive;
  },
  decrement(state, additive: number = 1) {
    this.increment(state, -additive);
  },
  async asyncIncrement(additive: number) {
    return this.increment;
  },
  async asyncDecrement(additive: number) {
    return new Promise<(state: Draft<ICounterService>) => void>((res) => {
      setTimeout(() => {
        res((state) => {
          state.counter -= additive;
        });
      }, 1000);
    })
  }
});

export const useCounterSelector = selectorFactory(counterService.store);

export const { increment, decrement, asyncIncrement, asyncDecrement } = counterService.actions;
