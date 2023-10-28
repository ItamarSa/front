import { GigPreview } from './GigPreview'

export function GigList({ gigs, onRemoveGig, onUpdateGig,isCurrentUser }) {

    

    return (
        <>
       
            <small>{gigs.length} services available</small>
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