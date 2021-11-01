export * from "./okos";
export * from "./okos.hooks";
export * from "./okos.hooks";

import * as core from "./okos";
import * as hooks from "./okos.hooks";
import * as types from "./okos.types";

export default { ...core, ...hooks, ...types };
