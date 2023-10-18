import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


export function GigPreview({ gig, onRemoveGig, onUpdateGig }) {

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        color: 'white',
        dotsClass: 'slick-dots',
        speed: 350,
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

    const starSymbol = <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg>


    let slider

    return (
        <section className='gigs-card'>
            <Link className='gig-details' to={`/gig/${gig._id}`}>
                <Slider {...settings} ref={(c) => (slider = c)}>
                    {Array.isArray(gig.imgUrl) ? (
                        gig.imgUrl.map((img, index) => <img src={img} key={index} />)
                    ) : (
                        <img src={gig.imgUrl} alt="Gig Image" />
                    )}
                </Slider>
            </Link>
            <div className="mini-user">
                <div>
                <img src={gig.owner.imgUrl} alt="user-img" className="mini-img" />
                <p className="user-name">{gig.owner.username}</p>
                </div>
                <p className="user-level">Level Seller {'  ' + gig.owner.level}</p>
            </div>



            <Link className='gig-details' to={`/gig/${gig._id}`}><h4>{gig.title}</h4></Link>
            <h4>{starSymbol}{gig.rate}</h4>
            <Link className='gig-price' to={`/gig/${gig._id}`}>
                <p>From: <span>{gig.owner.from}</span></p>
            </Link>
        </section>
    )
}