import React from "react";
import "./HomePage.css";

import {useNavigate} from "react-router-dom";
import {getAssetUrl, getPortraitAssetUrl} from "@/components/Utils";
import Layout from "@/pages/Layout";

export default function HomePage() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/list');
    };

    return (
          <Layout>
              <div className="home-content-container">
                  <img className={"home-logo"} src={getAssetUrl("mordheimLogo.png")}/>
                  <div>RULES</div>
                  <button disabled={true} className='home-button' onClick={handleButtonClick}>Broheim</button>
                  <button className='home-button' onClick={handleButtonClick}>9TH AGE</button>
              </div>
          </Layout>
        );
}
