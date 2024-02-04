import { NavLink } from "react-router-dom";
import "./Header.css";
export default function Header() {
    return (
        <div className={'navigation-header'}>
            <NavLink to="/home" className={({ isActive }) => isActive? "link link-active":"link"}>Accueil</NavLink>
            <NavLink to="/list" className={({ isActive }) => isActive? "link link-active":"link"}>Mes listes</NavLink>
        </div>
    )
}