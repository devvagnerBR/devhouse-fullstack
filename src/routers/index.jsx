import React from 'react'
import  {BrowserRouter,Routes, Route} from "react-router-dom"
import Homepage from '../pages/homepage'
import NewRoom from '../pages/new_room'

const RouterConfig = () => {
  return (
    
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Homepage />} /> 
        <Route path='/nova-sala' element={<NewRoom />} /> 
    </Routes>
    </BrowserRouter>
  )
}

export default RouterConfig