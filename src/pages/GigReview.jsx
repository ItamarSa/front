import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { utilService } from '../services/util.service'
import { reviewService } from '../services/review.service'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function GigReview({ gig, starSymbol }) {
    const { gigId } = useParams()
    const [review, setReview] = useState(utilService.getEmptyReview())
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate()

    const emptyStarSymbol = <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.9327 9.18715L13.875 6.37996L9.81731 5.79395L8 2.18336L6.18269 5.79395L2.125 6.37996L5.06731 9.18715L4.36538 13.1664L8 11.2854L11.625 13.1664L10.9327 9.18715ZM16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7826 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg>
    const halfStarSymbol = <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4056 8.74291L13.8772 6.37996L10.4535 5.88847L9.81872 5.79395L9.53021 5.22684L8.00107 2.18336V11.2854L8.56849 11.5785L11.6268 13.1664L11.0497 9.81096L10.9343 9.18715L11.4056 8.74291ZM15.7525 6.26654L12.2615 9.61248L13.0886 14.3384C13.1559 14.7543 13.002 15 12.7039 15C12.5981 15 12.4635 14.9622 12.3192 14.8866L8.00107 12.656L3.68295 14.8866C3.53869 14.9622 3.40405 15 3.29826 15C3.00013 15 2.84625 14.7543 2.91357 14.3384L3.74065 9.61248L0.239988 6.26654C-0.173552 5.86011 -0.0389107 5.46314 0.538122 5.37807L5.36596 4.68809L7.52983 0.387524C7.65485 0.132325 7.82796 0 8.00107 0C8.17418 0 8.33767 0.132325 8.47231 0.387524L10.6362 4.68809L15.464 5.37807C16.0411 5.46314 16.1757 5.86011 15.7525 6.26654Z"></path></svg>


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
        const randomStarRating = Math.floor(Math.random() * 5) + 1;
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

    return (
        <div className="gig-review">
            <div className="review-heading">Reviews</div>
            <div className="review-package">
                <header className="reviews-header flex space-between">
                    <span className="review-head flex">
                        <span><span>{gig.owner.reviews}</span> reviews for this Gig</span>
                        <div className="review-rating flex align-center">
                            <div className="star">
                                <span>{starSymbol}</span>
                                <span>{starSymbol}</span>
                                <span>{starSymbol}</span>
                                <span>{starSymbol}</span>
                                <span>{starSymbol}</span>
                            </div>
                            <b className="rating-score">5</b>
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
                                            <span></span>
                                        </div>
                                        </div>
                                    </td>
                                    <td className="rate-count">({gig.owner.reviews})</td>
                                </tr>
                                <tr>
                                    <td className="star-num">
                                        <span>4 Stars</span>
                                    </td>
                                    <td className="progress-bar">
                                        <div className="test flex align-center">

                                        <div className="progress-background">
                                            <span></span>
                                        </div>
                                        </div>
                                    </td>
                                    <td className="rate-count">({gig.owner.reviews})</td>
                                </tr>
                                <tr>
                                    <td className="star-num">
                                        <span>3 Stars</span>
                                    </td>
                                    <td className="progress-bar">
                                        <div className="test flex align-center">

                                        <div className="progress-background">
                                            <span></span>
                                        </div>
                                        </div>
                                    </td>
                                    <td className="rate-count">({gig.owner.reviews})</td>
                                </tr>
                                <tr>
                                    <td className="star-num">
                                        <span>2 Stars</span>
                                    </td>
                                    <td className="progress-bar">
                                        <div className="test flex align-center">

                                        <div className="progress-background">
                                            <span></span>
                                        </div>
                                        </div>
                                    </td>
                                    <td className="rate-count">({gig.owner.reviews})</td>
                                </tr>
                                <tr>
                                    <td className="star-num">
                                        <span>1 Stars</span>
                                    </td>
                                    <td className="progress-bar">
                                        <div className="test flex align-center">

                                        <div className="progress-background">
                                            <span></span>
                                        </div>
                                        </div>
                                    </td>
                                    <td className="rate-count">({gig.owner.reviews})</td>
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
                                    <b className="rate-score">4.9</b>
                                </div>
                            </li>
                            <li className="flex space-between">Recommend to a friend
                                <div className="rating flex align-center">
                                    <div className="stars flex">{starSymbol}</div>
                                    <b className="rate-score">4.9</b>
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
                    <ul>
                        {reviews.map((review) => (
                            <li className="clean-list" key={review._id}>
                                {review.byUser.username + '   '} <img className="flag" src={review.flag[0]} alt="US" /> {review.flag[1]}
                                <div className="stars">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <span
                                            key={index}
                                            className={`star ${index < review.starRating ? 'star-full' : 'star-empty'}`}
                                        >
                                            {index < review.starRating ? '★' : '☆'}
                                        </span>

                                    ))}

                                </div>
                                <br />
                                {review.txt}
                                <h1 className="flag"></h1>
                                <p>{utilService.timeAgo(new Date(review.createdAt))}</p>

                                <button type="button" onClick={() => onRemoveReview(review._id)}>
                                    ❌
                                </button>
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