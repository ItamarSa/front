import { Link } from "react-router-dom";
import { CategoriesCmp } from "./CategoriesCmp";
import { loadGigs } from "../store/action/gig.actions";
import { userService } from "../services/user.service";

export function MobileFooter() {
const user =userService.getLoggedinUser()


    return (
        <footer className="sticky-footer">
            <div class="container main-container">
                <div className="footer-nav">
                    <Link className="nav-link" to='/'>
                    <i class="fa-solid fa-house-chimney"></i>
                    </Link>
                    <Link className="nav-link" to='/gigs'>
                        <i class="fa-solid fa-table-list"></i>
                    </Link>
                    <Link className="nav-link" to='/gig/category'>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </Link>
                    <div class="li nav-link"><i class="fa-solid fa-clipboard-list"></i> </div>
                    <Link className="li nav-link" to={`user/${user?._id}`}>
                        <i class="fa-solid fa-circle-user"></i>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
