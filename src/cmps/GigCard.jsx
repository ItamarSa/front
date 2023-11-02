import { GigDescription } from './GigDescription'
import React from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import 'react-image-gallery/styles/css/image-gallery.css'
import fullscreenIcon from '../assets/img/fullscreen.svg'
import { utilService } from '../services/util.service'



export function GigCard({ gig, starSymbol }) {
    // Ensure that gig.imgUrl is an array, or provide a default empty array
    const images = Array.isArray(gig.imgUrl)
        ? gig.imgUrl.map((img) => ({
            original: img,
            thumbnail: img,
        }))
        : []

    const customFullscreenButton = (onClick, isFullscreen) => (
        <div className={`custom-fullscreen-button ${isFullscreen ? 'fullscreen-active' : ''}`} onClick={onClick}>
            <img
                src={fullscreenIcon}
                alt="Fullscreen Icon"
                className="fullscreen-icon"
                width="16"
                height="32"
            />
            {isFullscreen ? 'Exit Fullscreen' : 'Full Screen'}
        </div>
    )

    return (
        <div className='gig-card'>
            <h3 className='title'>{gig.title}</h3>
            <div className='user-review'>
                <div className='review flex-space-between'>
                    <div className='all flex'>
                        <div className="mini-user flex-align-center">
                            <div className='seller-details flex-align-center'>
                                <div className='img flex'>
                                    <img className='user-img' src={gig.owner.imgUrl} alt='user-img' />
                                </div>
                            </div>
                        </div>
                        <div className='user-info'>
                                <div className='name flex align-center'>
                                    <div className='owner'>
                                        {gig.owner.username}{'   '}
                                    </div>
                                    <div className='store'> {gig.owner.store}</div>

                                </div>
                                <div className='rate flex'>
                                    <div className='star'>
                                       <span> {starSymbol}</span>
                                    </div>
                                    <b  className='rating-score' >{gig.rate + " "}</b>
                                    <div className='review'>
                                        ({gig.owner.reviews})
                                    </div>
                                    <div className='line'>{'|'}</div>
                                    <div className='queue'>
                                        {' ' + gig.owner.queue + ' Orders in Queue'}
                                    </div>
                                </div>
                        </div>
                    </div>
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
                <button href=''>See all reviews</button>
            </div>
            <div className='details-mini-review'> add mini reviews </div> <br /><br />
            <GigDescription gig={gig} />
        </div>
    )
}