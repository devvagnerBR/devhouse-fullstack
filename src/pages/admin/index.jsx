import React from 'react'
import logo from '../../assets/images/logo.svg'
import Button from './../../components/Button';
import RoomCode from '../../components/RoomCode';
import Question from '../../components/Question';
import useRoom from '../../hooks/useRoom';
import { useNavigate,useParams } from 'react-router-dom';
import { ref,remove,update,onValue } from 'firebase/database';
import { db } from '../../services/firebase.js';
import { Trash,ChatText,CheckCircle } from '@phosphor-icons/react'
import useGetData from '../../hooks/useGetData';
import { useAuth } from '../../hooks/useAuth';



const AdminRoom = () => {


    const { id } = useParams()
    const navigate = useNavigate()
    const { title,questions } = useRoom( id )
    const room = useGetData( `rooms/${id}` )
    const { user } = useAuth()
    const userRoom = useGetData( `users/${user?.id}/rooms/${id}` )

    const handleDeleteQuestion = async ( questionId ) => {
        if ( window.confirm( 'Tem certeza que deseja excluir essa pergunta?' ) ) {

            const questionRef = ref( db,`rooms/${id}/questions/${questionId}` )
            await remove( questionRef )
                .then( () => console.log( 'Pergunta deletada com sucesso' ) )
        }

    }

    const handleEndRoom = async () => {
        const updates = {};
        const updateUser = {}

        updates[`rooms/${id}/`] = { ...room.data,endedAt: new Date() }
        await update( ref( db ),updates )
            .then( () => {
                console.log( 'Sala encerrada com sucesso' )
                navigate( '/' )
            } )

        updateUser[`users/${user?.id}/rooms/${id}/`] = { ...userRoom.data,endedAt: new Date() }
        await update( ref( db ),updateUser )
            .then( () => console.log( `Sala encerrada com sucesso. e2` ) )


    }

    const handleCheckQuestionAsAnswered = async ( questionId ) => {
        const updates = {};
        let copyQuestions = room.data.questions[questionId]
        copyQuestions.isAnswered = true
        updates[`rooms/${id}/questions/${questionId}`] = copyQuestions
        return await update( ref( db ),updates )
            .then( () => {
                console.log( 'Question Marked as Answered' )
            } )
    }

    const handleHighlightQuestion = async ( questionId ) => {

        const updates = {}
        let copyQuestions = room.data.questions[questionId]
        copyQuestions.isHighlighted = true
        updates[`rooms/${id}/questions/${questionId}`] = copyQuestions
        return await update( ref( db ),updates )
            .then( () => {
                console.log( 'Question Marked as Highlighted' )
            } )
    }

    const handleSaveAnswer = ( question ) => {

        console.log( question )

    }
    return (
        <div className=' flex items-center justify-start flex-col bg-slate-100 scrollbar  '>

            <header className='w-full h-[10%] fixed top-0 bg-slate-50 min-h-[96px] max-sm:flex-col max-sm:p-2 max-sm:min-h-[190px] border-b flex items-center justify-around shadow-sm'>
                <img className='cursor-pointer' onClick={() => navigate( '/' )} src={logo} width={96} alt="" />

                <div className='flex gap-4 max-sm:flex-col h-full items-center justify-center '>
                    <RoomCode />
                    <Button
                        onClick={handleEndRoom}
                        className="border-purple-400 hover:bg-[#FFF] border h-8 rounded-md px-2 text-purple-600 font-normal text-xs max-sm:w-full">
                        Encerrar Sala
                    </Button>
                </div>
            </header>

            <section className=' w-full h-72 flex flex-col items-center justify-start bg-gray-50  mt-[96px] max-sm:mt-[190px]'>

                <div className=' w-[60vw]  max-lg:w-[90vw] h-full pt-4 '>
                    <div className={`flex gap-2 items-center mb-4  ${questions.length === 0 && 'flex-col'} `}>
                        <h1 className='font-Poppins font-semibold'> {title}</h1>
                        {questions.length === 0 ? <p className='w-full text-center text-purple-400 text-sm'>Nenhuma pergunta cadastrada</p> : questions.length > 0 && <h2 className='bg-pink-500 font-Poppins text-xs p-1 px-3 text-slate-100 rounded-lg'>{questions.length} pergunta(s)</h2>}
                    </div>

                    <section className='w-full gap-y-2 mt-8 flex flex-col items-center justify-start last:pb-8'>
                        {questions && questions.map( ( question ) => {

                            return (
                                <Question
                                    question={question}
                                    key={question.id}
                                      

                                >
                                    {!question.isAnswered && (
                                        <>
                                            <button
                                                className={`flex items-center gap-1 `}
                                                onClick={() => handleCheckQuestionAsAnswered( question.id )}
                                                type='button'
                                            >
                                                <CheckCircle className={`  ${question.isAnswered ? 'text-purple-500' : 'text-gray-400'}  ${question.isAnswered && question.isHighLighted && 'text-orange-500'}`} />
                                            </button>
                                            <button
                                                className={`flex items-center gap-1 `}
                                                onClick={() => handleHighlightQuestion( question.id )}
                                                type='button'
                                            >
                                                <ChatText className={` ${question.isHighLighted ? 'text-purple-600' : 'text-gray-400'}  ${question.isAnswered && question.isHighLighted && 'text-orange-500'}`} />
                                            </button>
                                        </>
                                    )

                                    }
                                    <button
                                        className={`flex items-center gap-1 `}
                                        onClick={() => handleDeleteQuestion( question.id )}
                                        type='button'
                                    >
                                        <Trash className='hover:animate-bounce hover:text-red-500 transition-all text-gray-500' />
                                    </button>


                                </Question>
                            )
                        } )}
                    </section>
                </div>

            </section>

        </div>
    )
}

export default AdminRoom