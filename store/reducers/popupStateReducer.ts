import { ReactNode } from "react";

import { ACTIONS, TGlobalActions } from "../GlobalContext";
import { TActionMap } from "./types";

export interface IToastType {
  message: ReactNode | string;
  toastType: "success" | "error" | "warning";
  subtitle?: string;
}

export interface IPopupState {
  toastLists: IToastType[];
}

type TPopupPayload = {
  [ACTIONS.SHOW_TOAST]: IToastType;
  [ACTIONS.CLEAR_TOAST]: undefined;
};
export type TPopupActions =
  TActionMap<TPopupPayload>[keyof TActionMap<TPopupPayload>];

export const popupReducer = (
  state: IPopupState,
  action: TGlobalActions
): IPopupState => {
  switch (action.type) {
    case ACTIONS.SHOW_TOAST: {
      return {
        ...state,
        toastLists: [...state.toastLists, action.payload],
      };
    }

    case ACTIONS.CLEAR_TOAST:
      return {
        ...state,
        toastLists: [],
      };

    default:
      return state;
  }
};
