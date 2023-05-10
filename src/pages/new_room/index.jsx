import React from 'react'
import Button from '../../components/Button'
import background from '../../assets/images/illustration.svg'
import logo from '../../assets/images/logo.svg'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'


const NewRoom = () => {


    const { user } = useAuth()


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

                    <div className='w-full flex items-center justify-center h-16 flex-col'>
                        <p className='text-base font-Poppins font-normal tracking-tight text-gray-600 font-p'>{user?.name}</p>
                        <p className='text-base font-Poppins font-normal tracking-tight text-gray-600 font-p'>Crie uma nova sala</p>
                    </div>
                    <div className='w-full flex items-center justify-center'>
                        <input
                            className='w-full text-center flex items-center justify-center h-12 rounded text-sm  text-gray-300 outline-none border  placeholder:text-gray-300'
                            type="text"
                            placeholder='Nome da sala'
                        />
                    </div>
                    <Button >

                        <p className='text-sm text-gray-100 font-normal'>Criar sala</p>
                    </Button>

                    <p className='text-sm w-full text-gray-600 text-center py-2 gap-2 flex items-center justify-end '>Quer entrar em uma sala já existente? <Link to='/' className='text-violet-500 underline'>Clique aqui</Link> </p>
                </section>

            </div>


        </div>
    )




}

export default NewRoom