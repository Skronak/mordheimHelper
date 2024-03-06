import React, {useState} from "react";
import {useDataStore} from "@/store/dataStore";
import { Accordion, AccordionItem, AccordionControl} from '@mantine/core';
import ArmySelectModal from "@/pages/armySearch/ArmySelectModal";
import {getArmyIcon} from "@/components/Utils";
import {useNavigate} from "react-router-dom";
import {useLocalStorageDataStore} from "@/store/localStorageDataStore";
import Layout from "@/pages/Layout";
import './listArmyPage.css';

export default function ListArmyPage() {
    const navigate = useNavigate();

    const {playerArmies, setPlayerArmies} = useLocalStorageDataStore();
    const {appData} = useDataStore();

    const [showPopup, setShowPopup] = useState(false);

    function deleteUserArmy(id: number) {
        let newPlayerArmies = playerArmies.filter(army => army.id !== id);
        setPlayerArmies(newPlayerArmies);
        localStorage.setItem('playerArmies', JSON.stringify(newPlayerArmies));
    }

    function duplicateArmy(id: number) {
        let armyToDuplicate = playerArmies.find(army => army.id === id)!;
        let armyDuplicated = structuredClone(armyToDuplicate);
        armyDuplicated.id=Math.max(...playerArmies.map(army=> +army.id))+1;
        let newPlayerArmies = [...playerArmies, armyDuplicated];

        setPlayerArmies(newPlayerArmies);
        localStorage.setItem('playerArmies', JSON.stringify(newPlayerArmies));
    }

    return (
      <Layout title={'WARBANDS'}>
        <div className={'list-army-page'}>
            <div className={'list-army-top-menu'}>
                <div>Availables list : {playerArmies.length}</div>
                <button className={'icon-button btn-plus'} onClick={() => setShowPopup(true)}><img src={'./assets/icons/icon_plus.svg'}/></button>
            </div>
            {showPopup && (
                <ArmySelectModal title="Race selection" onClose={() => setShowPopup(false)} data={appData}/>)}

            <div className="player-armies">
                {playerArmies && playerArmies.map(army => (
                  <span key={army.id} className={"user-army-row"}>
                        <button className="user-army-row-btn" onClick={() => navigate('/mordheimHelper/edit/' + army.id)}>
                            <img className={'army-field army-logo'} src={getArmyIcon(appData, army.raceId)}/>
                            <span className={'army-field'}>{army.name}</span>
                            <span className={'army-field'}>cost: {army.cost} gc</span>
                            <span className={'army-field hide-on-mobile'}>Race: {army.race}</span>
                            <span className={'army-field hide-on-mobile'}>Last update: {army.lastUpdate}</span>
                            <img className={'icon-go'} src={'./assets/icons/icon_chevron.svg'}/>
                        </button>
                        <button className={'icon-button btn-clone'} onClick={() => duplicateArmy(+army.id)}><img src={'./assets/icons/icon_clone.svg'}/></button>
                        <button className={'icon-button btn-delete'} onClick={() => deleteUserArmy(+army.id)}><img src={'./assets/icons/ico_delete.svg'}/></button>
                        </span>
                ))}
            </div>
        </div>
      </Layout>
    );
}
