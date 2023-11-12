import { Link } from "react-router-dom";
import { CategoriesCmp } from "./CategoriesCmp";
import { loadGigs } from "../store/action/gig.actions";
import { userService } from "../services/user.service";
import { HiOutlineHome } from 'react-icons/hi';
import { AiOutlineTable } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { LuUserCircle2 } from 'react-icons/lu';

export function MobileFooter() {
    const user = userService.getLoggedinUser()


    return (
        <footer className="sticky-footer">
            <div className="container">
                <div className="footer-nav">
                    <Link className="nav-link" to='/'>
                        <h3 className="fa-solid clean-list"><HiOutlineHome /></h3>
                    </Link>
                    <Link className="nav-link" to='/gigs'>
                        <h3 className="fa-solid clean-list"><AiOutlineTable /></h3>
                    </Link>
                    <Link className="nav-link" to='/gig/category'>
                        <h3 className="fa-solid clean-list"><BiSearchAlt /></h3>
                    </Link>
                    <h3 className="fa-solid clean-list"><HiOutlineClipboardList /></h3>
                    <Link className="li nav-link" to={`user/${user?._id}`}>
                    <h3 className="fa-solid clean-list"><LuUserCircle2 /></h3>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
