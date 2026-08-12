import { Categories } from "@/types/Categories";
import { useQuery } from "@tanstack/react-query";
import { useFetchApi } from "./useFetchApi";

export function useCategories() {
  const fetchApi = useFetchApi();

  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchApi<Categories[]>("/api/categories", { method: "GET" }),
  });
}
