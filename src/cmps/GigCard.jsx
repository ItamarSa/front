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
                height="16"
            />
            {isFullscreen ? 'Exit Fullscreen' : 'Full Screen'}
        </div>
    )

    const randomValue = utilService.getRandomIntInclusive(50, 250);
    return (
        <div className='gig-card'>
            <br />
            <h3 className='title'>{gig.title}</h3>
            <br />
            <div className='user-review'>
                <div className='review'>
                    <div className='all'>
                        <div className="mini-user">
                            <div className='seller-details'>
                                <div className='img'>
                                    <img className='user-img' src={gig.owner.imgUrl} alt='user-img' />
                                </div>
                            </div>
                        </div>
                        <div className='user-info'>
                            <div className="infor">
                                <div className='name'>
                                    <div className='owner'>
                                        {gig.owner.username}{'   '}
                                    </div>
                                    <div className='store'> {gig.owner.store}</div>

                                </div>
                                <div className='rate'>
                                    <div className='star'>
                                       <span> {starSymbol}</span>
                                    </div>
                                    <b  className='rating-score' >{gig.rate + " "}</b>
                                    <div className='review'>
                                        ({gig.owner.reviews})
                                    </div>
                                    <div
                                     className='line'>{'|'}
                                      </div>
                                    <div className='queue'>
                                        {' ' + gig.owner.queue + ' Orders in Queue'}
                                    </div>
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
                <a href=''>See all reviews</a>
            </div>
            <div className='details-mini-review'> add mini reviews </div>
            <p className='gig-description'>gig.description</p>
            <GigDescription gig={gig} />
        </div>
    )
}