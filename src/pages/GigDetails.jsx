import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { gigService } from '../services/gig.service.local'
import { showErrorMsg } from '../services/event-bus.service'
import { GigCard } from '../cmps/GigCard'
import { AboutSeller } from '../cmps/AboutSeller'


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
            <div className='main-details'>
                <a>Home 🏡</a> <small> / </small><a>gig.tag</a>
                <GigCard gig={gig} user={user} />
                <AboutSeller gig={gig} user={user} />
            </div>
            <div className="cart-option">
                {/* <GigCart /> */}
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem id ratione nostrum cum earum corporis error vero sint dolore, totam fugit veritatis veniam excepturi tempore incidunt vitae placeat quae, sapiente obcaecati repudiandae eos ullam perspiciatis eveniet voluptate! Consequatur reiciendis officia quaerat aliquam aperiam nihil, delectus autem at deleniti iste ipsam doloremque. Dolor repellat amet, sed nemo est autem adipisci molestiae! Facilis cumque iusto rem ipsa in maiores similique necessitatibus sit, optio nobis consequuntur voluptates tenetur laboriosam dignissimos saepe nesciunt! Commodi ullam reiciendis nihil placeat fugiat numquam enim ut similique, exercitationem laborum deleniti ab ipsam sequi molestias quae obcaecati unde repudiandae harum vero necessitatibus nemo doloribus quis. Inventore culpa consequatur dolor, aliquid ipsam, quo vitae sit officiis, modi officia dolore reprehenderit quae est praesentium voluptate! Dignissimos sequi amet, minus, architecto, nam velit explicabo rem illum consequuntur eligendi laboriosam quia veniam laborum sint! Sed modi tenetur fugit, expedita sint quidem accusamus? Dignissimos?</p>

            </div>
        </div>
    )
}