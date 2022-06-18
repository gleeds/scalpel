import React, { useState, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import ReactFlow, { MiniMap, Controls, ReactFlowInstance, useNodesState, useReactFlow,Node, Edge, XYPosition, ReactFlowProvider, useEdgesState, CoordinateExtent, Position } from 'react-flow-renderer';

import { TableDetails,Column,Relationship } from './DataInterfaces';
import TableNode from './TableNode';

import dagre from 'dagre';

import {useDroppable} from '@dnd-kit/core';

const nodeTypes = {
    table: TableNode,
  };

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));


const nodeExtent: CoordinateExtent = [
    [0, 0],
    [1000, 1000],
  ];

const SchemaFlow = forwardRef((props,ref) => {
    //Declare Custom Node Type

    useImperativeHandle(ref,()=>({
        autoArange(){
            onLayout('LR');
        },
        dropHandler(event:any,tableName:string){
          onDrop(event,tableName);
        }
    }))

    let id = 3;
    const getId = () => `dndnode_${id++}`;

    
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance|undefined>(undefined);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);

    const initialNodes: Node[] = [];
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    
    const initialEdges: Edge[] = [];
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const {setNodeRef} = useDroppable({
      id: 'schemaflow',
    });

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        console.log("dragover");
      }, []);

    const onDrop = useCallback((event: any,tableName:string)=>{
        event.preventDefault();
        // const type = JSON.parse(event.dataTransfer.getData('application/scalpeltable'));

        // console.log("dropped");
        // console.log(type);

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

        getTableData(tableName,position,nodes);
          

    },[reactFlowInstance]);

    const getTableData = async (name:string,position:XYPosition, currentNodes:Node<any>[]) => {
        const response = await fetch(`http://localhost:3000/tables/${name}`);
        const tableDetails = await response.json() as TableDetails;
        const newNode:Node = {
            id: name,
            type:'table',
            position: position,
            data: {
                table:tableDetails,
                onAddManyToOne: onTableNodeAddManyToOne,
                onAddOneToMany: onTableNodeAddOneToMany
            }
          };

        console.log(newNode);
        setNodes((nds)=>nds.concat(newNode));

        //Add edges if present
        var newEdges: Edge<any>[] = [];
        tableDetails.one_to_many_relationships.forEach((relationship:Relationship)=>{
            newEdges.push({
                id: getId(),
                source: tableDetails.name,
                target: relationship.target_table,
                label: `${relationship.source_column}:${relationship.target_column}`
            });
        });
            
        //     // if (currentNodes.some(n => n.data.name === relationship.target_table)) {
        //     //     console.log(relationship);
        //     //     setEdges((edges)=>edges.concat({
        //     //         id: getId(),
        //     //         source: tableDetails.name,
        //     //         target: relationship.source_table
        //     //     }));
        //     // }
        // });
        if (newEdges.length > 0) {setEdges((edges)=>edges.concat(newEdges))};
    }

    const onLayout = (direction: string) => {
        const isHorizontal = direction === 'LR';
        dagreGraph.setGraph({ rankdir: direction });
    
        nodes.forEach((node) => {
          dagreGraph.setNode(node.id, { width: node.width, height: node.height });
        });
    
        edges.forEach((edge) => {
          dagreGraph.setEdge(edge.source, edge.target);
        });
    
        dagre.layout(dagreGraph);
    
        const layoutedNodes = nodes.map((node) => {
          const nodeWithPosition = dagreGraph.node(node.id);
          node.targetPosition = isHorizontal ? Position.Left : Position.Top;
          node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
          // we need to pass a slightly different position in order to notify react flow about the change
          // @TODO how can we change the position handling so that we dont need this hack?
          node.position = { x: nodeWithPosition.x + Math.random() / 1000, y: nodeWithPosition.y };
    
          return node;
        });
    
        setNodes(layoutedNodes);
      };

      const onTableNodeAddOneToMany = (table:TableDetails) => {
        table.one_to_many_relationships.forEach((relationship:Relationship)=>{
            getTableData(relationship.target_table,{x:0,y:0},nodes);
        });
      }
      const onTableNodeAddManyToOne = (table:TableDetails) => {
        table.many_to_one_relationships.forEach((relationship:Relationship)=>{
            getTableData(relationship.source_table,{x:0,y:0},nodes);
        });
      }

  return (
      <ReactFlowProvider>
        <div ref={reactFlowWrapper} style={{width:'100%',height:'100%'}}>
            <ReactFlow onInit={setReactFlowInstance} 
                nodes={nodes} 
                edges={edges} 
                nodeTypes={nodeTypes}
                onDragOver={onDragOver}                 
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                ref={setNodeRef}
                >
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
        </ReactFlowProvider>
  );
});

export default SchemaFlow;