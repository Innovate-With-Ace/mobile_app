import { useAuth } from "@clerk/expo";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Fetches data with a Clerk session token, tracking loading/refreshing/error
 * state so screens don't each hand-roll the same fetch lifecycle.
 */
export function useApiQuery<T>(
  fetcher: (token: string | null) => Promise<T>,
  deps: React.DependencyList = []
) {
  const { getToken } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const load = useCallback(
    async (isRefresh: boolean) => {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        const result = await fetcherRef.current(token);
        setData(result);
      } catch (err: any) {
        setError(err?.message ?? "Something went wrong. Please try again.");
      } finally {
        if (isRefresh) setRefreshing(false);
        else setLoading(false);
      }
    },
    [getToken]
  );

  useEffect(() => {
    load(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    data,
    loading,
    refreshing,
    error,
    refresh: () => load(true),
    reload: () => load(false),
  };
}

export function useAuthedToken() {
  const { getToken } = useAuth();
  return getToken;
}
