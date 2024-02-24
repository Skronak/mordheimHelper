import React, {useState} from "react";
import { ActionIcon } from '@mantine/core';
import {IconEdit} from '@tabler/icons-react';
import "./InputField.css";

interface Props {
    subClass?: string;
    defaultValue?: string;
    readonly?: boolean;
    handleChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({subClass, defaultValue, readonly, handleChange}: Props) {
    const [isEditing, setIsEditing] = useState(false);

    const toggleFrom = () => {
        setIsEditing(!isEditing);
    };
    const handleUpdate = (evt: { preventDefault: () => void; }) => {
        evt.preventDefault();
        toggleFrom();
    };
    return isEditing ? (
            <div className={subClass}>
                <form className="Todo-edit-form" onSubmit={handleUpdate}>
                    <input onChange={handleChange} value={defaultValue} type="text"/>
                    <button>Save</button>
                </form>
            </div>
        ) : (
            <div id='parent' className={subClass}>
                {defaultValue}
                {!readonly && (
                  <ActionIcon variant="filled" color="red" aria-label="edit_title" onClick={toggleFrom}>
                      <IconEdit style={{ width: '70%', height: '70%' }} />
                  </ActionIcon>
                )}
            </div>
        );
}