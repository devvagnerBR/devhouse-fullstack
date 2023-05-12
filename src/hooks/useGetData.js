import React from 'react'
import { onValue,ref } from 'firebase/database'
import { db } from '../services/firebase'

const useGetData = ( path ) => {

    const [data,setData] = React.useState( [] )

    React.useEffect( () => {

        const getData = async () => {

            const refData = ref( db,`${path}` );
            onValue( refData,( snapshot ) => {
                const result = snapshot.val()
                setData( result )
            } )

        }

        getData()

    },[path] )

    return { data }
}

export default useGetData;