import { GigDescription } from './GigDescription'
import React from 'react'
import { GalleryCarousel } from './GalleryCarousel'


export function GigCard({ gig, starSymbol, scrollToReviews }) {

    return (
        <div className='gig-card'>
            <h3 className='title'>{gig.title}</h3>
            <div className='user-review'>
                <div className='review flex-space-between'>
                    <div className='all flex'>
                        <div className="mini-user flex-align-center">
                            <div className='seller-details flex-align-center'>
                                <div className='img flex'>
                                    <img className='user-img' src={gig.sellerUrl} alt='user-img' />
                                </div>
                            </div>
                        </div>
                        <div className='user-info'>
                                <div className='name flex align-center'>
                                    <div className='owner'>
                                        {gig.name}{'   '}
                                    </div>
                                    <div className='store'> {gig.owner.store}</div>

                                </div>
                                <div className='rate flex'>
                                    <div className='star'>
                                       <span> {starSymbol}</span>
                                    </div>
                                    <b  className='rating-score' >{gig.rate + " "}</b>
                                    <div className='review'>
                                        ({gig.reviews})
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
                <GalleryCarousel
                gig={gig}/>
            </div>

            <div className='mini-review'>
                <h2>What people loved about this seller</h2>
                <button onClick={scrollToReviews}>See all reviews</button>
            </div>
            <div className='details-mini-review'> {/*add mini reviews*/} </div> <br /><br />
            <GigDescription gig={gig} />
        </div>
    )
}