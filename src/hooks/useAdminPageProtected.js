import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'

const useAdminPageProtected = ( room ) => {

    const { user } = useAuth()
    const navigate = useNavigate()
    React.useEffect( () => {

        const validateAsAdmin = async () => {

            const userId = await user?.id
            const authorId = await room?.data?.authorId
            if ( userId && authorId ) {
                if ( authorId !== userId ) {
                    navigate( '/' );
                }
            }


        }



        validateAsAdmin()
    },[room] )

}

export default useAdminPageProtected