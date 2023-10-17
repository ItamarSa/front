import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_COUNT } from '../store/reducer/user.reducer';
import { PopularServiceCarousel } from '../cmps/PopularServiceCarousel';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TextFilterMain } from '../cmps/TextFilterMain';
import { setGigFilter } from '../store/action/gig.actions';
import { TagFilterMain } from '../cmps/TagFilterMain';
import '../assets/styles/setup/variables.scss'
import { InfoCmp } from '../cmps/InfoCmp';
import { Hero } from '../cmps/Hero';

export function HomePage() {
  const dispatch = useDispatch();
  const count = useSelector((storeState) => storeState.userModule.count);
  const [filterText, setFilterText] = useState(""); // Local state for text filter
  const [filterTags, setFilterTags] = useState([]);





  function changeCount(diff) {
    // console.log('Changing count by:', diff);
    dispatch({ type: CHANGE_COUNT, diff });
  }
  function onSetFilterTag(filterBy) {
    // console.log("filterBy tags:", filterBy);
    // Update local state for tags filter
    setFilterTags(filterBy.tags);
    // Update the store filter with both text and tags
    setGigFilter({ txt: filterText, tags: filterBy.tags });
  }

  function onSetFilterText(filterBy) {
    // console.log("filterBy text:", filterBy);
    // Update local state for text filter
    setFilterText(filterBy.txt);
    // Update the store filter with both text and tags
    setGigFilter({ txt: filterBy.txt, tags: filterTags });
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
  ];



  //   const [searchText, setSearchText] = useState(''); // State for the input field

  //   const handleSearchInputChange = (e) => {
  //     // Update the state when the input value changes
  //     setSearchText(e.target.value);
  //   };

  //   const handleSearch = (e) => {
  //     e.preventDefault();
  //     // Use the `searchText` state variable in your search logic
  //     console.log('Searching for:', searchText);
  //   };

  // return (
  //   <>
  //     <section className="main">
  // const settings = {
  //   autoplaySpeed: 4000,
  //   autoplay: true,
  //   arrows: false,
  //   fade: true,
  //   speed: 700,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
  // let slider;

  //   const [searchText, setSearchText] = useState(''); // State for the input field

  //   const handleSearchInputChange = (e) => {
  //     // Update the state when the input value changes
  //     setSearchText(e.target.value);
  //   };

  //   const handleSearch = (e) => {
  //     e.preventDefault();
  //     // Use the `searchText` state variable in your search logic
  //     console.log('Searching for:', searchText);
  //   };

  return (
    <>
      <section className="main full">
        <Hero />

        <div className="img-title-overlay">
          <div className="content-container">
            <h1 className="img-title">
              Find the right <i>freelance</i>
              <br />
              service, right away
            </h1>
            <TextFilterMain onSetFilter={onSetFilterText} />
            <div className="tag-filter-container">
              <span className="popular-label">Popular :</span>
              <TagFilterMain onSetFilter={onSetFilterTag} />
            </div>
          </div>
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
      </section>
      <PopularServiceCarousel />
      <InfoCmp />
    </>
  );
}