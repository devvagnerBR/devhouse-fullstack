import React from 'react'
import { useParams } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import Button from './../../components/Button';
import RoomCode from '../../components/RoomCode';
import { useAuth } from './../../hooks/useAuth';
import { onValue,ref,remove,set } from 'firebase/database';
import { db } from '../../services/firebase';
import idGenerate from '../../services/id_generate';
import Question from '../../components/Question';
import useRoom from '../../hooks/useRoom';
import { ThumbsUp } from '@phosphor-icons/react'



const Room = () => {


    const { id } = useParams()
    const { user } = useAuth()
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


    return (
        <div className=' flex items-center justify-start flex-col    bg-slate-100        '>

            <header className='w-full h-[10%] fixed top-0 bg-slate-50 min-h-[96px] max-sm:flex-col max-sm:p-2 max-sm:min-h-[120px] border-b flex items-center justify-around shadow-sm'>
                <img src={logo} width={96} alt="" />

                <RoomCode />
            </header>

            <section className=' w-full h-72 flex flex-col items-center justify-start bg-gray-50  mt-[96px] max-sm:mt-[120px] '>

                <div className=' w-[60vw]  max-lg:w-[90vw] h-full pt-4 '>
                    <div className='flex gap-2 items-center mb-4'>
                        <h1 className='font-Poppins font-semibold'>{title}</h1>
                        {questions?.length > 0 && <h2 className='bg-pink-500 font-Poppins text-xs p-1 px-3 text-slate-100 rounded-lg'>{questions?.length} pergunta(s)</h2>}
                    </div>
                    <form onSubmit={handleSendQuestion}>

                        <textarea
                            className='w-full rounded-md flex  outline-none text-gray-600 p-2 max-sm:gap-4 text-sm max-h-[160px] min-h-[160px]'
                            placeholder='O que você quer perguntar?'
                            onChange={( { target } ) => setNewQuestion( target.value )}
                            value={newQuestion}
                        />

                        <div className='flex justify-between mt-2 items-center  max-sm:pt-2 ' >
                            {user ?
                                <div className='flex items-center gap-1'>
                                    {user?.avatar && <img className='rounded-full shadow-md' width={26} src={user?.avatar} alt="#" />}
                                    <p className='text-xs font-medium'>{user?.name}</p>
                                </div> :
                                <p className='text-sm max-sm:text-xs'>Para enviar uma perguntas <span className='text-purple-500  cursor-pointer underline'>faça seu login</span> </p>
                            }
                            <Button disabled={!user} type='submit' className='bg-violet-500 h-10  rounded-md text-slate-200  text-sm min-w-[144px] w-36'>Enviar pergunta
                            </Button>
                        </div>
                    </form>

                    <section className='w-full gap-y-2 mt-8 flex flex-col items-center justify-start last:pb-8 '>
                        {questions && questions.map( ( question ) => {


                            return (
                                <Question
                                    question={question}
                                    key={question.id}
                                >
                                    <button
                                        onClick={() => handleLike( question?.id,question?.likeId )}
                                        className={`flex items-center gap-1 `}
                                        aria-label='Marcar como gostei'
                                        type='button'>
                                        {question.likeCount > 0 && <span className='text-xs'>{question.likeCount}</span>}
                                        <ThumbsUp className={` ${animationIcon === question?.id && 'animate-spin text-purple-600'} ${question?.likeCount && 'text-purple-600'} `} />
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

export default Room