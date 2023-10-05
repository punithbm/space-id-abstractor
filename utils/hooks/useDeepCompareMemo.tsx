import { isEqual } from "lodash";
import { useMemo, useRef } from "react";

const useDeepCompareMemoize = <T,>(value: T) => {
  const ref = useRef<T>();
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};

const useDeepCompareMemo = <T, U>(callback: () => T, dependencies: U[]) =>
  useMemo(callback, dependencies.map(useDeepCompareMemoize));

export { useDeepCompareMemo };
