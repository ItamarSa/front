import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserDetails } from './pages/UserDetails'
import { LoginSignup } from './cmps/LoginSignup'
import { GigIndex } from './pages/GigIndex'
import { GigEdit } from './cmps/GigEdit'
import { GigDetails } from './pages/GigDetails'
import { HomePage } from './pages/HomePage'
import { UserMsg } from './cmps/UserMsg'

export function RootCmp() {

    return (
        <div className='main-container '>
            <AppHeader />
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="/" element={<HomePage />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route element={<LoginSignup />} path="/login" />
                    <Route element={<GigEdit />} path="/edit" />
                    <Route element={<GigEdit />} path="/edit/:gigId" />
                    <Route element={<GigIndex />} path="/gigs" />
                    <Route element={<GigDetails />} path="/gig/:gigId" />


                </Routes>
            </main>
            <AppFooter />
            <UserMsg/>
        </div>
    )
}


