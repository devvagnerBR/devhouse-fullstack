import React from "react";
import { db } from "../services/firebase";
import { onValue,ref } from "firebase/database";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";

const useRoom = ( roomId ) => {

    const { user } = useAuth()
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
                        content: value?.content,
                        author: value?.author,
                        isHighLighted: value?.isHighlighted,
                        isAnswered: value?.isAnswered,
                        likeCount: Object.values( value?.likes ?? {} ).length,
                        likeId: Object.entries( value?.likes ?? {} ).find( ( [key,like] ) => like.authorId === user?.id )?.[0]
                    }
                } )


                setTitle( data?.title )
                setQuestions( parsedQuestions );

            } )

        }

        getRoom()


        // return () => getRoom()

    },[roomId,user?.id] )


    return { questions,title }
}


export default useRoom;
