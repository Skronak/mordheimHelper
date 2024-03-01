import React, {useEffect, useState} from "react";
import {ArmyRef, Equipement, PlayerUnit, UnitRef} from "@/army";
import "./equipement-modal.css";
import ModalWrapper from "@/components/ModalWrapper";
import {useDataStore} from "@/store/dataStore";
import {Accordion} from "@mantine/core";

interface Props {
  onClose: () => void;
  onValidate: () => null;
  type: string;
  playerUnit?: PlayerUnit;
  data: UnitRef[];
  armyRef: ArmyRef;
}

export default function EquipementModal(props: Props) {
  const [currentUnit, setCurrentUnit] = useState<UnitRef>();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const {equipementData, setEquipementData} = useDataStore();

  useEffect(() => {
    setCurrentUnit(props.playerUnit ? (props.data.filter(unit => unit.id === props.playerUnit!.id_unit)[0]) : props.data[0]);
    setSelectedItems(props.playerUnit ? props.playerUnit.weapon : []);
  }, []);

  const handleToggleWeapon = (value: number) => () => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter(id => id !== value));
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  }

  return (
    <ModalWrapper title={props.type} onClose={props.onClose} withButtons onValidate={props.onValidate}>
        <div>
          <Accordion multiple defaultValue={["close", "missile"]}>
            <Accordion.Item value="close">
              <Accordion.Control>Close weapons</Accordion.Control>
              <Accordion.Panel>
                    <table className={"modal-equipement-modal-table"}>
                {equipementData.weapons.filter(w=> w.type==='close').map(equipement => (
                    <tr>
                      <td className={"equipement-modal-checkbox-cell"}><input type="checkbox"></input></td>
                      <td>
                        <div>{equipement.name} - {equipement.hand} hand</div>
                        <div>cost: {equipement.cost[props.armyRef.id-1]}</div>
                        <div>{equipement.rule}</div>
                        {equipement.specialRules.map(sp => (
                            <div>{sp.name} : {sp.effect}</div>
                        ))}
                      </td>
                    </tr>
                ))}
                </table>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="missile">
              <Accordion.Control>Missile weapons</Accordion.Control>
              <Accordion.Panel>
                <table className={"modal-equipement-modal-table"}>
                  {equipementData.weapons.filter(w=> w.type==='missile').map(equipement => (
                      <tr>
                        <td className={"equipement-modal-checkbox-cell"}><input type="checkbox"></input></td>
                        <td>
                          <div>{equipement.name} - {equipement.hand} hand</div>
                          <div>{equipement.rule}</div>
                          <div>{equipement.cost[0]}</div>
                          {equipement.specialRules.map(sp => (
                              <div>{sp.name} : {sp.effect}</div>
                          ))}
                        </td>
                      </tr>
                  ))}
                </table>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
    </ModalWrapper>
  )
}