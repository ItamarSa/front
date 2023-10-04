import { Link } from "react-router-dom"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { gigService } from '../services/gig.service.local';



export function GigPreview({ gig, onRemoveGig, onUpdateGig }) {

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        dotsClass: 'slick-dots',
        speed: 350,
    }

    let slider

    const gigImgs = gigService.getImgs()

    return (
        <section className="gigs-card">
            <Link className="gig-details" to={`/gig/${gig._id}`}> <Slider {...settings} ref={(c) => (slider = c)}>
                {gigImgs.map((img, index) => <img src={img} key={index} />)}
            </Slider>
            </Link>

            <p>name: <span>{gig.name}</span></p>
            <Link className="gig-details" to={`/gig/${gig._id}`}><h4>{gig.title}</h4></Link>
            <h4>⭐{gig.rate}</h4>
            <Link className="gig-price" to={`/gig/${gig._id}`}>
                <p>Price: <span>${gig.price.toLocaleString()}</span></p>
            </Link>
        </section>
    )
}