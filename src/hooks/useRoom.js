import React from "react";
import { db } from "../services/firebase";
import { onValue,ref } from "firebase/database";
import { useParams } from "react-router-dom";

const useRoom = ( roomId ) => {

    const [title,setTitle] = React.useState( '' )
    const [questions,setQuestions] = React.useState( [] )


    React.useEffect( () => {

        const getRoom = async () => {
            const roomRef = ref( db,`rooms/${roomId}` );
            onValue( roomRef,( res ) => {
                const data = res.val();
                const parsedQuestions = Object.entries( data?.questions ).map( ( [key,value] ) => {
                    return {
                        id: key,
                        content: value.content,
                        author: value.author,
                        isHighLighted: value.isHighLighted,
                        isAnswered: value.isAnswered,
                    }
                } )
                setTitle( data?.title )
                setQuestions( parsedQuestions );

            } )

        }
        getRoom()
    },[roomId] )


    return { questions,title }
}


export default useRoom;
