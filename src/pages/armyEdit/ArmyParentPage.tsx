import React, {useEffect, useState} from "react";
import ArmyEditPage from "@/pages/armyEdit/ArmyEditPage";
import {useParams} from "react-router-dom";


export function ArmyParentPage() {
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