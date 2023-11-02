import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadGigs, addGig, updateGig, removeGig, setGigFilter } from '../store/action/gig.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { gigService } from '../services/gig.service.local.js'
import { GigList } from './GigList.jsx'
import { Link, useLocation } from 'react-router-dom'
import { useClickOutside } from '../customHooks/clickOutside.jsx'


const homeSymbol = <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#404145"><path d="M12.773 14.5H3.227a.692.692 0 0 1-.482-.194.652.652 0 0 1-.2-.468V7.884H.5l7.041-6.212a.694.694 0 0 1 .918 0L15.5 7.884h-2.046v5.954a.652.652 0 0 1-.2.468.692.692 0 0 1-.481.194Zm-4.091-1.323h3.409V6.664L8 3.056 3.91 6.664v6.513h3.408v-3.97h1.364v3.97Z"></path></svg>
export function GigIndex() {

    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector(storeState => storeState.gigModule.filterBy)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tags = queryParams.get('tags');
    const textFilter = queryParams.get('textFilter');
    const [fromPrice, setFromPrice] = useState('');
    const [toPrice, setToPrice] = useState('');
    const [filteredGigs, setFilteredGigs] = useState(gigs);
    const [areFiltersActive, setFiltersActive] = useState(false);
    const [delivery, setDelivery] = useState('Any time');
    const [list, setList] = useState(false)
    const [isDeliveryOpen, setTime] = useState(false)
    const modalRef = useRef(null)
    const deliveryMenuRef = useRef(null);
    const budgetMenuRef = useRef(null);
    const arrowClass = list ? "rotate-up" : "rotate-down"
    const timeClass = isDeliveryOpen ? "rotate-up" : "rotate-down"
    const deliveryOptionMap = {
        '1 day': 1,
        'Up to 3 days': 3,
        'Up to 7 days': 7,
        'Any time': null,
    };

    useEffect(() => {
        try {
            loadGigs()
            
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot load toys')
        }
    }, [filterBy])

    useEffect(() => {
        window.scrollTo(0, 0)
    },[0])

    useClickOutside(deliveryMenuRef, handleClickOutSide)
    function handleClickOutSide() {
        console.log('handle click activated')
        if (isDeliveryOpen) {
            console.log("activating toggle  from handle")
            toggleDeliveryMenu()
        }
    }
    useClickOutside(budgetMenuRef, handleClickOutSideBudget)
    function handleClickOutSideBudget() {
        console.log('handle click activated')
        if (list) {
            console.log("activating toggle  from handle")
            toggleBudgetMenu()
        }
    }


    // useEffect(() => {
    //     const closeOnOutsideClick = (e) => {
    //         if ((list || isDeliveryOpen) && modalRef.current && !modalRef.current.contains(e.target)) {
    //             // Close both menus by setting list and time to false
    //             setList(false);
    //             setTime(false);
    //         }
    //     }

    //     document.addEventListener('mousedown', closeOnOutsideClick);

    //     return () => {
    //         document.removeEventListener('mousedown', closeOnOutsideClick)
    //     }
    // }, [list, isDeliveryOpen]);



    const filterGigs = () => {
        const filtered = gigs.filter(gig => {

            const tagFilters = filterBy.tags;
            const gigTags = gig.tags.map(tag => tag.toLowerCase());

            if (tagFilters.length > 0) {
                if (!tagFilters.every(tag => gigTags.includes(tag.toLowerCase()))) {
                    return false;
                }
            }

            if (fromPrice && toPrice) {
                const gigPrice = parseFloat(gig.price);
                if (gigPrice < parseFloat(fromPrice) || gigPrice > parseFloat(toPrice)) {
                    return false;
                }
            }
            if (textFilter) {
                const regex = new RegExp(textFilter, 'i');
                if (!gig.title.match(regex) && !gig.tags.some(tag => tag.match(regex))) {
                    return false;
                }
            }
            if (delivery !== 'Any time') {
                const selectedDeliveryOption = deliveryOptionMap[delivery];
                if (selectedDeliveryOption !== null && gig.owner && gig.owner.delivery !== selectedDeliveryOption) {
                    return false;
                }

            }

            const activeFilters = fromPrice || toPrice || (tagFilters.length > 0) || textFilter;
            setFiltersActive(activeFilters);




            return true;
        });


        setFilteredGigs(filtered);
    };


    useEffect(() => {
        filterGigs();
    }, [filterBy, textFilter]);


    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }

    async function onAddGig() {
        const gig = gigService.getDemoGig()
        try {
            const savedGig = await addGig(gig)
            showSuccessMsg(`Gig added (id: ${savedGig._id})`)
        } catch (err) {
            showErrorMsg('Cannot add gig')
        }
    }
    async function onUpdateGig(gig) {
        const price = +prompt('New price?')
        const gigToSave = { ...gig, price }
        try {
            const savedGig = await updateGig(gigToSave)
            showSuccessMsg(`Gig updated, new price: ${savedGig.price}`)
        } catch (err) {
            showErrorMsg('Cannot update gig')
        }
    }
    async function onSearch() {

        const fromPriceNumber = parseFloat(fromPrice);
        const toPriceNumber = parseFloat(toPrice);

        if (isNaN(fromPriceNumber) && isNaN(toPriceNumber)) {

            setFilteredGigs(gigs);
        } else {

            const filtered = gigs.filter(gig => {
                const gigPrice = parseFloat(gig.price);
                return (
                    (isNaN(fromPriceNumber) || gigPrice >= fromPriceNumber) &&
                    (isNaN(toPriceNumber) || gigPrice <= toPriceNumber)
                );
            });


            setFilteredGigs(filtered);
        }
    }
    const applyFilter = () => {
        filterGigs();
        toggleDeliveryMenu()
    };
    const applyFilterBudget = () => {
        filterGigs();
        toggleBudgetMenu()
    };

    const clearAllFilters = () => {
        setDelivery('Any time');
        filterGigs();

    };
    const clearFilters = () => {
        setFromPrice('');
        setToPrice('');
        setFiltersActive(false);

    };
    // const handleClick = (e) => {
    //     if (!e.target.matches('input')) {
    //         setList(!list);
    //     }
    // }

    function toggleDeliveryMenu(ev) {

        if (ev) ev.stopPropagation()
        console.log('toggle')
        setTime(!isDeliveryOpen)
    }
    function toggleBudgetMenu(ev) {
        if (ev) ev.stopPropagation()
        console.log('toggle')
        setList(!list)
    }
    // const handleTimeClick = (e) => {
    //     if (e.target.matches('label')) {
    //         console.log('label:', e.target)
    //         const input = e.target.querySelector('input');
    //         if (input) {
    //             input.click();
    //             setDelivery(input.value);
    //             console.log('setDelivery:', setDelivery)
    //         }
    //     }
    //     setTime(!isDeliveryOpen);
    // }
    // const handleClick = (e) => {
    //     if (!e.target.closest('.menu-content')) {
    //         setList(!list);
    //     }
    // }



    // function onAddGigMsg(gig) {
    //     console.log(`TODO Adding msg to gig`)
    // }
    // function shouldShowActionBtns(gig) {
    //     const user = userService.getLoggedinUser()
    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return gig.owner?._id === user._id
    // }
    const loggedInUser = userService.getLoggedinUser();
    let newTag = ''
    
    return (
        <div className='gigs'>
            <div className="list-head flex column ">
                <div className='home-nav flex align-center'>
                    <span className='home-symbol'><Link  to='/'>{homeSymbol}</Link></span>
                    
                    <small> / </small> 
                    {tags === null ? <Link to={`/gigs`}>Explore</Link> : <Link to={`/gigs?tags=${tags}`}>{newTag=tags.replace('-', ' & ')}</Link>}
                </div>
                <h1 className='gig-list-title'>{tags === null ? 'Explore Gigs in Tenner': newTag=tags.replace('-', ' & ')}</h1>
                <div className="explanation-video flex align-center">
                    <p className="subtitle">Find top freelancers and professional business tools for any project.</p>
                </div>
            </div>
            <main>

                {loggedInUser && (
                    <>
                        <button onClick={onAddGig}>Add Gig ⛐</button>
                        {/* <button>
                            <Link to='/edit'>Add Gig Customize</Link>
                        </button> */}
                    </>
                )}
                {/* <div className="price-filter"> */}
                {/* <input
                        type="number"
                        placeholder="From Price"
                        value={fromPrice}
                        onChange={(e) => setFromPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="To Price"
                        value={toPrice}
                        onChange={(e) => setToPrice(e.target.value)}
                    /> */}
                {/* <button onClick={onSearch}>Search</button>
                    <button onClick={clearFilters}>Clear Filters</button> */}
                {/* </div> */}

                <div className='inside-filters'>
                    <div className='floating-menu time-select' >
                        <div className="menu-title filter-menu" onClick={toggleDeliveryMenu}   >Delivery time
                            <span className={`glAQDp5 chevron-icon-down ${timeClass}`} style={{ width: '12px', height: '12px', ariaHidden: "true" }}>
                                <svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill">
                                    <path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path>
                                </svg>
                            </span>
                        </div>
                        {isDeliveryOpen && (
                            <div ref={deliveryMenuRef} className="menu-content">
                                <div className={`content-scroll ${isDeliveryOpen ? 'open' : ''}`} style={{ maxHeight: '440px' }}>


                                    <div className="radio-list">
                                        <div className="radio-item-wrapper">
                                            <label className={`  radio-item ${delivery === "1 day" ? 'selected' : ''}`}>
                                                <input
                                                    type='radio'
                                                    value='1 day'
                                                    checked={delivery === "1 day"}
                                                    onChange={() => { setDelivery('1 day') }}
                                                />
                                                <span className="ufdx0v7"></span>
                                                <div className="inner-radio">
                                                    <span>Express 24H</span>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="radio-item-wrapper">
                                            <label className={`  radio-item ${delivery === "Up to 3 days" ? 'selected' : ''}`}>
                                                <input
                                                    type='radio'
                                                    value='Up to 3 days'
                                                    checked={delivery === "Up to 3 days"}
                                                    onChange={() => { setDelivery('Up to 3 days') }}
                                                />
                                                <span className="ufdx0v7"></span>
                                                <div className="inner-radio">
                                                    <span>Up to 3 days</span>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="radio-item-wrapper">
                                            <label className={`  radio-item ${delivery === "Up to 7 days" ? 'selected' : ''}`}>
                                                <input
                                                    type='radio'
                                                    value='Up to 7 days'
                                                    checked={delivery === "Up to 7 days"}
                                                    onChange={() => { setDelivery('Up to 7 days') }}
                                                />
                                                <span className="ufdx0v7"></span>
                                                <div className="inner-radio">
                                                    <span>Up to 7 days</span>
                                                </div>
                                            </label>
                                        </div>
                                        <div className="radio-item-wrapper">
                                            <label className={`  radio-item ${delivery === "Any time" ? 'selected' : ''}`}>
                                                <input
                                                    type='radio'
                                                    value='Any time'
                                                    checked={delivery === "Any time"}
                                                    onChange={() => { setDelivery('Any time') }}
                                                />
                                                <span className="ufdx0v7"></span>
                                                <div className="inner-radio">
                                                    <span>Any time</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="button-row">
                                    <button className="sPdE5j4 EFWC9E5 a7588_a co-grey-1000 clear-all" onClick={clearAllFilters}>Clear All</button>
                                    <button className="sPdE5j4 FmssW6b co-white apply bg-co-black" onClick={applyFilter}>Apply</button>
                                </div>
                            </div>
                        )}
                    </div>





                    {/* <select
                    value={delivery}
                    onChange={e => setDelivery(e.target.value)}
                >
                    <option value="">Delivery time</option>
                    <option value="1 day">Express 24H</option>
                    <option value="Up to 3 days">Up to 3 days</option>
                    <option value="Up to 7 days">Up to 7 days</option>
                    <option value="Any time">Any time</option>
                </select>
                <button onClick={applyFilter}>Apply</button>
                <button onClick={clearAllFilters}>Clear All</button> */}
                    <br />
                    <div className="floating-menu">
                        <div className={`menu-title filter-menu ${list ? 'open' : ''}`} onClick={toggleBudgetMenu}>Budget
                            <span className={`glAQDp5 chevron-icon-down ${arrowClass}`} style={{ width: '12px', height: '12px' }} aria-hidden="true">
                                <svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill">
                                    <path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 
                            3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z">
                                    </path>
                                </svg>
                            </span>
                        </div>
                        {list && (
                            <div ref={budgetMenuRef} className="menu-content">
                                <div className={`content-scroll ${list ? 'open' : ''}`}
                                    style={{ maxHeight: '364px' }}>
                                    <div className="budget-filter">
                                        <div className="price-range-filter">
                                            <div className="price-range-filter-inputs p-b-16">
                                                <div className="input-wrapper">
                                                    <label>MIN.</label>
                                                    <input type="number"
                                                        name="gig_price_range"
                                                        className="min"
                                                        placeholder="Any"
                                                        min="0"
                                                        max="50000"
                                                        value={fromPrice}
                                                        onChange={(e) => setFromPrice(e.target.value)} />
                                                    {<i>$</i>}
                                                </div>
                                                <div className="input-wrapper">
                                                    <label>MAX.</label>
                                                    <input type="number"
                                                        name="gig_price_range"
                                                        id="gig_price_range_max"
                                                        className="max"
                                                        placeholder="Any"
                                                        min="0"
                                                        max="50000"
                                                        value={toPrice}
                                                        onChange={(e) => setToPrice(e.target.value)} />
                                                    <i>$</i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="button-row">
                                    <button onClick={clearFilters} className="sPdE5j4 EFWC9E5 a7588_a co-grey-1000 clear-all">Clear All</button>
                                    <button onClick={applyFilterBudget} className="sPdE5j4 FmssW6b co-white apply bg-co-black">Apply</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <GigList
                    gigs={filteredGigs}
                    onRemoveGig={onRemoveGig}
                    onUpdateGig={onUpdateGig}
                />
            </main>
        </div>
    );
}