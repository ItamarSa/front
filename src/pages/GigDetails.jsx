import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { gigService } from '../services/gig.service.local'
import { showErrorMsg } from '../services/event-bus.service'
import { GigCard } from '../cmps/GigCard'
import { AboutSeller } from '../cmps/AboutSeller'
import { GigCart } from './GigCart'
import { Link } from 'react-router-dom'
import { utilService } from '../services/util.service'
import { reviewService } from '../services/review.service'


export function GigDetails() {
    const { gigId } = useParams()
    const [gig, setGig] = useState(null)
    const navigate = useNavigate()
    const [review, setReview] = useState(utilService.getEmptyReview())
    const [reviews, setReviews] = useState([])




    useEffect(() => {
        loadGigs()

    }, [gigId])

    async function loadGigs() {
        try {
            const gig = await gigService.getById(gigId)
            setGig(gig)
        } catch (err) {
            console.log('Had issue in gig details', err)
            showErrorMsg('Cannot load gig')
            navigate('/gig')
        }

    }
    async function onSaveReview(ev) {
        ev.preventDefault();
        const savedReview = await reviewService.add({ txt: review.txt});
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
            const reviews = await reviewService.query({ aboutToyId: toyId });
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

    const user =
    {
        _id: 'u101',
        imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d93001bdcba7f9235745299f61850b71-1657200241990/24f7d64e-5d25-41b3-8175-c79ea47e35d1.jpg',
        username: 'user1',
        store: '@loftydesignshop',
        //   email: 'User 1',
        //   password: 'secret',
        level: 'Level Two',
        //   reviews: [
        //     {
        //       'id': 'madeId',
        //       'gig': '{optional-mini-gig}',
        //       'txt': 'Very kind and works fast',
        //       'rate': 4,
        //       'by': {
        //         '_id': 'u102',
        //         'username': 'user2',
        //         'imgUrl': '/img/img2.jpg',
        //         'from': 'country'
        //       }
        //     }
        //   ],
        from: 'India',
        createdAt: Date.now()

    }



    if (!gig) return <div className='center-spinner'> <div className='lds-facebook'><div></div><div></div><div></div></div></div>

    return (
        <div className='details-layout'>
            <h5 className="toy-description-heading">Reviews</h5>
            <ul>
                {reviews.map((review) => (
                    <li key={review._id}>
                        By: {review.byUser.fullname}, {review.txt}
                        <button type="button" onClick={() => onRemoveReview(review._id)}>
                            ❌
                        </button>
                    </li>
                ))}
            </ul>


            <form className="login-form" onSubmit={onSaveReview}>
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
            <div className='main-details'>
                <Link to='/'><a>Home 🏡</a></Link>  <small> / </small> <Link to={`/gig/${gig.tags}`}><a>{gig.tags}</a></Link>
                <GigCard gig={gig} user={user} />
                <AboutSeller gig={gig} user={user} />
            </div>
            <div className="cart-option">
                <GigCart gig={gig}/>
            </div>
        </div>
    )
}