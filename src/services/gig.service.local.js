
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'gigDB'
const tags = [
    "logo-design",
    "artisitic",
    "proffesional",
    "accessible"
]


export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    addGigMsg,
    getDemoGig, getGigTags,
}
// debug trick
window.bs = gigService


async function query(filterBy = {}) {
    console.log("hi");
    var gigs = await storageService.query(STORAGE_KEY,filterBy)
    let GigToDisplay=[...gigs]
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        GigToDisplay = GigToDisplay.filter(gig => regex.test(gig.title) || regex.test(gig.description))
    }
    if (filterBy.price) {
        GigToDisplay = GigToDisplay.filter(gig => gig.price <= filterBy.price)
    }
    if (filterBy.tags && filterBy.tags.length > 0) {
        GigToDisplay = GigToDisplay.filter(gig => {
            return gig.tags.some(tag => filterBy.tags.includes(tag))
        })
    }
    console.log('GigToDisplay:', GigToDisplay)
    return GigToDisplay
}

function getById(gigId) {
    return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await storageService.put(STORAGE_KEY, gig)
    } else {
        // Later, owner is set by the backend
        gig.owner = userService.getLoggedinUser()
        savedGig = await storageService.post(STORAGE_KEY, gig)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    // Later, this is all done by the backend
    const gig = await getById(gigId)
    if (!gig.msgs) gig.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    gig.msgs.push(msg)
    await storageService.put(STORAGE_KEY, gig)

    return msg
}

// function getEmptyGig() {
//     return {
//         title: 'Gig-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }
function getDemoGig() {
    return {
        name: utilService.makeLorem(1),
        title: utilService.makeLorem(5),
        price: utilService.getRandomIntInclusive(100, 300),
        rate: utilService.getRandomIntInclusive(2, 5),
        createdAt: (Date.now()),
        tags: utilService.makeTag(1)
        // inStock: utilService.randomTrueFalse(),
        // icon: utilService.makeImage()
    }
}
function getEmptyGig() {
    return {
        name: '',
        title: '',
        price: 0,
        rate: 0,
        createdAt: (Date.now()),
        // inStock: utilService.randomTrueFalse(),
        // icon: utilService.makeImage()
    }
}
function getGigTags() {
    return tags
}


// TEST DATA
// storageService.post(STORAGE_KEY, {title: 'Jira G', price: 980}).then(x => console.log(x))




