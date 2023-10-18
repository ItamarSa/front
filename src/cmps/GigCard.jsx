import { GigDescription } from './GigDescription'
import React from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import 'react-image-gallery/styles/css/image-gallery.css'
import fullscreenIcon from '../assets/img/fullscreen.svg'
import { utilService } from '../services/util.service'



export function GigCard({ gig, user, starSymbol}) {

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

    const randomValue = utilService.getRandomIntInclusive(50, 250);
    return (
        <div className='gig-card'>
            <br />
            <h3>{gig.title}</h3>
            <br />
            <div className="mini-user">
            <img className='user-img' src={gig.owner.imgUrl} alt='user-img' />
                <div className='seller-details'>
                    <h4>{gig.owner.username} <span>{user.store}</span></h4>
                    <br />
                    <h4>{starSymbol}{gig.rate+" "}({randomValue})</h4>
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