import React from "react";
import {WarbandRef} from "@/army";
import ModalWrapper from "@/components/ModalWrapper";
import {getAssetUrlRoot} from "@/components/Utils";
import './armySelectModal.css';
import {useNavigate} from "react-router-dom";

interface Props {
  onClose: () => void;
  currentElement?: {};
  data: WarbandRef[];
  title: string;
}

export default function ArmySelectModal(props: Props) {
  const navigate = useNavigate();

  return (
    <ModalWrapper title={props.title} onClose={props.onClose}>
      <hr/>
      <div className={"armyList"}>
        {props.data.map(army => (
          <button style={{backgroundColor: army.color}} key={army.id} className={"army-name"} onClick={() => navigate('/mordheimHelper/create/' + army.id)}>
            <img className={'army-logo'} src={getAssetUrlRoot(army.icon)}/>
            <span className={'army-name'}>{army.name}</span>
          </button>
        ))}
      </div>
    </ModalWrapper>
  );
}
