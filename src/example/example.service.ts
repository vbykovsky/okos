import { createStore, selectorFactory } from "../index";

export interface ICounterService {
  counter: number;
}

const initialState: ICounterService = {
  counter: 0,
};

export const counterService = createStore(initialState, {
  increment(state, additive: number) {
    state.counter += additive;
  },
  decrement(state, additive: number) {
    this.increment(state, -additive);
  },
  async asyncIncrement(state, additive: number) {
    return new Promise((res) => {
      setTimeout(() => {
        state.counter += additive;
        res();
      }, 1000);
    })
  },
  async asyncDecrement(state, additive: number) {
    return new Promise((res) => {
      setTimeout(() => {
        state.counter -= additive;
        res();
      }, 1000);
    })
  }
});

export const useCounterSelector = selectorFactory(counterService.store);

export const { increment, decrement, asyncIncrement, asyncDecrement } = counterService.actions;
