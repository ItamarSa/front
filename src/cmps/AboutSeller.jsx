export function AboutSeller({ gig, user, starSymbol}) {



    return (
        <div className='about-seller'>
            <h2>About the seller</h2>
            <div className='seller-details'>
                <img className='user-img' src={user.imgUrl} alt='user-img' />
                <div>
                <h4>{gig.name} <span>{user.store}</span></h4>
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

