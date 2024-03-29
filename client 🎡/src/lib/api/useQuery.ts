import { useState, useEffect, useCallback, useReducer } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}
type Action<TData> =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: TData }
  | { type: "FETCH_ERROR" };

const reducer =
  <TData>() =>
  (state: State<TData>, action: Action<TData>): State<TData> => {
    switch (action.type) {
      case "FETCH":
        return { ...state, loading: true };
      case "FETCH_SUCCESS":
        return { data: action.payload, loading: false, error: false };
      case "FETCH_ERROR":
        return { ...state, loading: false, error: false };
      default:
        throw new Error();
    }
  };

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      try {
        dispatch({ type: "FETCH" });
        const { data, error } = await server.fetch<TData>({ query });

        if (error && error.length) throw new Error(error[0].message);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR" });
        throw console.error(err);
      }
    };
    fetchApi();
  }, [query]);
  useEffect(() => {
    fetch();
  }, [fetch]);
  return { ...state, refetch: fetch };
};
