import { TGlobalActions, TInitialStateType } from "./GlobalContext";

// eslint-disable-next-line no-var
var Store: {
  state: TInitialStateType;
  dispatch: React.Dispatch<TGlobalActions>;
} | null;

export function saveStore(createdStore: {
  state: TInitialStateType;
  dispatch: React.Dispatch<TGlobalActions>;
}) {
  Store = { ...createdStore };
}

export function getStore() {
  return Store;
}

export function clearStore() {
  Store = null;
  return Store;
}
