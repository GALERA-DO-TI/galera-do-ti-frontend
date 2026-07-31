"use client";

import React from "react";
import useThunkReducer from "react-hook-thunk-reducer";

import { reducer, initialState } from "./application/reducer";

import { ApplicationContext, ApplicationDispatchContext } from "./Contexts";
import { ApplicationProps } from "./types";

export const ApplicationProvider = ({ children }: ApplicationProps) => {
  const [state, dispatch] = useThunkReducer(reducer, initialState);

  return (
    <ApplicationContext.Provider value={state}>
      <ApplicationDispatchContext.Provider value={dispatch}>
        {children}
      </ApplicationDispatchContext.Provider>
    </ApplicationContext.Provider>
  );
};
