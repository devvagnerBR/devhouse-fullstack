import { Copy,CheckCircle } from '@phosphor-icons/react'
import React from 'react'
import { useParams } from 'react-router-dom'

const RoomCode = () => {

    const [copyMessage,setCopyMessage] = React.useState( null )

    const { id } = useParams()

    const copyRoomCodeToClipboard = () => {
        setCopyMessage( 'código da sala copiado com sucesso' )
        navigator.clipboard.writeText( id )

        setTimeout( () => {
            setCopyMessage( null )
        },2000 )
    }

    return (
        <main>

            <div className=' flex items-center h-8 relative rounded-lg overflow-hidden  justify-evenly w-auto'>

                <div className='cursor-pointer bg-purple-500 h-full text-gray-800 hover:bg-purple-600  flex items-center justify-center px-1 '>
                    <Copy onClick={copyRoomCodeToClipboard} size={24} className='text-slate-200  ' />
                </div>
                <div className='border border-purple-500 hover:border-purple-700 transition-colors  w-full h-full flex items-center p-2'>
                    <h1 className='text-xs font-Poppins'> {id} </h1>
                </div>
            </div>
            {copyMessage && <div className={`absolute text-end text-xs text-green-600 right-0-0 flex items-center gap-1  justify-end `}>
                <CheckCircle />
                <p >{copyMessage}</p>
            </div>}
        </main>
    )
}

export default RoomCode