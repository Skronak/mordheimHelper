import React, {useEffect, useState} from "react";
import {WarbandRef, Equipement, PlayerUnit, UnitRef} from "@/army";
import {getPortraitAssetUrl} from "@/components/Utils";
import "./unit-modal.css";
import Layout from "@/pages/Layout";
import {Carousel} from '@mantine/carousel';
import {UnitCard} from "@/pages/armyEdit/unitEdit/UnitCard";
import {Accordion} from "@mantine/core";
import EquipementModal from "@/pages/armyEdit/EquipementModal";
import {useDataStore} from "@/store/dataStore";

interface Props {
    title: string;
    onClose: () => void;
    onAddUnit: (u: UnitRef, w: number[], a: number[]) => void;
    onEdit: (id: number, u: UnitRef, w: number[], a: number[]) => void;
    playerUnit?: PlayerUnit;
    data: UnitRef[];
    armyRef: WarbandRef;
}

export default function UnitPage(props: Props) {
    const [currentUnit, setCurrentUnit] = useState<UnitRef>();
    const [selectedWeapons, setSelectedWeapons] = useState<number[]>([]);
    const [selectedArmors, setSelectedArmors] = useState<number[]>([]);
    const profilsLabel = ["Global", "Defensive", "Offensive"];
    const profilsHeader = [["Adv", "Mar", "Dis", "Rat", "Upk", "Lvl"], ["HP", "Def", "Res", "Arm"], ["Att", "Off", "Str", "AP", "Agi", "Aim"]];
    const [equipementModalOpen, setEquipementModalOpen] = useState<boolean>();
    const {equipementData, setEquipementData} = useDataStore();

    useEffect(() => {
        setCurrentUnit(props.playerUnit ? (props.data.filter(unit => unit.id === props.playerUnit!.id_unit)[0]) : props.data[0]);
        setSelectedWeapons(props.playerUnit ? props.playerUnit.weapon : []);
        setSelectedArmors(props.playerUnit ? props.playerUnit.armor : []);
    }, []);

    const handleToggleWeapon = (value: number) => () => {
        if (selectedWeapons.includes(value)) {
            setSelectedWeapons(selectedWeapons.filter(id => id !== value));
        } else {
            setSelectedWeapons([...selectedWeapons, value]);
        }
    }
    const onChangeCarousel = (index: number) => {
        setCurrentUnit(props.data[index]);
    }

    const getEquipement = (index: number, type: string) => {
        switch (type) {
            case 'weapon':
                const weap = equipementData.weapons.find(e => e.id === index)
                return weap !== undefined ? <div>{weap.name}</div> : <div></div>;
            case 'armour':
                const armor = equipementData.armours.find(e => e.id === index);
                return armor !== undefined ? <div>{armor.name}</div> : <div></div>;
            case 'miscellaneaous':
                const misce = equipementData.miscellaneaous.find(e => e.id === index);
                return misce !== undefined ? <div>{misce.name}</div> : <div></div>;
        }
    }

    const getProficiency = (idx: number[], type: string) => {
        switch (type) {
            case 'weapon':
                let weap = equipementData.weapons.filter(eq => idx.includes(eq.id)).map(eq => eq.name);
                return weap !== undefined ? <div>{weap.join(', ')}</div> : <div></div>;
            case 'armour':
                let armor = equipementData.armours.filter(eq => idx.includes(eq.id)).map(eq => eq.name);
                return armor !== undefined ? <div>{armor.join(', ')}</div> : <div></div>;
            case 'miscellaneaous':
                let misc = equipementData.miscellaneaous.filter(eq => idx.includes(eq.id)).map(eq => eq.name);
                return misc !== undefined ? <div>{misc.join(',')}</div> : <div></div>;
        }
    }

    return (
        <Layout onPrevious={props.onClose} title={'UNIT'} readonly={true}>
            <div className={"modal-units-select-container"}>
                <Carousel onSlideChange={onChangeCarousel} withIndicators={true} height={200}
                          className={"unit-carousel"}>
                    {props.data.sort((e1, e2) => e2.cost - e1.cost)
                        .map(elt => (
                                <Carousel.Slide>
                                    <UnitCard image={getPortraitAssetUrl(elt.icon)}
                                              title={`${elt.name} - ${elt.cost}gc`} category={''}/>
                                </Carousel.Slide>
                            )
                        )}
                </Carousel>
            </div>

            <div>
                <Accordion multiple defaultValue={["item-1","item-2","item-3","item-4"]}>
                    <Accordion.Item value="item-1">
                        <Accordion.Control>Unit Profil {currentUnit?.name}</Accordion.Control>
                        <Accordion.Panel>
                            <div className={"modal-unit-container"}>
                                {currentUnit && currentUnit.profils && currentUnit.profils.map((profil, i) => (
                                    <>
                                        <p>{profilsLabel[i]}</p>
                                        <table className={"modal-unit-profil-table"}>
                                            <tr>{profilsHeader[i].map((header) => <th>{header}</th>)}</tr>
                                            <tr>{profil.map(elt => <td>{elt}</td>)}</tr>
                                        </table>
                                    </>
                                ))}
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="item-2">
                        <Accordion.Control>Proficency</Accordion.Control>
                        <Accordion.Panel>
                            <div className={"modal-unit-container"}>
                                    <div> Weapons: {currentUnit && getProficiency(currentUnit!.weaponProfiency, 'weapon')}</div>
                                    <div> Armours: {currentUnit && getProficiency(currentUnit!.weaponProfiency, 'armour')}</div>
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="item-3">
                        <Accordion.Control>Rules</Accordion.Control>
                        <Accordion.Panel>
                            <div className={"modal-unit-container modal-unit-rules"}>
                                {currentUnit && currentUnit.rules && currentUnit.rules.map(rule =>
                                    <div>{rule.name} : {rule.effect}</div>
                                )}
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="item-4">
                        <Accordion.Control>Equipement</Accordion.Control>
                        <Accordion.Panel>
                            <div className={"modal-units-select-container"}>
                                <div className={'weapon-bloc'}>
                                        <button className="button-style button-style-center" onClick={()=>setEquipementModalOpen(true)}>+</button>
                                    {selectedWeapons.map(idx=> (
                                                <div>{getEquipement(idx, 'weapon')}</div>
                                        )
                                    )}

                                    {/*{currentUnit && currentUnit.availableHtHWeapons.map(elt =>*/}
                                    {/*    <div className="modal-weapon-select-container" key={elt.id}>*/}
                                    {/*                  <span className="modal-weapon-select">*/}
                                    {/*                    <span>{elt.name} - {elt.cost}pts</span>*/}
                                    {/*                    <input onClick={handleToggleWeapon(elt.id)}*/}
                                    {/*                           checked={selectedWeapons && selectedWeapons.includes(elt.id)}*/}
                                    {/*                           type="checkbox"></input>*/}
                                    {/*                  </span>*/}
                                    {/*    </div>*/}
                                    {/*)}*/}
                                </div>
                            </div>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
                <div className={"modal-unit-container"}>
                    <label>Total Cost : {currentUnit ? currentUnit.cost : 0}</label>
                </div>
                <div className="button-group">
                    <button className="button-style" onClick={props.onClose}>Annuler</button>
                    <button className="button-style"
                        onClick={() => props.playerUnit ? props.onEdit(props.playerUnit.id, currentUnit!, selectedWeapons, selectedArmors) : props.onAddUnit(currentUnit!, selectedWeapons, selectedArmors)}>Enregistrer
                    </button>
                </div>
            </div>

            {equipementModalOpen && <EquipementModal armyRef={props.armyRef} type={'weapons'} onClose={()=>setEquipementModalOpen(false)} onValidate={()=>null} data={props.data} playerUnit={props.playerUnit}/>}

        </Layout>
    )
}