import { sortBy } from "lodash";

import { useDeepCompareMemo } from "./useDeepCompareMemo";

export const useOrder = <T,>(
  arr: Array<T>,
  field: TDotNestedKeys<T>,
  values: Array<T[keyof T]>
) => {
  const orderedArray = useDeepCompareMemo(() => {
    if (!field) return arr;
    return sortBy(arr, (_item) => !values.includes(_item[field]));
  }, [field, arr, values]);
  return { orderedArray };
};
