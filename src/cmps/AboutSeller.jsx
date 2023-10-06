export function AboutSeller({gig}){



    return(
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
    )
}