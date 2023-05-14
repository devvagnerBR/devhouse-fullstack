import React from 'react'
import background from '../../assets/images/illustration.svg'
import logo from '../../assets/images/devhouse_logo.svg'
import { GoogleLogo,SignIn } from '@phosphor-icons/react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import useGetData from '../../hooks/useGetData'


const Homepage = () => {

    const navigate = useNavigate()
    const { sigInWithGoogle,user } = useAuth()
    const [roomCode,setRoomCode] = React.useState( '' )
    const room = useGetData( `rooms/${roomCode}` )


    const handleCreateRoom = async () => {

        if ( !user ) await sigInWithGoogle()
        navigate( '/salas/nova' )

    }

    const handleJoinRoom = async ( event ) => {
        event.preventDefault()

        if ( roomCode.trim() === '' ) return;
        if ( room.data === null ) {
            alert( 'Room does not exists.' )
            return
        }
        if ( room.data.endedAt ) {
            alert( 'Room already closed' )
            return
        }
        navigate( `sala/${roomCode}` )
    }

    return (

        <div className=' w-100dvw h-100dvh flex bg-dev_primary-gray-900 max-1xs:items-start max-1xs:justify-center p-4'>

            <section className=' flex flex-col w-full max-1xs:justify-start h-full items-center justify-center gap-6'>

                <header className='max-1xs:mt-12 h-32 p-2'>
                    <img
                    className=''
                        width={160}
                        src={logo}
                        alt="let me ask logo"
                    />
                </header>

                <Button onClick={() => handleCreateRoom()} className='max-1xs:w-[90%] min-1xs:min-w-[400px] hover:bg-dev_primary-white-50/90  full h-14  transition-colors justify-center bg-dev_primary-white-50 flex p-2 items-center gap-2 rounded-sm text-dev_primary-green' >
                    <GoogleLogo size={28} className=" " />
                    <p className=''>Crie sua sala com o Google</p>
                </Button>

                <div className='text-dev_primary-gray-400'>
                    <p className='font-light text-sm'>ou entre em uma sala</p>
                </div>
                <form onSubmit={handleJoinRoom} className=' max-1xs:w-[90%] min-1xs:min-w-[400px]  flex items-center justify-center  flex-col  gap-4'>
                    <input
                        className='h-14 w-full pl-2 outline-none border border-dev_primary-green text-center placeholder:text-dev_primary-gray-700 bg-dev_primary-gray-900 rounded-sm text-dev_primary-green font-medium'
                        type="text"
                        placeholder='Digite o código da sala'
                        onChange={( { target } ) => setRoomCode( target.value )}
                        value={roomCode}
                    />
                    <Button className="flex bg-dev_primary-green w-full p-2 h-14 gap-3 hover:bg-dev_primary-green/70 items-center justify-center text-dev_primary-white-50">
                        <SignIn size={24} className=" " />
                        <p className=''>Entrar na sala</p>
                    </Button>
                </form>
            </section>
        </div>
    )
}

export default Homepage

{/* <div className=' h-full w-[50dvw]  max-lg:w-[100dvw] max-lg:h-100dvh  max-lg:justify-start  max-lg:mt-24 flex flex-col items-center justify-center  ' > */ }