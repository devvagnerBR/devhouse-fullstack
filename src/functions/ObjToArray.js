const convertObjInArray = ( path ) => {

    const ref = path
    const obj = ref && Array.from( Object.values( ref ) )
    return obj
}

export default convertObjInArray