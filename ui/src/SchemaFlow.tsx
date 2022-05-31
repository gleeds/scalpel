import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, ReactFlowInstance, useNodesState, useReactFlow,Node, Edge, XYPosition, ReactFlowProvider } from 'react-flow-renderer';

function SchemaFlow() {

    let id = 3;
    const getId = () => `dndnode_${id++}`;

    
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance|undefined>(undefined);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    const initialNodes: Node[] = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Input Node' },
        position: { x: 250, y: 25 },
    },
    
    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <div>Default Node</div> },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        type: 'output',
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 },
    },
    ];
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    
    const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    ];

    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        console.log("dragover");
      }, []);

    const onDrop = useCallback((event: any)=>{
        event.preventDefault();
        const type = JSON.parse(event.dataTransfer.getData('application/scalpeltable'));

        console.log("dropped");
        console.log(type);

        const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();
        console.log(reactFlowBounds);
        var position:XYPosition = {x:0,y:0};
        if (reactFlowBounds && reactFlowInstance) {
            position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds?.left,
                y: event.clientY - reactFlowBounds?.top,
              });
            console.log(position);
        }

        
          const newNode:Node = {
            id: getId(),
            type:'output',
            position: position,
            data: { label: `${type.name}` },
          };

        console.log(newNode);
        setNodes((nds)=>nds.concat(newNode));

    },[reactFlowInstance]);

  return (
      <ReactFlowProvider>
        <div ref={reactFlowWrapper} style={{width:'100%',height:'100%'}}>
            <ReactFlow onInit={setReactFlowInstance} defaultNodes={nodes} defaultEdges={edges} onDrop={onDrop} onDragOver={onDragOver} fitView>
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
        </ReactFlowProvider>
  );
}

export default SchemaFlow;