

export function GigDescription({ gig }) {
    return (
        <>
            <section className='gig-description'>
                <div className='about-gig'>

                    <h2>About this gig</h2>
                    <p>Welcome to my gig,</p>
                    <br />
                    <p>{gig.about}</p>
                    <br />
                    <p>Best Regards {gig.owner.username}!</p>
                </div>

                <ul className="metadata clean-list flex">
                    <li className="metadata-attribute">
                        <p>Logo style</p>
                        <ul className="flex">Minimalist</ul>
                    </li>
                    <li className="metadata-attribute">
                        <p>File format</p>
                        <ul className="flex">AI, JPG, PDF, PNG, PSD, EPS, CDR, SVG</ul>
                    </li>
                </ul>


            </section>
            <div className="disclaimer">
                <header><h6>
                    <span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill='#74767e' xmlns="http://www.w3.org/2000/svg"><path d="M8 0.25C3.72009 0.25 0.25 3.72134 0.25 8C0.25 12.2812 3.72009 15.75 8 15.75C12.2799 15.75 15.75 12.2812 15.75 8C15.75 3.72134 12.2799 0.25 8 0.25ZM8 3.6875C8.72487 3.6875 9.3125 4.27513 9.3125 5C9.3125 5.72487 8.72487 6.3125 8 6.3125C7.27513 6.3125 6.6875 5.72487 6.6875 5C6.6875 4.27513 7.27513 3.6875 8 3.6875ZM9.75 11.625C9.75 11.8321 9.58209 12 9.375 12H6.625C6.41791 12 6.25 11.8321 6.25 11.625V10.875C6.25 10.6679 6.41791 10.5 6.625 10.5H7V8.5H6.625C6.41791 8.5 6.25 8.33209 6.25 8.125V7.375C6.25 7.16791 6.41791 7 6.625 7H8.625C8.83209 7 9 7.16791 9 7.375V10.5H9.375C9.58209 10.5 9.75 10.6679 9.75 10.875V11.625Z"></path></svg>
                    </span>
                    Delivery style preference
                </h6></header>
                <p>
                Please inform the freelancer of any preferences or concerns regarding the use of AI tools in the completion and/or delivery of your order.
                </p>
            </div>
        </>
    )
}