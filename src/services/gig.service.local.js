
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'gigDB'
const tags = [
    'Graphics-Design',
    'Programming-Tech',
    'Digital-Marketing',
    'Video-Animation',
    'Writing-Translation',
    'Music-Audio',
    'Business',
    'Data',
    'Photography',

]


export const gigService = {
    query,
    getById,
    save,
    remove,
    update,
    getEmptyGig,
    addGigMsg,
    getImgs,
    getDemoGig,
    getGigTags,
    getDefaultFilter
}
// debug trick
window.bs = gigService

const gigImgs = ['https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/292332178/original/18841f3470f65b26636437baa1fd560438fb1a51.jpeg', 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs3/292332178/original/ed187afc7d0fee831dcc1aed3857375ae78756cf.jpeg', 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs2/292332178/original/748f0d7770acaa93f8e7734a78252dd0359ce24b.jpeg', 'https://fiverr-res.cloudinary.com/t_gig_card_delivery_image_1x,q_auto,f_auto/attachments/delivery/asset/3046f6f5c099faab8a772c4bf3d28310-1696391924/MOCK.jpg', 'https://fiverr-res.cloudinary.com/t_gig_card_delivery_image_1x,q_auto,f_auto/attachments/delivery/asset/04195b1a525cb5e3122149b24590fe50-1696390373/1moc.jpg']
const gigImages = [
    ['https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/0f1b5e6ec7eb22920025104af1eab9af-1694674627/KENMAN%20DESIGN/do-modern-minimalist-business-logo-design-and-branding.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/07f29f3eb40628f942a34779ca914907-1695137958/RINGGER%20ARCHITEKTUR%20/do-modern-minimalist-business-logo-design-and-branding.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/e9316ca7ab39a63cbe961396956852aa-1694918421/EDMEE/do-modern-minimalist-business-logo-design-and-branding.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/193a0d1808861534b1e4327b8400e93e-1694757454/WYLD/do-modern-minimalist-business-logo-design-and-branding.jpg'],
    ['https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/234808196/original/d5df4c282212d9efb6a1a579cd48155e4bffb1ae/design-premium-and-trendy-minimal-logo-design-within-24-hour.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/234808196/original/7f92c0bad6ba38b1968f99537962ebe35ee64f7d/design-premium-and-trendy-minimal-logo-design-within-24-hour.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/234808196/original/160f2df38250e10839949d7deaf973e42b76281f/design-premium-and-trendy-minimal-logo-design-within-24-hour.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/5acb4ce8f640333a7ad8ac85ff66c017-1698252423/Owens%20Knife%20Works%20modi_1-01/design-premium-and-trendy-minimal-logo-design-within-24-hour.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/52a84db3ea8ffa08333b5b1d396b65d4-1698092617/Hairextensions%20by%20Zuhal-02/design-premium-and-trendy-minimal-logo-design-within-24-hour.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/e0ccd0151d5dc097b4fcdd5921c3cab8-1698149425/EMPOWER-M1/design-premium-and-trendy-minimal-logo-design-within-24-hour.jpg']
]

function getImgs() {

    return gigImages[utilService.getRandomIntInclusive(0,1)]
}
// async function query(filterBy = { txt: '', price: 0 }) {
//     var gigs = await storageService.query(STORAGE_KEY)}

async function query(filterBy = {}) {
    var gigs = await storageService.query(STORAGE_KEY, filterBy);

    let gigToDisplay = [...gigs];

    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i');
        gigToDisplay = gigToDisplay.filter((gig) => {
            return (
                gig.title.match(regex) || // Match by title
                gig.tags.some((tag) => tag.match(regex)) // Match by tags
            );
        });
    }

    if (filterBy.price) {
        gigToDisplay = gigToDisplay.filter((gig) => gig.price <= filterBy.price);
    }

    if (filterBy.tags && filterBy.tags.length > 0) {
        gigToDisplay = gigToDisplay.filter((gig) => {
            return gig.tags.some((tag) => filterBy.tags.includes(tag));
        });
    }
    if (filterBy.userId) {
        gigToDisplay = gigToDisplay.filter((gig) => gig.owner._id === filterBy.userId);
    }
    // if (filterBy.buyerId) {
    //     orders = orders.filter((order) => order.buyer._id === filterBy.buyerId);
    //     }


    return gigToDisplay;
}
function getDefaultFilter() {
    return { txt: '', tags: [] }
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
async function update({ _id, imgUrl }) {
    const gig = await storageService.get(STORAGE_KEY, _id);

    // Optionally, update the imgUrl if provided
    if (imgUrl) {
        gig.imgUrl = imgUrl;
    }

    await storageService.put(STORAGE_KEY, gig); // Update the gig object in storage

    return gig;
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
    const randomIdx = utilService.getRandomIntInclusive(0, 21)
    return {
        imgUrl: getImgs(),
        // name: utilService.makeLorem(1),
        title: utilService.makeRandomGigTitle(randomIdx),
        about: utilService.makeRandomGigAbout(randomIdx),
        price: utilService.getRandomIntInclusive(100, 300),
        rate: parseFloat((utilService.getRandomIntInclusive(20, 50) * 0.1).toPrecision(2)),
        createdAt: utilService.formatDateForTimeAgo(new Date()),
        tags: utilService.makeTag(1),
        owner: userService.getLoggedinUser(),
        // inStock: utilService.randomTrueFalse(),
        // icon: utilService.makeImage()
    }
}
function getEmptyGig() {
    return {
        imgUrl: [],
        // name: '',
        title: '',
        price: '',
        tags: utilService.makeTag(1),
        rate: parseFloat((utilService.getRandomIntInclusive(20, 50) * 0.1).toPrecision(2)),
        createdAt: (Date.now()),
        tags: utilService.makeTag(1),
        owner: userService.getLoggedinUser(),
    }
}
function getGigTags() {
    return tags
}


// TEST DATA
// storageService.post(STORAGE_KEY, {title: 'Jira G', price: 980}).then(x => console.log(x))




