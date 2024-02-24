import React from "react";
import {TypeActionButton} from "@/constants";
import {getAssetUrl} from "@/components/Utils";

interface Props {
    onClickHandler?: () => void;
    buttonType: TypeActionButton;
}

function ActionButton(props: Props) {

    function getIcon() {
        return {
            [TypeActionButton.CONSULTER]: 'ico_consulter.svg',
            [TypeActionButton.MODIFIER]: 'ico_editer.svg',
            [TypeActionButton.SUPPRIMER]: 'ico_supprimer.svg'
        }[props.buttonType]
    }

  return (
      <button className={'icon-button'} onClick={props.onClickHandler}><img src={getAssetUrl(props.buttonType)}/></button>
  );
}

export default ActionButton;