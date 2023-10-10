import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_COUNT } from '../store/reducer/user.reducer';
import { TextFilterMain } from '../cmps/TextFilterMain';
import { setGigFilter } from '../store/action/gig.actions';
import { TagFilterMain } from '../cmps/TagFilterMain';
import { PopularServiceCarousel } from '../cmps/PopularServiceCarousel';
import { Hero } from './Hero';

export function HomePage() {
  const dispatch = useDispatch();
  const count = useSelector((storeState) => storeState.userModule.count);
  const [filterText, setFilterText] = useState(""); // Local state for text filter
  const [filterTags, setFilterTags] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const changeActiveImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % mainImg.length);
  };

  // Use setInterval to change the active image index every 4 seconds
  useEffect(() => {
    const intervalId = setInterval(changeActiveImage, 4000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function changeCount(diff) {
    console.log('Changing count by:', diff);
    dispatch({ type: CHANGE_COUNT, diff });
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
      altTxt: 'PayPal',
    },
  ];

  const mainImg = [
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616493/colin-2x.jpg',
      altTxt: 'Colin Img',
    },
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616493/jordan-2x.jpg',
      altTxt: 'Jordan Img ',
    },
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616497/christina-2x.jpg',
      altTxt: 'Christina Img',
    },
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/scarlett-2x.jpg',
      altTxt: 'Scarlet Img',
    },
    {
      imgSrc:
        'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,dpr_1.0/v1/attachments/generic_asset/asset/4637ac0b5e7bc7f247cd24c0ca9e36a3-1690384616487/jenny-2x.jpg',
      altTxt: 'Jenny Img',
    },
  ];

  return (
    <section className='main-home'>
      <div>
      <Hero/>
      </div>
      <div className="sponsor">
        <ul>
          <span className="sponsor-title">Trusted by:</span>
          {sponsors.map((sponsor, index) => (
            <li key={index}>
              <img src={sponsor.imgSrc} alt={sponsor.altTxt} />
            </li>
          ))}
        </ul>
      </div>
      <PopularServiceCarousel />
    </section>
  )
}
