export function GigCart({ gig }) {

    return (
        <section className='main-cart'>
            <div className='cart-details'>
                <div >
                    <div className='basic'>Basic</div>

                </div>
                <div >
                    <b>▼ Basic Package</b>
                    <span>{gig.price}</span>

                    <p>1 Basic Logo design Concept + JPEG and PNG (transparent background) file + 𝗡𝗼 𝗠𝗮𝘀𝗰𝗼𝘁 Design</p>
                    <article>
                        <div><b>2 Days Delivery</b></div>
                        <div><b>3 Revisions</b></div>
                        <ul className="clean-list">
                            <li>1 concept included</li>
                            <li>Logo transparency</li>
                            <li>Vector file</li>
                            <li>Printable file</li>
                            <li>Include 3D mockup</li>
                            <li>Include source file</li>
                        </ul>
                    </article>
                </div>
                <footer className="cart-footer">
                    <button>Continue </button>
                    <button className="btn-compare">Compare Packages </button>

                </footer>
            </div>

                <div className="contact-me">

                    <button>Contact me</button>
                </div>



        </section>

    )
}