import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { TextFilterMain } from "../cmps/TextFilterMain";
import { TagFilterMain } from "../cmps/TagFilterMain";
import { setGigFilter } from "../store/action/gig.actions";

export function Hero() {
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
    function onSetFilterTag(filterBy) {
        console.log("filterBy tags:", filterBy);
        // Update local state for tags filter
        setFilterTags(filterBy.tags);
        // Update the store filter with both text and tags
        setGigFilter({ txt: filterText, tags: filterBy.tags });
    }

    function onSetFilterText(filterBy) {
        console.log("filterBy text:", filterBy);
        // Update local state for text filter
        setFilterText(filterBy.txt);
        // Update the store filter with both text and tags
        setGigFilter({ txt: filterBy.txt, tags: filterTags });
    }
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
        <section className="main-hero ">
            {mainImg.map((img, index) => (
                <div
                    key={img.altTxt}
                    className={`main-img-container  ${index === activeImageIndex ? 'active' : ''}`}
                >
                    <img src={img.imgSrc} alt={img.altTxt} />
                    <div className="img-title-overlay">
                        <h1 className="img-title">
                            Find the right <i>freelance</i>
                            <br />
                            service, right away
                        </h1>
                        <TextFilterMain onSetFilter={onSetFilterText} />
                        <TagFilterMain onSetFilter={onSetFilterTag} />
                    </div>
                </div>
            ))}
        </section>
    )
}