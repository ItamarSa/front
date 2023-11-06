import { Link } from 'react-router-dom'
import { useState } from 'react'


const starSymbol = <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg>
const rightArrowSymbol = <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_1_32)"><path d="M32.5 48c0-8.56 6.94-15.5 15.5-15.5 8.56 0 15.5 6.94 15.5 15.5 0 8.56-6.94 15.5-15.5 15.5-8.56 0-15.5-6.94-15.5-15.5z" fill="#F5F5F5" /><path opacity=".8" d="M52.28 48.06l-4.91-4.9a.525.525 0 00-.75 0l-.46.46a.529.529 0 000 .76l4.05 4.06-4.05 4.07a.529.529 0 000 .76l.46.46c.1.1.24.16.38.16s.27-.05.38-.16l4.9-4.92c.21-.21.21-.54 0-.75z" fill="#222325" /><path d="M32.5 48c0-8.56 6.94-15.5 15.5-15.5 8.56 0 15.5 6.94 15.5 15.5 0 8.56-6.94 15.5-15.5 15.5-8.56 0-15.5-6.94-15.5-15.5z" stroke="#EFEFF0" /></g></svg>
const leftArrowSymbol = <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip1_1_32)"><path d="M31.5 48c0-8.56-6.94-15.5-15.5-15.5C7.44 32.5.5 39.44.5 48c0 8.56 6.94 15.5 15.5 15.5 8.56 0 15.5-6.94 15.5-15.5z" fill="#F5F5F5" /><path opacity=".8" d="M11.72 48.06l4.91-4.9c.21-.21.54-.21.75 0l.46.46a.529.529 0 010 .76l-4.05 4.06 4.05 4.07a.529.529 0 010 .76l-.46.46c-.1.1-.24.16-.38.16s-.27-.05-.38-.16l-4.9-4.92a.525.525 0 010-.75z" fill="#222325" /><path d="M31.5 48c0-8.56-6.94-15.5-15.5-15.5C7.44 32.5.5 39.44.5 48c0 8.56 6.94 15.5 15.5 15.5 8.56 0 15.5-6.94 15.5-15.5z" stroke="#EFEFF0" /></g></svg>

export function GigPreview({ gig, onRemoveGig, onUpdateGig ,isCurrentUser }) {


    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isHeartClicked, setIsHeartClicked] = useState(false)

    const goToPreviousSlide = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? gig.imgUrl.length - 1 : prevIndex - 1))
    }

    const goToNextSlide = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === gig.imgUrl.length - 1 ? 0 : prevIndex + 1))
    }

    const handleHeartClick = () => {
        setIsHeartClicked(!isHeartClicked);
    }

    return (
        <section className='gigs-card'>
            <div className="carousel-container">
                <button className="carousel-button left" onClick={goToPreviousSlide}>
                    {leftArrowSymbol}
                </button>

                <Link className='gig-details' to={`/gig/${gig._id}`}>
                    <div className="image-container">
                        <img className='prev-img' src={gig.imgUrl[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
                        <div className="dot-container">
                            {gig.imgUrl.map((_, index) => (
                                <div
                                    key={index}
                                    className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </Link>
                <button className="carousel-button right" onClick={goToNextSlide}>
                    {rightArrowSymbol}
                </button>
                <div className="save flex">
                    <span className="flex">
                        <button onClick={handleHeartClick} >
                            <div title='Save to list' className={isHeartClicked ? 'heart clicked' : 'heart'}></div>

                        </button>
                    </span>

                </div>
            </div>

            <div className="mini-user-preview">
                <div className="left-content">
                    <div className='left-user flex'>
                        <img src={gig.owner.imgUrl} alt="user-img" className="mini-img" />
                        <Link className='gig-details' to={`/user/${gig.owner._id}`}><span className='user-name'>{gig.owner.username}</span></Link>
                    </div>
                </div>
                <div className="right-content">
                    <span className="user-level">{gig.owner.level}</span>
                </div>
            </div>

            <Link className='gig-details' to={`/gig/${gig._id}`}><span className='gig-title'>{gig.title}</span></Link>
            <div className='gig-rate flex'>
                <div className='stars flex'><span>{starSymbol}</span></div>
                <b> {gig.rate} </b>
                <span className="review-length">({gig.owner.reviews})</span>
            </div>
            <div className='price-edit flex'>
            <Link to={`/gig/${gig._id}`}>
                <p className='gig-price'>From <span>${gig.price}</span></p>
            </Link>
            {isCurrentUser && (
                <>
                    <button className='edit'>
                        <Link to={`/edit/${gig._id}`}><i className="fa-sharp fa-solid fa-pen-to-square fa-lg"></i></Link>
                    </button>
                </>
            )}
            </div>
        </section>
    )
}