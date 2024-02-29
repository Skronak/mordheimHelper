import React, {useEffect, useState} from "react";
import {Equipement, PlayerUnit, UnitRef} from "@/army";
import "./unit-modal.css";
import ModalWrapper from "@/components/ModalWrapper";

interface Props {
  title: string;
  onClose: () => void;
  onValidate: () => null;
  playerUnit?: PlayerUnit;
  data: UnitRef[];
}

export default function EquipementModal(props: Props) {
  const [currentUnit, setCurrentUnit] = useState<UnitRef>();
  const [availableWeapons, setAvailableWeapons] = useState<Equipement[]>([]);
  const [availableArmors, setAvailableArmors] = useState<Equipement[]>([]);
  const [selectedWeapons, setSelectedWeapons] = useState<number[]>([]);
  const [selectedArmors, setSelectedArmors] = useState<number[]>([]);
  const profilsLabel = ["Global", "Defensive", "Offensive"];
  const profilsHeader = [["Adv", "Mar", "Dis", "Rat", "Upk", "Lvl"], ["HP", "Def", "Res", "Arm"], ["Att", "Off", "Str", "AP", "Agi", "Aim"]];

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

  return (
    <ModalWrapper title={""} onClose={props.onClose}>
      <div title={props.title}>
        <div className={"modal-units-select-container"}>
        </div>
        <button onClick={props.onClose}>Annuler</button>
        <button
          onClick={props.onValidate}>Enregistrer
        </button>
      </div>
    </ModalWrapper>
  )
}