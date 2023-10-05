import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { gigService } from '../services/gig.service.local'
import { showErrorMsg } from '../services/event-bus.service'
import { GigCard } from '../cmps/GigCard'


export function GigDetails() {
    const { gigId } = useParams()
    const [gig, setGig] = useState(null)
    const navigate = useNavigate()



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
    if (!gig) return <div className='center-spinner'> <div className='lds-facebook'><div></div><div></div><div></div></div></div>

    return (
        <div className='main-details'>
            <a>Home 🏡</a> <small> / </small><a>gig.tag</a>
            <GigCard gig={gig} />
            <div className='gig-details'>


                <div className='about-seller'>
                    <h2>About the seller</h2>
                    <div className='seller-details'>
                        <h3>{gig.name} @user.unknown</h3>
                        <h3>user.profession</h3>
                        <h3>⭐{gig.rate}(reviews.length)</h3>
                        <button>Contact me</button>
                        <hr />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem inventore animi vero non repellendus fugit et at doloremque reprehenderit iure!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem inventore animi vero non repellendus fugit et at doloremque reprehenderit iure! Lorem ipsum dolor sit amet.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem inventore animi vero non repellendus fugit et at doloremque reprehenderit iure! </p>
                    </div>

                </div>
            </div>
        </div>

    )
}