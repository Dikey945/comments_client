import { useCallback, useEffect, useState } from "react";

interface State<T> {
    loading: boolean;
    error: Error | null;
    value: T | null;
    execute: (...params: any[]) => Promise<T>;
}

export interface Options {
    initialLoading?: boolean;
    dependencies?: any[];
}

export function useAsync<T>(func: (...params: any[]) => Promise<T>, options?: Options): State<T> {
    const { execute, ...state } = useAsyncInternal(func, options);

    useEffect(() => {
        execute();
    }, [execute]);

    return { execute, ...state};
}

export function useAsyncFn<T>(func: (...params: any[]) => Promise<T>, options?: Options): State<T> {
    return useAsyncInternal(func, options);
}

const useAsyncInternal = <T>(func: (...params: any[]) => Promise<T>, options?: Options): State<T> => {
    const { initialLoading = false, dependencies = [] } = options || {};
    const [loading, setLoading] = useState(initialLoading);
    const [value, setValue] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const execute = useCallback((...params: any) => {
        setLoading(true);
        return func(...params)
          .then((data) => {
              setValue(data);
              setError(null);
              return data;
          })
          .catch((error) => {
              setError(error);
              setValue(null);
              return Promise.reject(error);
          })
          .finally(() => {
              setLoading(false);
          });
    }, dependencies);

    return { loading, error, value, execute };
}