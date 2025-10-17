import { deleteBooking, getUserBookings } from "@sdk";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { BookingsType } from "@types";
import { queryClient } from "tanstack-store";

export const useGetUserBookings = (id: string) => {
	const query = useQuery(
		{
			queryKey: ["booking"],
			queryFn: () => getUserBookings(id),
		},
		queryClient,
	);

	return query;
};

export const useDeleteBooking = () => {
	const mutation = useMutation(
		{
			mutationFn: async ({ id, data }: { id: string; data: BookingsType }) =>
				deleteBooking({ id, data }),
		},
		queryClient,
	);

	return mutation;
};
