import React from "react";
import { increment as okosIncrement, decrement as okosDecrement, useCounterSelector } from "./example.service";

export const Example = () => {
  const okosCounter = useCounterSelector((state) => state.counter);

  const [stateCounter, setStateCounter] = React.useState<number>(0);

  const stateIncrement = React.useCallback(() => setStateCounter((prevCounter) => prevCounter + 1), []);
  const stateDecrement = React.useCallback(() => setStateCounter((prevCounter) => prevCounter - 1), []);

  return (
    <div>
      <h2>React state</h2>
      <h3>{stateCounter}</h3>
      <button onClick={stateIncrement}>increment</button>
      <button onClick={stateDecrement}>decrement</button>
      <br />
      <h2>@okos</h2>
      <h3>{okosCounter}</h3>
      <button onClick={okosIncrement.bind(null, 1)}>increment</button>
      <button onClick={okosDecrement.bind(null, 1)}>decrement</button>
    </div>
  );
};
