import { Link } from "react-router-dom";
import { CategoriesCmp } from "./CategoriesCmp";
import { loadGigs } from "../store/action/gig.actions";
import { userService } from "../services/user.service";
import { HiOutlineHome } from 'react-icons/hi';
import { AiOutlineTable } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { LuUserCircle2 } from 'react-icons/lu';
import { useState } from "react";

export function MobileFooter() {
    const user = userService.getLoggedinUser()
    const [selectedButton, setSelectedButton] = useState(null)

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
      }


    return (
        <footer className="sticky-footer">
            <div className="container main-container">
                <div className="footer-nav">
                    <Link className="nav-link" to='/'>
                        <h3 className={`fa-solid clean-list ${selectedButton ==='home' ? 'selected' : ''}`} onClick={() => handleButtonClick('home')} ><HiOutlineHome /></h3>
                    </Link>
                    <Link className="nav-link" to='/gigs'>
                        <h3 className={`fa-solid clean-list ${selectedButton ==='gigs' ? 'selected' : ''}`} onClick={() => handleButtonClick('gigs')} ><AiOutlineTable /></h3>
                    </Link>
                    <Link className="nav-link" to='/gig/category'>
                    <h3 className={`fa-solid clean-list ${selectedButton ==='category' ? 'selected' : ''}`} onClick={() => handleButtonClick('category')} ><BiSearchAlt /></h3>
                    </Link>
                    <h3 className={`fa-solid clean-list ${selectedButton ==='orders' ? 'selected' : ''}`} onClick={() => handleButtonClick('orders')} ><HiOutlineClipboardList /></h3>
                    <Link className="li nav-link" to={`user/${user?._id}`}>
                    <h3 className={`fa-solid clean-list ${selectedButton ==='user' ? 'selected' : ''}`} onClick={() => handleButtonClick('user')} ><LuUserCircle2 /></h3>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
