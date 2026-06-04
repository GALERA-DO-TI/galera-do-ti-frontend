import React, { createContext } from "react";

import { InitialStateProps } from "./application/interfaces";
import { IDispatchProps } from "./types";
// import { initialState } from './ducks/reducer';

export const ApplicationContext = createContext<InitialStateProps | undefined>(
  undefined,
);
export const ApplicationDispatchContext = createContext<
  React.Dispatch<IDispatchProps>
>(() => {});
