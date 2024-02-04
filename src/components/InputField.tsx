import {useState} from "react";
import "./InputField.css";

interface Props {
    subClass: string
    defaultValue?: string;
}

export default function InputField({subClass, defaultValue}: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(defaultValue? defaultValue : '');

    const toggleFrom = () => {
        setIsEditing(!isEditing);
    };
    const handleUpdate = (evt: { preventDefault: () => void; }) => {
        evt.preventDefault();
        toggleFrom();
    };
    const handleChange = (evt: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(evt.target.value);
    };
    return isEditing ? (
            <div className={subClass}>
                <form className="Todo-edit-form" onSubmit={handleUpdate}>
                    <input onChange={handleChange} value={value} type="text"/>
                    <button>Save</button>
                </form>
            </div>
        ) : (
            <div id='parent' className={subClass}>
                {value}
                <button className='hidden-child' onClick={toggleFrom}>
                    <i className="fas fa-pen"/>
                </button>
            </div>
        );
}