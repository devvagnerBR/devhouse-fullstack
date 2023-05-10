import React from "react"
import { auth } from "../services/firebase"
import { GoogleAuthProvider,onAuthStateChanged,signInWithPopup } from "firebase/auth"

const userRequests = () => {

    const [user,setUser] = React.useState( null )

    const sigInWithGoogle = async () => {

        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup( auth,provider );

        if ( result.user ) {
            const { displayName,photoURL,uid } = result.user
            if ( !displayName,!photoURL ) {
                throw new Error( 'Missing information from Google Account' )
            }

            setUser( { id: uid,name: displayName,avatar: photoURL } )
        }

    }


    const checkForUpdate = async () => {

        onAuthStateChanged( auth,( user ) => {
            if ( user ) {
                const { displayName,photoURL,uid } = user
                if ( !displayName,!photoURL ) {
                    throw new Error( 'Missing information from Google Account' )
                }
                setUser( { id: uid,name: displayName,avatar: photoURL } )
            }
        } )

    }
    return { sigInWithGoogle,user,setUser,checkForUpdate }

}


export default userRequests