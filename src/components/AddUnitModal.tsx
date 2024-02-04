import React, {useEffect, useState} from "react";
import {UnitRef} from "@/army";
import ModalWrapper from "@/components/ModalWrapper";

interface Props {
  title: string;
  onClose: () => void;
  onValidate: (str: any) => void;
  currentElement?: {};
  data: UnitRef[];
}

export default function AddUnitModal(props: Props) {
  const [unit, setUnit] = useState<UnitRef>();

  useEffect(() => {
    setUnit(props.data[0]);
  }, []);

  const handleChange = (evt: { target: { value: any; }; }) => {
    setUnit(props.data.find(elt => elt.id === +evt.target.value));
  };

  return (
    <ModalWrapper title={props.title} onClose={props.onClose}>
      <div>
        <select onChange={handleChange}>
          {props.data.map(elt =>
            <option key={elt.id} value={elt.id}>{elt.name}-{elt.cost} pts</option>
          )}
        </select>
      </div>
      <div>
        <div className={"unit-description"}>
          {unit && unit.description}
        </div>
        {unit && unit.profil.length !== 0 && (
          <table>
            <tr>
              <th>M</th>
              <th>WS</th>
              <th>BS</th>
              <th>S</th>
              <th>T</th>
              <th>W</th>
              <th>I</th>
              <th>A</th>
              <th>Ld</th>
            </tr>
            <tr>
              <td>{unit.profil[0]}</td>
              <td>{unit.profil[1]}</td>
              <td>{unit.profil[2]}</td>
              <td>{unit.profil[3]}</td>
              <td>{unit.profil[4]}</td>
              <td>{unit.profil[5]}</td>
              <td>{unit.profil[6]}</td>
              <td>{unit.profil[7]}</td>
              <td>{unit.profil[8]}</td>
            </tr>
          </table>)}
        <div className={"unit-rules"}>
          {unit && unit.rules && unit.rules.map(rule =>
            <div>{rule.name} : {rule.effect}</div>
          )}
        </div>
        <div className={"unit-equipement"}>
          <label>Weapon</label>
          {unit && unit.equipWeapon && (
              <input type={"checkbox"}/>
          )}
          <label>Armure</label>
          {unit && unit.equipArmor && (
            <input type={"checkbox"}/>
          )}
        </div>
      </div>
    </ModalWrapper>
  )
}