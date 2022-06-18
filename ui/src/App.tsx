import React, { createContext, MutableRefObject, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import SchemaFlow from './SchemaFlow';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import {DndContext, DragEndEvent, DragOverlay, DragStartEvent} from '@dnd-kit/core';
import TablesSidbar from './TablesSidbar';
import ServicesSidbar from './ServicesSidebar';
import ServicesSidebarHeader from './ServicesSidebarHeader';
import AddServiceModal from './AddServiceModal';

import ReactFlow, { MiniMap, Controls } from 'react-flow-renderer';
import {ScalpelProvider} from './ScalpelContext';
import { ServiceItem, TableItem } from './DataInterfaces';
import TableListItem from './TableListItem';

interface SchemaFlowHandle {
  autoArange: () => void;
  dropHandler: (event:any,tableName:string) => void;
}


function App() {
  const drawerWidth = 240;

  const schemaFlowRef = useRef<SchemaFlowHandle>(null!);

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

  const mdTheme = createTheme();
  const [open, setOpen] = React.useState(true);
  const [activeId, setActiveId] = React.useState<TableItem|null>(null);

  function handleDragStart(event: DragStartEvent){
    setActiveId(event.active.data.current as TableItem);
  }

  async function handleDragEnd(event: DragEndEvent){
    console.log(event);
    const table: TableItem = event.active.data.current as TableItem;
    if (event.over){
      if (event.over.id==='schemaflow'){
        schemaFlowRef.current.dropHandler(event.activatorEvent,table.name);
      }
      else {
        const service: ServiceItem = event.over.data.current as ServiceItem;
        const response = await fetch(`http://localhost:3000/tables/${table.name}/services`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                service_name: service.name
            })
        });
        const json = await response.json() as ServiceItem;
        console.log(json);
      }
    }
    setActiveId(null);
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <ScalpelProvider>
      <Box sx={{display:'flex', flexFlow:'column'}}>
        <Box sx={{flexBasis:'50px',display:'flex'}}>
          <Box>Scalpel</Box>
          <Button variant="contained" onClick={()=>{schemaFlowRef.current.autoArange()}}>Arange</Button>
        </Box>
        <Box sx={{display: 'flex'}}>
          <CssBaseline/>
          <Drawer  variant="permanent" open={open} sx={{display:'flex',flexFlow:'column',height:'100vh'}}>
            <ServicesSidebarHeader/>
            <ServicesSidbar/>
            <TablesSidbar/>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <SchemaFlow ref={schemaFlowRef} />  
          </Box>
        </Box>
      </Box>
      <AddServiceModal/>
      <DragOverlay>
        {activeId ? (
          <TableListItem  table={activeId} key={activeId.name+'overlay'}/>
        ): null}
      </DragOverlay>
      </ScalpelProvider>
      </DndContext>
    </ThemeProvider>
  )
}

export default App;
