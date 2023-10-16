import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { utilService } from '../services/util.service'
import { reviewService } from '../services/review.service'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function GigReview() {
    const { gigId } = useParams()
    const [review, setReview] = useState(utilService.getEmptyReview())
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate()


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
            byUser:review.byUser,
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
            <h5 className="toy-description-heading">Reviews</h5>
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
    )
}