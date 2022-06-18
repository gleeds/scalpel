import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ServiceItem } from "./DataInterfaces";

import {useDroppable} from '@dnd-kit/core';

type ServiceListItemProps = {
    service: ServiceItem
}

export const ServiceListItem = (props:ServiceListItemProps) =>{

    const service: ServiceItem = props.service;

    const {setNodeRef} = useDroppable({
        id:service.name,
        data: service
    });

    function pickTextColorBasedOnBgColorSimple(bgColor:string, lightColor:string, darkColor:string) {
        var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
        var r = parseInt(color.substring(0, 2), 16); // hexToR
        var g = parseInt(color.substring(2, 4), 16); // hexToG
        var b = parseInt(color.substring(4, 6), 16); // hexToB
        return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
          darkColor : lightColor;
      }

    return (
        <ListItemButton key={service.name} ref={setNodeRef} sx={{backgroundColor:service.color,color:pickTextColorBasedOnBgColorSimple(service.color,'#FFFFFF','#000000')}}>
            <ListItemText primary={service.name}/>
        </ListItemButton>
    );
}

export default ServiceListItem;