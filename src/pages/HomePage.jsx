import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from '../cmps/Carousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TextFilterMain } from '../cmps/TextFilterMain';
import { loadGigs, setGigFilter } from '../store/action/gig.actions';
import { TagFilterMain } from '../cmps/TagFilterMain';
import '../assets/styles/setup/variables.scss'
import { InfoCmp } from '../cmps/InfoCmp';
import { CategoriesCmp } from '../cmps/CategoriesCmp';
import { GigList } from './GigList';
import { GigListMobile } from './GigListMobile';
import { CarouselMobile } from '../cmps/CarouselMobile';
import { gigService } from '../services/gig.service.local';

export function HomePage() {
  const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
  const [filter, setFilter] = useState(filterBy)
  const dispatch = useDispatch()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)

  const mainImg = [
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/jenny-2x.jpg',
      altTxt: 'Jenny Img',
      className: 'hero-jenny hero-background',
      backgroundColor: '#0a4226',
      iconImg: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499430/jenny-2x.png',
      job: `Children's Voice Over`,
      name: '@jenny',
      star: 5

    },
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616493/colin-2x.jpg',
      altTxt: 'Colin Img',
      className: 'hero-colin hero-background',
      backgroundColor: '#a7445a',
      iconImg: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499432/colin-2x.png',
      job: 'Creative Director',
      name: '@colinstark',
      star: 5
    },
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/scarlett-2x.jpg',
      altTxt: 'Scarlet Img',
      className: 'hero-scarlett hero-background',
      backgroundColor: '#5f1628',
      altTxt: 'Scarlett Img',
      className: 'hero-scarlett hero-background',
      iconImg: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499428/scarlett-2x.png',
      job: 'Business Founder',
      name: 'Scarlett'

    },
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616493/jordan-2x.jpg',
      altTxt: 'Jordan Img ',
      className: 'hero-jordan hero-background',
      backgroundColor: '#0f4926',
      iconImg: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499439/jordan-2x.png',
      job: 'Production Assistant',
      name: '@jordanruncie',
      star: 5

    },
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616497/christina-2x.jpg',
      altTxt: 'Christina Img',
      className: 'hero-christina hero-background',
      backgroundColor: '#ad3906',
      iconImg: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499422/christina-2x.png',
      job: 'jewelry Shop Owner',
      name: 'Christina'
    },
  ]
  const mainImgCount = mainImg.length

  const changeActiveImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % mainImgCount)
  }

  useEffect(() => {
      
    setGigFilter( filter )
}, [filter])

  useEffect(() => {
    try {
      loadGigs()

    } catch (err) {
      console.log('err:', err)
      showErrorMsg('Cannot load toys')
    }
  }, [])

  useEffect(() => {
    const intervalId = setInterval(changeActiveImage, 7000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])
  // function onSetFilterTag(filterBy) {
  //   setFilterTags(filterBy.tags)
  //   setGigFilter({ txt: filterText, tags: filterBy.tags })
  // }

  // function onSetFilterText(filterBy) {
  //   setFilterText(filterBy.txt)
  //   setGigFilter({ txt: filterBy.txt, tags: filterTags })
  // }

  function handleFilterChange(value, location) {
    if (location === "tags") {
        const filterToUpdate = { ...filter, tags: value }
        setFilter(filterToUpdate)
    }
    else {
        const filterToUpdate = { ...filter, txt: value }
        setFilter(filterToUpdate)
    }
}

  const sponsors = [
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png',
      altTxt: 'Meta',
    },
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png',
      altTxt: 'Google',
    },
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png',
      altTxt: 'Netflix',
    },
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png',
      altTxt: 'P&G',
    },
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png',
      altTxt: 'PayPAl',
    },
  ]

  return (
    <>
      <section className="main main-container full">
        <div className="image-slides-container full">
          {mainImg.map((img, index) => (
            <div
              key={img.altTxt}
              className={`image-slide ${index === activeImageIndex ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${img.imgSrc})`,
                backgroundColor: img.backgroundColor,
              }}
            >
              <div className='hero-icon flex'>
                <div >
                  <img className='user-img' src={img.iconImg} alt={img.altTxt} />
                </div>
                <div className='user-details flex'>
                  <div className='user-info flex'>
                    <div>{img.name}</div>
                    {img.star && <div className='user-rating flex align-center'>{img.star}
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none"><path d="M5.93263 1.00546C6.04001 0.736149 6.42121 0.736149 6.5286 1.00546L7.62159 3.74654C7.66741 3.86145 7.77521 3.93977 7.89866 3.94784L10.8433 4.1403C11.1326 4.15921 11.2504 4.52175 11.0275 4.7071L8.75833 6.59364C8.66321 6.67273 8.62203 6.79946 8.6525 6.91935L9.37942 9.77938C9.45084 10.0604 9.14244 10.2844 8.89727 10.1297L6.40185 8.55454C6.29724 8.48851 6.16399 8.48851 6.05938 8.55454L3.56396 10.1297C3.31879 10.2844 3.01039 10.0604 3.08181 9.77938L3.80872 6.91935C3.8392 6.79946 3.79802 6.67273 3.7029 6.59364L1.43372 4.7071C1.21078 4.52175 1.32858 4.15921 1.61789 4.1403L4.56257 3.94784C4.68601 3.93977 4.79381 3.86145 4.83963 3.74654L5.93263 1.00546Z" fill="white" /></svg>
                    </div>}

                  </div>
                  <div className='user-title'><b>{img.job}</b></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="img-title-overlay">
          <div className="content-container">
            <h1 className="img-title">
              Find the right <i>freelance</i>
              <br />
              service, right away
            </h1>
            <TextFilterMain handleFilterChange={handleFilterChange} />
            <div className="tag-filter-container">
              <span className="popular-label">Popular:</span>
              <TagFilterMain handleFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
        <div className="sponsor full">
          <ul>
            <span className="sponsor-title">Trusted by:</span>
            {sponsors.map((sponsor, index) => (
              <li key={index}>
                <img src={sponsor.imgSrc} alt={sponsor.altTxt} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className='carusleMobile'>
          <div>
            <CarouselMobile />
          </div>
          
        </div>
        <div className='explore'>
          <img src='../../src/assets/img/explore.jpg' alt="" />
        </div>
      <div className='mobile-gigs-container'>
      <div className='mobile-gigs-first'>
    <GigListMobile gigs={gigs} slidesToShow={1.5} slidesToScroll={3} gigsTitle={"Recently viewed & more"} />
  </div>
  <div className='explore'>
          <img src='../../src/assets/img/exp.jpg' alt="" />
        </div>
  <div className='mobile-gigs-seconde'>
    <GigListMobile gigs={gigs} slidesToShow={2.5} slidesToScroll={3} gigsTitle={'What new on Fiver?'}/>
</div>

      </div>
      <div className='carusale'>
            <Carousel />
          </div>
      <div className='video'>

        <InfoCmp />
      </div>
      <div className='category'>

        <CategoriesCmp />
      </div>
    </>
  )
}