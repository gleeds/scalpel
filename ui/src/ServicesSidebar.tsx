import { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface ServiceItem {
    name: string;
    color: string;
}

function ServicesSidbar() {
    const [data, setData] = useState<ServiceItem[]>([]);

    const getData = async () => {
        const response = await fetch("http://localhost:3000/services");
        const json = await response.json() as ServiceItem[];
        setData(json);
    }
    
    useEffect(() => {
        getData();
    }, []);

    return (
        <List component="nav" sx={{overflow:'auto', flexBasis:'300px'}} subheader="Services">
            {!data || data.length === 0 ? (
                <ListItemText primary="Add a Service" />
            ):''}
            {data && data.map((service) => (
                <ListItemButton key={service.name} draggable>
                    <ListItemText primary={service.name} color={service.color} />
                </ListItemButton>
            ))}
        </List>
    );
};

export default ServicesSidbar;