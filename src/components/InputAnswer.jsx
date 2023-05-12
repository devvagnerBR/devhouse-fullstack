import React from 'react'

const Answer = ( { question } ) => {


    return (
        <>
            <h1 className='text-sm text-purple-500'>Resposta:</h1>
            <h2
                className='text-xs text-gray-500 pt-2'>
                {question.answer}
            </h2>
        </>
    )
}

export default Answer