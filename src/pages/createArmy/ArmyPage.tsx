import React, {useEffect, useState} from "react";
import ArmyForm from "@/pages/createArmy/ArmyForm";
import {useParams} from "react-router-dom";
import Layout from "@/pages/Layout";

export function ArmyPage() {
    let {idArmy} = useParams();
    let {idRace} = useParams();

    useEffect(() => {
        console.log(`idArmy/${idArmy}`);
        console.log(`idRace/${idRace}`);
    }, []);

    return (
      <ArmyForm raceId={!!idRace ? +idRace : undefined} armyId={!!idArmy? +idArmy : undefined}/>
    )
}