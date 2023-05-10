import { v4 as uuidv4 } from 'uuid'


const idGenerate = () => {

    const id = uuidv4()
    return id

}

export default idGenerate