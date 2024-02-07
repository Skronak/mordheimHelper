import { useNavigate } from "react-router-dom";
import "./Header.css";
import {IconButton} from "@mui/material";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {
    title?: string;
}
export default function Header(props: Props) {
  const navigate = useNavigate();

    return (
        <div className={'navigation-header'}>
          <IconButton color="primary" aria-label="delete" onClick={()=>navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <div>{props.title}</div>
            <div></div>
        </div>
    )
}