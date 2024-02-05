import React, {useState} from "react";
import './ListArmyPage.css';
import {useDataStore} from "@/store/dataStore";
import ArmySelectModal from "@/pages/armyList/ArmySelectModal";
import {getArmyIcon} from "@/components/Utils";
import {useNavigate} from "react-router-dom";
import {useLocalStorageDataStore} from "@/store/localStorageDataStore";

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
        <div className="content-container">
            <div>Availables list : {playerArmies.length}</div>
            <button className={"army-name"} onClick={() => setShowPopup(true)}>+</button>
            {showPopup && (
                <ArmySelectModal title="Selectionnez une armée" onClose={() => setShowPopup(false)} data={appData}/>)}
            <br/>
            <div className="player-armies">
                {playerArmies && playerArmies.map(army => (
                    <span key={army.id} className={"user-army-row"}>
                        <button className={"army-name"}>
                            <img className={'army-logo'} src={getArmyIcon(appData, army.race)}/>
                            <span className={'army-name'}>{army.name}</span>
                            <span> {army.cost}gc</span>
                        </button>
                        <button className={'icon-button'} onClick={() => navigate('/edit/' + army.id)}><img src={'/src/assets/icons/ico_arrow.svg'}/></button>
                        <button className={'icon-button'} onClick={() => duplicateArmy(+army.id)}><img src={'/src/assets/icons/ico_duplicate.svg'}/></button>
                        <button className={'icon-button'} onClick={() => deleteUserArmy(+army.id)}><img src={'/src/assets/icons/ico_delete.svg'}/></button>
                        </span>
                ))}
            </div>
        </div>
    );
}