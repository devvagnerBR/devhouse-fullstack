import React from 'react'
import userRequests from '../api/use_requests'
export const AuthContext = React.createContext( '' )


const AuthContextProvider = ( { children } ) => {


    const { sigInWithGoogle,user,setUser,checkForUpdate } = userRequests()

    React.useEffect( () => {
        checkForUpdate()

        return () => {
            checkForUpdate()
        }

    },[] )
    
    return (
        <AuthContext.Provider value={{ sigInWithGoogle,user,setUser,checkForUpdate }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider