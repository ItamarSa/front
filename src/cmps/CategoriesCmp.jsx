import { Link } from "react-router-dom";

export function CategoriesCmp() {
    return (
        <div className="main-catagories">
            <h2 >You need it, we've got it</h2>
            <ul className="catagories-list">
                <li>
                <Link to={`/gigs?tags=Graphics-Design`}>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg" alt="Graphics &amp; Design" loading="lazy" />
                        Graphics & Design
                    </Link>
                </li>
                <li>
                <Link to={`/gigs?tags=Digital-Marketing`}>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/online-marketing.a3e9794.svg" alt="Digital Marketing" loading="lazy" />
                        Digital Marketing
                    </Link>
                </li>
                <li>
                    <Link to={`/gigs?tags=Writing-Translation`}>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation.a787f2f.svg" alt="Writing &amp; Translation" loading="lazy" />
                        Writing & Translation
                    </Link>
                </li>
                <li>
                    <Link to={`/gigs?tags=Video-Animation`}>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation.1356999.svg" alt="Video &amp; Animation" loading="lazy" />
                        Video & Animation
                    </Link>
                </li>
                <li>
                    <Link to={`/gigs?tags=Music-Audio`}>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio.ede4c90.svg" alt="Music &amp; Audio" loading="lazy" />
                        Music & Audio
                    </Link>
                </li>
                <li>
                    <Link to={`/gigs?tags=Programming-Tech`}>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming.6ee5a90.svg" alt="Programming &amp; Tech" loading="lazy" />
                        Programming & Tech
                    </Link>
                </li>
                <li>
                    <Link to={`/gigs?tags=Business`}>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business.fabc3a7.svg" alt="Business" loading="lazy" />
                        Business
                    </Link>
                </li>
                <li>
                    <Link to={`/gigs?tags=Lifestyle`}>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/lifestyle.112b348.svg" alt="Lifestyle" loading="lazy" />
                        Lifestyle
                    </Link>
                </li>
                <li>
                    <Link to={`/gigs?tags=Data`}>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/data.855fe95.svg" alt="Data" loading="lazy" />
                        Data
                    </Link>
                </li>
                <li>
                    <Link to={`/gigs?tags=Photography`}>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/photography.0cf5a3f.svg" alt="Photography" loading="lazy" />
                        Photography
                    </Link>
                </li>
            </ul>
        </div>
    )
}