# okos
okos is a library for storing and managing data in react js, written in TS

## Features
* Immer. I used immer to let you to mutate the state in actions

## Get started
### 1. Import neccessary stuff
```typescript
import { createStore, selectorFactory } from "okos";
```


### 2. First of all you should init yout store
```typescript
(example.service.ts)
--------------------
import { createStore } from "okos";

export interface ICounterService {
  counter: number;
}

const initialState: ICounterService = {
  counter: 0,
};

export const counterService = createStore(initialState);
```

### 3. Then you may add neccessary actions for your store
```typescript
(example.service.ts)
--------------------
...
export const counterService = createStore(initialState, {
   
  // The only one you should provide is a payload type(it's number here)
  // State type defines automaticlly 
  increment(state, additive: number) {
    state.counter += additive;
  },
  
  // Same here
  decrement(state, additive: number) {
  
    // Also you can use another defined actions by using "this" keyword, example below: 
    this.increment(state, -additive);
  },
});

// Don't forgot about exporting your actions to use them later
export const { increment, decrement } = counterService.actions;
...
```

### 4. And try to use it now:
```typescript
(example.tsx)
------------
import React from "react";
import { increment, decrement } from "./example.service";

export const Example = () => {
  return (
    <div>
      <h2>okos</h2>
      <h3>{/* We will use counter state here */}</h3>
      <button onClick={() => increment(1)}>increment</button>
      <button onClick={() => decrement(1)}>decrement</button>
    </div>
  );
};
```
You can see, that it's very easy to use it like a common functions

### 5. Let's try to use our store to make a state of our store
Create specific selector hook for our store
```typescript
(example.service.ts)
-------------------
import { createStore, selectorFactory } from "okos";
...
export const useCounterSelector = selectorFactory(counterService.store);
...
```
And use it in our example component
```typescript
(example.tsx)
------------
...
export const Example = () => {
  const okosCounter = useCounterSelector((state) => state.counter);
  ...
  return(
    <div>
      <h3>{okosCounter}</h3>
      ...
    </div>
  );
};
```

### 6. And also you can easily use async function for your actions
```typescript
(example.service.ts)
-------------------
...
export const counterService = createStore(initialState, {
  ...
}, {
  async asyncIncrement(state, additive: number, actions) {
    // state is provided to async functions to use data from store to build a request
    // all mutation of this state will not apllied
    
    return (newState) => {
      // you can also return function, that is reciving newState,
      // which will the actual state, when async function will complete
      // and you can modify this state as you wish
      actions.increment(newState, additive);
    }
  },
  async asyncDecrement(state, additive: number, actions) {
    // and all the same here
    
    return new Promise((res) => {
      setTimeout(() => {
        res((newState) => { 
          actions.decrement(newState, additive);
        });
      }, 1000);
    })
  }
});
...
// and the same exports
export const { increment, decrement, asyncIncrement, asyncDecrement } = counterService.actions;
```

And the same use
```typescript
(example.tsx)
------------
...
import { increment, decrement, asyncIncrement, asyncDecrement } from "./example.service";

export const Example = () => {
  ...
  return(
    <div>
      ...
      <button onClick={() => asyncIncrement(1)}>async increment</button>
      <button onClick={() => asyncDecrement(1)}>async decrement</button>
    </div>
  );
};
```
