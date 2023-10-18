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
    formatDateForTimeAgo
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
  




