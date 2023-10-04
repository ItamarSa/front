export function ServiceSlide({ imageSrc, altText, title, description }) {
    return (
      <div className="slide">
        <img src={imageSrc} alt={altText} />
        <h4><small>{description}</small> <br />{title}</h4>
      </div>
    )
  }
  