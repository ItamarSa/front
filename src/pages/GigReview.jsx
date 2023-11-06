import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { utilService } from '../services/util.service'
import { reviewService } from '../services/review.service'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function GigReview({ gig, starSymbol, scrollAllReviewsRef }) {
    const { gigId } = useParams()
    const [review, setReview] = useState(utilService.getEmptyReview())
    const [reviews, setReviews] = useState([])
    const [isYesThumbClicked, setIsYesThumbClicked] = useState(false)
    const [isNoThumbClicked, setIsNoThumbClicked] = useState(false)
    const navigate = useNavigate()

    const emptyStarSymbol = <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path fill="#404145" fillRule="evenodd" clipRule="evenodd" d="M10.9327 9.18715L13.875 6.37996L9.81731 5.79395L8 2.18336L6.18269 5.79395L2.125 6.37996L5.06731 9.18715L4.36538 13.1664L8 11.2854L11.625 13.1664L10.9327 9.18715ZM16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7826 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg>
    const halfStarSymbol = <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11.4056 8.74291L13.8772 6.37996L10.4535 5.88847L9.81872 5.79395L9.53021 5.22684L8.00107 2.18336V11.2854L8.56849 11.5785L11.6268 13.1664L11.0497 9.81096L10.9343 9.18715L11.4056 8.74291ZM15.7525 6.26654L12.2615 9.61248L13.0886 14.3384C13.1559 14.7543 13.002 15 12.7039 15C12.5981 15 12.4635 14.9622 12.3192 14.8866L8.00107 12.656L3.68295 14.8866C3.53869 14.9622 3.40405 15 3.29826 15C3.00013 15 2.84625 14.7543 2.91357 14.3384L3.74065 9.61248L0.239988 6.26654C-0.173552 5.86011 -0.0389107 5.46314 0.538122 5.37807L5.36596 4.68809L7.52983 0.387524C7.65485 0.132325 7.82796 0 8.00107 0C8.17418 0 8.33767 0.132325 8.47231 0.387524L10.6362 4.68809L15.464 5.37807C16.0411 5.46314 16.1757 5.86011 15.7525 6.26654Z"></path></svg>
    const thumbUpSymbol = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M11.89 14.75H1C0.59 14.75 0.25 14.41 0.25 14V8C0.25 7.59 0.59 7.25 1 7.25H3.46L6.05 0.72C6.16 0.43 6.44 0.25 6.75 0.25H7.67C8.59 0.25 9.34 0.98 9.34 1.87V5.45H13.17C14 5.45 14.78 5.84 15.27 6.48C15.73 7.1 15.87 7.87 15.66 8.6L14.39 12.93C14.08 13.99 13.06 14.74 11.9 14.74L11.89 14.75ZM4.75 13.25H11.89C12.38 13.25 12.81 12.95 12.94 12.52L14.21 8.19C14.32 7.81 14.16 7.52 14.06 7.39C13.85 7.12 13.53 6.96 13.16 6.96H8.58C8.17 6.96 7.83 6.62 7.83 6.21V1.87C7.83 1.81 7.76 1.75 7.66 1.75H7.25L4.74 8.08V13.25H4.75ZM1.75 13.25H3.25V8.75H1.75V13.25V13.25Z"></path></svg>
    const thumbDownSymbol = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M9.25533 14.75H8.33533C7.41533 14.75 6.66533 14.03 6.66533 13.13L6.66533 9.55H2.83533C2.00533 9.55 1.22533 9.16 0.735326 8.52C0.275326 7.9 0.135326 7.13 0.345326 6.4L1.62533 2.06C1.93533 1 2.95533 0.25 4.11533 0.25L15.0053 0.25C15.4153 0.25 15.7553 0.59 15.7553 1V7C15.7553 7.41 15.4153 7.75 15.0053 7.75H12.5453L9.95533 14.28C9.84533 14.57 9.56533 14.75 9.25533 14.75ZM4.11533 1.75C3.62533 1.75 3.19533 2.05 3.06533 2.48L1.79533 6.81C1.68533 7.19 1.84533 7.48 1.94533 7.61C2.15533 7.88 2.47533 8.04 2.84533 8.04H7.42533C7.83533 8.04 8.17533 8.38 8.17533 8.79L8.17533 13.12C8.17533 13.17 8.24533 13.24 8.34533 13.24H8.75533L11.2653 6.91V1.75L4.11533 1.75ZM12.7553 6.25H14.2553V1.75L12.7553 1.75V6.25Z"></path></svg>

    useEffect(() => {
        loadReviews()

    }, [gigId])

    function useGigParams() {
        return useParams().gigId;
    }


    function generateRandomStars() {
        const rating = Math.floor(Math.random() * 5) + 1; // Generate a random number between 1 and 5
        return Array.from({ length: 5 }).map((_, index) => ({
            isFull: index < rating,
            isFrame: false, // This flag indicates whether to display the star with a frame
        }));
    }
    async function loadReviews() {
        try {
            const reviews = await reviewService.query({ gigId }); // Pass the gigId
            setReviews(reviews);
        } catch (err) {
            console.log('Had issues loading reviews', err);
            showErrorMsg('Cannot load reviews');
        }
    }

    async function onSaveReview(ev) {
        ev.preventDefault();
        const randomStarRating = 4 + utilService.getRandomIntInclusive(0, 10) * 0.1
        const flag = utilService.makeFlag();
        console.log('flag:', flag)
        const savedReview = await reviewService.add({
            txt: review.txt,
            byUser: review.byUser,
            gigId: gigId,
            starRating: randomStarRating,
            flag: flag
        })
        console.log('savedReview:', savedReview)
        // Update the reviews state with the new review
        setReviews((prevReviews) => [...prevReviews, savedReview]);
        setReview(utilService.getEmptyReview());
        showSuccessMsg('Review saved!');
        console.log('savedReview:', savedReview)
    }
    async function onRemoveReview(reviewId) {
        try {
            const removedReviewId = await reviewService.remove(reviewId);

            // Update the reviews state by filtering out the removed review
            setReviews((prevReviews) => prevReviews.filter((review) => review._id !== removedReviewId));
            const reviews = await reviewService.query();
            console.log('reviews:', reviews)
            setReviews(reviews);
            showSuccessMsg('Review removed!');
        } catch (err) {
            console.error('Error removing review:', err);
            showErrorMsg('Failed to remove review');
        }
    }
    function handleReviewChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setReview((review) => ({ ...review, [field]: value }))
    }

    const handleThumbYesClick = () => {
        setIsYesThumbClicked(!isYesThumbClicked && isNoThumbClicked === false)
    }
    const handleThumbNoClick = () => {
        setIsNoThumbClicked(!isNoThumbClicked && isYesThumbClicked === false)
    }

    return (
        <div className="gig-review">
            <div ref={scrollAllReviewsRef} className="review-heading">Reviews</div>
            <div className="review-package">
                <header className="reviews-header flex space-between">
                    <span className="review-head flex">
                        <span><span>{gig.reviews}</span> reviews for this Gig</span>
                        <div className="review-rating flex align-center">
                            <div className="star">
                                <span>{starSymbol}</span>
                                <span>{starSymbol}</span>
                                <span>{starSymbol}</span>
                                <span>{starSymbol}</span>
                                <span>{halfStarSymbol}</span>
                            </div>
                            <b className="rating-score">4.8</b>
                        </div>
                    </span>
                </header>
                <div className="breakdown-wrapper flex">
                    <div className="rate-left">
                        <table className="star-counter">
                            <tbody>
                                <tr>
                                    <td className="star-num">
                                        <span>5 Stars</span>
                                    </td>
                                    <td className="progress-bar">
                                        <div className="test flex align-center">

                                            <div className="progress-background">
                                                <span className="five-star"></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="rate-count">({(0.8 * gig.reviews).toFixed(0)})</td>
                                </tr>
                                <tr>
                                    <td className="star-num">
                                        <span>4 Stars</span>
                                    </td>
                                    <td className="progress-bar">
                                        <div className="test flex align-center">

                                            <div className="progress-background">
                                                <span className="four-star"></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="rate-count">({(0.15 * gig.reviews).toFixed(0)})</td>
                                </tr>
                                <tr>
                                    <td className="star-num">
                                        <span>3 Stars</span>
                                    </td>
                                    <td className="progress-bar">
                                        <div className="test flex align-center">

                                            <div className="progress-background">
                                                <span className="three-star"></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="rate-count">({(0.05 * gig.reviews).toFixed(0)})</td>
                                </tr>
                                <tr>
                                    <td className="star-num">
                                        <span>2 Stars</span>
                                    </td>
                                    <td className="progress-bar">
                                        <div className="test flex align-center">

                                            <div className="progress-background">
                                                <span className="two-star"></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="rate-count">{/*({gig.owner.reviews}) */}(0)</td>
                                </tr>
                                <tr>
                                    <td className="star-num">
                                        <span>1 Star</span>
                                    </td>
                                    <td className="progress-bar">
                                        <div className="test flex align-center">

                                            <div className="progress-background">
                                                <span className="one-star"></span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="rate-count">{/*({gig.owner.reviews}) */}(0)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="rate-right">
                        <h6 className="ranking-head">Rating Breakdown</h6>
                        <ul className="clean-list">
                            <li className="flex space-between">Seller communication level
                                <div className="rating flex align-center">
                                    <div className="stars flex ">{starSymbol}</div>
                                    <b className="rate-score">5</b>
                                </div>
                            </li>
                            <li className="flex space-between">Recommend to a friend
                                <div className="rating flex align-center">
                                    <div className="stars flex">{starSymbol}</div>
                                    <b className="rate-score">4.8</b>
                                </div>
                            </li>
                            <li className="flex space-between">Service as described
                                <div className="rating flex align-center">
                                    <div className="stars flex">{starSymbol}</div>
                                    <b className="rate-score">4.9</b>
                                </div>
                            </li>

                        </ul>

                    </div>
                </div>

                <div className="reviews-wrap">
                    <ul className="review-list clean-list">
                        {reviews.map((review) => (
                            <li className="review-item-component" key={review._id}>
                                <div className="review-header-container flex align-center">
                                    <div className="user-img">
                                        <div className='img flex align-center'>
                                            <img className='user-img' src={gig.owner.imgUrl} alt='user-img' />
                                        </div>

                                    </div>
                                    <div className="reviewer-user-details flex column">
                                        <div className="reviewer-detail flex">
                                            {review.byUser.username}
                                        </div>
                                        <div className="reviewer-sub-detail flex align-center">
                                            <img className="flag" src={review.flag[0]} alt="US" />
                                            <div className="country-name">{review.flag[1]}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="review-details">
                                    <div className="review-details-head flex">
                                        <div className="review-stars flex align-center">
                                            <div className="stars-rate">
                                                {Array.from({ length: 5 }).map((_, index) => (
                                                    <span
                                                        key={index}
                                                        className={`star ${index < review.starRating ? 'star-full' : 'star-empty'}`}
                                                    >
                                                        {index < review.starRating ? starSymbol : emptyStarSymbol}
                                                    </span>
                                                ))}
                                            </div>
                                            <b className="rate-score flex">{review.score} 4.6</b>
                                        </div>
                                        <span className="inline-divider"></span>
                                        <span className="review-date flex">{utilService.timeAgo(new Date(review.createdAt))}</span>
                                    </div>
                                    <div className="review-details-main">
                                        {review.txt}
                                        <span className="expand-review">
                                            {/* <button className="expand-button">
                                                <u>See more</u>
                                            </button> */}
                                        </span>
                                    </div>
                                    <div className="review-details-footer">
                                        <div className="helpful-footer flex align-center">
                                            <div className="helpful-txt">Helpful?</div>
                                            <span className="thumb-icon flex">
                                                <div onClick={handleThumbYesClick} className={`helpful-thumb-yes flex align-center ${isYesThumbClicked ? 'clicked' : ''}`}>
                                                    <span className="thumb" >{thumbUpSymbol}</span>
                                                    <span className="help-txt">Yes</span>
                                                </div>
                                                <div onClick={handleThumbNoClick} className={`helpful-thumb-no flex align-center ${isNoThumbClicked ? 'clicked' : ''}`}>
                                                    <span className="thumb">{thumbDownSymbol}</span>
                                                    <span className="help-txt">No</span>
                                                </div>

                                            </span>
                                            {isYesThumbClicked && <span className="helpful-count">You found this review helpful.</span>}
                                        </div>
                                    </div>

                                </div>
                                {/* <button type="button" onClick={() => onRemoveReview(review._id)}>
                                    ❌
                                </button> */}
                            </li>
                        ))}
                    </ul>

                    <form className="review-form" onSubmit={onSaveReview}>
                        <input
                            type="text"
                            name="txt"
                            value={review.txt}
                            placeholder="Write a Review"
                            onChange={handleReviewChange}
                            required
                        />
                        <button>Submit Review</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


{/* <span className="inline-divider flex"></span>
<span className="flex"></span>
<time>{review.createdAt}</time> */}