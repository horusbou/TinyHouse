import { useReducer } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type MutationTuple<TData, TVariables> = [
  (variables?: TVariables) => Promise<void>,
  State<TData>
];
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
export const useMutation = <TData = any, TVariables = any>(
  query: string
): MutationTuple<TData, TVariables> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false,
  });

  const fetch = async (variables?: TVariables) => {
    try {
      dispatch({ type: "FETCH_ERROR" });
      const { data, error } = await server.fetch({ query, variables });

      if (error && error.length) throw new Error(error[0].message);

      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR" });
      throw console.error(error);
    }
  };
  return [fetch, state];
};
