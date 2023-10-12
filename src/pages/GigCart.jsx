import { NavLink } from "react-router-dom"

export function GigCart({ gig }) {

    const vSymbol = <svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z" /></svg>
    const arrowSymbol = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M9.92332 2.96885C9.63854 2.66807 9.1768 2.66807 8.89202 2.96885C8.60723 3.26963 8.60723 3.75729 8.89202 4.05807L11.6958 7.01931H1.48616C1.08341 7.01931 0.756918 7.36413 0.756918 7.7895C0.756918 8.21487 1.08341 8.5597 1.48616 8.5597H11.8436L8.89202 11.677C8.60723 11.9778 8.60723 12.4654 8.89202 12.7662C9.1768 13.067 9.63854 13.067 9.92332 12.7662L14.0459 8.41213C14.3307 8.11135 14.3307 7.62369 14.0459 7.32291L13.977 7.25011C13.9737 7.24661 13.9704 7.24315 13.9671 7.23972L9.92332 2.96885Z" /></svg>
    const clockSymbol = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path><path d="M9 4H7v5h5V7H9V4z"></path></svg>
    const unlimitedSymbol = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4.50001 11.4999C6.40001 13.3999 9.60001 13.3999 11.5 11.4999C12.2 10.7999 12.7 9.7999 12.9 8.7999L14.9 9.0999C14.7 10.5999 14 11.8999 13 12.8999C10.3 15.5999 5.90001 15.5999 3.10001 12.8999L0.900012 15.0999L0.200012 8.6999L6.60001 9.3999L4.50001 11.4999Z" /><path d="M15.8 7.2999L9.40001 6.5999L11.5 4.4999C9.60001 2.5999 6.40001 2.5999 4.50001 4.4999C3.80001 5.1999 3.30001 6.1999 3.10001 7.1999L1.10001 6.8999C1.30001 5.3999 2.00001 4.0999 3.00001 3.0999C4.40001 1.6999 6.10001 1.0999 7.90001 1.0999C9.70001 1.0999 11.5 1.7999 12.8 3.0999L15 0.899902L15.8 7.2999Z" /></svg>


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
                        <div>{clockSymbol}<b>2 Days Delivery</b></div>
                        <div>{unlimitedSymbol}<b>3 Revisions</b></div>
                        <ul className="clean-list">
                            <li>{vSymbol} 1 concept included</li>
                            <li>{vSymbol} Logo transparency</li>
                            <li>{vSymbol} Vector file</li>
                            <li>{vSymbol} Printable file</li>
                            <li>{vSymbol} Include 3D mockup</li>
                            <li>{vSymbol} Include source file</li>
                        </ul>
                    </article>
                </div>
                <footer className="cart-footer">
                    {/* <button>Continue {arrowSymbol} </button> */}
                    <button>
                        <NavLink className="nav btn" title="gig" to={`/gig/${gig._id}/payment`}>
                        Continue {arrowSymbol}
                        </NavLink>
                    </button>
                    <button className="btn-compare">Compare Packages </button>
                </footer>
            </div>

            <div className="contact-me">

                <button>Contact me</button>
            </div>
        </section>
    )
}