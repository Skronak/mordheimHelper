import React, {useEffect, useReducer, useState} from "react";
import "./inputAddComponent.css";

interface Props {
    placeholder?: string;
    handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    withButton?: boolean;
    buttonLabel?: string;
    handleClickButton?: () => void;
    value: string;
}

export default function InputAddComponent(props: Props) {

  const onChange = (val: React.ChangeEvent<HTMLInputElement>) => {
    props.handleChange(val);
  }

  return (
    <form className="input-add-component">
      <input
        value={props.value}
        onChange={onChange}
        id="task"
        type="text"
        name="task"
        placeholder={props.placeholder? props.placeholder : ''}
      />
        {props.withButton && <button onClick={props.handleClickButton}>{props.buttonLabel}</button>}
    </form>
  );
}