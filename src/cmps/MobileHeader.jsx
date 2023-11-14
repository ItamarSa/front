import { Link } from "react-router-dom";
import { CategoriesCmp } from "./CategoriesCmp";
import { loadGigs, setGigFilter } from "../store/action/gig.actions";
import { userService } from "../services/user.service";
import { SlDiamond } from 'react-icons/sl';

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TextFilter } from "./TextFilter";
import { LoginModal } from "./LoginModal";
import { logout } from "../store/action/user.actions"


export function MobileHeader() {
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

    const user = useSelector((storeState) => storeState.userModule.user)
    console.log('user:', user)
    const [filter, setFilter] = useState(filterBy)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeModal = () => {
        setIsLoginModalOpen(false);
    };
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            // showErrorMsg('Cannot logout')
        }
    }


    useEffect(() => {

        setGigFilter(filter)
    }, [filter])
    

    function handleFilterChange(value, location) {
        if (location === "tags") {
            const filterToUpdate = { ...filter, tags: value }
            setFilter(filterToUpdate)
        }
        else {
            const filterToUpdate = { ...filter, txt: value }
            setFilter(filterToUpdate)
        }
    }


    return (
        <header className="sticky-header">
            <div className="main-header-container">
                <div className="container-header">
                    <div>
                        <Link className="btn" title="home" to="/">
                            <h1 className={"logo"}>Tenner</h1>
                        </Link>
                    </div>
                    <div>
                        {!user ? (
                            <li onClick={openModal} className={'nav btn btn-join clean-list'}>
                                <h3 className="fa-solid clean-list"><SlDiamond /></h3>
                            </li>
                        ) : (
                            <li className="out clean-list" onClick={onLogout}>Logout</li>
                        )}
                    </div>
                </div>
                <div className="filter-header">
                    <div className="search-text">
                        <TextFilter handleFilterChange={handleFilterChange} />
                    </div>
                </div>
            </div>
            {isLoginModalOpen && <LoginModal closeModal={closeModal} />}


        </header>
    )
}
