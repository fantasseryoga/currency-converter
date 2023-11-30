import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'


export const useRoutes = () => {

    return (
        <Routes>
            <Route exact path="/" element={<HomePage />} />
        </Routes>
    )
}