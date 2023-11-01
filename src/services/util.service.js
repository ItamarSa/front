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
    makeRandomGigAbout,
    makeRandomLanguages,
    makeRandomUserAbout,
    makeLevel
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

function makeRandomLanguages() {
    const userLanguages = [
        ", French",
        ", Spanish",
        ", Chinese (Mandarin)",
        ", Arabic",
        ", Hindi",
        ", Russian",
        ", German",
        ", Portuguese",
        ", Japanese",
        ", Italian",
        ", Dutch",
        ", Korean",
        ", Turkish",
        ", Swedish",
        ", Greek",
        ", Polish",
        ", Hebrew",
        ", Vietnamese",
        "",
        "",
        "",
        "",
        "",
        ""
    ]

    return userLanguages[getRandomIntInclusive(0,22)]
}

function makeRandomUserAbout(){
    const aboutUser = [
        "Greetings! I'm a seasoned graphic designer proficient in crafting logos, print materials, web designs, and illustrations. I specialize in creating iconic logos for tech giants, non-profits, fitness and health brands, entertainment ventures, and real estate businesses. Place an order to get your standout logo design!",
        "Hello there! As a graphic designer, I offer a wealth of experience in developing logos, print designs, web solutions, and eye-catching illustrations. My portfolio includes logos for top-tier tech corporations, charitable organizations, wellness enterprises, entertainment firms, and real estate enterprises. Don't hesitate to request your stunning logo today!",
        "Hi, I'm a graphic designer with expertise in crafting logos, print assets, web graphics, and illustrations. I've worked with global tech companies, nonprofits, fitness and wellness businesses, entertainment industry players, and real estate enterprises, delivering exceptional logo designs. Get in touch to elevate your brand with a superb logo!",
        "Welcome! I'm a graphic designer with a track record of creating logos, print designs, web graphics, and compelling illustrations. My client list includes major tech firms, charitable institutions, fitness and health ventures, entertainment enterprises, and real estate companies. Order now for a remarkable logo!",
        "Hey, I'm a graphic designer skilled in producing logos, print materials, web visuals, and striking illustrations. I've designed logos for prominent tech organizations, charitable causes, fitness and wellness companies, entertainment projects, and real estate developments. Let's bring your logo vision to life!",
        "Greetings! I'm an experienced graphic designer adept at producing logos, print designs, web graphics, and captivating illustrations. My clientele spans global tech leaders, nonprofits, fitness and health brands, entertainment entities, and real estate enterprises. Secure your exceptional logo design today!",
        "Hello, I'm a graphic designer with a strong background in creating logos, print designs, web visuals, and unique illustrations. I've collaborated with prominent tech companies, charitable foundations, fitness and wellness brands, entertainment outlets, and real estate ventures. Transform your brand with a remarkable logo – order now!",
        "Hi there! I'm a graphic designer specializing in logos, print designs, web graphics, and creative illustrations. My portfolio includes logos designed for leading tech corporations, nonprofits, fitness and health enterprises, entertainment companies, and real estate developments. Don't miss out on an outstanding logo – place your order today!",
        "Welcome to my profile! I'm a skilled graphic designer with a knack for crafting logos, print materials, web designs, and captivating illustrations. I've created logos for renowned tech companies, charities, fitness and wellness businesses, entertainment ventures, and real estate projects. Elevate your brand with a remarkable logo – order now!",
        "Hey, I'm a graphic designer with a wealth of experience in logo design, print materials, web graphics, and imaginative illustrations. My client base includes top tech companies, nonprofits, fitness and health brands, entertainment industry players, and real estate businesses. Secure your standout logo today!",
        "I'm at the helm of a dynamic, small-scale digital marketing agency, currently headquartered in Greece. Previously, we operated out of Miami for 5 years and London for 13 years. Our unwavering commitment is to assist small and medium-sized enterprises in fulfilling their online requirements. Notable achievements include serving as the Official Web Designers for the Chicago Thanksgiving Parade and TEDx Events for 3 years.",
        "Greetings! I'm the leader of a highly creative digital marketing agency, and we're presently situated in Greece. Previously, we called Miami our home for 5 years and London for 13 years. Our primary mission is to empower small and medium-sized businesses with their online endeavors. Our portfolio includes prestigious projects such as being the Official Web Designers for the Chicago Thanksgiving Parade and TEDx Events for 3 consecutive years.",
        "Hello, I head a small yet highly innovative digital marketing agency, with our current base in Greece. Before that, we had a 5-year stint in Miami and 13 years in London. Our core focus is assisting small and medium-sized businesses in their online ventures. Our achievements include serving as the Official Web Designers for the Chicago Thanksgiving Parade and TEDx Events for 3 years.",
        "Hi there! I'm the driving force behind a small, highly creative digital marketing agency, currently operating from Greece. We previously called Miami our home for 5 years and London for 13 years. We're wholeheartedly dedicated to supporting small and medium-sized businesses with their online requirements. Notable mentions in our portfolio include being the Official Web Designers for the Chicago Thanksgiving Parade and TEDx Events for 3 years.",
        "Hey, I'm the leader of a dynamic digital marketing agency, and we're currently based in Greece. Before that, we spent 5 years in Miami and 13 years in London. Our primary mission is to assist small and medium-sized businesses with their online needs. Our outstanding projects include serving as the Official Web Designers for the Chicago Thanksgiving Parade and TEDx Events for 3 years.",
        "I'm the head of a small, highly creative digital marketing agency, with our current base in Greece. Prior to this, we operated from Miami for 5 years and London for 13 years. Our unwavering commitment is to help small and medium-sized businesses fulfill their online requirements. Notable achievements include being the Official Web Designers for the Chicago Thanksgiving Parade and TEDx Events for 3 years.",
        "Welcome to our agency! I lead a forward-thinking digital marketing firm, now situated in Greece. Previously, we were based in Miami for 5 years and London for 13 years. Our central focus is supporting small and medium-sized enterprises in their online endeavors. Our impressive portfolio features projects like being the Official Web Designers for the Chicago Thanksgiving Parade and TEDx Events for 3 consecutive years.",
        "Hello, I'm the leader of a small yet highly innovative digital marketing agency, and we're currently headquartered in Greece. Before this, we had a presence in Miami for 5 years and London for 13 years. Our primary mission is to assist small and medium-sized businesses in their online ventures. Notable mentions in our portfolio include being the Official Web Designers for the Chicago Thanksgiving Parade and TEDx Events for 3 years.",
        "Hi there! I'm at the helm of a creative digital marketing agency, currently based in Greece. Our previous homes include Miami for 5 years and London for 13 years. We're committed to helping small and medium-sized businesses with their online needs. Our achievements include serving as the Official Web Designers for the Chicago Thanksgiving Parade and TEDx Events for 3 years.",
        "Greetings! I lead a small, highly creative digital marketing agency. We're currently located in Greece, but we have a history in Miami for 5 years and London for 13 years. Our core dedication is to assist small and medium-sized businesses in fulfilling their online requirements. We take pride in being the Official Web Designers for the Chicago Thanksgiving Parade and TEDx Events for 3 years."
    
    ]
    return aboutUser[getRandomIntInclusive(0,19)]
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
    var word = ''
    let tags = []
    while (size > 0) {
        size--
        word = words[Math.floor(Math.random() * words.length)] + ''
        tags.push(word)
    }
    return tags
}
function makeLevel(size = 1) {
    var words = [
        'Level 1',
        'Level 2',
        'Top Rated',
        'VIP',
        'Pro'
    ]
    var word = ''
    let levels = []
    while (size > 0) {
        size--
        word = words[Math.floor(Math.random() * words.length)] + ''
        levels.push(word)
    }
    return levels
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





