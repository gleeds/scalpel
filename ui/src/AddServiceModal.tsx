import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import { ScalpelContext } from "./ScalpelContext";
import { ServiceItem, ScalpelContextType } from "./DataInterfaces";
import { SwatchesPicker } from 'react-color';



const AddServiceModal: React.FC =(props:any) => {
    const { addServiceModalOpen, updateAddServiceModalOpen, addService } = React.useContext(ScalpelContext) as ScalpelContextType;
    const handleOpen = () => updateAddServiceModalOpen(true);
    const handleClose = () => updateAddServiceModalOpen(false);

    const [name, setName] = React.useState('');
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const [color, setColor] = React.useState('#000000');
    const handleColorChange = (color: any) => {

        setColor(color.hex);
    };

    const handleAddService = async () => {
        const response = await fetch("http://localhost:3000/services",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                color: color
            })
        });
        const json = await response.json() as ServiceItem;
        addService(json);
        handleClose();
        setName('');
        setColor('#000000');
    }

    const handleColorPicked=() => {

    }

    return(
        <Dialog open={addServiceModalOpen} onClose={handleClose}>
            <DialogTitle>Add Service</DialogTitle>
            <DialogContent>
                <DialogContentText>Specify Name and Color for new Service</DialogContentText>
                <TextField label="Name" value={name} onChange={handleNameChange} />
                <SwatchesPicker color={color} onChange={handleColorChange}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button onClick={handleAddService} color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddServiceModal;