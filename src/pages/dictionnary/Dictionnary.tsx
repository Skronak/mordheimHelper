import React, {useState} from "react";

import './Dictionnary.css';

export default function DictionnaryPage() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const DAYS = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
    ];

    const MONTHS = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
    ];

    const getDays = (val: number) => {
        new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0);
    }

    return (
        <>
        <div className={'dico-header'}>
            <button onClick={()=>setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 0))}>-</button>
            <div>{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</div>
            <button onClick={()=>setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0))}>+</button>
        </div>
            <div>
                {Array.from({length: currentDate.getDate()}).map((e, i) =>
                    <div className={'cell'}>{i}</div>
                )}
            </div>
        </>

    );
}
