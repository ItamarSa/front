export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getAssetSrc,
    makeTag,
    getEmptyReview,
    timeAgo,
    makeFlag,
    getEmptyOrder,
    formatDateForTimeAgo,
    makeRandomGigTitle,
    makeRandomGigAbout
}
function makeFlag(size = 1) {
    let flag = ''; // Change from const to let
    const randomIdx = Math.floor(Math.random() * 9)
    console.log('randomIdx:', randomIdx)
    const flags =
        [
            'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f5-1f1f9.png',
            'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f2-1f1fd.png',
            'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ed-1f1f7.png',
            'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1ed.png',
            'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png',
            'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1ea.png',
            'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png',
            'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1ff.png'
        ]
    const countryNames =
        [
            ' United States',
            'Portugal',
            'Mexico',
            'Croatia',
            'Switzerland',
            'Germany',
            'United Arab Emirates',
            'Austria',
            'Czech Republic',
        ]

    flag = [flags[randomIdx], countryNames[randomIdx]]

    return flag
}
function makeRandomGigTitle(index) {
    const gigTitles = [
        "I will design a professional business logo",
        "I will write a compelling sales copy for your product",
        "I will create a stunning website banner",
        "I will provide social media marketing consulting",
        "I will edit and enhance your photos",
        "I will craft a unique and catchy tagline for your brand",
        "I will create a custom WordPress website",
        "I will help you with SEO optimization",
        "I will translate documents in multiple languages",
        "I will record a voiceover for your video",
        "I will write a captivating blog post",
        "I will design eye-catching social media graphics",
        "I will set up and manage your Google Ads campaign",
        "I will offer professional financial advice",
        "I will create 3D product renderings",
        "I will develop a mobile app for your business",
        "I will provide legal consultation services",
        "I will proofread and edit your content",
        "I will teach you a new language",
        "I will design a custom T-shirt for your brand",
        "I will transform your ideas into stunning custom logos",
        "I will provide you with a vector art masterpiece for your brand"
    ]
    return gigTitles[index]
}

function makeRandomGigAbout(index) {
    const gigDescriptions = [
        "Hello there! I provide professional manual vector tracing and logo design services with a track record of 5+ years and a 100% client satisfaction rate. My services include converting any logo, image, text, or sketch into a high-quality vector format. I specialize in crafting unique and minimalistic logo designs. Need an existing logo edited or modified? I've got you covered. I can remove backgrounds to make them transparent and provide you with all the source files you need (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes? No problem. Choose me for fast, high-quality work, all at an affordable price. You'll receive print-ready files and enjoy unlimited revisions. Your satisfaction is my top priority. Send me your logo, image, text, or sketch and experience top-notch design services. And remember, I offer a fully refundable policy. If you have any questions, feel free to send me a direct message. Best Regards",
        "Welcome to my gig! With 5+ years of experience, I offer manual vector tracing and logo design services that guarantee 100% client satisfaction. I can convert any logo, image, text, or sketch into a high-quality vector format. If you're looking for a unique and minimalistic logo design, you're in the right place. I'm also here to help you with editing and modifying logos or making backgrounds transparent. You'll receive all the source files you need, including AI, EPS, PSD, SVG, PDF, DST, PNG, and JPG. If you need custom changes, I'm open to your requirements. My work is known for its speed and cleanliness, and I offer all this at a low cost. You can count on print-ready files and unlimited revisions. Your satisfaction is my utmost priority. Send me your logo, image, text, or sketch, and let's create something great together. I back my work with a fully refundable policy. If you have any questions, don't hesitate to reach out via direct message. Best Regards",
        "Greetings! I'm here to provide you with manual vector tracing and logo design services, backed by 5+ years of experience and a 100% client satisfaction rate. My expertise includes converting any logo, image, text, or sketch into a top-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and supply you with all the necessary source files, including AI, EPS, PSD, SVG, PDF, DST, PNG, and JPG. Custom changes are welcome to meet your specific requirements. When you choose me, you can expect fast and clean work, all at an affordable price. Your package comes with print-ready files and unlimited revisions. Your satisfaction is my top priority. Feel free to send me your logo, image, text, or sketch. I stand by a fully refundable policy, and if you have any questions, just drop me a direct message. Best Regards",
        "Hey there! I'm your go-to source for manual vector tracing and logo design services with 5+ years of experience and a flawless track record of client satisfaction. I specialize in converting any logo, image, text, or sketch into a top-notch vector format. Looking for a unique and minimalistic logo design? I've got you covered. I can also help you edit and modify existing logos, remove backgrounds for transparency, and provide all the essential source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my forte, and I'm here to meet your requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary concern. Share your logo, image, text, or sketch with me, and let's get started. Rest assured, I stand by a fully refundable policy. If you have any questions, don't hesitate to message me directly. Best Regards",
        "Greetings! I offer professional manual vector tracing and logo design services with over 5 years of experience and a 100% client satisfaction rate. I excel at converting any logo, image, text, or sketch into a high-quality vector format. If you're in the market for a unique and minimalistic logo design, you've come to the right place. I'm also here to assist with logo editing, background removal for transparency, and I provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific requirements. When you choose me, you'll receive fast and clean work, all at an affordable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my utmost priority. Send me your logo, image, text, or sketch, and let's create something remarkable together. I proudly stand by a fully refundable policy. If you have any questions, feel free to reach out via direct message. Best Regards",
        "Welcome! I'm your dedicated provider of manual vector tracing and logo design services, backed by 5+ years of experience and a perfect client satisfaction rate. My services encompass converting any logo, image, text, or sketch into a premium vector format. If you desire a unique and minimalistic logo design, you've come to the right place. I can also assist with logo editing, background removal for transparency, and I supply all the essential source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my forte, allowing me to meet your specific requirements. When you choose me, you'll experience fast and clean work, all at an affordable cost. Your package includes print-ready files and unlimited revisions. Your satisfaction is my highest priority. Don't hesitate to send me your logo, image, text, or sketch, and let's embark on a creative journey together. I firmly stand behind a fully refundable policy. For any inquiries, reach out via direct message. Best Regards",
        "Hi there! I'm your trusted source for manual vector tracing and logo design services, armed with over 5 years of experience and a flawless record of client satisfaction. My skills include transforming any logo, image, text, or sketch into a top-tier vector format. If you're on the hunt for a unique and minimalistic logo design, you've found the right place. I can also assist in logo editing, background removal for transparency, and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific needs. When you select me, you can expect fast and clean work, all at an unbeatable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my primary focus. Feel free to send me your logo, image, text, or sketch, and let's embark on a creative journey together. I confidently stand behind a fully refundable policy. If you have any questions, drop me a direct message. Best Regards",
        "Greetings! I'm here to offer my expertise in manual vector tracing and logo design, with 5+ years of experience and a solid reputation for client satisfaction. My services include transforming any logo, image, text, or sketch into a high-quality vector format. If you're seeking a unique and minimalistic logo design, you're in the right place. I can also assist in logo editing, background removal for transparency, and provide all the essential source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, and I'm here to meet your specific requirements. When you choose me, you'll receive fast and clean work, all at an affordable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my utmost priority. Share your logo, image, text, or sketch with me, and let's get started. I stand behind a fully refundable policy, and if you have any questions, don't hesitate to send me a direct message. Best Regards",
        "Hello there! I'm here to provide professional manual vector tracing and logo design services, backed by 5+ years of experience and a 100% client satisfaction rate. I specialize in converting any logo, image, text, or sketch into a high-quality vector format. If you're in search of a unique and minimalistic logo design, you've come to the right place. I'm also available for logo editing, background removal for transparency, and I supply all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific needs. When you choose me, you'll receive fast and clean work, all at an affordable cost. Your package includes print-ready files and unlimited revisions. Your satisfaction is my highest priority. Send me your logo, image, text, or sketch, and let's embark on a creative journey together. I proudly stand by a fully refundable policy. For any inquiries, reach out via direct message. Best Regards",
        "Welcome to my gig! I'm your dedicated provider of manual vector tracing and logo design services, with 5+ years of experience and a flawless client satisfaction record. My expertise includes converting any logo, image, text, or sketch into a premium vector format. If you're looking for a unique and minimalistic logo design, you're in the right place. I can also assist in logo editing, background removal for transparency, and I provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific requirements. When you select me, you can expect fast and clean work, all at an unbeatable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my top priority. Feel free to send me your logo, image, text, or sketch, and let's embark on a creative journey together. I firmly stand behind a fully refundable policy. If you have any questions, drop me a direct message. Best Regards",
        "Hey there! I'm your go-to source for manual vector tracing and logo design services, with 5+ years of experience and a perfect record of client satisfaction. I specialize in transforming any logo, image, text, or sketch into a high-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are welcome to meet your specific requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary focus. Share your logo, image, text, or sketch with me, and let's get started. I back my work with a fully refundable policy. If you have any questions, don't hesitate to message me directly. Best Regards",
        "Greetings! I'm your trusted source for manual vector tracing and logo design services, with 5+ years of experience and a perfect record of client satisfaction. I specialize in transforming any logo, image, text, or sketch into a high-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are welcome to meet your specific requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary focus. Share your logo, image, text, or sketch with me, and let's get started. I back my work with a fully refundable policy. If you have any questions, don't hesitate to message me directly. Best Regards",
        "Hello there! I'm here to provide professional manual vector tracing and logo design services, backed by 5+ years of experience and a 100% client satisfaction rate. I specialize in converting any logo, image, text, or sketch into a high-quality vector format. If you're in search of a unique and minimalistic logo design, you've come to the right place. I'm also available for logo editing, background removal for transparency, and I supply all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific needs. When you choose me, you'll receive fast and clean work, all at an affordable cost. Your package includes print-ready files and unlimited revisions. Your satisfaction is my highest priority. Send me your logo, image, text, or sketch, and let's embark on a creative journey together. I proudly stand by a fully refundable policy. For any inquiries, reach out via direct message. Best Regards",
        "Welcome to my gig! I'm your dedicated provider of manual vector tracing and logo design services, with 5+ years of experience and a flawless client satisfaction record. My expertise includes converting any logo, image, text, or sketch into a premium vector format. If you're looking for a unique and minimalistic logo design, you're in the right place. I can also assist in logo editing, background removal for transparency, and I provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific requirements. When you select me, you can expect fast and clean work, all at an unbeatable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my top priority. Feel free to send me your logo, image, text, or sketch, and let's embark on a creative journey together. I firmly stand behind a fully refundable policy. If you have any questions, drop me a direct message. Best Regards",
        "Hey there! I'm your go-to source for manual vector tracing and logo design services, with 5+ years of experience and a perfect record of client satisfaction. I specialize in transforming any logo, image, text, or sketch into a high-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are welcome to meet your specific requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary focus. Share your logo, image, text, or sketch with me, and let's get started. I back my work with a fully refundable policy. If you have any questions, don't hesitate to message me directly. Best Regards",
        "Greetings! I'm your trusted source for manual vector tracing and logo design services, with 5+ years of experience and a perfect record of client satisfaction. I specialize in transforming any logo, image, text, or sketch into a high-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are welcome to meet your specific requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary focus. Share your logo, image, text, or sketch with me, and let's get started. I back my work with a fully refundable policy. If you have any questions, don't hesitate to message me directly. Best Regards",
        "Hello there! I'm here to provide professional manual vector tracing and logo design services, backed by 5+ years of experience and a 100% client satisfaction rate. I specialize in converting any logo, image, text, or sketch into a high-quality vector format. If you're in search of a unique and minimalistic logo design, you've come to the right place. I'm also available for logo editing, background removal for transparency, and I supply all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific needs. When you choose me, you'll receive fast and clean work, all at an affordable cost. Your package includes print-ready files and unlimited revisions. Your satisfaction is my highest priority. Send me your logo, image, text, or sketch, and let's embark on a creative journey together. I proudly stand by a fully refundable policy. For any inquiries, reach out via direct message. Best Regards",
        "Welcome to my gig! I'm your dedicated provider of manual vector tracing and logo design services, with 5+ years of experience and a flawless client satisfaction record. My expertise includes converting any logo, image, text, or sketch into a premium vector format. If you're looking for a unique and minimalistic logo design, you're in the right place. I can also assist in logo editing, background removal for transparency, and I provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific requirements. When you select me, you can expect fast and clean work, all at an unbeatable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my top priority. Feel free to send me your logo, image, text, or sketch, and let's embark on a creative journey together. I firmly stand behind a fully refundable policy. If you have any questions, drop me a direct message. Best Regards",
        "Hey there! I'm your go-to source for manual vector tracing and logo design services, with 5+ years of experience and a perfect record of client satisfaction. I specialize in transforming any logo, image, text, or sketch into a high-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are welcome to meet your specific requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary focus. Share your logo, image, text, or sketch with me, and let's get started. I back my work with a fully refundable policy. If you have any questions, don't hesitate to message me directly. Best Regards",
        "Greetings! I'm your trusted source for manual vector tracing and logo design services, with 5+ years of experience and a perfect record of client satisfaction. I specialize in transforming any logo, image, text, or sketch into a high-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are welcome to meet your specific requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary focus. Share your logo, image, text, or sketch with me, and let's get started. I back my work with a fully refundable policy. If you have any questions, don't hesitate to message me directly. Best Regards",
        "Hello there! I'm here to provide professional manual vector tracing and logo design services, backed by 5+ years of experience and a 100% client satisfaction rate. I specialize in converting any logo, image, text, or sketch into a high-quality vector format. If you're in search of a unique and minimalistic logo design, you've come to the right place. I'm also available for logo editing, background removal for transparency, and I supply all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific needs. When you choose me, you'll receive fast and clean work, all at an affordable cost. Your package includes print-ready files and unlimited revisions. Your satisfaction is my highest priority. Send me your logo, image, text, or sketch, and let's embark on a creative journey together. I proudly stand by a fully refundable policy. For any inquiries, reach out via direct message. Best Regards",
        "Welcome to my gig! I'm your dedicated provider of manual vector tracing and logo design services, with 5+ years of experience and a flawless client satisfaction record. My expertise includes converting any logo, image, text, or sketch into a premium vector format. If you're looking for a unique and minimalistic logo design, you're in the right place. I can also assist in logo editing, background removal for transparency, and I provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific requirements. When you select me, you can expect fast and clean work, all at an unbeatable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my top priority. Feel free to send me your logo, image, text, or sketch, and let's embark on a creative journey together. I firmly stand behind a fully refundable policy. If you have any questions, drop me a direct message. Best Regards",
    ]
    return gigDescriptions[index]
}


function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}
function makeTag(size = 1) {
    var words = [
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
    var word = ''
    let tags = []
    while (size > 0) {
        size--
        word = words[Math.floor(Math.random() * words.length)] + ''
        tags.push(word)
    }
    return tags
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 600) {
    let timer;
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => func.apply(this, args), timeout)
    }
}


function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

// util function
function getAssetSrc(name) {
    const path = `/src/assets/${name}`
    const modules = import.meta.glob('/src/assets/*', { eager: true })
    const mod = modules[path]
    return mod.default
}
function getEmptyReview() {
    return {
        txt: '',
    }
}
function getEmptyOrder() {
    return {
        buyer: '',
        seller: '',
        price: 0,
        title: '',
    }
}
// function timeAgo(timestamp) {
//     const currentDate = new Date();
//     const inputDate = new Date(timestamp);
//     const timeDifference = currentDate - inputDate;

//     const seconds = Math.floor(timeDifference / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     const weeks = Math.floor(days / 7);
//     const months = Math.floor(weeks / 4);

//     if (months > 0) {
//         return `${months} month${months > 1 ? 's' : ''} ago`;
//     } else if (weeks > 0) {
//         return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
//     } else if (days > 0) {
//         return `${days} day${days > 1 ? 's' : ''} ago`;
//     } else if (hours > 0) {
//         return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//     } else if (minutes > 0) {
//         return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//     } else if (seconds > 0) {
//         return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
//     } else {
//         return 'Now';
//     }
function timeAgo(timestamp) {
    const currentDate = new Date();
    const inputDate = new Date(timestamp);
    const timeDifference = currentDate - inputDate;

    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
        return 'Now';
    }

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);

    if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
}
function formatDateForTimeAgo(date) {
    return date.getTime(); // Return the Unix timestamp
}





