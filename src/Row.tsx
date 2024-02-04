import React, {useEffect, useState} from "react";

import "./Row.css";
import {PlayerUnit, UnitRef} from "@/army";

interface Props {
    remove: any,
    edit: (arg0: PlayerUnit) => void,
    unit: UnitRef,
    playerUnit: PlayerUnit
}

export function Row(props: Props) {

  return (
      props.unit&&(
    <div className="Todo" key={props.unit.id}>
      <p>{props.unit.name}</p>
      <p>{props.unit.cost}</p>

      <div className="Todo-buttons">
        <button onClick={()=>props.edit(props.playerUnit)}>edit
          <i className="fas fa-trash"/>
        </button>

      </div>
    </div>
  ));
}

export default Row