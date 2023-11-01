
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'gigDB'
const tags = [
    // 'Website-Design',
    // 'WordPress',
    // 'Logo-Design',
    // 'AI-Services',
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

const gigImages = [
    ['https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/0f1b5e6ec7eb22920025104af1eab9af-1694674627/KENMAN%20DESIGN/do-modern-minimalist-business-logo-design-and-branding.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/07f29f3eb40628f942a34779ca914907-1695137958/RINGGER%20ARCHITEKTUR%20/do-modern-minimalist-business-logo-design-and-branding.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/e9316ca7ab39a63cbe961396956852aa-1694918421/EDMEE/do-modern-minimalist-business-logo-design-and-branding.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/193a0d1808861534b1e4327b8400e93e-1694757454/WYLD/do-modern-minimalist-business-logo-design-and-branding.jpg'],
    ['https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/234808196/original/d5df4c282212d9efb6a1a579cd48155e4bffb1ae/design-premium-and-trendy-minimal-logo-design-within-24-hour.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/234808196/original/7f92c0bad6ba38b1968f99537962ebe35ee64f7d/design-premium-and-trendy-minimal-logo-design-within-24-hour.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/234808196/original/160f2df38250e10839949d7deaf973e42b76281f/design-premium-and-trendy-minimal-logo-design-within-24-hour.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/5acb4ce8f640333a7ad8ac85ff66c017-1698252423/Owens%20Knife%20Works%20modi_1-01/design-premium-and-trendy-minimal-logo-design-within-24-hour.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/52a84db3ea8ffa08333b5b1d396b65d4-1698092617/Hairextensions%20by%20Zuhal-02/design-premium-and-trendy-minimal-logo-design-within-24-hour.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/e0ccd0151d5dc097b4fcdd5921c3cab8-1698149425/EMPOWER-M1/design-premium-and-trendy-minimal-logo-design-within-24-hour.jpg'],
    ['https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/142221195/original/f654b68f3ceac0a5173ecc023b2e5c46cb85ddd2/redesign-edit-or-update-your-existing-logo-creatively.jpg','https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/142221195/original/6543f23e37de81406041dffc730d8b0b3c839c2c/redesign-edit-or-update-your-existing-logo-creatively.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/142221195/original/bbc3a10c870ac317be821f0579cc6798ea631eb5/redesign-edit-or-update-your-existing-logo-creatively.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/ea3637802e1658a7ab6af77473a74720-1698688821/Lindse%20Rose%20Logo-01/redesign-edit-or-update-your-existing-logo-creatively.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/433999a046cc2896f356b344a472740d-1698167724/Nazareth%20school%20logo/redesign-edit-or-update-your-existing-logo-creatively.png'],
    ['https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/104008641/original/7aa15382f444b83bb1de38cb6bf0da41fd4b95c6/vector-image-to-vector.jpg', 'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20171106/Logo-5_n3naw3.jpg', 'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20190109/Logo-6_orcsly.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/78cf272864a5a9d0415d6c4164c46c18-1698813011/MATT-SMITH/vector-image-to-vector.png', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/78cf272864a5a9d0415d6c4164c46c18-1698813011/MATT-SMITH/vector-image-to-vector.png', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/04559461ec7c3eacaf96cce6b9c5dc9f-1698687802/80x60cm/vector-image-to-vector.png'],
    ['https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/159121575/original/873e0f308601a693aedcd9dfde68245ba673c8a4/real-estate-housing-description-for-advertisements-and-marketing.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/159121575/original/4e15d262bed8324641760514aba100925d4af982/real-estate-housing-description-for-advertisements-and-marketing.png', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/159121575/original/1119faf8d7a7177f47b2c1473616771e1a477583/real-estate-housing-description-for-advertisements-and-marketing.png', 'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20220503/Working%20with%20Me%20(3)_tyo6yi.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_gig_pdf_gallery_view_ver4,q_auto,f_auto/attachments/delivery/asset/5e196d81a5fc8272fccba7a184c70f2e-1687178196/2165%20Bernadette%20Ct%20Wall%20NJ%20Flyer%20(1)/real-estate-housing-description-for-advertisements-and-marketing.pdf', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_gig_pdf_gallery_view_ver4,q_auto,f_auto/attachments/delivery/asset/2a312f277ee4fb0a49a42a41857e6801-1681560903/140%20Majestic%20Shores%20Lane_%20La%20Porte%20Tx.%2077571%20(1)/real-estate-housing-description-for-advertisements-and-marketing.pdf'],
    ['https://fiverr-res.cloudinary.com/videos/so_0.0,t_main1,q_auto,f_auto/hzukxfzmo1vdyo8xs2oi/develop-a-chatgpt-gpt-or-gpt3-ai-model-for-you.png', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/316697701/original/589af8260a6ce4b3549022074fc92751541f4dae/develop-a-chatgpt-gpt-or-gpt3-ai-model-for-you.jpg'],
    ['https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/324630561/original/99705f161f3f2ff00528efad3204c2d84b0be88a/develop-ai-chatbot-with-chatgpt-llm-openai-langchain-pincone.png', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/324630561/original/d240f86e8d7f46f708f4a736e1867e79a3792572/develop-ai-chatbot-with-chatgpt-llm-openai-langchain-pincone.png', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/324630561/original/a13b4319643ecbabe272477fdc4593577bead1d6/develop-ai-chatbot-with-chatgpt-llm-openai-langchain-pincone.png'],
    ['https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/312396311/original/037a3c62fb86fab5b53af5871d3be477cb143cf1/engineer-custom-prompts-and-apply-autogpt.jpg', 'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20230415/New%20Real%20Estate%20Prompts_wrievy.jpg', 'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20230415/Prompt%20Samples_fzhzab.jpg'],
    ['https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/132986739/original/df53fdf8bc545861eac62cd78ef87d32164a1877/make-any-font-you-want-ttf-and-otf-formats.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/132986739/original/c0c314e5f7c6581e3e112b8ddfda8a8692bcab3e/make-any-font-you-want-ttf-and-otf-formats.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/132986739/original/314784e618feb975f54848841aaa176585ff7ca5/make-any-font-you-want-ttf-and-otf-formats.jpg', 'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20220531/Portfolio2_compressed_ibwl8g.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/74e771026f5edd1defa7c1cfe3f36902-1687409528/Preview1/make-any-font-you-want-ttf-and-otf-formats.jpg'],
    ['https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/234289712/original/a9c300a360b49d1e43d836aa21647f571371cf36/design-font-custom-font-design-typography-ttf-otf-font-files.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/234289712/original/82136dd6da067ceb5ac240132aca86892b41436c/design-font-custom-font-design-typography-ttf-otf-font-files.png', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/3aa3b6d43d22046c97c405c9b36fefe2-1696135159/image_2023-10-01_093858827/design-font-custom-font-design-typography-ttf-otf-font-files.png', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/db39ea6de57478146f29c84188ffc744-1695706550/image_2023-09-26_103509451/design-font-custom-font-design-typography-ttf-otf-font-files.png', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/132986739/original/df53fdf8bc545861eac62cd78ef87d32164a1877/make-any-font-you-want-ttf-and-otf-formats.jpg'],
    ['https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/195427537/original/09dd06a33e510f8b98bcb2f897b84877679564a3/create-and-design-custom-font-design-for-your-own-projects.png', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/ad55c0e4b54246d35bbe9ffe968ee183-1697695772/IMG-20231019-WA0002/create-and-design-custom-font-design-for-your-own-projects.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/022131c450f52fb5a47634b9f24ef0d4-1693403738/Heading%20Font/create-and-design-custom-font-design-for-your-own-projects.png', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/69e1de8b0eeeaea6afcb37ef4d4590d9-1693314962/Massive-1/create-and-design-custom-font-design-for-your-own-projects.png', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/932ba0440484a72ba8eb43e458315fea-1673976124/Complete/create-and-design-custom-font-design-for-your-own-projects.png'],
    ['https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/144181078/original/650df8470dc24f152502963672f5d740bf5fb930/do-business-logo-design.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/144181078/original/b74182de4d8a73a15a56ba74e4676664dd760e43/do-business-logo-design.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/144181078/original/e88627b8acefa42c2f020e1bef4c58d699498b47/do-business-logo-design.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/fff6e178b55d961f4c8aca749806b3ff-1679413543/358EC172-A452-48CF-A0AD-441592AAF040/do-business-logo-design.jpeg'],
    ['https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/15719089/original/4a6b8991f0aa110716d08b6b4f92896c6a82eb3a/do-unique-and-professional-logo-design.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/15719089/original/811e0a35007d2841c9948d287fa0ceb9b8c05c30/do-unique-and-professional-logo-design.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/15719089/original/17b357d81c5cf1847d42877c34b4a407fb5e33b4/do-unique-and-professional-logo-design.jpg', 'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20230607/Logo%20Design%20Modern%203_zkn7sv.jpg'],
    ['https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/50672784/original/7da55cf8d5be59284cd5c816f4ea2b946812b354/do-awesome-logo-design.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/50672784/original/8448226d0b6a7459fd8d06ca6ce240386a9d5772/do-awesome-logo-design.jpg', 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/50672784/original/ba7598ae8d3450b8166fbe48f833b30422f4638b/do-awesome-logo-design.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/e4972aa1f6140b00d6317ae1f793644a-1698386506/preview/do-awesome-logo-design.jpg', 'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/a4825e9885d8a5782333fa37fb18cb66-1698210371/preview%20(2)/do-awesome-logo-design.jpg']

]

function getImgs() {

    return gigImages[utilService.getRandomIntInclusive(0,13)]
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




