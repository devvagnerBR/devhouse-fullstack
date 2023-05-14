import React from 'react'
import useGetData from '../hooks/useGetData'
import { useAuth } from '../hooks/useAuth'
import { ChatCenteredDots } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import convertObjInArray from '../functions/ObjToArray'
const MyRooms = () => {

    const navigate = useNavigate()
    const { user } = useAuth()
    const roomsFromUser = useGetData( `users/${user?.id}/rooms/` );
    const roomsInArray = convertObjInArray( roomsFromUser.data )
    const findItem = roomsInArray?.filter( item => !item.endedAt )

    //grid grid-cols-1 gap-2 w-3/4 place-items-center items-center

    return (

        <section className={`flex justify-stretch items-center flex-col p-2 gap-3`}>

            <h1 className='mb-4 text-dev_primary-gray-400'>Minhas Salas</h1>
            <div className={` ${findItem?.length > 1 ? 'grid grid-cols-1 gap-1 min-1xs:gap-x-28 ' : 'flex'} `}>


                {findItem && findItem.map( ( room,index ) => {
                    return (
                        <div
                            onClick={() => navigate( `/admin/sala/${room?.idRoom}` )}
                            className='flex gap-2 p-1 cursor-pointer text-dev_primary-gray-400/60 hover:text-dev_primary-gray-400 transition-all'
                            key={index}>
                            <ChatCenteredDots className='' />
                            <h1 className='text-xs'>{room?.title}</h1>
                        </div>
                    )
                } )}

            </div>
        </section>
    )

}

export default MyRooms