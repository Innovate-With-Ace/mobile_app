import { useFetchApi } from "@/hooks/useFetchApi";
import { Dish } from "@/types/Dish";
import { useQuery } from "@tanstack/react-query";

export function useDishes() {
  const fetchApi = useFetchApi();

  return useQuery({
    queryKey: ["dishes"],
    queryFn: () => fetchApi<Dish[]>("/api/dishes", { method: "GET" }),
  });
}
