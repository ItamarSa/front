import { GigDescription } from './GigDescription'
// import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

import React from 'react'
import ReactDOM from 'react-dom'

import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import 'react-image-gallery/styles/css/image-gallery.css'



export function GigCard({ gig }) {

    const images = gig.imgs.map(img =>({
        original:img,
        thumbnail:img,
    })
    )


    return (
        <div className='gig-card'>
            <h1>{gig.title}</h1>
            <div className='seller-details'>
                <h3>{gig.name} @user.unknown</h3>
                <h3>⭐{gig.rate}(reviews.length)</h3>
            </div>
            <div className='details-gallery'>
                <ImageGallery items={images} />
            </div>

            <div className='mini-review'>
                <h2>What people loved about this seller</h2>
                <a href=''>See all reviews</a>
            </div>
            <div className='details-mini-review'> add mini reviews </div>
            <p className='gig-description'>gig.description</p>
            {/* <GigDescription gig={gig} /> */}
        </div>
    )
}