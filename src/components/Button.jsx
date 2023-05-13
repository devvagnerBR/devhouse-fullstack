import React from 'react'

const Button = ( { isOutLined = false,...props } ) => {

    return (
        <button
            className={`w-full max-sm:w-3/4 bg-purple-500  flex h-12 items-center justify-center mt-8 gap-4 rounded hover:bg-purple-600 transition-colors`}
            {...props}
        />
    )
}

export default Button