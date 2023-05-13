import React from 'react'
import Answer from './Answer'
import { useParams } from 'react-router-dom'
import { onValue,ref,update } from 'firebase/database'
import { db } from '../services/firebase'
import convertObjInArray from '../functions/ObjToArray'



const Question = ( { question,children,room,user,isAdminRoom } ) => {

    const { author,content,id,isAnswered = false,isHighLighted = false } = question
    const [answer,setAnswer] = React.useState( '' )
    const path = useParams()

    const [clicked,setClicked] = React.useState( null )

    const handleSaveAnswer = async () => {

        let infos;
        const updates = {};
        const refQuestion = ref( db,`/rooms/${path.id}/questions/${clicked.id}` );

        onValue( refQuestion,async ( snapshot ) => {
            const result = snapshot.val()
            updates[`/rooms/${path.id}/questions/${clicked.id}`] = { ...result,answer: answer }
            return await update( ref( db ),updates )
                .then( () => {
                    console.log( 'pergunta respondida com sucesso' )
                    setAnswer( '' )
                    setClicked( null )
                } )

        } )

    }




    return (
        <div
            className={`w-full flex   bg-white border ${isHighLighted && 'border-purple-500 shadow-sm bg-[#F4F0FF]'} ${isAnswered && 'bg-gray-400/20 shadow-sm'}  rounded-md   justify-between  flex-col p-2  max-sm:last:mb-10`}>
            <div className='flex gap-2 items-center '>

                <p className='text-sm font-semibold'>{content}</p>
                {isAdminRoom &&
                    <>
                        {question.answer ?
                            <p onClick={() => setClicked( question )} className='text-[11px] text-purple-500 cursor-pointer'>editar</p>
                            : <p onClick={() => setClicked( question )} className='text-[11px] text-purple-500 cursor-pointer'>responder</p>}
                    </> 

                }
            </div>

            <footer className='flex w-full pt-2'>
                <div className='flex  w-full gap-2 items-center'>
                    <img className='rounded-full' src={author?.avatar} width={26} alt={author?.name} />
                    <span className={`text-xs text-gray-500/80 ${isHighLighted && 'text-[#29292e] font-medium'} `}>{author?.name}</span>
                </div>
                
            </footer>

            <div className=' w-full h-full mt-2'>

                {question.answer ?
                    <Answer question={question} /> : null
                }
                <div className='flex w-full  gap-2 items-end justify-end  '>
                    {children}
                </div>
                {clicked &&
                    <>
                        <textarea
                            className='w-full placeholder:text-purple-700/80 placeholder:font-light bg-slate-100/80 border  my-2 p-1 text-purple-700  flex flex-wrap outline-none rounded-sm text-sm'
                            placeholder='Responda a pergunta'
                            onChange={( event ) => setAnswer( event.target.value )}
                            value={answer}
                        />
                        <div className='flex gap-2 items-center justify-between w-full '>
                            <button onClick={handleSaveAnswer} className='flex bg-purple-600 p-1 mt-1 px-3 text-gray-100 text-sm rounded-sm'>
                                Enviar
                            </button>
                            <button onClick={() => setClicked( null )} className='flex bg-purple-400 p-1 mt-1 px-3 text-gray-100 text-sm rounded-sm'>
                                X
                            </button>
                        </div>

                    </>
                }
            </div>

        </div >
    )
}

export default Question

/* 
                    <>
                        <textarea
                            className='w-full placeholder:text-gray-400 placeholder:font-light bg-purple-400/20 p-1 text-purple-700  flex flex-wrap outline-none rounded-sm text-sm'
                            placeholder='Responda a pergunta'
                            onChange={( event ) => setAnswer( event.target.value )}
                            value={answer}
                        />
                        <div className='flex gap-2 items-center justify-between w-full'>
                            <button onClick={() => handleSaveAnswer(question)} className='flex bg-purple-600 p-1 mt-1 px-3 text-gray-100 text-sm rounded-sm'>
                                Enviar
                            </button>
                        </div>

                    </>

*/