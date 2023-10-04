import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/colin-2x.jpg'
import { CHANGE_COUNT } from '../store/reducer/user.reducer'

import { utilService } from '../services/util.service'
import { PopularServiceCarousel } from '../cmps/PopularServiceCarousel'


export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff);
        dispatch({ type: CHANGE_COUNT, diff })
    }

    return (
        <>    <section>
            <img src={logo} alt="Logo" style={{ maxWidth: '900px' }} />
            {/* <h2>
                Count {count}
                <button onClick={() => {
                    changeCount(1)
                }}>+</button>
                <button onClick={() => {
                    changeCount(10)
                }}>+10</button>
            </h2 > */}
        </section >
        <PopularServiceCarousel />
        </>

    )
}