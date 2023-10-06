import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_COUNT } from '../store/reducer/user.reducer'
import { PopularServiceCarousel } from '../cmps/PopularServiceCarousel'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


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

    const mainImg = [
        {
            imgSrc: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616493/colin-2x.jpg',
            altTxt: 'Colin Img'
        },
        {
            imgSrc: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616493/jordan-2x.jpg',
            altTxt: 'Jordan Img '
        },
        {
            imgSrc: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616497/christina-2x.jpg',
            altTxt: 'Christina Img'
        }, {
            imgSrc: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/scarlett-2x.jpg',
            altTxt: 'Scarlet Img'
        }, {
            imgSrc: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/jenny-2x.jpg',
            altTxt: 'Jenny Img'
        }
    ]

    const settings = {
        autoplaySpeed: 4000,
        autoplay: true,
        arrows: false,
        fade: true,
        speed: 700
    }
    let slider

    return (
        <>
            <section className='full'>
                <Slider {...settings} ref={(c) => (slider = c)}>
                    {mainImg.map((img) => (
                        <div key={img.altTxt} className="main-img-container">
                            <img src={img.imgSrc} alt={img.altTxt} />
                            <div className="img-title-overlay">
                                <div className="content-container">
                                    <h1 className="img-title">Find the right <i>freelance</i><br />service, right away</h1>
                                    <form className='search-form'>
                                        <div className="search-input-container">
                                            <input type="text" className="search-input" placeholder="Search for any services..." value='' />
                                            <button className='btn-search'><i className="fa-solid fa-magnifying-glass search-icon"></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className='sponsor'>
                    <ul><span className='sponsor-title'>Trusted by:</span>
                        {sponsors.map((sponsor,index) => (
                            <li key={index}><img src={sponsor.imgSrc} alt={sponsor.altTxt} /></li>
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