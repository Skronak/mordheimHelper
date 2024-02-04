import React from "react";
import "./Home.css";

import {useNavigate} from "react-router-dom";
import {getAssetUrl, getPortraitAssetUrl} from "@/components/Utils";

export default function HomePage() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/list');
    };

    return (
        <>
            <div className="home-container-form">
                <img className={"home-logo"} src={getAssetUrl("mordheimLogo.png")}/>
                <button className='home-button' onClick={handleButtonClick}>ENTRER</button>
            </div>
            <img className={"home-footer"} src={getAssetUrl("footer.png")}/>
        </>);
}
