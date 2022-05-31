import { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface TableItem {
    name: string;
    service_name: string;
}

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

    const onDragStart = (e: any, table: TableItem) => {
        console.log("starting Drag");
        e.dataTransfer.setData("application/scalpeltable", JSON.stringify(table));
        e.dataTransfer.effectAllowed = 'move';
    };

    return (
        <List component="nav" sx={{overflow:'auto',flex: '1 1 auto'}} subheader="Tables">
            {data && data.map((table) => (
                <ListItemButton key={table.name} draggable onDragStart={(event)=>{onDragStart(event,table)}}>
                    <ListItemText primary={table.name} />
                </ListItemButton>
            ))}
        </List>
    );
};

export default TablesSidbar;