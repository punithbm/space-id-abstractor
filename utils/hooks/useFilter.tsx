import { useMemo, useState } from "react";

const intersect = <T,>(a: Array<T>, b: Array<string>): Array<T> => {
  const setA = new Set(a);
  const setB = new Set(b);
  return [...new Set([...setA].filter((x) => setB.has(x as string)))];
};

export const useFilter = <T,>(
  arr: Array<T>,
  field: keyof T,
  initialState: Array<string> = []
) => {
  const [filters, setFilters] = useState(initialState);

  const filterResults = useMemo(() => {
    if (!filters?.length) return arr;
    return arr?.filter((obj) => {
      if (Array.isArray(obj[field])) {
        return Boolean(intersect(obj[field] as Array<T>, filters)?.length);
      } else {
        return filters?.includes(obj[field] as string);
      }
    });
  }, [arr, filters, field]);

  const isNotFoundFilter = useMemo(() => {
    return filterResults?.length === 0 && Boolean(filters);
  }, [filterResults, filters]);

  const isEmptyFilter = useMemo(() => {
    return filterResults?.length === 0 && !filters;
  }, [filterResults, filters]);
  return {
    filters,
    setFilters,
    filterResults,
    isNotFoundFilter,
    isEmptyFilter,
  };
};
