import React from 'react'
import { AuthContext } from '../contexts/auth_context'


export const useAuth = () => {
    const value = React.useContext( AuthContext )
    return value
}
