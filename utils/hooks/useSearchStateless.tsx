import { get } from "lodash";
import { useMemo } from "react";

export const useSearchStateless = <T,>(
  arr: Array<T> | undefined,
  field:
    | keyof T
    | Array<keyof T>
    | TDotNestedKeys<T>
    | Array<TDotNestedKeys<T>>,
  search: string,
  maxLimit?: number
) => {
  const searchResult = useMemo(() => {
    if (!search) {
      if (maxLimit) {
        return arr?.slice(0, maxLimit);
      } else return arr;
    }
    const compare = (val: T, field: keyof T) =>
      String(get(val, field)).toLowerCase().includes(search.toLowerCase());
    const _result = arr?.filter((val) =>
      Array.isArray(field)
        ? field.some((item) => compare(val, item))
        : compare(val, field)
    );

    if (maxLimit) {
      return _result?.slice(0, maxLimit);
    } else return _result;
  }, [arr, search, maxLimit]);

  const isNotFoundSearch = useMemo(() => {
    return searchResult?.length === 0 && Boolean(search);
  }, [searchResult, search]);

  const isEmptySearch = useMemo(() => {
    return searchResult?.length === 0 && !search;
  }, [searchResult, search]);
  return { search, searchResult, isNotFoundSearch, isEmptySearch };
};
