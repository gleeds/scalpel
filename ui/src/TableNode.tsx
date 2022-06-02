import { Handle, NodeProps, Position } from 'react-flow-renderer';
import {TableDetails,Column,Relationship} from './DataInterfaces';
import './TableNode.css';

function TableNode({data}:NodeProps) {


    return (
        <div className="table-node">
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
            <div>{data.name}</div>
            <ul>
            {data.columns.map((column:Column)=>(
                <li key={column.column_name}>{column.column_name}:{column.data_type}</li>
            ))}
            </ul>
        </div>
    );
}


export default TableNode;