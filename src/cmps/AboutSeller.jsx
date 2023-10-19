export function AboutSeller({ gig, starSymbol}) {



    return (
        <div className='about-seller'>
            <h2>About the seller</h2>
            <div className='seller-details'>
                <img className='user-img' src={gig.owner.imgUrl} alt='user-img' />
                <div>
                <h4>{gig.name} <span>{gig.owner.store}</span></h4>
                <h4>{starSymbol}{gig.rate}(reviews.length)</h4>
                {/* <h3>user.profession</h3> */}
                </div>
            </div>
            <div>

                <button>Contact me</button>
                <hr />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem inventore animi vero non repellendus fugit et at doloremque reprehenderit iure!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem inventore animi vero non repellendus fugit et at doloremque reprehenderit iure! Lorem ipsum dolor sit amet.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem inventore animi vero non repellendus fugit et at doloremque reprehenderit iure! </p>
            </div>

        </div>
    )
}

