import { createStore, selectorFactory } from "../index";

export interface ICounterService {
  counter: number;
}

const initialState: ICounterService = {
  counter: 0,
};

export const counterService = createStore(
  initialState,
  {
    increment(state, additive: number) {
      state.counter += additive;
    },
    decrement(state, additive: number) {
      this.increment(state, -additive);
    },
  },
  {
    async asyncIncrement(state, additive: number, actions) {
      console.log("counter was:", state.counter);

      return (newState) => {
        actions.increment(newState, additive);
        console.log("async incremented is:", newState.counter);
      };
    },
    async asyncDecrement(state, additive: number, actions) {
      console.log("counter was:", state.counter);

      return new Promise((res) => {
        setTimeout(() => {
          res((newState) => {
            actions.decrement(newState, additive);
            console.log("async decremented is:", newState.counter);
          });
        }, 1000);
      });
    },
  }
);

export const useCounterSelector = selectorFactory(counterService.store);

export const { increment, decrement, asyncIncrement, asyncDecrement } = counterService.actions;
