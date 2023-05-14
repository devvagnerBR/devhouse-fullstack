import React from 'react'

const Answer = ( { question } ) => {


    return (
        <div className='flex w-full   flex-col '>
            <h1
                className='text-sm   flex-wrap '>

            </h1>
            <h2
                className='text-xs text-gray-500 pb-2 w-full  flex  break-all'>
                {question.answer}
            </h2>
        </div>
    )
}

export default Answer