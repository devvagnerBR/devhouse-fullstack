import React from 'react'

const Question = ( { question } ) => {

    const { author,content,id,isAnswered,isHighLighted } = question

    return (
        <div className='w-full flex  bg-white  rounded-md  justify-between flex-col p-4'>

            <p className='text-sm'>{content}</p>

            <footer className='flex w-full pt-4'>
                <div className='flex  w-full gap-2 items-center'>
                    <img className='rounded-full' src={author.avatar} width={26} alt={author.name} />
                    <span className='text-xs text-gray-500/80'>{author.name}</span>
                </div>
                <div>
                    
                </div>
            </footer>
        </div>
    )
}

export default Question