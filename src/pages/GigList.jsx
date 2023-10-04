import { Link } from "react-router-dom"
import { GigPreview } from "./GigPreview"

export function GigList({ gigs, onRemoveGig, onUpdateGig }) {


    return (
        <>
            <h1> Gigs List</h1>
            <ul className="gig-list">
                {gigs.map(gig =>
                    <li className="gig-preview" key={gig._id}>
                        <GigPreview
                            gig={gig}
                            onRemoveGig={onRemoveGig}
                            onUpdateGig={onUpdateGig}
                        />
                    </li>)
                }
            </ul>
        </>
    )
}