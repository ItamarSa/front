export function GigCart({ gig }) {

    return (
        <section>
            <div className='cart-option'>
                <label>Basic</label>

            </div>
            <div className="main-cart">
                <b>▼ Basic Package</b>
                <span>{gig.price}</span>


                <p>1 Basic Logo design Concept + JPEG and PNG (transparent background) file + 𝗡𝗼 𝗠𝗮𝘀𝗰𝗼𝘁 Design</p>
                <article>
                    <div><b>2 Days Delivery</b></div>
                    <div><b>3 Revisions</b></div>
                    <li>1 concept included</li>
                    <li>Logo transparency</li>
                    <li>Vector file</li>
                    <li>Printable file</li>
                    <li>Include 3D mockup</li>
                    <li>Include source file</li>
                </article>

            </div>
            <footer>
                <button>Continue </button>
                <button>Compare Packages </button>

            </footer>
            <button>Contact me</button>



        </section>

    )
}