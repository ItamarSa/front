export function GigPreview({gig, onRemoveGig, onUpdateGig}) {

    return (
        <section className="gigs-card">
            <p>name: <span>{gig.name}</span></p>
            <h4>{gig.title}</h4>
            <p>Price: <span>${gig.price.toLocaleString()}</span></p>
            <h4>⭐{gig.rate}</h4>

            {/* {shouldShowActionBtns(gig) && <div> */}
                <button onClick={() => { onRemoveGig(gig._id) }}>x</button>
                <button onClick={() => { onUpdateGig(gig) }}>Edit</button>
            {/* </div>} */}
        </section>
    )
}