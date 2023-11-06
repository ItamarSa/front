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
    makeLevel,
    makeUser
}

function makeUser(){
    let user = ''
    const randomIdx = Math.floor(Math.random() * 49)

    const users = [
        "John",
        "Mary",
        "Michael",
        "Jennifer",
        "David",
        "Linda",
        "William",
        "Patricia",
        "James",
        "Elizabeth",
        "Robert",
        "Susan",
        "Joseph",
        "Jessica",
        "Charles",
        "Sarah",
        "Thomas",
        "Karen",
        "Daniel",
        "Nancy",
        "Matthew",
        "Lisa",
        "Christopher",
        "Margaret",
        "Andrew",
        "Betty",
        "Joseph",
        "Dorothy",
        "Richard",
        "Sandra",
        "Donald",
        "Ashley",
        "Mark",
        "Kimberly",
        "Paul",
        "Donna",
        "George",
        "Emily",
        "Kenneth",
        "Michelle",
        "Steven",
        "Carol",
        "Edward",
        "Amanda",
        "Brian",
        "Melissa",
        "Ronald",
        "Deborah",
        "Timothy",
        "Stephanie"
    ]

    const imgUrls =
    [
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/6e299af8599edcaf99e46f35d32ee685-1602167220801/0539feda-a4a2-4584-a35a-cc93a0021231.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/bbd1f53f682ecbab77c063dc65e3079a-1680337212293/d37a8b71-25e3-4162-a4ba-d9db9b2e89a0.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d75ab573523ef3e82a0ee23d7b8a3b80-1685565527850/b150e9e8-6e47-40c2-b9c8-1902195f42b6.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/35bf547c0559cc5495f9f5656200b70a-1616491848929/f9092a79-86e9-4b7e-9a14-463ab51eaa60.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/40e94dc4f12a4150236a2ced68f48ddd-1691585513649/5d1bba7e-d520-49f5-b6b7-b68ed5794fb1.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/041db725ea45ce7027d60a816e7140fd-1684597409489/a2eb2303-ebc0-4385-ab0e-880fac96d2df.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/124d0fa9ef531e54107396003914eb47-1690822902222/408fb11b-74c1-4114-bed4-e724152ca92a.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/ffc13a6326576eab1aa379f00ef48680-1629201228504/8ac708c4-4ccb-4c95-87ea-13c12cc0faf5.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/57ddd0eda2225e13dafef778ad349d66-1646569555658/38ab23ee-ef96-4ad1-a42e-fd7c1f45d7c3.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/b6866757c1e5c09e5fb0a68a1f0fbec5-1692991413855/c7f79f6b-0888-41fc-8629-23dcc7e1ad10.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/6f6495acbedb5592c583dcbc93a5ae67-1601150174825/62c6322c-ac6f-496a-a115-da571c3ce284.jpeg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/779f81815c44941d15302794ebe3b517-1666614508698/859152ed-3d85-4113-afb4-fd27c5da838c.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/8036c8fd007c3d8fc9fb4e1c1cc27328-1515452820824/5e2f610a-3cd0-4661-9031-2763b7aaedb8.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/7848dc9045c4feda67fd5fcbbfe86056-1682512451894/2d1a0a74-26af-439e-9fea-76d2864e0d5a.png',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/b4fc7358cb8425c766aed6e4f932209a-1689935088482/6baf3561-f7b8-41c3-be9c-248ac1a27070.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/b4fc7358cb8425c766aed6e4f932209a-1689935088482/6baf3561-f7b8-41c3-be9c-248ac1a27070.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/54a5dbedfd400bc4d25e30a7e72cad92-1692681429296/ccee41e3-8dcf-46d2-8e2b-09e106b2736d.png',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/70dfa29a191690b1e1907c7969e5b72f-1651600335070/946c8357-16b5-450b-8c2d-faf62fa1ec81.png',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/139b41e521de7eff0cc4ef42cba8dd5e-1600616457070/0a0d7f23-fa35-4c98-b561-603571f78bc2.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/90fbf54bfba361104b16a358c9a1a075-1676062005369/d3dd052b-b3b3-4f30-b113-5e24c01dac04.png',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/9d11aaa89396a733134f8e7254796b3d-1686507346353/03b6c2fc-6df2-411c-bc49-fc1f9041fc73.jpeg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/1c164a2140309e551833e310320f95fb-1658856440067/13c39649-aef9-44da-863a-9f58bac80c27.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/ccec004c2d1d7a056745505d11c76a8b-1691265750805/c19f001b-bde9-4c46-b360-8a6fa6cf7593.png',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/ccec004c2d1d7a056745505d11c76a8b-1691265750805/c19f001b-bde9-4c46-b360-8a6fa6cf7593.png',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/0c1a0c386f14b4c472e00832adc83077-781682291583938229167/JPEG_20200311_195023_5612946499949116897.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/fd87fe232a2fd3de94e218fbf3b9e5d5-1688475619628/344caaf2-38a9-4b85-898e-8bafd1bc05df.jpeg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/eab5ef98cbcbf0fd677829c908bb69f3-1670871311477/ceb9c673-229d-4726-8961-ea315ff0748c.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/eab5ef98cbcbf0fd677829c908bb69f3-1670871311477/ceb9c673-229d-4726-8961-ea315ff0748c.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/93fe1a401ed77887cecde12a56f310f1-1585675186914/da782a20-10b8-43a5-85b7-526e594b90dd.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/e0b76c28140e850b66aa1923dbd0511b-1693238414344/5dc8e3d2-d28a-42fb-b53e-544bca3c3850.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/ef951d6707019b7fa12a8cfb7a2d1dde-1670524415653/54e94db9-354a-4d51-bc01-dcc02d47c6a2.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/26bab38ffc182517f10416be9943f8be-1604310351882/d0199720-5fab-462d-a9d9-8d2341a2a1a2.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/ef5922e666a5451c36ca65026d3e4f32-705946581691654589.568677/4418A03D-10B7-43D3-8336-BF76595E30DE',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/f4924a389ae8920a2efb55683828b5b7-954871061649863962.1254559/B1D0787F-FD1A-489D-B5E7-E8BF61414DD4',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/2cbb2e0e88a83c62d37869b9ca768511-1530559404286/1bd24c97-b298-46cd-9c33-8e0efca4035f.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/82daacc10784639998b3d39cca5a727c-1640973123032/927c80d7-a087-4916-a218-7ca8e64e1e99.png',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/8578b4dae07f09eaf5a4b5202a880b5d-1601681144489/4e4bedb6-eb45-47bd-91ac-d16e459f3607.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/b82325696d0d5cb7b0a2d1400009b6d1-1656705133491/c7b18dcd-f269-401c-b385-195dc683b46c.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/579cbd8d8a699f7acd8c0447e4a64e3c-1627174984954/9dc07c98-c13d-4b0a-b4b0-64d929d5bbc2.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/c716706d5919f96cb4d77b24ac77a9e9-1694466533671/8a456437-eb8e-4b64-b44c-f6217e351c29.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/b607e39b4dce693bb59e31cf77336b44-1677432742640/281c04a8-c8cf-40b5-a53b-cc0c0ea8e992.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/ea6574eaac2e42ed6b9a98c93eca7f13-926194821651549767.487833/3FFF3E55-9CDC-4BC2-8587-29684CB9048D',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/002ce6d9ba80ec78447e100a9028d205-1648214879536/5a3c789c-258a-4dc9-9abc-00fe72cc15b6.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/46e6455126d8a923200d43ef2644fc93-1589225243725/cd70ace3-8d5a-4ce5-b2fb-1462c7ed4635.png',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/a14f8e2be7fe1d31f970c4c4639c15a7-1692610637305/f21acc26-cd56-44c4-8f18-66e5b2835474.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/45b6e8183cfa6994c04c29a8b34b493c-1649659402370/b9a554c3-9bc0-42a5-a0ef-5c0497383a8c.png',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/012d7121de11f46b8424bb4e80c82bf9-1625158011011/1fb129b2-ac12-426a-8d5f-9a42362f02ec.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4136759f5fd0cec3276b9bc7a9e6290c-1521561730458/079dbeac-cb53-4097-b0df-b4a8c25c6bb6.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/717cbdab19ab3d6d9be3327857089e8c-1698914178117/f1fcb8ac-7529-4995-83d7-6b31deaeafa4.jpg',
        'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5c9f8afebaab04fd632d24c38de0bc31-1681216941364/9ed81fbd-fbf0-4b5d-8667-7a2255c0b9b4.jpg'
    ]

    return user = [users[randomIdx] ,imgUrls[randomIdx]]
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
        "I provide professional manual vector tracing and logo design services with a track record of 5+ years and a 100% client satisfaction rate. My services include converting any logo, image, text, or sketch into a high-quality vector format. I specialize in crafting unique and minimalistic logo designs. Need an existing logo edited or modified? I've got you covered. I can remove backgrounds to make them transparent and provide you with all the source files you need (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes? No problem. Choose me for fast, high-quality work, all at an affordable price. You'll receive print-ready files and enjoy unlimited revisions. Your satisfaction is my top priority. Send me your logo, image, text, or sketch and experience top-notch design services. And remember, I offer a fully refundable policy. If you have any questions, feel free to send me a direct message.",
        "With 5+ years of experience, I offer manual vector tracing and logo design services that guarantee 100% client satisfaction. I can convert any logo, image, text, or sketch into a high-quality vector format. If you're looking for a unique and minimalistic logo design, you're in the right place. I'm also here to help you with editing and modifying logos or making backgrounds transparent. You'll receive all the source files you need, including AI, EPS, PSD, SVG, PDF, DST, PNG, and JPG. If you need custom changes, I'm open to your requirements. My work is known for its speed and cleanliness, and I offer all this at a low cost. You can count on print-ready files and unlimited revisions. Your satisfaction is my utmost priority. Send me your logo, image, text, or sketch, and let's create something great together. I back my work with a fully refundable policy. If you have any questions, don't hesitate to reach out via direct message.",
        "I'm here to provide you with manual vector tracing and logo design services, backed by 5+ years of experience and a 100% client satisfaction rate. My expertise includes converting any logo, image, text, or sketch into a top-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and supply you with all the necessary source files, including AI, EPS, PSD, SVG, PDF, DST, PNG, and JPG. Custom changes are welcome to meet your specific requirements. When you choose me, you can expect fast and clean work, all at an affordable price. Your package comes with print-ready files and unlimited revisions. Your satisfaction is my top priority. Feel free to send me your logo, image, text, or sketch. I stand by a fully refundable policy, and if you have any questions, just drop me a direct message.",
        "I'm your go-to source for manual vector tracing and logo design services with 5+ years of experience and a flawless track record of client satisfaction. I specialize in converting any logo, image, text, or sketch into a top-notch vector format. Looking for a unique and minimalistic logo design? I've got you covered. I can also help you edit and modify existing logos, remove backgrounds for transparency, and provide all the essential source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my forte, and I'm here to meet your requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary concern. Share your logo, image, text, or sketch with me, and let's get started. Rest assured, I stand by a fully refundable policy. If you have any questions, don't hesitate to message me directly.",
        "I offer professional manual vector tracing and logo design services with over 5 years of experience and a 100% client satisfaction rate. I excel at converting any logo, image, text, or sketch into a high-quality vector format. If you're in the market for a unique and minimalistic logo design, you've come to the right place. I'm also here to assist with logo editing, background removal for transparency, and I provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific requirements. When you choose me, you'll receive fast and clean work, all at an affordable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my utmost priority. Send me your logo, image, text, or sketch, and let's create something remarkable together. I proudly stand by a fully refundable policy. If you have any questions, feel free to reach out via direct message.",
        "I'm your dedicated provider of manual vector tracing and logo design services, backed by 5+ years of experience and a perfect client satisfaction rate. My services encompass converting any logo, image, text, or sketch into a premium vector format. If you desire a unique and minimalistic logo design, you've come to the right place. I can also assist with logo editing, background removal for transparency, and I supply all the essential source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my forte, allowing me to meet your specific requirements. When you choose me, you'll experience fast and clean work, all at an affordable cost. Your package includes print-ready files and unlimited revisions. Your satisfaction is my highest priority. Don't hesitate to send me your logo, image, text, or sketch, and let's embark on a creative journey together. I firmly stand behind a fully refundable policy. For any inquiries, reach out via direct message.",
        "I'm your trusted source for manual vector tracing and logo design services, armed with over 5 years of experience and a flawless record of client satisfaction. My skills include transforming any logo, image, text, or sketch into a top-tier vector format. If you're on the hunt for a unique and minimalistic logo design, you've found the right place. I can also assist in logo editing, background removal for transparency, and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific needs. When you select me, you can expect fast and clean work, all at an unbeatable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my primary focus. Feel free to send me your logo, image, text, or sketch, and let's embark on a creative journey together. I confidently stand behind a fully refundable policy. If you have any questions, drop me a direct message.",
        "I'm here to offer my expertise in manual vector tracing and logo design, with 5+ years of experience and a solid reputation for client satisfaction. My services include transforming any logo, image, text, or sketch into a high-quality vector format. If you're seeking a unique and minimalistic logo design, you're in the right place. I can also assist in logo editing, background removal for transparency, and provide all the essential source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, and I'm here to meet your specific requirements. When you choose me, you'll receive fast and clean work, all at an affordable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my utmost priority. Share your logo, image, text, or sketch with me, and let's get started. I stand behind a fully refundable policy, and if you have any questions, don't hesitate to send me a direct message.",
        "I'm here to provide professional manual vector tracing and logo design services, backed by 5+ years of experience and a 100% client satisfaction rate. I specialize in converting any logo, image, text, or sketch into a high-quality vector format. If you're in search of a unique and minimalistic logo design, you've come to the right place. I'm also available for logo editing, background removal for transparency, and I supply all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific needs. When you choose me, you'll receive fast and clean work, all at an affordable cost. Your package includes print-ready files and unlimited revisions. Your satisfaction is my highest priority. Send me your logo, image, text, or sketch, and let's embark on a creative journey together. I proudly stand by a fully refundable policy. For any inquiries, reach out via direct message.",
        "I'm your dedicated provider of manual vector tracing and logo design services, with 5+ years of experience and a flawless client satisfaction record. My expertise includes converting any logo, image, text, or sketch into a premium vector format. If you're looking for a unique and minimalistic logo design, you're in the right place. I can also assist in logo editing, background removal for transparency, and I provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific requirements. When you select me, you can expect fast and clean work, all at an unbeatable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my top priority. Feel free to send me your logo, image, text, or sketch, and let's embark on a creative journey together. I firmly stand behind a fully refundable policy. If you have any questions, drop me a direct message.",
        "I'm your go-to source for manual vector tracing and logo design services, with 5+ years of experience and a perfect record of client satisfaction. I specialize in transforming any logo, image, text, or sketch into a high-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are welcome to meet your specific requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary focus. Share your logo, image, text, or sketch with me, and let's get started. I back my work with a fully refundable policy. If you have any questions, don't hesitate to message me directly.",
        "I'm your trusted source for manual vector tracing and logo design services, with 5+ years of experience and a perfect record of client satisfaction. I specialize in transforming any logo, image, text, or sketch into a high-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are welcome to meet your specific requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary focus. Share your logo, image, text, or sketch with me, and let's get started. I back my work with a fully refundable policy. If you have any questions, don't hesitate to message me directly.",
        "I'm here to provide professional manual vector tracing and logo design services, backed by 5+ years of experience and a 100% client satisfaction rate. I specialize in converting any logo, image, text, or sketch into a high-quality vector format. If you're in search of a unique and minimalistic logo design, you've come to the right place. I'm also available for logo editing, background removal for transparency, and I supply all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific needs. When you choose me, you'll receive fast and clean work, all at an affordable cost. Your package includes print-ready files and unlimited revisions. Your satisfaction is my highest priority. Send me your logo, image, text, or sketch, and let's embark on a creative journey together. I proudly stand by a fully refundable policy. For any inquiries, reach out via direct message.",
        "I'm your dedicated provider of manual vector tracing and logo design services, with 5+ years of experience and a flawless client satisfaction record. My expertise includes converting any logo, image, text, or sketch into a premium vector format. If you're looking for a unique and minimalistic logo design, you're in the right place. I can also assist in logo editing, background removal for transparency, and I provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific requirements. When you select me, you can expect fast and clean work, all at an unbeatable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my top priority. Feel free to send me your logo, image, text, or sketch, and let's embark on a creative journey together. I firmly stand behind a fully refundable policy. If you have any questions, drop me a direct message.",
        "I'm your go-to source for manual vector tracing and logo design services, with 5+ years of experience and a perfect record of client satisfaction. I specialize in transforming any logo, image, text, or sketch into a high-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are welcome to meet your specific requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary focus. Share your logo, image, text, or sketch with me, and let's get started. I back my work with a fully refundable policy. If you have any questions, don't hesitate to message me directly.",
        "I'm your trusted source for manual vector tracing and logo design services, with 5+ years of experience and a perfect record of client satisfaction. I specialize in transforming any logo, image, text, or sketch into a high-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are welcome to meet your specific requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary focus. Share your logo, image, text, or sketch with me, and let's get started. I back my work with a fully refundable policy. If you have any questions, don't hesitate to message me directly.",
        "I'm here to provide professional manual vector tracing and logo design services, backed by 5+ years of experience and a 100% client satisfaction rate. I specialize in converting any logo, image, text, or sketch into a high-quality vector format. If you're in search of a unique and minimalistic logo design, you've come to the right place. I'm also available for logo editing, background removal for transparency, and I supply all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific needs. When you choose me, you'll receive fast and clean work, all at an affordable cost. Your package includes print-ready files and unlimited revisions. Your satisfaction is my highest priority. Send me your logo, image, text, or sketch, and let's embark on a creative journey together. I proudly stand by a fully refundable policy. For any inquiries, reach out via direct message.",
        "I'm your dedicated provider of manual vector tracing and logo design services, with 5+ years of experience and a flawless client satisfaction record. My expertise includes converting any logo, image, text, or sketch into a premium vector format. If you're looking for a unique and minimalistic logo design, you're in the right place. I can also assist in logo editing, background removal for transparency, and I provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific requirements. When you select me, you can expect fast and clean work, all at an unbeatable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my top priority. Feel free to send me your logo, image, text, or sketch, and let's embark on a creative journey together. I firmly stand behind a fully refundable policy. If you have any questions, drop me a direct message.",
        "I'm your go-to source for manual vector tracing and logo design services, with 5+ years of experience and a perfect record of client satisfaction. I specialize in transforming any logo, image, text, or sketch into a high-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are welcome to meet your specific requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary focus. Share your logo, image, text, or sketch with me, and let's get started. I back my work with a fully refundable policy. If you have any questions, don't hesitate to message me directly.",
        "I'm your trusted source for manual vector tracing and logo design services, with 5+ years of experience and a perfect record of client satisfaction. I specialize in transforming any logo, image, text, or sketch into a high-quality vector format. Whether you need a unique and minimalistic logo design or you want to edit and modify an existing logo, I'm at your service. I can remove backgrounds to make them transparent and provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are welcome to meet your specific requirements. You can expect fast and clean work at an unbeatable price, along with print-ready files and unlimited revisions. Your satisfaction is my primary focus. Share your logo, image, text, or sketch with me, and let's get started. I back my work with a fully refundable policy. If you have any questions, don't hesitate to message me directly.",
        "I'm here to provide professional manual vector tracing and logo design services, backed by 5+ years of experience and a 100% client satisfaction rate. I specialize in converting any logo, image, text, or sketch into a high-quality vector format. If you're in search of a unique and minimalistic logo design, you've come to the right place. I'm also available for logo editing, background removal for transparency, and I supply all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific needs. When you choose me, you'll receive fast and clean work, all at an affordable cost. Your package includes print-ready files and unlimited revisions. Your satisfaction is my highest priority. Send me your logo, image, text, or sketch, and let's embark on a creative journey together. I proudly stand by a fully refundable policy. For any inquiries, reach out via direct message.",
        "I'm your dedicated provider of manual vector tracing and logo design services, with 5+ years of experience and a flawless client satisfaction record. My expertise includes converting any logo, image, text, or sketch into a premium vector format. If you're looking for a unique and minimalistic logo design, you're in the right place. I can also assist in logo editing, background removal for transparency, and I provide all the necessary source files (AI, EPS, PSD, SVG, PDF, DST, PNG, JPG). Custom changes are my specialty, tailored to your specific requirements. When you select me, you can expect fast and clean work, all at an unbeatable price. Your package includes print-ready files and unlimited revisions. Your satisfaction is my top priority. Feel free to send me your logo, image, text, or sketch, and let's embark on a creative journey together. I firmly stand behind a fully refundable policy. If you have any questions, drop me a direct message.",
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
        "I'm a seasoned graphic designer proficient in crafting logos, print materials, web designs, and illustrations. I specialize in creating iconic logos for tech giants, non-profits, fitness and health brands, entertainment ventures, and real estate businesses. Place an order to get your standout logo design!",
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





