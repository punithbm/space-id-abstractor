import { ACTIONS } from "@/store/GlobalContext";
import { getStore } from "@/store/GlobalStore";
import { IToastType } from "@/store/reducers/popupStateReducer";
import { truncate } from "lodash";
import { ReactNode } from "react";
export const trimAddress = (val: string, charsToKeep: number) => {
  if (!val) {
    return;
  }
  if (val.length <= charsToKeep * 2) {
    return val; // Return the full string if it's shorter than what you want to keep
  }

  const firstChars = val?.substring(0, charsToKeep);
  const lastChars = val?.substring(val.length - charsToKeep, val.length);
  return firstChars + "..." + lastChars;
};

export const truncateText = (text = "", count = 22, separator = " ") => {
  if (text?.length < count) {
    return text;
  } else {
    return truncate(text, { length: count, separator: separator });
  }
};
export function getExplorerUrl(_type: string, url: string, address: string) {
  if (_type == "address") {
    return `${url}/address/${address}`;
  } else if (_type == "tx") {
    return `${url}/tx/${address}`;
  }
}

export const toastFlashMessage = (
  message: ReactNode | string,
  toastType: IToastType["toastType"],
  delay = 4000
) => {
  const _store = getStore();
  if (_store) {
    const { dispatch } = _store;

    dispatch({
      type: ACTIONS.SHOW_TOAST,
      payload: {
        message: message,
        toastType,
      },
    });

    setTimeout(function () {
      dispatch({
        type: ACTIONS.CLEAR_TOAST,
      });
    }, delay);
  }
};
