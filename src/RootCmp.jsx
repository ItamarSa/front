import React, { useEffect, useState } from 'react'
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
import { GigOrder } from './pages/GigOrder'
import { GigPayment } from './pages/GigPayment'
import { Provider, useSelector } from 'react-redux'
import { store } from './store/store'
import { ModalProvider } from './cmps/ModalProvider'
import { MobileFooter } from './cmps/MobileFooter'
import { CategoriesCmp } from './cmps/CategoriesCmp'
import { MobileHeader } from './cmps/MobileHeader'
import { loadGigs, setGigFilter } from './store/action/gig.actions'
import { showErrorMsg } from './services/event-bus.service'

export function RootCmp() {
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const [filter, setFilter] = useState(filterBy)
    console.log('filterBy:', filterBy)
    console.log('filter:', filter)

    useEffect(() => {
      
        setGigFilter( filter )
    }, [filter])
    
      useEffect(() => {
        try {
          loadGigs()
    
        } catch (err) {
          console.log('err:', err)
          showErrorMsg('Cannot load gigs')
        }
      }, [])

    function handleFilterChange(value, location) {
        if (location === "tags") {
            const filterToUpdate = { ...filter, tags: value }
            setFilter(filterToUpdate)
        }
        else {
            const filterToUpdate = { ...filter, txt: value }
            setFilter(filterToUpdate)
        }
    }


    return (
        <Provider store={store}>
            <div className='main-container full '>
                <ModalProvider>
                    <MobileHeader />
                    <AppHeader />
                    {/* <main className='full'> */}
                    <UserMsg />
                    <Routes>
                        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                        <Route path='/' element={<HomePage />} />
                        <Route path='user/:id' element={<UserDetails />} />
                        <Route element={<LoginSignup />} path='/login' />
                        <Route element={<GigEdit />} path='/edit' />
                        <Route element={<GigEdit />} path='/edit/:gigId' />
                        <Route element={<GigIndex />} path='/gigs/:tag' />
                        <Route element={<GigIndex />} path='/gigs' />
                        <Route element={<GigPayment />} path='/gig/:gigId/payment' />
                        <Route element={<GigOrder />} path='/gig/:gigId/order' />
                        <Route element={<GigDetails />} path='/gig/:gigId' />
                        <Route element={<CategoriesCmp  handleFilterChange={handleFilterChange} />} path='/gig/category' />
                    </Routes>
                    {/* </main> */}
                    <AppFooter />
                    <MobileFooter />
                </ModalProvider>

            </div>
        </Provider>
    )
}


