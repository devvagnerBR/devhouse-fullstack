import React from 'react'
import background from '../../assets/images/illustration.svg'
import logo from '../../assets/images/logo.svg'
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

        <div className='w-100dvw h-100dvh  flex  items-center justify-center '>
            <div className='bg-purple-700 max-lg:hidden flex flex-col items-center justify-end w-[50dvw] h-full  bg-no-repeat bg-center bg-auto rounded' style={{ backgroundImage: `url(${background})` }} >

                <div className=' w-full h-[24rem] p-12'>
                    <h1 className='text-4xl font-bold text-gray-50'>Toda pergunta tem uma resposta.</h1>
                    <h1 className='text-gray-300 max-w-[300px] mt-4'>Aprenda e compartilhe conhecimento com outras pessoas</h1>
                </div>

            </div>

            <div className=' h-full w-[50dvw]  max-lg:w-[100dvw] max-lg:h-100dvh  max-lg:justify-start  max-lg:mt-24 flex flex-col items-center justify-center  ' >
                <section className='w-full h-full max-w-[360px] max-h-[375px] '>
                    <header className='  flex flex-col items-center  justify-center  h-32 p-2'>
                        <img
                            width={140}
                            src={logo}
                            alt="let me ask logo"
                        />
                    </header>

                    <Button onClick={() => handleCreateRoom()} className='w-full bg-red-500 flex h-12 items-center justify-center gap-4 rounded hover:bg-red-600 transition-colors' >
                        <GoogleLogo size={28} className="text-gray-100 " />
                        <p className='text-sm text-gray-100 font-normal'>Crie sua sala com o Google</p>
                    </Button>

                    <div className='w-full flex items-center justify-center h-16'>
                        <p className='text-sm font-Poppins tracking-wider text-gray-500/60'>ou entre em uma sala</p>
                    </div>
                    <form onSubmit={handleJoinRoom} className='w-full flex items-center flex-col justify-center'>
                        <input
                            className='w-full text-center flex items-center justify-center h-12 rounded text-sm  text-gray-500 outline-none border  placeholder:text-gray-300'
                            type="text"
                            placeholder='Digite o código da sala'
                            onChange={( { target } ) => setRoomCode( target.value )}
                            value={roomCode}
                        />
                        <Button >
                            <SignIn size={24} className="text-gray-100  " />
                            <p className='text-sm text-gray-100 font-normal'>Entrar na sala</p>
                        </Button>
                    </form>
                </section>

            </div>


        </div>
    )
}

export default Homepage