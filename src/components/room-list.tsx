import { Link } from "react-router-dom"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ArrowRight } from "lucide-react"
import { dayjs } from "@/lib/format-relative-date";
import { useRooms } from "@/http/use-rooms";


export function RoomList() {

    const { data, isLoading } = useRooms()

    return (
                <Card>
                    <CardHeader>

                        <CardTitle>
                            Salas recestes
                        </CardTitle>
                        <CardDescription>
                            Acesso rápido para as salas criadas recentemente.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        {isLoading && <p className='text-muted-foreground text-sn'>Carregando salas...</p>}


                        {data?.map(room => {
                            return (
                            <Link 
                                className='flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50'
                                key={room.id}
                                to='/room/:roomId'
                            >
                                <div className='flex-1 flex flex-col gap-1'>
                                    <h3 className='font-medium'>{room.name}</h3>

                                    <div className='flex items-center gap-2'>
                                        <Badge variant="secondary" className="text-xs">
                                            {dayjs(room.createdAt).toNow()}
                                        </Badge>
                                        <Badge variant="secondary" className="text-xs">
                                            {room.questionsCount} pergunta(s)
                                        </Badge>
                                    </div>

                                </div>

                                <span className='flex items-center gap-1 text-sm'>
                                    Entrar
                                    <ArrowRight className='size-3'/>
                                </span>

                            </Link>
                            )
                        })}
                    </CardContent>
                </Card>
    )
}