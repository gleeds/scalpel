import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { DraggedDataType, ServiceItem } from "./DataInterfaces";

import {useDroppable, useDraggable} from '@dnd-kit/core';
import {useCombinedRefs} from '@dnd-kit/utilities';

type ServiceListItemProps = {
    service: ServiceItem
}

export const ServiceListItem = (props:ServiceListItemProps) =>{

    const service: ServiceItem = props.service;

    const {setNodeRef: setDroppableNodeRef} = useDroppable({
        id:service.name,
        data: service
    });

    const {attributes, listeners, transform,setNodeRef: setDraggableNodeRef} = useDraggable({
        id:service.name,
        data: {service:service,type:DraggedDataType.Service}
    });

    const setNodeRef = useCombinedRefs(setDraggableNodeRef, setDroppableNodeRef);

    function pickTextColorBasedOnBgColorSimple(bgColor:string, lightColor:string, darkColor:string) {
        var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
        var r = parseInt(color.substring(0, 2), 16); // hexToR
        var g = parseInt(color.substring(2, 4), 16); // hexToG
        var b = parseInt(color.substring(4, 6), 16); // hexToB
        return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
          darkColor : lightColor;
      }

    return (
        <ListItemButton key={service.name} ref={setNodeRef} sx={{backgroundColor:service.color,color:pickTextColorBasedOnBgColorSimple(service.color,'#FFFFFF','#000000')}}   {...listeners} {...attributes}>
            <ListItemText primary={service.name}/>
        </ListItemButton>
    );
}

export default ServiceListItem;