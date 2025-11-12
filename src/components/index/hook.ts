import { getProducts } from "@sdk";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "tanstack-store";

export const useGetProducts = () => {
	const query = useQuery(
		{
			queryKey: ["products"],
			queryFn: getProducts,
		},
		queryClient,
	);

	return query;
};
