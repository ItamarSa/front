import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { gigService } from '../services/gig.service.local'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { GigCard } from '../cmps/GigCard'
import { AboutSeller } from '../cmps/AboutSeller'
import { GigCart } from './GigCart'
import { Link, NavLink } from 'react-router-dom'
import { GigReview } from './GigReview'
import { useRef } from 'react'


const homeSymbol = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M12.773 14.5H3.227a.692.692 0 0 1-.482-.194.652.652 0 0 1-.2-.468V7.884H.5l7.041-6.212a.694.694 0 0 1 .918 0L15.5 7.884h-2.046v5.954a.652.652 0 0 1-.2.468.692.692 0 0 1-.481.194Zm-4.091-1.323h3.409V6.664L8 3.056 3.91 6.664v6.513h3.408v-3.97h1.364v3.97Z"></path></svg>
const starSymbol = <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg>

export function GigDetails() {
    const { gigId } = useParams()
    const [gig, setGig] = useState(null)
    const navigate = useNavigate()
    const scrollContactMeRef = useRef(null);
    const scrollAllReviewsRef = useRef(null);
      
    const scrollToAboutSeller = () => {
      if (scrollContactMeRef.current) {
        scrollContactMeRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const scrollToReviews = () => {
      if (scrollAllReviewsRef.current) {
        scrollAllReviewsRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
    

    useEffect(() => {
        loadGigs()
        window.scrollTo(0, 0)
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




    if (!gig) return <div className='center-spinner'> <div className='lds-facebook'><div></div><div></div><div></div></div></div>

    return (
        <div className='details-layout'>

            <div className='main-details '>
                <div className="nav-links flex align-center">
                    <Link to='/'>{homeSymbol}</Link>
                      <small> / </small> 
                      <Link to={`/gigs?tags=${gig.tags}`}>{gig.tags}</Link>
                </div>
                <GigCard gig={gig} starSymbol={starSymbol} scrollToReviews={scrollToReviews}/>
                <AboutSeller gig={gig} starSymbol={starSymbol} scrollContactMeRef={scrollContactMeRef}/>
                <div className="gig-reviews">
                    <GigReview gig={gig} starSymbol={starSymbol} scrollAllReviewsRef={scrollAllReviewsRef}/>
                </div>

            </div>

            <div className="cart-option">

                <GigCart gig={gig} scrollToAboutSeller={scrollToAboutSeller}/>

            </div>

        </div>
    )
}