import { NavLink } from "react-router-dom";
import "./Footer.css";
export default function Footer() {
    return (
        <div className={'navigation-footer'}>
            <NavLink to="/mordheimHelper/home" className={({ isActive }) => isActive? "link link-active":"link"}>Accueil</NavLink>
            <NavLink to="/mordheimHelper/list" className={({ isActive }) => isActive? "link link-active":"link"}>Listes</NavLink>
            <NavLink to="/mordheimHelper/atlas" className={({ isActive }) => isActive? "link link-active":"link"}>Atlas</NavLink>
        </div>
    )
}