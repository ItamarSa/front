import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/colin-2x.jpg'
import { CHANGE_COUNT } from '../store/reducer/user.reducer'
import { PopularServiceCarousel } from '../cmps/PopularServiceCarousel'


export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff)
        dispatch({ type: CHANGE_COUNT, diff })
    }

    const sponsors = [
        {
            imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png',
            altTxt: 'Meta'
        },
        {
            imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png',
            altTxt: 'Google'
        },
        {
            imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png',
            altTxt: 'Netflix'
        },
        {
            imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png',
            altTxt: 'P&G'
        },
        {
            imgSrc: 'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png',
            altTxt: 'PayPAl'
        }
    ]

    return (
        <>    <section className='full'>
            <img src={logo} alt='Logo' />
            <div className='sponsor'>
                <ul><span className='sponsor-title'>Trusted by:</span>
                        {sponsors.map((sponsor) => (
                        <li><img src={sponsor.imgSrc} alt={sponsor.altTxt} className='sponsor-img' /></li>
                    ))}
                </ul>
            </div>
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