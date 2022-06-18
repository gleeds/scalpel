import { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { TableItem } from './DataInterfaces';
import TableListItem from "./TableListItem";


function TablesSidbar() {
    const [data, setData] = useState<TableItem[]>([]);

    const getData = async () => {
        const response = await fetch("http://localhost:3000/tables");
        const json = await response.json() as TableItem[];
        setData(json);
    }
    
    useEffect(() => {
        getData();
    }, []);

    

    return (
        <List component="nav" sx={{overflow:'auto',flex: '1 1 auto'}} subheader="Tables">
            {data && data.map((table) => (
                <TableListItem table={table} key={table.name}/>
            ))}
        </List>
    );
};

export default TablesSidbar;