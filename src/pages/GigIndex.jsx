import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadGigs, addGig, updateGig, removeGig } from '../store/action/gig.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { gigService } from '../services/gig.service.local.js'

export function GigIndex() {

    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        loadGigs()
    }, [])

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')            
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }

    async function onAddGig() {
        const gig = gigService.getEmptyGig()
        gig.title = prompt('Title?')
        try {
            const savedGig = await addGig(gig)
            showSuccessMsg(`Gig added (id: ${savedGig._id})`)
        } catch (err) {
            showErrorMsg('Cannot add gig')
        }        
    }

    async function onUpdateGig(gig) {
        const price = +prompt('New price?')
        const gigToSave = { ...gig, price }
        try {
            const savedGig = await updateGig(gigToSave)
            showSuccessMsg(`Gig updated, new price: ${savedGig.price}`)
        } catch (err) {
            showErrorMsg('Cannot update gig')
        }        
    }

    function onAddGigMsg(gig) {
        console.log(`TODO Adding msg to gig`)
    }
    function shouldShowActionBtns(gig) {
        const user = userService.getLoggedinUser()
        if (!user) return false
        if (user.isAdmin) return true
        return gig.owner?._id === user._id
    }

    return (
        <div>
            <h3>Gig App</h3>
            <main>
                <button onClick={onAddGig}>Add Gig ⛐</button>
                <ul className="gig-list">
                    {gigs.map(gig =>
                        <li className="gig-preview" key={gig._id}>
                            <h4>{gig.title}</h4>
                            <h1>⛐</h1>
                            <p>Price: <span>${gig.price.toLocaleString()}</span></p>
                            <p>Owner: <span>{gig.owner && gig.owner.fullname}</span></p>
                            {shouldShowActionBtns(gig) && <div>
                                <button onClick={() => { onRemoveGig(gig._id) }}>x</button>
                                <button onClick={() => { onUpdateGig(gig) }}>Edit</button>
                            </div>}

                            <button onClick={() => { onAddGigMsg(gig) }}>Add gig msg</button>
                        </li>)
                    }
                </ul>
            </main>
        </div>
    )
}