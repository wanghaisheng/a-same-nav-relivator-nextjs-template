import { useState, useCallback } from 'react';

type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

type ApiFunction<T, Args extends any[]> = (...args: Args) => Promise<T>;

export function useApi<T, Args extends any[]>(
  apiFunction: ApiFunction<T, Args>,
  initialData: T | null = null
) {
  const [state, setState] = useState<ApiState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const data = await apiFunction(...args);
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error : new Error('Unknown error'),
        }));
        throw error;
      }
    },
    [apiFunction]
  );

  return {
    ...state,
    execute,
    reset: useCallback(() => {
      setState({ data: initialData, loading: false, error: null });
    }, [initialData]),
  };
} 