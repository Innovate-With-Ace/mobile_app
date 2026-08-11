import { useAuth } from "@clerk/expo";

export function useFetchApi() {
  const { getToken } = useAuth();

  return async function fetchApi<T>(
    url: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = await getToken();

    console.log("TOKEN : ", token);
    const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.error || res.statusText);
    }

    return res.json();
  };
}
