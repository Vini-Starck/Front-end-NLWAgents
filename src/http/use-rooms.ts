import { useQuery } from '@tanstack/react-query';
import type { GetRoomsResponse } from './types/get-rooms-response';

export function useRooms() {
    return useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            // Simulate an API call
            const response = await fetch('https://back-end-nlwagents.onrender.com/rooms');
            const result: GetRoomsResponse = await response.json();

            return result;
        }
    });
}