import React, {useEffect, useState} from 'react';
import type {ArmyRef, PlayerArmy, PlayerUnit, UnitRef} from "@/army";
import "./armyEditPage.css";
import {useDataStore} from "@/store/dataStore";
import {useNavigate} from "react-router-dom";
import {useLocalStorageDataStore} from "@/store/localStorageDataStore";
import Row from "@/components/Row";
import Layout from "@/pages/Layout";
import {getAssetUrl} from "@/components/Utils";
import {Accordion} from "@mantine/core";
import '@mantine/carousel/styles.css';
import UnitPage from "@/pages/armyEdit/unitEdit/UnitPage";
import {capitalize} from "@mui/material";

interface Props {
    armyId?: number;
    raceId?: number;
}

const defaultPlayerArmy = {
    id: 0,
    name: "",
    race: "",
    raceId: 0,
    lastUpdate: "",
    cost: 0,
    units: []
}

function ArmyEditPage(props: Props) {
    const [modalUnitRefs, setModalUnitRefs] = useState<UnitRef[]>()
    const {appData} = useDataStore();
    const {playerArmies, setPlayerArmies} = useLocalStorageDataStore();
    const [open, setOpen] = React.useState(false);
    const [armyRef, setArmyRef] = useState<ArmyRef>();
    const [selectedPlayerUnit, setSelectedPlayerUnit] = useState<PlayerUnit>();
    const [playerArmy, setPlayerArmy] = useState<PlayerArmy>(defaultPlayerArmy);
    const navigate = useNavigate();
    let unitType = ['heroes', 'henchmen'];

    useEffect(() => {
        let raceId = props.raceId;
        if (!!props.armyId) { // EDIT MODE
            let army = playerArmies.find(army => army.id === props.armyId!);
            if (army) {
                raceId = army.raceId;
                setPlayerArmy(army);
            }
        } else if (!!props.raceId) { // NEW ARMY
            setPlayerArmy({
                ...playerArmy,
                id: playerArmies.length > 0 ? Math.max(...playerArmies.map(army => +army.id)) + 1 : 1,
                raceId: raceId!,
                lastUpdate: new Date().toLocaleDateString(),
            });
        }

        setArmyRef(getArmyData(raceId!));
    }, []);

    useEffect(() => {
        if (armyRef) {
            unitType = [...new Set(armyRef!.units.map(unit => unit.type))];
            // A REECRIRE
            setPlayerArmy({...playerArmy, race: armyRef.race})
        }
    }, [armyRef]);

    const getArmyData = (raceId: number): ArmyRef => {

        return appData.find(army => army.id === raceId) ?? {
            id: 0,
            race: '',
            background: '',
            name: 'DATA NOT FOUND',
            icon: 'string',
            units: [],
            skills: []
        };
    }

    const remove = (id: number) => {
        setPlayerArmy({
            ...playerArmy,
            units: playerArmy.units.filter(unit => unit.id != id),
        });
    };

    const edit = (unit: PlayerUnit) => {
        setSelectedPlayerUnit(unit);
        showModal(unit.type);
    };

    const saveArmy = () => {
        let newPlayerArmies = [];

        if (props.armyId) {
            newPlayerArmies = [playerArmy, ...playerArmies.filter(army => army.id !== props.armyId)];
        } else {
            newPlayerArmies = [...playerArmies, playerArmy];
        }
        setPlayerArmies(newPlayerArmies);
        localStorage.setItem('playerArmies', JSON.stringify(newPlayerArmies));

        navigate('/mordheimHelper/list');
    }

    const handleClose = () => setOpen(false);

    const showModal = (type: string) => {
        setModalUnitRefs(armyRef?.units.filter(unit => unit.type === type));
        setOpen(true);
    }

    const unitToPlayerUnit = (unit: UnitRef, weapons: number[], armor: number[]): PlayerUnit => {
        return {
            id: playerArmy.units && playerArmy.units.length > 0 ? Math.max(...playerArmy.units.map(unit => unit.id)) + 1 : 1,
            id_unit: unit.id,
            type: unit.type,
            weapon: weapons,
            armor: armor
        }
    }

    const editUnit = (idUnitRef: number, val: UnitRef, weapons: number[], armor: number[]) => {
        const updatedUnits = playerArmy.units.map(unit => {
            if (unit.id === idUnitRef) {
                return {...unit, id_unit: val.id, weapon: weapons, armor: armor};
            }
            return unit;
        });
        setPlayerArmy({
            ...playerArmy,
            units: updatedUnits,
        })
        setOpen(false);
    }

    const addUnit = (val: UnitRef, weapons: number[], armor: number[]) => {
        setPlayerArmy({
            ...playerArmy,
            units: [unitToPlayerUnit(val, weapons, armor), ...playerArmy.units],
        });
        setOpen(false);
    }

    return (
        <>
            {armyRef && open ? (
                <UnitPage
                    title='Ajouter une unite'
                    onClose={() => setOpen(false)}
                    data={modalUnitRefs}
                    playerUnit={selectedPlayerUnit ? selectedPlayerUnit : undefined}
                    onEdit={editUnit}
                    onAddUnit={addUnit}
                />
            ) : (
                <Layout onPrevious={() => setOpen(false)}
                        title={playerArmy.name ? playerArmy.name : 'default name'} readonly={false}
                        handleChange={(evt) => setPlayerArmy({...playerArmy, name: evt.target.value})}>

                    <div className="army-form-page">
                        <img className={"army-form-background"} src={armyRef ? getAssetUrl(armyRef!.background) : '#'}/>
                        <div
                            className={"title-cost"}>cost: {Object.keys(playerArmy.units).flatMap(k => playerArmy.units[k]).map(l => l.cost).reduce((kv, v) => kv + v, 0)} points
                        </div>
                        <Accordion multiple defaultValue={unitType}>
                            {armyRef && unitType.map(type => (
                                <>
                                    <Accordion.Item value={type}>
                                        <div className={"unit-modal-accordion-title"}>
                                            <Accordion.Control>{`${capitalize(type)} (${playerArmy.units.filter(u=>u.type==type).length})`}</Accordion.Control>
                                            <button className="button-icon" onClick={() => showModal(type)}>+</button>
                                        </div>
                                        <Accordion.Panel>
                                            {playerArmy.units && playerArmy.units.filter(unit => unit.type == type).map((unit: PlayerUnit) => (
                                                <Row
                                                    edit={edit}
                                                    remove={remove}
                                                    key={unit.id}
                                                    playerUnit={unit}
                                                    unit={armyRef.units.filter(elt => elt.id == unit.id_unit)[0]}
                                                />
                                            ))
                                            }
                                        </Accordion.Panel>
                                    </Accordion.Item>
                                </>
                            ))}
                        </Accordion>


                        <button onClick={() => navigate('/mordheimHelper/list')}>Annuler</button>
                        <button onClick={() => saveArmy()}>Enregistrer</button>
                    </div>
                </Layout>
            )
            }
        </>
    )
}

export default ArmyEditPage;
