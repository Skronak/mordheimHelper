import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
    text: string;
    handleClose: () => void;
    handleValidate: () => void;
    open: boolean;
}
export default function AlertDialog(props: Props) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleValidate}>Yes</Button>
                    <Button onClick={props.handleClose} autoFocus>No</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}