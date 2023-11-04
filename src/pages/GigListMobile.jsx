import { utilService } from '../services/util.service'
import { GigPreview } from './GigPreview'
import Slider from 'react-slick';

const randomNum =utilService.getRandomIntInclusive(1, 999)
const arrowSymbol =<svg width="12" height="12" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="#222325"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg>
export function GigListMobile({ gigs,gigsTitle, onRemoveGig, onUpdateGig, isCurrentUser, slidesToShow, slidesToScroll }) {


    
        // Configure the settings for the carousel
        const settings = {
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToScroll,
          infinite: true, // Infinite loop
        };
      
        return (
          <>
              <h2 className="popular-service-title">{gigsTitle} </h2>
            <div className="list-subtitle flex space-between">
              <div className='services-amount'>
                {((gigs.length * 1000) + randomNum).toLocaleString()} services available
              </div>
              <div className="sort-by">Sort by: <span className='sort-option'>Best Selling {arrowSymbol}</span></div>
            </div>
            <Slider {...settings}>
              {gigs.map(gig => (
                <div key={gig._id} className='gig-preview'>
                  <GigPreview
                    gig={gig}
                    isCurrentUser={isCurrentUser}
                  />
                </div>
              ))}
            </Slider>
          </>
        );
      }
    