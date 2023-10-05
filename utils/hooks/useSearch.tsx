import { useMemo, useState } from "react";

export const useSearch = <T,>(
  arr: Array<T>,
  field: Array<keyof T | string>,
  maxLimit?: number
) => {
  const [search, setSearch] = useState("");

  const searchResult = useMemo(() => {
    if (!search) {
      if (maxLimit) {
        return arr.slice(0, maxLimit);
      } else return arr;
    }
    const compare = (val: T, field: string) =>
      String(getNestedFieldValue(val, field))
        .toLowerCase()
        .includes(search.toLowerCase());

    const _result = arr?.filter((val) =>
      field.some((nestedField) => compare(val, nestedField as string))
    );

    if (maxLimit) {
      return _result.slice(0, maxLimit);
    } else {
      return _result;
    }
  }, [arr, search, maxLimit]);

  const isNotFoundSearch = useMemo(() => {
    return searchResult?.length === 0 && Boolean(search);
  }, [searchResult, search]);

  const isEmptySearch = useMemo(() => {
    return searchResult?.length === 0 && !search;
  }, [searchResult, search]);
  return { search, setSearch, searchResult, isNotFoundSearch, isEmptySearch };
};

const getNestedFieldValue = <T,>(obj: T, field: string) => {
  const fields = field.split(".");
  let value: T = obj;
  for (let i = 0; i < fields.length; i++) {
    value = value?.[fields[i] as keyof typeof value] as T;
    if (value === undefined) {
      break;
    }
  }
  return value;
};
