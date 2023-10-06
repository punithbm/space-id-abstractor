"use client";
import React from "react";

import { saveStore } from "./GlobalStore";

import {
  IPopupState,
  popupReducer,
  TPopupActions,
} from "./reducers/popupStateReducer";

export type TGlobalActions = TPopupActions;

export enum ACTIONS {
  CLEAR_TOAST = "CLEAR_TOAST",
  SHOW_TOAST = "SHOW_TOAST",
}
export type TInitialStateType = {
  popupState: IPopupState;
};

interface IProps {
  children?: React.ReactNode;
}

const initialState: TInitialStateType = {
  popupState: {
    toastLists: [],
  },
};

export type TGlobalContextType = {
  state: TInitialStateType;
  dispatch: React.Dispatch<TGlobalActions>;
};

export const GlobalContext = React.createContext<TGlobalContextType>({
  state: initialState,
  dispatch: () => null,
});

const globalReducer = (
  { popupState }: TInitialStateType,
  action: TGlobalActions
) => ({
  popupState: popupReducer(popupState, action),
});

const GlobalContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = React.useReducer(globalReducer, initialState);
  saveStore({ state, dispatch });
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
export { GlobalContextProvider };
