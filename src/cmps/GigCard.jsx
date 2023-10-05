import { GigDescription } from './GigDescription'
import React from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import 'react-image-gallery/styles/css/image-gallery.css'

const symbol = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 2H6V0H0V6H2V2Z"/><path d="M10 0V2H14V6H16V0H10Z"/><path d="M14 14H10V16H16V10H14V14Z"/><path d="M2 10H0V16H6V14H2V10Z"/></svg>


export function GigCard({ gig }) {

    const images = gig.imgs.map(img =>({
        original:img,
        thumbnail:img,
    })
    )

    const customFullscreenButton = (onClick, isFullscreen) => (
        <div className={`custom-fullscreen-button ${isFullscreen ? 'fullscreen-active' : ''}`} onClick={onClick}>
          {isFullscreen ? 'Exit Fullscreen' : `${symbol} Full Screen`}
        </div>
      )

    return (
        <div className='gig-card'>
            <h1>{gig.title}</h1>
            <div className='seller-details'>
                <h3>{gig.name} @user.unknown</h3>
                <h3>⭐{gig.rate}(reviews.length)</h3>
            </div>
            <div className='details-gallery'>
                <ImageGallery 
                items={images} 
                showPlayButton={false}
                renderFullscreenButton={customFullscreenButton}
                />
            </div>

            <div className='mini-review'>
                <h2>What people loved about this seller</h2>
                <a href=''>See all reviews</a>
            </div>
            <div className='details-mini-review'> add mini reviews </div>
            <p className='gig-description'>gig.description</p>
            <GigDescription gig={gig} />
        </div>
    )
}