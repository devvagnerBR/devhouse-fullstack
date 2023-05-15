import { Copy,CheckCircle } from '@phosphor-icons/react'
import React from 'react'
import { useParams } from 'react-router-dom'

const RoomCode = () => {

    const [copyMessage,setCopyMessage] = React.useState( null )

    const { id } = useParams()

    const copyRoomCodeToClipboard = () => {
        setCopyMessage( 'código da sala copiado com sucesso' )
        navigator.clipboard.writeText( `https://devhouse.devvagner.com/sala/${id}` )


        setTimeout( () => {
            setCopyMessage( null )
        },2000 )
    }

    return (
        <main className=' h-12 flex  flex-col items-center justify-center relative'>

            <div className=' flex items-center h-8 max-md:h-12 max-md:w-[90vw] rounded-lg overflow-hidden  justify-center'>

                <div className='cursor-pointer max-md:w-14 bg-dev_primary-green h-full text-gray-800 hover:bg-dev_primary-green/80  flex items-center justify-center px-1 '>
                    <Copy
                        onClick={copyRoomCodeToClipboard}
                        size={24}
                        className='text-slate-200'
                    />
                </div>
                <div className='border border-dev_primary-green  transition-colors text-dev_primary-gray-700 max-md:justify-center  w-full h-full flex items-center p-2'>
                    <h1
                        className='text-[12px] font-Poppins'>
                        {id}
                    </h1>
                </div>
            </div>
            {copyMessage && <div className={` max-md:w-[90vw] absolute text-end text-xs max-sm:mb-8 max-md:top-12 top-11 gap-2  text-green-600  flex items-center  max-sm:justify-center   justify-start `}>
                <CheckCircle />
                <p className='text-xs'>{copyMessage}</p>
            </div>}
        </main>
    )
}

export default RoomCode