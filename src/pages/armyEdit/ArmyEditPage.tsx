import React, {useEffect, useState} from 'react';
import type {WarbandRef, UserWarband, PlayerUnit, UnitRef} from "@/army";
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
import { addDoc, deleteDoc, updateDoc, doc, collection } from 'firebase/firestore';
import {db} from "@/firebase/firebaseConfig";

interface Props {
    armyId?: number;
    raceId?: number;
}

const defaultPlayerArmy = {
    id: 0,
    name: "default name",
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
    const [armyRef, setArmyRef] = useState<WarbandRef>();
    const [selectedPlayerUnit, setSelectedPlayerUnit] = useState<PlayerUnit>();
    const [playerArmy, setPlayerArmy] = useState<UserWarband>(defaultPlayerArmy);
    const navigate = useNavigate();
    let unitType = ['heroes', 'henchmen'];
    const userArmyCollection = collection(db, "userWarband");

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

    const getArmyData = (raceId: number): WarbandRef => {

        return appData.find(army => army.id === raceId) ?? {
            id: 0,
            race: '',
            background: '',
            color: '',
            name: 'DATA NOT FOUND',
            icon: 'string',
            units: [],
            equipements: [],
            skills: []
        };
    }

    const remove = (id: number) => {
        setPlayerArmy({
            ...playerArmy,
            units: playerArmy.units.filter(unit => unit.id != id),
        });
        deleteDB(playerArmy.id.toString());
    };

    const edit = (unit: PlayerUnit) => {
        setSelectedPlayerUnit(unit);
        showModal(unit.type);
    };

    const saveArmy = () => {
        let newPlayerArmies = [];

        if (props.armyId) {
            newPlayerArmies = [playerArmy, ...playerArmies.filter(army => army.id !== props.armyId)];
            updateDB(playerArmy);
        } else {
            newPlayerArmies = [...playerArmies, playerArmy];
            addDB(playerArmy);
        }
        setPlayerArmies(newPlayerArmies);
        localStorage.setItem('playerArmies', JSON.stringify(newPlayerArmies));

        navigate('/mordheimHelper/list');
    }

    const addDB = async(data: UserWarband) => {
        try {
            await addDoc(userArmyCollection, data)
                .then((res) => setPlayerArmy({
                    ...data,
                        id: res._key.path.segments[1]
                })
                );
        } catch (err) {
            console.log (err);
        }
    }

    const updateDB = async(userWarband: UserWarband) => {
        const data = doc(db, "userWarband", userWarband.id.toString())
        try {
            await updateDoc(data, {...userWarband});
        } catch (err) {
            console.log (err);
        }
    }

    const deleteDB = async(id: string) => {
        const data = doc(db, "userWarband", id)
        try {
            await deleteDoc(data);
        } catch (err) {
            console.log (err);
        }
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
            armor: armor,
            miscellaneaous: [],
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
                    armyRef={armyRef}
                />
            ) : (
                <Layout onPrevious={() => setOpen(false)}
                        title={playerArmy.name} readonly={false}
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
                        <div className="button-group">
                            <button className="button-style" onClick={() => navigate('/mordheimHelper/list')}>Annuler</button>
                            <button className="button-style" onClick={() => saveArmy()}>Enregistrer</button>
                        </div>
                    </div>
                </Layout>
            )
            }
        </>
    )
}

export default ArmyEditPage;
