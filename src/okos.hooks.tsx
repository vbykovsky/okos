import React from "react";
import { Okos } from "./okos";

type OkosGetStoreStateType<StoreType extends Okos> = StoreType extends Okos<infer StateType> ? StateType : unknown;

export const selectorFactory = <StoreType extends Okos>(store: StoreType) =>
  function <T>(cb: (state: OkosGetStoreStateType<StoreType>) => T): T {
    const [value, setValue] = React.useState<T>(cb(store.state));

    React.useEffect(
      () =>
        store.subscribe((state) => {
          const newValue = cb(state);

          if (newValue !== value) {
            setValue(newValue);
          }
        }),
      [value, setValue]
    );

    return value;
  };
