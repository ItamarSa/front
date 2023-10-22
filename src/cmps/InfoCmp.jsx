import { useState } from "react"

export function InfoCmp() {
    const viSymbol = <svg width="24" height="24" viewBox="0 0 16 16" fill="#7A7D85" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z" /><path d="M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z" /></svg>
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)

    const playVideo = () => {
        setIsVideoPlaying(true)
    }

    return (
        <div className="info-container main-container full">
            <div className="info-section">
                <div className="info-txt">
                    <h2 className="info-title">The best part? Everything.</h2>
                    <ul>
                        <li>
                            <h6><span>{viSymbol}</span>Stick to your budget</h6>
                            <p>Find the right service for every price point. No hourly <br /> rates, just project-based pricing.</p>
                        </li>
                        <li>
                            <h6><span>{viSymbol}</span>Get quality work done quickly</h6>
                            <p>Hand your project over to a talented freelancer in <br /> minutes, get long-lasting results.</p>
                        </li>
                        <li>
                            <h6><span>{viSymbol}</span>Pay when you're happy</h6>
                            <p>Upfront quotes mean no surprises. Payments only get <br /> released when you approve.</p>
                        </li>
                        <li>
                            <h6><span>{viSymbol}</span>Count on 24/7 support</h6>
                            <p>Our round-the-clock support team is available to help <br /> anytime, anywhere.</p>
                        </li>

                    </ul>
                </div>
                <div className="video-modal">
                    <div className="video-background">
                        {isVideoPlaying ? (
                            <iframe
                                src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7"
                                title="Fiverr Video"
                                width="640"
                                height="360"
                                allowFullScreen
                                id="video-frame"
                            />
                        ) : (
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/desktop-play-button.bab1740.png"
                                alt="Play Button"
                                className="play-button"
                                onClick={playVideo}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}