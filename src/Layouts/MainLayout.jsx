import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <div className='h-[100vh] flex items-center justify-center bg-gray-700'>
            <Outlet />
        </div>
    )
}
