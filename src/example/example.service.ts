import { createStore, selectorFactory } from "@okos";

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
});

export const useCounterSelector = selectorFactory(counterService.store);

export const { increment, decrement } = counterService.actions;
