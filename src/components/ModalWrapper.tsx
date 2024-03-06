import React, {PropsWithChildren, useState} from "react";
import "./Modal.css";
import {UnitRef} from "@/army";

interface Props extends PropsWithChildren {
    onClose: () => void;
    title?: string;
    withButtons?: boolean;
    onValidate?: () => void;
}
//https://codepen.io/chriscoyier/pen/MeJWoM
export default function ModalWrapper(props: Props) {
    const [unit, setUnit] = useState<UnitRef>();

    return (
        <div className="modal-underlay" onClick={props.onClose}>
            <div className="modal active-modal">
                <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
                    <div className="modal-header">
                    <span>{props.title}</span>
                        <button className="close-modal" onClick={props.onClose}>X</button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    {props.withButtons ? (
                        <div className="button-group">
                            <button className="button-style" onClick={props.onClose}>Annuler</button>
                            <button className="button-style" onClick={props.onValidate}>Enregistrer</button>
                        </div>
                        ) : null}
                </div>
            </div>
        </div>
    );
}