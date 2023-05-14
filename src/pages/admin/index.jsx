import React from 'react'
import logo from '../../assets/images//devhouse_logo.svg'
import Button from './../../components/Button';
import RoomCode from '../../components/RoomCode';
import Question from '../../components/Question';
import useRoom from '../../hooks/useRoom';
import { useNavigate,useParams } from 'react-router-dom';
import { ref,remove,update,onValue } from 'firebase/database';
import { db } from '../../services/firebase.js';
import { Trash,Star,CheckCircle } from '@phosphor-icons/react'
import useGetData from '../../hooks/useGetData';
import { useAuth } from '../../hooks/useAuth';
import { Helmet } from 'react-helmet';
import useAdminPageProtected from '../../hooks/useAdminPageProtected';
import useValidateRoom from '../../hooks/useValidateRoom';



const AdminRoom = () => {


    const { id } = useParams()
    const navigate = useNavigate()
    const { status } = useValidateRoom( id )
    const { title,questions } = useRoom( id )
    const room = useGetData( `rooms/${id}` )
    const { user } = useAuth()
    const userRoom = useGetData( `users/${user?.id}/rooms/${id}` )
    useAdminPageProtected( room )

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



    if ( !status ) return <p>Carregando sala</p>
    return (
        <div className=' w-100dvw h-100dvh bg-dev_primary-gray-900 p-4'>
            <Helmet>
                <title>Sala: {title}</title>
                <meta name='description' content='Página de administração da sala' />
            </Helmet>

            <header className='flex w-full max-1xs:flex-col max-1xs:justify-center items-center max-md:flex-col  justify-evenly '>

                <div className=' max-xs:mt-12 h-24 p-2'>

                    <img
                        className='cursor-pointer  '
                        onClick={() => navigate( '/' )}
                        src={logo}
                        width={160}
                        alt=""
                    />

                </div>

                <div className='flex gap-3 items-center max-md:flex-col  max-md:w-3/4 justify-center '>
                    <RoomCode />
                    <Button
                        onClick={handleEndRoom}
                        className="border-dev_primary-green w-28 text-dev_primary-gray-700 hover:bg-[#FFF] border h-8 rounded-md   px-2 font-normal text-xs  max-md:w-[90vw]">
                        Encerrar Sala
                    </Button>
                </div>
            </header>




            <section className=' w-full h-72 flex flex-col items-center justify-start   mt-[36px] max-sm:mt-[30px]'>

                <div className=' w-[60vw]  max-lg:w-[90vw] h-full pt-4 '>
                    <div className={`flex gap-2 items-center mb-4  ${questions.length === 0 && 'flex-col'} `}>
                        <h1 className=' text-dev_primary-gray-400 tracking-wide font-normal'> {title}</h1>
                        {questions.length === 0 ? <p className='w-full text-center text-purple-400 text-sm'>Nenhuma pergunta cadastrada</p> : questions.length > 0 && <h2 className='bg-dev_primary-green font-FiraCode  text-xs p-1 px-3 text-slate-100 rounded-lg'>{questions.length} pergunta(s)</h2>}
                    </div>

                    <section className='w-full gap-y-2 mt-4 flex flex-col items-center justify-center '>
                        {questions && questions.map( ( question ) => {

                            return (
                                <Question
                                    question={question}
                                    key={question.id}
                                    room={room.data}
                                    user={user}
                                    isAdminRoom={true}
                                >
                                    {!question.isAnswered && (
                                        <>
                                            <button
                                                title='Marcar como já respondida'
                                                className={`flex items-center gap-1 `}
                                                onClick={() => handleCheckQuestionAsAnswered( question.id )}
                                                type='button'
                                            >
                                                <CheckCircle className={`  ${question.isAnswered ? 'text-dev_primary-green' : 'text-gray-400'}  ${question.isAnswered && question.isHighLighted && 'text-orange-500'}`} />
                                            </button>
                                            <button
                                                title='Destacar essa pergunta'
                                                className={`flex items-center gap-1`}
                                                onClick={() => handleHighlightQuestion( question.id )}
                                                type='button'
                                            >
                                                <Star className={` ${question.isHighLighted ? 'text-dev_primary-green' : 'text-gray-400'}  ${question.isAnswered && question.isHighLighted && 'text-orange-500'}`} />
                                            </button>
                                        </>
                                    )

                                    }
                                    <button
                                        className={`flex items-center gap-1 `}
                                        onClick={() => handleDeleteQuestion( question.id )}
                                        type='button'
                                        title='excluir essa pergunta'
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