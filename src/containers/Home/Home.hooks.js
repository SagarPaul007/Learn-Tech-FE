import { useQuery, useInfiniteQuery } from "react-query";
import { fetchAPI } from "../../utils/common";

export function useFetchUser() {
  return useQuery(["user"], async () => {
    const data = await fetchAPI({
      url: "/users/getUser",
      method: "GET",
    });
    return data;
  });
}

export function useFetchResourcesOfUser() {
  return useQuery(["userResources"], async () => {
    const data = await fetchAPI({
      url: "/users/getResources",
      method: "GET",
    });
    return data;
  });
}

export function useFetchResources({ category, selectedTags }) {
  return useInfiniteQuery(
    ["resources", { category, selectedTags }],
    async ({ pageParam = 1 }) => {
      const resourcesData = await fetchAPI({
        url: `/resources/getResources`,
        method: "POST",
        body: {
          category,
          tags: selectedTags,
          page: pageParam,
        },
      });
      return resourcesData;
    },
    {
      staleTime: 5 * 60 * 1000,
      refetchInterval: 5 * 60 * 1000,
      getNextPageParam: (lastGroup) =>
        lastGroup?.canFetchMore && lastGroup?.nextPage,
    }
  );
}
