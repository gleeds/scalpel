import React,{ useState, useEffect,useCallback } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {ScalpelContextType, ServiceItem} from './DataInterfaces';
import { ScalpelContext } from "./ScalpelContext";
import ServiceListItem from "./ServiceListItem";


export const ServicesSidbar: React.FC =()=>{
    const { services,setServices } = React.useContext(ScalpelContext) as ScalpelContextType;


    const getData = async () => {
        const response = await fetch("http://localhost:3000/services");
        const json = await response.json() as ServiceItem[];
        setServices(json);
    }
    
    useEffect(() => {
        getData();
    }, []);

    return (
        <List component="nav" sx={{overflow:'auto', flexBasis:'300px'}}>
            {!services || services.length === 0 ? (
                <ListItemText primary="Add a Service" />
            ):''}
            {services && services.map((service) => (
                <ServiceListItem service={service} key={service.name}/>
            ))}
        </List>
    );
};

export default ServicesSidbar;