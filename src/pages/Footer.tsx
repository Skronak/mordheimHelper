import { NavLink } from "react-router-dom";
import "./Footer.css";
export default function Footer() {
    return (
        <div className={'navigation-footer'}>
            <NavLink to="/home" className={({ isActive }) => isActive? "link link-active":"link"}>Accueil</NavLink>
            <NavLink to="/list" className={({ isActive }) => isActive? "link link-active":"link"}>Listes</NavLink>
            <NavLink to="/list" className={"link"}>Referentiel</NavLink>
        </div>
    )
}