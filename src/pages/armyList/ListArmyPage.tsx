import React, {useState} from "react";
import './ListArmyPage.css';
import {useDataStore} from "@/store/dataStore";
import ArmySelectModal from "@/pages/armyList/ArmySelectModal";
import {getArmyIcon} from "@/components/Utils";
import {useNavigate} from "react-router-dom";
import {useLocalStorageDataStore} from "@/store/localStorageDataStore";
import Layout from "@/pages/Layout";

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
        <div className="content-container">
            <div>Availables list : {playerArmies.length}</div>
            <button className={"army-name"} onClick={() => setShowPopup(true)}>+</button>
            {showPopup && (
                <ArmySelectModal title="Selectionnez une armée" onClose={() => setShowPopup(false)} data={appData}/>)}
            <br/>
            <div className="player-armies">
                {playerArmies && playerArmies.map(army => (
                    <span key={army.id} className={"user-army-row"}>
                        <button className={"army-name btn-go"} onClick={() => navigate('/edit/' + army.id)}>
                            <img className={'army-logo'} src={getArmyIcon(appData, army.raceId)}/>
                            <span className={'army-name'}>{army.name}</span>
                            <span className={'army-name'}>cost: {army.cost} gc</span>
                            <span className={'army-name'}>Race: {army.race}</span>
                            <span className={'army-name'}>Last update: {army.lastUpdate}</span>
                            <img className={'icon-go'} src={'/src/assets/icons/icon_chevron.svg'}/>
                        </button>
                        <button className={'icon-button btn-clone'} onClick={() => duplicateArmy(+army.id)}><img src={'/src/assets/icons/icon_clone.svg'}/></button>
                        <button className={'icon-button btn-delete'} onClick={() => deleteUserArmy(+army.id)}><img src={'/src/assets/icons/ico_delete.svg'}/></button>
                        </span>
                ))}
            </div>
        </div>
      </Layout>
    );
}