import React from 'react'

const Question = ( { question,children } ) => {

    const { author,content,id,isAnswered = false,isHighLighted = false } = question


    return (
        <div
            className={`w-full flex  bg-white border ${isHighLighted && 'border-purple-500 shadow-sm bg-[#F4F0FF]'} ${isAnswered && 'bg-gray-400/20 shadow-sm'}  rounded-md   justify-between  flex-col p-4`}>

            <p className='text-sm'>{content}</p>

            <footer className='flex w-full pt-4'>
                <div className='flex  w-full gap-2 items-center'>
                    <img className='rounded-full' src={author.avatar} width={26} alt={author.name} />
                    <span className={`text-xs text-gray-500/80 ${isHighLighted && 'text-[#29292e] font-medium'} `}>{author.name}</span>
                </div>
                <div className='flex items-center justify-center gap-2'>
                    {children}
                </div>
            </footer>
        </div>
    )
}

export default Question