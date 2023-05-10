import React from 'react'

const Button = ( props ) => {

    return (
        <button
            className='w-full bg-purple-500 flex h-12 items-center justify-center mt-8 gap-4 rounded hover:bg-purple-600 transition-colors'
        {...props} />
    )
}

export default Button