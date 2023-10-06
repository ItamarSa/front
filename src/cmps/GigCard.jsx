import { GigDescription } from './GigDescription'
import React from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import 'react-image-gallery/styles/css/image-gallery.css'
import fullscreenIcon from '../assets/img/fullscreen.svg'



export function GigCard({ gig, user }) {

    const images = gig.imgs.map(img => ({
        original: img,
        thumbnail: img,
    })
    )

    const customFullscreenButton = (onClick, isFullscreen) => (
        <div className={`custom-fullscreen-button ${isFullscreen ? 'fullscreen-active' : ''}`} onClick={onClick}>
            <img
                src={fullscreenIcon}
                alt="Fullscreen Icon"
                className="fullscreen-icon"
                width="16"
                height="16"
            />
            {isFullscreen ? 'Exit Fullscreen' : 'Full Screen'}
        </div>
    )

    return (
        <div className='gig-card'>
            <h1>{gig.title}</h1>
            <div className="mini-user">
                <img className='user-img' src={user.imgUrl} alt='user-img' />
                <div className='seller-details'>
                    <h4>{gig.name} <span>{user.store}</span></h4>
                    <h4>⭐{gig.rate}(reviews.length)</h4>
                </div>
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