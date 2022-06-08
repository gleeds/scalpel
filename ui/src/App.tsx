import React, { MutableRefObject, useRef } from 'react';
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
import TablesSidbar from './TablesSidbar';
import ServicesSidbar from './ServicesSidebar';

import ReactFlow, { MiniMap, Controls } from 'react-flow-renderer';

interface SchemaFlowHandle {
  autoArange: () => void;
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

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{display:'flex', flexFlow:'column'}}>
        <Box sx={{flexBasis:'50px',display:'flex'}}>
          <Box>Scalpel</Box>
          <Button variant="contained" onClick={()=>{schemaFlowRef.current.autoArange()}}>Arange</Button>
        </Box>
        <Box sx={{display: 'flex'}}>
          <CssBaseline/>
          <Drawer  variant="permanent" open={open} sx={{display:'flex',flexFlow:'column',height:'100vh'}}>
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
      
    </ThemeProvider>
  )
}

export default App;
