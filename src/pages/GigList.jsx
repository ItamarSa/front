import { utilService } from '../services/util.service'
import { GigPreview } from './GigPreview'

const randomNum =utilService.getRandomIntInclusive(1, 999)
const arrowSymbol =<svg width="12" height="12" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="#222325"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg>
export function GigList({ gigs, onRemoveGig, onUpdateGig, isCurrentUser }) {


    return (
        <>
            <div className="list-subtitle flex space-between">
                <div className='services-amount'>
                    {((gigs.length * 1000) + randomNum).toLocaleString()} services available
                </div>
                <div className="sort-by">Sort by: <span className='sort-option'>Best Selling {arrowSymbol}</span></div>
            </div>
            <ul className='gig-list'>
                {gigs.map(gig =>
                    <li className='gig-preview' key={gig._id}>
                        <GigPreview
                            gig={gig}

                            isCurrentUser={isCurrentUser}
                        />
                    </li>)
                }
            </ul>
        </>
    )
}