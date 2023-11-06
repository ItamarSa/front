import { gigService } from '../../services/gig.service.local.js'
import { store } from '../store.js'
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'
import { ADD_GIG, ADD_ORDER, REMOVE_GIG, SET_FILTER, SET_GIGS, UNDO_REMOVE_GIG, UPDATE_GIG } from '../reducer/gig.reducer.js'
import { orderService } from '../../services/order.service.js'

// Action Creators:
export function getActionRemoveGig(gigId) {
    return {
        type: REMOVE_GIG,
        gigId
    }
}
export function getActionAddGig(gig) {
    return {
        type: ADD_GIG,
        gig
    }
}
export function getActionAddOrder(order) {
    return {
        type: ADD_ORDER,
        order
    }
}
export function getActionUpdateGig(gig) {
    return {
        type: UPDATE_GIG,
        gig
    }
}

export async function loadGigs() {
    try {

        const { filterBy } = store.getState().gigModule
        const gigs = await gigService.query(filterBy)
        store.dispatch({
            type: SET_GIGS,
            gigs
        })

    } catch (err) {
        // console.log('Cannot load gigs', err)
        throw err
    }

}
export async function loadGigsUser(filterBy = {}) {
    try {
      const { userId } = filterBy; // Destructure the userId from filterBy
      const gigs = await gigService.query(filterBy);
    //   console.log('filterBy:', filterBy);
    //   console.log('gigs:', gigs);
    //   console.log('Gigs from DB:', gigs);
      store.dispatch({
        type: SET_GIGS,
        gigs
      });
    } catch (err) {
      console.log('Cannot load gigs', err);
      throw err;
    }
  }

export async function addGig(gig) {
    try {
        const savedGig = await gigService.save(gig)
        console.log('Added Gig', savedGig)
        store.dispatch(getActionAddGig(savedGig))
        return savedGig
    } catch (err) {
        console.log('Cannot add gig', err)
        throw err
    }
}
export async function addOrder(order) {
    try {
        const savedOrder = await orderService.save(order)
        console.log('Added Order', savedOrder)
        store.dispatch(getActionAddOrder(savedOrder))
        return savedOrder
    } catch (err) {
        console.log('Cannot add order', err)
        throw err
    }
}
export async function updateGig(gig) {
    try {
        const savedGig= await gigService.save(gig)
        store.dispatch(getActionUpdateGig(savedGig))
    } catch (err) {
        console.log('Cannot save gig', err)
            throw err
    }
}
export async function removeGig(gigId) {
    try {
        await gigService.remove(gigId)
        store.dispatch(getActionRemoveGig(gigId))
    } catch (err) {
        console.log('Cannot remove gig', err)
        throw err
    }
}
export async function onRemoveGigOptimistic(gigId) {
    store.dispatch({
        type: REMOVE_GIG,
        gigId
    })
    showSuccessMsg('Gig removed')
    try {
        await gigService.remove(gigId)
    } catch (err) {
        console.log('Cannot remove gig', err)
        throw err
        store.dispatch({
            type: UNDO_REMOVE_GIG
        })
    }
}

export function setGigFilter(filterBy = gigService.getDefaultFilter()) {
    // dispatch
    console.log("store changed",filterBy);
    store.dispatch({ type: SET_FILTER, filterBy })
    // return Promise.resolve(filterBy)
    // return loadToys()
}



// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)

