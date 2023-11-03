import { Link } from "react-router-dom";
import { CategoriesCmp } from "./CategoriesCmp";
import { loadGigs } from "../store/action/gig.actions";

export function MobileFooter() {

   

    return (
        <footer className="sticky-footer">
            <div class="container main-container">
               <div className="footer-nav">
               <Link className="nav-link" to='/'>
                <i class="fa-solid fa-house"></i>
                </Link>
                <div class="li"> <i class="fa-solid fa-envelope"></i></div>
                <Link className="nav-link" to='/gig/category'>
                <i class="fa-solid fa-magnifying-glass"></i>
                </Link>
                <div class="li"><i class="fa-solid fa-clipboard-list"></i> </div>
                <div class="li"><i class="fa-solid fa-circle-user"></i></div>
               </div>
               
            </div> 

        </footer>
    )
}
