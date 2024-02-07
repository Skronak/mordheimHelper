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
                  <button className='home-button' onClick={handleButtonClick}>ENTRER</button>
              </div>
              <img className={"home-footer"} src={getAssetUrl("footer.png")}/>
          </Layout>
        );
}
