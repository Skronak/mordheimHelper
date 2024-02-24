import React, {useEffect, useState} from "react";
import ArmyEditPage from "../../../../../src/pages/createArmy/ArmyEditPage";
import {useParams} from "react-router-dom";


export function ArmyPage() {
    let {idArmy} = useParams();
    let {idRace} = useParams();

    useEffect(() => {
        console.log(`idArmy/${idArmy}`);
        console.log(`idRace/${idRace}`);
    }, []);

    return (
      <ArmyEditPage raceId={!!idRace ? +idRace : undefined} armyId={!!idArmy? +idArmy : undefined}/>
    )
}