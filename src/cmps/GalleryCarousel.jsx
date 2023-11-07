import { useRef, useState } from "react"

const fullscreenSymbol = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2 2H6V0H0V6H2V2Z"></path><path d="M10 0V2H14V6H16V0H10Z"></path><path d="M14 14H10V16H16V10H14V14Z"></path><path d="M2 10H0V16H6V14H2V10Z"></path></svg>
export function GalleryCarousel({ gig }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [currentThumbIndex, setCurrentThumbIndex] = useState(0)
    const galleryRef = useRef(null)
    const thumbContainerRef = useRef(null)

    const goToPreviousSlide = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? gig.imgUrl.length - 1 : prevIndex - 1))
        setCurrentThumbIndex((prevIndex) => (prevIndex === 0 ? gig.imgUrl.length - 1 : prevIndex - 1))
    }

    const goToNextSlide = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === gig.imgUrl.length - 1 ? 0 : prevIndex + 1))
        setCurrentThumbIndex((prevIndex) => (prevIndex === gig.imgUrl.length - 1 ? 0 : prevIndex + 1))
    }

    const handleThumbClick = (index) => {
        setCurrentImageIndex(index);
        setCurrentThumbIndex(index);
      }

    const toggleFullscreen = () => {
        const element = galleryRef.current

        if (element.requestFullscreen) {
            element.requestFullscreen()
        }
    }
    

    return (
        <section className="gig-gallery">
            <div className="gallery-slides" ref={galleryRef}>
                <a onClick={goToPreviousSlide} className="nav-prev"></a>
                <a onClick={goToNextSlide} className="nav-next"></a>
                <div className="swipe-wrapper">
                    {gig.imgUrl.map((img, index) => (
                        <div className={`slide ${index === currentImageIndex ? "active" : ""}`}
                            key={index}
                        >
                            <div className="slide-img flex align-center">
                                <figure className="thumbnail flex align-center justify-center">
                                    <img src={img} alt="gig-img" />
                                </figure>
                                <div className="fullscreen flex align-center" onClick={toggleFullscreen}>
                                    <span className="fullscreen-icon">{fullscreenSymbol}</span>
                                    Full Screen
                                </div>

                            </div>
                        </div>
                    ))}


                </div>
            </div>
            <div className="gallery-thumbs">
                <a onClick={goToPreviousSlide} className="nav-prev-thumb"></a>
                <a onClick={goToNextSlide} className="nav-next-thumb"></a>
                <div className="thumb-container" ref={thumbContainerRef}>
                    {gig.imgUrl.map((img, index) => (
                        <a className={`thumb-slide  ${index === currentThumbIndex  ? "active" : ""}`} 
                        key={index}
                        onClick={() => handleThumbClick(index)}
                        >
                            <img className="thumb-img" src={img} alt="img-thumb" />
                        </a>
                    ))}
                </div>
            </div>

        </section>
    )

}