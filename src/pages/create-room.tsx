import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

type GetRoomsAPIResponse = Array<{
    id: string;
    name: string;
}>

export function CreateRoom() {
    const { data, isLoading} = useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            // Simulate an API call
            const response = await fetch('http://localhost:3333/rooms');
            const result: GetRoomsAPIResponse = await response.json();

            return result;
        }
    });

    return (
        <div>

            {isLoading && <p>Loading...</p>}
            <div className='flex flex-col gap-2'>
                {data?.map((room => {
                    return <Link to={`/room/${room.id}`} key={room.id}>{room.name}</Link>
                }))}
            </div>
        </div>
    )
}