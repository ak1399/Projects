import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import TaskList from './Task'


const Routing = () => {
    return (
        <>

           
                <Routes>
                    <Route   path="/" element={<TaskList />} />
              
                </Routes>
        




        </>
    )
}

export default Routing