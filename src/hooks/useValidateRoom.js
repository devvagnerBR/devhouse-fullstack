import React from 'react'
import useGetData from './useGetData';
import { useNavigate,useParams } from 'react-router-dom';
import { onValue,ref } from 'firebase/database';
import { db } from '../services/firebase';

const useValidateRoom = ( path ) => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [status,setStatus] = React.useState( false )
    React.useEffect( () => {

        const getRoom = async () => {
            const roomRef = ref( db,`rooms/${path}` );
            onValue( roomRef,( snapshot ) => {

                const data = snapshot.exists();
                if ( !data ) {
                    setStatus( data )
                    navigate( '/sala-nao-encontrada' )
                } else {
                    setStatus( data )
                }
            } )
        }

        getRoom()




    },[path,id] )

    return { status }

}

export default useValidateRoom