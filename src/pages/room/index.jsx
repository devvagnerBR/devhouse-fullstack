import React from 'react'
import { useParams } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import { Copy } from '@phosphor-icons/react'
import Button from './../../components/Button';
const Room = () => {


    const id = useParams()

    return (
        <div className='w-100dvw flex items-center justify-start flex-col h-100dvh bg-gray-200'>

            <header className='w-full h-[10%] min-h-[96px] border-b flex items-center justify-around shadow-sm'>
                <img src={logo} width={96} alt="" />

                <div className='cursor-pointer flex items-center h-8 rounded-lg overflow-hidden  justify-evenly w-auto'>

                    <div className='bg-purple-500 h-full text-gray-800 hover:bg-purple-600  flex items-center justify-center px-1 '>
                        <Copy size={24} className='text-slate-200 ' />
                    </div>
                    <div className='border border-purple-500 hover:border-purple-700 transition-colors  w-full h-full flex items-center p-2'>
                        <h1 className='text-sm'>Sala #2555453</h1>
                    </div>
                </div>
            </header>

            <section className=' w-full h-64 flex flex-col items-center justify-start'>

                <div className=' w-[60vw]  max-lg:w-[90vw] h-full pt-4'>
                    <h1 className='font-Poppins font-semibold'>Sala React Q&A</h1>
                    <textarea className='w-full rounded-sm flex  outline-none text-gray-600 p-2 max-sm:gap-4 text-sm max-h-[160px] min-h-[160px]' type="" />
                
                    <div className='flex justify-between pt-4 items-center  max-sm:pt-2' >
                        <p className='text-sm max-sm:text-xs'>Para enviar uma perguntas <span className='text-purple-500  cursor-pointer underline'>faça seu login</span> </p>
                        <Button className='bg-purple-500 h-10  rounded-md text-slate-200  text-sm min-w-[144px] w-36'>Enviar pergunta</Button>
                    </div>
                </div>

            </section>

        </div>
    )
}

export default Room