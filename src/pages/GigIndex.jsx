import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadGigs, addGig, updateGig, removeGig, setGigFilter } from '../store/action/gig.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { gigService } from '../services/gig.service.local.js'
import { GigList } from './GigList.jsx'
import { Link, useLocation } from 'react-router-dom'

export function GigIndex() {

    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector(storeState => storeState.gigModule.filterBy)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tags = queryParams.get('tags');
    const textFilter = queryParams.get('textFilter');
    const [fromPrice, setFromPrice] = useState(''); // State variable for "from price"
    const [toPrice, setToPrice] = useState('');     // State variable for "to price"
    const [filteredGigs, setFilteredGigs] = useState(gigs); // Initialize with all gigs
    const [areFiltersActive, setFiltersActive] = useState(false);
    const [delivery, setDelivery] = useState('Any time'); // Set 'Any time' as the default value
    const deliveryOptionMap = {
        '1 day': 1,
        'Up to 3 days': 3,
        'Up to 7 days': 7,
        'Any time': null, // Use null to indicate any time
    };


    const homeSymbol = <svg width="14" height="14" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#404145"><path d="M12.773 14.5H3.227a.692.692 0 0 1-.482-.194.652.652 0 0 1-.2-.468V7.884H.5l7.041-6.212a.694.694 0 0 1 .918 0L15.5 7.884h-2.046v5.954a.652.652 0 0 1-.2.468.692.692 0 0 1-.481.194Zm-4.091-1.323h3.409V6.664L8 3.056 3.91 6.664v6.513h3.408v-3.97h1.364v3.97Z"></path></svg>

    useEffect(() => {
        try {
            loadGigs()
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot load toys')
        }
    }, [filterBy])


    const filterGigs = () => {
        const filtered = gigs.filter(gig => {



            // Filter based on tags from the AppHeader component
            const tagFilters = filterBy.tags;
            const gigTags = gig.tags.map(tag => tag.toLowerCase());

            if (tagFilters.length > 0) {
                if (!tagFilters.every(tag => gigTags.includes(tag.toLowerCase()))) {
                    return false;
                }
            }

            // Filter based on budget
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




            return true; // Include gig if it passes all filters
        });


        setFilteredGigs(filtered);
    };

    // Handle filter changes when tags or budget change
    useEffect(() => {
        filterGigs();
    }, [filterBy, fromPrice, toPrice, textFilter]);
    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }
    const clearFilters = () => {
        setFromPrice('');
        setToPrice('');
        setFiltersActive(false);
        // You may also want to reset tag filters and textFilter here if needed.
        // Example: dispatch(setGigFilter({ tags: [], textFilter: '' }));
    };

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
        // Convert fromPrice and toPrice to numbers
        const fromPriceNumber = parseFloat(fromPrice);
        const toPriceNumber = parseFloat(toPrice);

        if (isNaN(fromPriceNumber) && isNaN(toPriceNumber)) {
            // Both "From Price" and "To Price" are empty, send all gigs
            setFilteredGigs(gigs);
        } else {
            // Filter gigs based on the price range
            const filtered = gigs.filter(gig => {
                const gigPrice = parseFloat(gig.price);
                return (
                    (isNaN(fromPriceNumber) || gigPrice >= fromPriceNumber) &&
                    (isNaN(toPriceNumber) || gigPrice <= toPriceNumber)
                );
            });

            // Update the filteredGigs state
            setFilteredGigs(filtered);
        }
    }
    const applyFilter = () => {
        // Apply the filter based on the selected delivery option
        filterGigs();
      };
      
      const clearAllFilters = () => {
        // Clear all filters
        setDelivery('Any time');
        // You can add additional code to clear other filters if needed
      };

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

    return (
        <div className='gigs'>
            <Link className='home-nav' to='/'>{homeSymbol}</Link>
            <h1>{tags}</h1>
            <main>

                {loggedInUser && (
                    <>
                        <button onClick={onAddGig}>Add Gig ⛐</button><br />
                        {/* <button>
                            <Link to='/edit'>Add Gig Customize</Link>
                        </button> */}
                    </>
                )}
                <div className="price-filter">
                    <input
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
                    />
                    <button onClick={onSearch}>Search</button>
                    <button onClick={clearFilters}>Clear Filters</button>
                </div>
                <select className='custom-select'
                    value={delivery}
                    onChange={e => setDelivery(e.target.value)}
                >
                    <option value="">Delivery time</option> {/* No default value selected */}
                    <option value="1 day">Express 24H</option>
                    <option value="Up to 3 days">Up to 3 days</option>
                    <option value="Up to 7 days">Up to 7 days</option>
                    <option value="Any time">Any time</option>
                </select>
                <button onClick={applyFilter}>Apply</button>
                <button onClick={clearAllFilters}>Clear All</button>
                <br />
                <GigList
                    gigs={filteredGigs} // Pass filtered gigs to GigList
                    onRemoveGig={onRemoveGig}
                    onUpdateGig={onUpdateGig}
                />
            </main>
        </div>
    );
}