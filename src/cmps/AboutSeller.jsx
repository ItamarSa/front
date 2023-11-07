import { utilService } from "../services/util.service";

export function AboutSeller({ gig, starSymbol, scrollContactMeRef }) {



    return (
        <>
            <h2 className="about-seller">About the seller</h2>
            <div ref={scrollContactMeRef} className='profile-card'>
                <div className="seller-card">
                    <div className="mini-user flex">
                        <div className="seller-img flex">
                            <img className='user-img' src={gig.sellerUrl} alt='user-img' />
                            <span className={'_'+ gig.owner.level}></span>
                        </div>
                        <div className="seller-info flex column justify-center ">
                            <div className="seller-name flex">
                                <div className="username">{gig.name}</div>
                                <div className="store">{gig.owner.store}</div>
                            </div>
                            <p className="one-line">Design is a solution to a problem</p>
                            <div className="seller-rate flex align-center">
                                <div className="star flex">
                                    <span>{starSymbol}</span>
                                </div>
                                <b className="rate-score">{gig.rate}</b>
                                <span className="review-length">({gig.owner.reviews})</span>
                            </div>
                        </div>

                    </div>
                    <button className="align-center">Contact me</button>
                </div>
                <div className="stats-desc">
                    <ul className="user-stats clean-list flex">
                        <li>From <strong>{gig.owner.from}</strong></li>
                        <li>Member since <strong>{utilService.timeAgo(new Date(gig.owner.createdAt))}</strong></li>
                        <li>Avg. response time <strong>{gig.owner.response}</strong></li>
                        <li>Last delivery <strong>about {gig.owner.delivery} hours</strong></li>
                        <li>Languages <strong>English{gig.owner.languages}</strong></li>
                    </ul>
                    <article className="seller-desc">{gig.owner.aboutMe}</article>
                </div>
            </div>
        </>
    )
}

