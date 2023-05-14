import React from 'react'
import { Navigate,useNavigate,useParams } from 'react-router-dom'
import logo from '../../assets/images/devhouse_logo.svg'
import Button from './../../components/Button';
import RoomCode from '../../components/RoomCode';
import { useAuth } from './../../hooks/useAuth';
import { onValue,ref,remove,set } from 'firebase/database';
import { db } from '../../services/firebase';
import idGenerate from '../../services/id_generate';
import Question from '../../components/Question';
import useRoom from '../../hooks/useRoom';
import { ThumbsUp } from '@phosphor-icons/react'
import { Helmet } from 'react-helmet';
import useValidateRoom from '../../hooks/useValidateRoom';
import useGetData from '../../hooks/useGetData';



const Room = () => {


    const { id } = useParams()
    const { status } = useValidateRoom( id )
    const { sigInWithGoogle,user } = useAuth()
    const room = useGetData( `rooms/${id}` )
    const navigate = useNavigate()
    const { title,questions } = useRoom( id )
    const [newQuestion,setNewQuestion] = React.useState( '' )
    const [animationIcon,setAnimationIcon] = React.useState( false )



    const handleSendQuestion = async ( event ) => {
        event.preventDefault()

        if ( newQuestion.trim() === '' ) return
        if ( !user ) throw new Error( 'You must be logged in' )

        const question = {

            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        }


        await set( ref( db,`rooms/${id}/questions/${idGenerate()}` ),question )
        setNewQuestion( '' )
        console.log( 'question created successfully' )

    }


    const handleLike = async ( question,likeId ) => {

        setAnimationIcon( question )
        setTimeout( () => {
            setAnimationIcon( false )
        },1000 )

        if ( likeId ) {

            const questionRef = ref( db,`rooms/${id}/questions/${question}/likes/${likeId}` )
            await remove( questionRef ).then( () => console.log( 'deslike com sucesso' ) )

        } else {

            await set( ref( db,`rooms/${id}/questions/${question}/likes/${idGenerate()}` ),{
                authorId: user?.id

            } )
        }
    }


    const handleLogin = async () => {

        if ( !user ) await sigInWithGoogle()
        window.location.reload()

    }



    if ( !status ) return <p>Carregando sala</p>
    return (

        <div className=' flex items-center justify-start flex-col bg-dev_primary-gray-900'>
            {title && <Helmet>
                <title>Sala: {title && title}</title>
                <meta name='description' content='Página de administração da sala' />
            </Helmet>}

            <header className='flex w-full max-1xs:flex-col items-center justify-evenly max-md:flex-col    '>

                <div className=' max-xs:mt-12 h-24 p-2 '>
                    <img
                        onClick={() => navigate( '/' )}
                        src={logo}
                        width={160}
                        alt=""
                        className='cursor-pointer' />
                </div>

                <RoomCode />

            </header>

            <section className=' w-full h-72 flex flex-col items-center justify-start bg-dev_primary-gray-900 mt-[12px]  '>

                <div className=' w-[60vw]  max-lg:w-[90vw] h-full pt-4 '>
                    <div className='flex gap-2 items-center mb-4'>
                        <h1 className=' text-dev_primary-gray-400 tracking-wide font-normal'> {title}</h1>
                        {questions?.length > 0 &&
                            <h2 className='bg-dev_primary-green font-FiraCode  text-xs p-1 px-3 text-slate-100 rounded-lg'>{questions?.length} pergunta(s)
                            </h2>}
                    </div>
                    <form onSubmit={handleSendQuestion}>

                        <textarea
                            className='w-full rounded-md flex bg-dev_primary-gray-700  outline-none text-dev_primary-white-50 font-FiraCode p-2 max-sm:gap-4 text-sm max-h-[160px] min-h-[160px] placeholder:text-dev_primary-white-50'
                            placeholder='O que você quer perguntar?'
                            onChange={( { target } ) => setNewQuestion( target.value )}
                            value={newQuestion}
                        />

                        <div className='flex justify-between mt-2 items-center  max-sm:pt-2 ' >
                            {user ?
                                <div className='flex items-center gap-3'>
                                    {user?.avatar && <img className='rounded-full shadow-md' width={26} src={user?.avatar} alt="#" />}
                                    <p className='text-xs text-dev_primary-gray-400 font-medium'>{user?.name}</p>
                                </div> :
                                <p className='text-sm max-sm:text-xs'>Para enviar uma perguntas <span onClick={handleLogin} className='text-purple-500  cursor-pointer underline'>faça seu login</span> </p>
                            }
                            <Button disabled={!user} type='submit' className='bg-dev_primary-green h-10  rounded-md text-slate-200  text-sm min-w-[144px] w-36'>Enviar pergunta
                            </Button>
                        </div>
                    </form>

                    <section className='w-full gap-y-2 mt-8 flex  flex-col items-center justify-start last:pb-8 '>
                        {questions && questions.map( ( question ) => {

                            return (
                                <Question
                                    room={room.data}
                                    question={question}
                                    key={question.id}
                                    isAdminRoom={false}
                                    page={'room'}
                                >
                                    {!question.isAnswered && (
                                        <button
                                            onClick={() => handleLike( question?.id,question?.likeId )}
                                            className={`flex items-center justify-start text-dev_primary-gray-700 gap-2 `}
                                            aria-label='Marcar como gostei'
                                            type='button'>
                                            {question.likeCount > 0 && <span className='text-xs text-dev_primary-gray-400'>{question.likeCount}</span>}
                                            <ThumbsUp
                                                className={` ${animationIcon === question?.id && 'animate-spin text-dev_primary-green'} ${question?.likeCount && 'text-dev_primary-green'} `}
                                            />
                                        </button>
                                    )}

                                </Question>
                            )
                        } )}
                    </section>
                </div>

            </section>

        </div>
    )
}

export default Room