import { IconButton } from '@mui/material';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import {TableDetails,Column,Relationship} from './DataInterfaces';
import './TableNode.css';
import MergeIcon from '@mui/icons-material/Merge';
import CallSplitIcon from '@mui/icons-material/CallSplit';


function TableNode({data}: NodeProps) {


    return (
        <div className="table-node">
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
            <div>{data.table.name}</div>
            <div>
                <IconButton color="primary" onClick={()=>data.onAddManyToOne(data.table)}>
                    <MergeIcon />
                </IconButton>
                <IconButton color="primary" onClick={()=>data.onAddOneToMany(data.table)}>
                    <CallSplitIcon />
                </IconButton>
            </div>
            <ul>
            {data.table.columns.map((column:Column)=>(
                <li key={column.column_name}>{column.column_name}:{column.data_type}</li>
            ))}
            </ul>
        </div>
    );
}


export default TableNode;