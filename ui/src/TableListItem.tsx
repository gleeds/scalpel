import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { TableItem } from "./DataInterfaces";

import {useDraggable} from '@dnd-kit/core';


type TableListItemProps = {
    table: TableItem;
}

const TableListItem = (props: TableListItemProps) => {

    const table: TableItem = props.table;

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id:table.name,
        data: table
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } : undefined;

    const onDragStart = (e: any, table: TableItem) => {
        console.log("starting Drag");
        e.dataTransfer.setData("application/scalpeltable", JSON.stringify(table));
        e.dataTransfer.effectAllowed = 'move';
    };

    return(
        // <ListItemButton key={table.name} ref={setNodeRef} draggable onDragStart={(event)=>{onDragStart(event,table)}}>
        <ListItemButton key={table.name} ref={setNodeRef} style={style}  {...listeners} {...attributes} >

            <ListItemText primary={table.name} />
        </ListItemButton>
    )
}

export default TableListItem;