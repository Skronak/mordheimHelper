import { useNavigate } from "react-router-dom";
import "./Header.css";
import {IconButton} from "@mui/material";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputAddComponent from "@/components/inputAddComponent";
import InputField from "@/components/InputField";

type Props = {
    title?: string;
    readonly?: boolean;
    handleChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    onPrevious?: () => void;
}

Header.defaultProps = {
  readonly: true,
}

export default function Header(props: Props) {
  const navigate = useNavigate();

    return (
        <div className={'navigation-header'}>
          <IconButton color="primary" aria-label="delete" onClick={props.onPrevious ? props.onPrevious : () => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <InputField defaultValue={props.title} {...props}/>
          <div></div>
        </div>
    )
}