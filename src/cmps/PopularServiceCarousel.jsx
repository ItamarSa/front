// import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ServiceSlide } from './ServiceSlide';

export function PopularServiceCarousel() {
    const serviceData = [
        {
            imageSrc: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/logo-design-2x.png",
            altText: "Logo Design",
            title: "Logo Design",
            description: "Build your brand",
        },
        {
            imageSrc: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161249/social-2x.png",
            altText: "Social Media",
            title: "Social Media",
            description: "Reach more customers",
        },
        {
            imageSrc: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161245/animated-explainer-2x.png",
            altText: "Video Explainer",
            title: "Video Explainer",
            description: "Engage your audience",
        },
        {
            imageSrc: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161253/voice-over-2x.png",
            altText: "Voice Over",
            title: "Voice Over",
            description: "Share your massage",
        },
        {
            imageSrc: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/wordpress-2x.png",
            altText: "WordPress",
            title: "WordPress",
            description: "Customize your site",
        },
        {
            imageSrc: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/ai-artists-2x.png",
            altText: "AI Artist",
            title: "AI Artist",
            description: "Add talent to AI",
        },
        {
            imageSrc: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161238/book-covers-2x.png",
            altText: "Book Covers",
            title: "Book Covers",
            description: "Showcase your story",
        },
        {
            imageSrc: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161248/data-entry-2x.png",
            altText: "Data Entry",
            title: "Data Entry",
            description: "Learn your business",
        },
        {
            imageSrc: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/translation-2x.png",
            altText: "Translation",
            title: "Translation",
            description: "Go global",
        },
        {
            imageSrc: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161236/illustration-2x.png",
            altText: "Illustration",
            title: "Illustration",
            description: "Color your dreams",
        },
        {
            imageSrc: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/27f914ed7984fdd2d55aa1fb5e74bd6a-1690384243592/seo-2x.png",
            altText: "SEO",
            title: "SEO",
            description: "Unlock growth online",
        }
    ]

    const settings = {
        slidesToShow: 5,
        slidesToScroll: 4,
        nextArrow: <button type="button" className="slick-next">Next</button>,
        prevArrow: <button type="button" className="slick-prev">Previous</button>,
        speed:500,
    }

    let slider

    return (
        <>
            <div className="popular-services-slider">
                <h2 className="popular-service-title">
                    Popular services
                </h2>
                <Slider {...settings} ref={(c) => (slider = c)}>
                    {serviceData.map((service, index) => (
                        <ServiceSlide
                            key={index}
                            imageSrc={service.imageSrc}
                            altText={service.altText}
                            title={service.title}
                            description={service.description}
                        />
                    ))}
                </Slider>
            </div>
        </>
    )
}