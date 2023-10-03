import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export function PopularServiceCarousel() {
    const settings = {
        slidesToShow: 5,
        slidesToScroll: 4,
        nextArrow:<button type="button" class="slick-next">Next</button>,
        prevArrow:<button type="button" class="slick-prev">Previous</button>
      
    }

    let slider

    return (
        <>
            <div className="popular-services-slider">
                <h2 className="popular-service-title">
                    Popular services
                </h2>
                <Slider {...settings} ref={(c) => (slider = c)}>
                    <div className="slide">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/logo-design-2x.png" alt="Logo Design" />
                        <h4><small>Build your brand</small> <br />Logo Design</h4>
                    </div>
                    <div className="slide">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161249/social-2x.png" alt="Social Media" />
                        <h4><small>Reach more customers</small> <br />Social Media</h4>
                    </div>
                    <div className="slide">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161245/animated-explainer-2x.png" alt="Video Explainer" />
                        <h4><small>Engage your audience</small> <br />Video Explainer</h4>
                    </div>
                    <div className="slide">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161253/voice-over-2x.png" alt="Voice Over" />
                        <h4><small>Share your massage</small> <br />Voice Over</h4>
                    </div>
                    <div className="slide">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/wordpress-2x.png" alt="WordPress" />
                        <h4><small>Customize your site</small> <br />WordPress</h4>
                    </div>
                    <div className="slide">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/ai-artists-2x.png" alt="AI Artist" />
                        <h4><small>Add talent to AI</small> <br />AI Artist</h4>
                    </div>
                    <div className="slide">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161238/book-covers-2x.png" alt="Book Covers" />
                        <h4><small>Showcase your story</small> <br />Book Covers</h4>
                    </div>
                    <div className="slide">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161248/data-entry-2x.png" alt="Data Entry" />
                        <h4><small>Learn your business</small> <br />Data Entry</h4>
                    </div>
                    <div className="slide">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/translation-2x.png" alt="Translation" />
                        <h4><small>Go global</small> <br />Translation</h4>
                    </div>
                    <div className="slide">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161236/illustration-2x.png" alt="Illustration" />
                        <h4><small>Color your dreams</small> <br />Illustration</h4>
                    </div>
                    <div className="slide">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/27f914ed7984fdd2d55aa1fb5e74bd6a-1690384243592/seo-2x.png" alt="SEO" />
                        <h4><small>Unlock growth online</small> <br /> SEO</h4>
                    </div>
                </Slider>

            </div>
        </>
    )
}