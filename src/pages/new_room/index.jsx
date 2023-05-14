import React from 'react'
import Button from '../../components/Button'
import logo from '../../assets/images/devhouse_logo.svg'
import { Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ref,set } from 'firebase/database'
import { db } from '../../services/firebase'
import idGenerate from './../../services/id_generate';
import MyRooms from '../../components/MyRooms'


const NewRoom = () => {

    const navigate = useNavigate()
    const { user } = useAuth()
    const [newRoom,setNewRoom] = React.useState( '' )



    const handleCreateRoom = async ( event ) => {

        event.preventDefault()
        const id = idGenerate()

        if ( newRoom.trim() === '' ) {
            return
        }

        await set( ref( db,`rooms/${id}` ),{
            title: newRoom,
            authorId: user?.id
        } )
        await set( ref( db,`users/${user.id}/rooms/${id}` ),{
            title: newRoom,
            authorId: user?.id,
            idRoom: id
        } )


        setNewRoom( '' )
        console.log( 'room created successfully' );
        navigate( `/admin/sala/${id}` )
    }


    return (

        <div className='w-100dvw h-100dvh flex bg-dev_primary-gray-900 max-xs:items-start max-xs:justify-center p-4'>

            <div className=' flex flex-col w-full  max-xs:justify-start h-auto items-center justify-center gap-6' >
                <section className='flex flex-col w-full  max-xs:justify-start items-center justify-center gap-2'>

                    <header className='max-xs:mt-12  items-center  justify-center  h-32 p-2 cursor-pointer'>
                        <img
                            width={160}
                            src={logo}
                            alt="let me ask logo"
                            onClick={() => navigate( '/' )}
                        />
                    </header>


                    <form onSubmit={handleCreateRoom} className='max-xs:w-[90%] min-1xs:min-w-[400px]  flex items-center justify-center  flex-col  gap-4'>
                        <input
                            className='h-14 w-full pl-2 outline-none border border-dev_primary-green text-center placeholder:text-dev_primary-gray-700 bg-dev_primary-gray-900 rounded-sm text-dev_primary-green font-medium'
                            type="text"
                            placeholder='Nome da sala'
                            onChange={( { target } ) => setNewRoom( target.value )}
                            value={newRoom}
                        />
                        <Button
                            type="submit"
                            className="flex bg-dev_primary-green w-full p-2 h-14 hover:bg-dev_primary-green/70 items-center justify-center text-dev_primary-white-50">
                            <p className='text-sm w-3/4 text-gray-100 font-normal'>Criar sala</p>
                        </Button>
                        <p
                            className='text-xs text-dev_primary-gray-700 items-end justify-end w-[100%]  max-xs:text-end flex gap-2'>
                            ou entre em uma sala já existente
                            <Link to='/' className='text-dev_primary-green underline'>
                                clicando aqui
                            </Link>
                        </p>
                    </form>

                </section>
                <MyRooms />

            </div>
        </div >
    )




}

export default NewRoom