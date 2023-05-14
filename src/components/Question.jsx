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



    // normal = gray
    // masked as answered = gray
    // masked as highLighted = green

    return (
        <div
            className={`w-full flex border  ${isHighLighted && 'border-dev_primary-green'} ${isAnswered && 'border-dev_primary-gray-700 bg-dev_primary-gray-700/40'}  rounded-md   justify-between  flex-col p-2  max-sm:last:mb-10`}>



            <div className='flex gap-2 items-center '>

                <p className={`text-sm text-dev_primary-gray-400  font-normal`}>{content}</p>
                {isAdminRoom &&
                    <>
                        {question.answer ?
                            <p onClick={() => setClicked( question )} className='text-[11px] text-dev_primary-green cursor-pointer'>editar</p>
                            : <p onClick={() => setClicked( question )} className='text-[11px] text-dev_primary-green cursor-pointer'>responder</p>}
                    </>

                }
            </div>



            <div className=' w-full h-full mt-2'>

                {question.answer ?
                    <Answer question={question} /> : null
                }

                {clicked &&
                    <>
                        <textarea
                            className='w-full placeholder:text-dev_primary-white-50 placeholder:font-light bg-dev_primary-gray-700 font-FiraCode   my-2 p-1 text-dev_primary-white-50 h-24 flex flex-wrap outline-none rounded-sm text-sm'
                            placeholder='Responda a pergunta'
                            onChange={( event ) => setAnswer( event.target.value )}
                            value={answer}
                        />
                        <div className='flex gap-2 items-center justify-between w-full pb-3 '>
                            <button onClick={handleSaveAnswer} className='flex bg-dev_primary-green p-1 mt-1 px-3 text-gray-100 text-sm rounded-sm'>
                                Enviar
                            </button>
                            <button onClick={() => setClicked( null )} className='flex bg-dev_primary-gray-700 p-1 mt-1 px-3 text-gray-100 text-sm rounded-sm'>
                                X
                            </button>
                        </div>

                    </>
                }
            </div>
            <header className='flex w-full  border-t pt-2 items-center  border-dev_primary-gray-700/50'>
                <div className='flex  w-full gap-2 items-center'>
                    <img className='rounded-full text-dev_primary-white-50' src={author?.avatar} width={24} alt={author?.name} />
                    <span className={`text-xs text-gray-500/80 ${isHighLighted && 'text-[#29292e] font-medium'} `}>{author?.name}</span>
                </div>
                <div className='flex w-full  gap-2 items-end justify-end  '>
                    {children}
                </div>
            </header>

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