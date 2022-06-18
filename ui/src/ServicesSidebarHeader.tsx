import React,{ useEffect } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box, Button, Typography } from "@mui/material";
import {ScalpelContext} from "./ScalpelContext";
import {ScalpelContextType} from "./DataInterfaces";

interface ServiceSidebarHeaderProps {

}

const ServicesSidbarHeader: React.FC = ()=> {
    const { updateAddServiceModalOpen } = React.useContext(ScalpelContext);


    function addService() {
        updateAddServiceModalOpen(true);
    }
    
    useEffect(() => {
    }, []);

    return (
        <Box sx={{flexBasis:'100px'}}>
            <Typography variant="subtitle1" gutterBottom component="div">
                Services
                <Button variant="contained" onClick={()=>addService()}>Add</Button>
            </Typography>
        </Box>
    );
};

export default ServicesSidbarHeader;