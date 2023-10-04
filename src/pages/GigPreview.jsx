import { Link } from "react-router-dom"

export function GigPreview({ gig, onRemoveGig, onUpdateGig }) {

    return (
        <section className="gigs-card">
            <p>name: <span>{gig.name}</span></p>
            <Link className="gig-details" to={`/gig/${gig._id}`}><h4>{gig.title}</h4></Link>
            <h4>⭐{gig.rate}</h4>
            <Link className="gig-price" to={`/gig/${gig._id}`}>
                <p>Price: <span>${gig.price.toLocaleString()}</span></p>
            </Link>

            {/* {shouldShowActionBtns(gig) && <div> */}
            <button onClick={() => { onRemoveGig(gig._id) }}>x</button>
            {/* <button onClick={() => { onUpdateGig(gig) }}>Edit</button> */}
            {/* </div>} */}
        </section>
    )
}