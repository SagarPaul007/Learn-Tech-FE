import { useQuery } from "react-query";
import { fetchAPI } from "../../utils/common";

export function useFetchResource(resourceId) {
  return useQuery(["resource", resourceId], async () => {
    const data = await fetchAPI({
      url: `/resources/getResource/${resourceId}`,
      method: "GET",
    });
    return data;
  });
}
