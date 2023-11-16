import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { utilService } from "../services/util.service";
import { gigService } from "../services/gig.service.local";
import { useDispatch, useSelector } from "react-redux";
import { loadGigs, setGigFilter } from "../store/action/gig.actions";

const gigTags = gigService.getGigTags().map(String)
const newTag = "LifeStyle";

if (!gigTags.includes(newTag)) {
  gigTags.push(newTag);
}const tagImages = {
    "Graphics-Design": "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg",
    "Digital-Marketing": "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/online-marketing.a3e9794.svg",
    "Writing-Translation": "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation.a787f2f.svg",
    "Video-Animation": "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation.1356999.svg",
    "Music-Audio": "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio.ede4c90.svg",
    "Programming-Tech": "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming.6ee5a90.svg",
    "Business": "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business.fabc3a7.svg",
    "LifeStyle": "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/lifestyle.112b348.svg",
    "Data": "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/data.855fe95.svg",
    "Photography": "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/photography.0cf5a3f.svg"
  };

export function CategoriesCmp() {
    const dispatch = useDispatch();
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy);
    const [filterByTags, setFilterByTags] = useState(filterBy.tags);
  
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
            try {
              loadGigs()
        
            } catch (err) {
              console.log('err:', err)
              showErrorMsg('Cannot load gigs')
            }
          }, [])
  
    useEffect(() => {
        setFilterByTags(filterBy.tags);
    }, [filterBy.tags]);
  
    const debouncedUpdateURL = utilService.debounce(updateURL, 500);
  
    function handleFilterChange(value, location) {
      if (location === 'tags') {
        const updatedFilter = { ...filterBy, tags: value };
        setGigFilter(updatedFilter);
      } else {
        const updatedFilter = { ...filterBy, txt: value };
        setGigFilter(updatedFilter);
      }
    }
  
    function handleTagButtonClick(tag) {
      debouncedUpdateURL({ tags: tag });
      setFilterByTags(tag);
      handleFilterChange(tag, 'tags');
    }
  
    function updateURL(params) {
      const queryString = new URLSearchParams(params).toString();
      navigate(`/gigs?${queryString}`);
    }

  return (
    <div className="main-catagories">
      <h2>You need it, we've got it</h2>
      <ul className="catagories-list">
        {gigTags.map((tag) => (
          <li key={tag}>
            <a
              onClick={() => handleTagButtonClick(tag)}
              className={`your-existing-selector ${filterByTags === tag ? "selected" : ""}`}
            >
              <img
                src={tagImages[tag]}
                alt={tag.replace("-", " ")}
                loading="lazy"
              />
              {tag.replace("-", " ")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )}

  
  
