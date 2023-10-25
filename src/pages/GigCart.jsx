import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { NavLink } from "react-router-dom"

export function GigCart({ gig }) {
    const navigate = useNavigate()
    const [list, setList] = useState(true)
    const [activeTab, setActiveTab] = useState("basic")
    const [modalText, setModalText] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const modalRef = useRef(null)
    const arrowClass = list ? "rotate-up" : "rotate-down"


    const vSymbol = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z" /></svg>
    const arrowSymbol = <svg fill="#fff" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M9.92332 2.96885C9.63854 2.66807 9.1768 2.66807 8.89202 2.96885C8.60723 3.26963 8.60723 3.75729 8.89202 4.05807L11.6958 7.01931H1.48616C1.08341 7.01931 0.756918 7.36413 0.756918 7.7895C0.756918 8.21487 1.08341 8.5597 1.48616 8.5597H11.8436L8.89202 11.677C8.60723 11.9778 8.60723 12.4654 8.89202 12.7662C9.1768 13.067 9.63854 13.067 9.92332 12.7662L14.0459 8.41213C14.3307 8.11135 14.3307 7.62369 14.0459 7.32291L13.977 7.25011C13.9737 7.24661 13.9704 7.24315 13.9671 7.23972L9.92332 2.96885Z" /></svg>
    const clockSymbol = <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path><path d="M9 4H7v5h5V7H9V4z"></path></svg>
    const unlimitedSymbol = <svg fill="#62646a" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M4.50001 11.4999C6.40001 13.3999 9.60001 13.3999 11.5 11.4999C12.2 10.7999 12.7 9.7999 12.9 8.7999L14.9 9.0999C14.7 10.5999 14 11.8999 13 12.8999C10.3 15.5999 5.90001 15.5999 3.10001 12.8999L0.900012 15.0999L0.200012 8.6999L6.60001 9.3999L4.50001 11.4999Z" /><path d="M15.8 7.2999L9.40001 6.5999L11.5 4.4999C9.60001 2.5999 6.40001 2.5999 4.50001 4.4999C3.80001 5.1999 3.30001 6.1999 3.10001 7.1999L1.10001 6.8999C1.30001 5.3999 2.00001 4.0999 3.00001 3.0999C4.40001 1.6999 6.10001 1.0999 7.90001 1.0999C9.70001 1.0999 11.5 1.7999 12.8 3.0999L15 0.899902L15.8 7.2999Z" /></svg>
    const ContactSymbol = <svg width="14" height="9" viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg"><path d="M0.190662 1.2721L0.809349 0.653381C0.955787 0.506943 1.19322 0.506943 1.33969 0.653381L7.00001 6.30022L12.6603 0.653381C12.8068 0.506944 13.0442 0.506944 13.1907 0.653381L13.8094 1.2721C13.9558 1.41854 13.9558 1.65597 13.8094 1.80244L7.26519 8.34663C7.11875 8.49307 6.88132 8.49307 6.73485 8.34663L0.190662 1.80244C0.0441933 1.65597 0.0441933 1.41854 0.190662 1.2721Z"></path></svg>

    function onContinue() {
        navigate('/gig/:gigId/payment')
    }
    const handleClick = () => {
        setList(!list)
    }
    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }
    const openModal = (text) => {
        setModalText(text)
        setIsModalOpen(true)
    }

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleComparePackagesClick = () => {
        openModal('Soon.....')
    }

    const handleContactMeClick = () => {
        openModal('Soon.....')
    }

    useEffect(() => {
        const closeOnOutsideClick = (e) => {
            if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal()
            }
        }

        document.addEventListener('mousedown', closeOnOutsideClick)

        return () => {
            document.removeEventListener('mousedown', closeOnOutsideClick)
        }
    }, [isModalOpen])
    function onContinue() {
        const lowerCaseActiveTab = activeTab.toLowerCase();
        let planPrice;
      
        if (lowerCaseActiveTab === "basic") {
          planPrice = gig.price;
        } else if (lowerCaseActiveTab === "standard") {
          planPrice = gig.price * 2;
        } else if (lowerCaseActiveTab === "premium") {
          planPrice = gig.price * 3;
        }
      
        navigate(`/gig/${gig._id}/payment?planType=${lowerCaseActiveTab}&planPrice=${planPrice}&planDelivery=${gig.owner.delivery}`);
      }
      





    


    return (
        <section className='main-cart'>
            <div className='cart-details'>

                <div className='nav-container'>
                    <label
                        className={`package-tab-1 ${activeTab === "basic" ? "active" : ""}`}
                        onClick={() => handleTabClick("basic")}
                    >
                        Basic
                    </label>
                    <label
                        className={`package-tab-2 ${activeTab === "standard" ? "active" : ""}`}
                        onClick={() => handleTabClick("standard")}
                    >
                        Standard
                    </label>
                    <label
                        className={`package-tab-3 ${activeTab === "premium" ? "active" : ""}`}
                        onClick={() => handleTabClick("premium")}
                    >
                        Premium
                    </label>
                </div>
                <div className="content-container">
                    {activeTab === "basic" && (
                        <article>
                            <div className="content">
                                <div className="title-content">
                                    <div className="type"><b>Basic</b></div>
                                    <div className="price"><span>{'$' + gig.price}</span></div>
                                </div>
                                <p>1 Page Website (1-3 sections), Basic SEO optimized, Responsive Design, Social Media</p>

                                <div className="additional-info">
                                    <div className="delivery-container">
                                        <span className="clock">
                                            {clockSymbol}
                                        </span>
                                        <b className="delivery">{' ' + gig.owner.delivery + '  Day Delivery'}</b>
                                    </div>
                                    <div className="revisions-container">
                                        <span className="revisions-icon">{unlimitedSymbol}</span>
                                        <b className="revisions">3 Revisions</b></div>
                                </div>
                                <div className="collapsable-package-item" onClick={handleClick}>
                                    <h4 className="collapsable-header" >What's Included </h4><span className={arrowClass}>{ContactSymbol}</span>
                                </div>
                                {list && (
                                    <ul className="clean-list">
                                        <li>{vSymbol} 1 concept included</li>
                                        <li>{vSymbol} Logo transparency</li>
                                        <li>{vSymbol} Vector file</li>
                                        <li>{vSymbol} Printable file</li>
                                        <li>{vSymbol} Include 3D mockup</li>
                                        <li>{vSymbol} Include source file</li>
                                    </ul>
                                )}
                            </div>


                        </article>
                    )}

                    {activeTab === "standard" && (
                        <article>
                            <div className="content">
                                <div className="title-content">
                                    <div className="type"><b>Standard</b></div>
                                    <div className="price"><span>{'$' + gig.price * 2}</span></div>
                                </div>
                                <p>3 Page Website (1-3 sections), Basic SEO optimized, Responsive Design, Social Media</p>

                                <div className="additional-info">
                                    <div className="delivery-container">
                                        <span className="clock">
                                            {clockSymbol}
                                        </span>
                                        <b className="delivery">{' ' + gig.owner.delivery + '  Day Delivery'}</b>
                                    </div>
                                    <div className="revisions-container">
                                        <span className="revisions-icon">{unlimitedSymbol}</span>
                                        <b className="revisions">3 Revisions</b></div>
                                </div>
                                <div className="collapsable-package-item" onClick={handleClick}>
                                    <h4 className="collapsable-header" >What's Included </h4><span className={arrowClass}>{ContactSymbol}</span></div>
                                {list && (
                                    <ul className="clean-list">
                                        <li>{vSymbol} 2 concept included</li>
                                        <li>{vSymbol} Logo transparency</li>
                                        <li>{vSymbol} Vector file</li>
                                        <li>{vSymbol} Printable file</li>
                                        <li>{vSymbol} Include 3D mockup</li>
                                        <li>{vSymbol} Include source file</li>
                                        <li>{vSymbol} Include 3D mockup</li>
                                        <li>{vSymbol} Include source file</li>
                                    </ul>
                                )}
                            </div>


                        </article>
                    )}

                    {activeTab === "premium" && (
                        <article>
                            <div className="content">
                                <div className="title-content">
                                    <div className="type"><b>Premium</b></div>
                                    <div className="price"><span>{'$' + gig.price * 3}</span></div>
                                </div>
                                <p>5 Page Website (1-3 sections), Basic SEO optimized, Responsive Design, Social Media</p>

                                <div className="additional-info">
                                    <div className="delivery-container">
                                        <span className="clock">
                                            {clockSymbol}
                                        </span>
                                        <b className="delivery">{' ' + gig.owner.delivery + '  Day Delivery'}</b>
                                    </div>
                                    <div className="revisions-container">
                                        <span className="revisions-icon">{unlimitedSymbol}</span>
                                        <b className="revisions">3 Revisions</b></div>
                                </div>
                                <div className="collapsable-package-item" onClick={handleClick}>
                                    <h4 className="collapsable-header" >What's Included </h4><span className={arrowClass}>{ContactSymbol}</span></div>
                                {list && (
                                    <ul className="clean-list">
                                        <li>{vSymbol} 3 concept included</li>
                                        <li>{vSymbol} Logo transparency</li>
                                        <li>{vSymbol} Vector file</li>
                                        <li>{vSymbol} Printable file</li>
                                        <li>{vSymbol} Include 3D mockup</li>
                                        <li>{vSymbol} Include source file</li>
                                        <li>{vSymbol} Printable file</li>
                                        <li>{vSymbol} Include 3D mockup</li>
                                        <li>{vSymbol} Include source file</li>
                                    </ul>
                                )}

                            </div>
                        </article>
                    )}

                </div>
                <footer className="cart-footer">
                    <button className="continue" onClick={() => onContinue(gig)}>
                        Continue
                        <span className="arrow">{arrowSymbol}</span>
                    </button>

                    <button className="compare" onClick={handleComparePackagesClick}>
                        Compare Packages
                    </button>
                </footer>
            </div>

            <div className="contact-me">

                <span className="seller-popover-content">
                    <button className="seller-options" onClick={handleContactMeClick}>
                        Contact me <span className="arrow-contact">{ContactSymbol}</span>
                    </button>
                </span>

            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content-small" ref={modalRef}>
                        <p>{modalText}</p>
                        <button onClick={closeModal} className="modal-button-buying">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}