import { Copy,CheckCircle } from '@phosphor-icons/react'
import React from 'react'
import { useParams } from 'react-router-dom'

const RoomCode = () => {

    const [copyMessage,setCopyMessage] = React.useState( null )

    const { id } = useParams()

    const copyRoomCodeToClipboard = () => {
        setCopyMessage( 'código da sala copiado com sucesso' )
        navigator.clipboard.writeText( `https://letmeask.devvagner.com/sala/${id}` )


        setTimeout( () => {
            setCopyMessage( null )
        },2000 )
    }

    return (
        <main className=' h-12 flex flex-col items-center justify-center relative'>

            <div className=' flex items-center h-8  rounded-lg overflow-hidden  justify-center w-auto'>

                <div className='cursor-pointer bg-purple-400 h-full text-gray-800 hover:bg-purple-600  flex items-center justify-center px-1 '>
                    <Copy onClick={copyRoomCodeToClipboard} size={24} className='text-slate-200  ' />
                </div>
                <div className='border border-purple-400 hover:border-purple-700 transition-colors  w-full h-full flex items-center p-2'>
                    <h1 className='text-xs font-Poppins'> {id} </h1>
                </div>
            </div>
            {copyMessage && <div className={` w-full absolute text-end text-xs max-sm:mb-8 top-11  text-green-600  flex items-center gap-1 max-sm:justify-center  justify-start `}>
                <CheckCircle />
                <p >{copyMessage}</p>
            </div>}
        </main>
    )
}

export default RoomCode