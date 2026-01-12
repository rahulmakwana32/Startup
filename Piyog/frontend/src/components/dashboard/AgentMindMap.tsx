import { useEffect } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Edge,
    Node,
    BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { getAgentStatus } from '../../lib/api';

const initialNodes: Node[] = [
    { id: 'manager', position: { x: 400, y: 300 }, data: { label: 'Manager (Orchestrator)' }, type: 'default', style: { background: '#a18072', color: '#fff', border: 'none', width: 180 } },
    { id: 'registrar', position: { x: 100, y: 100 }, data: { label: 'Registrar' } },
    { id: 'strategist', position: { x: 300, y: 100 }, data: { label: 'Strategist' } },
    { id: 'sourcing', position: { x: 500, y: 100 }, data: { label: 'Sourcing' } },
    { id: 'designer', position: { x: 700, y: 100 }, data: { label: 'Designer' } },
    { id: 'engineer', position: { x: 200, y: 500 }, data: { label: 'Engineer' } },
    { id: 'director', position: { x: 600, y: 500 }, data: { label: 'Director' } },
];

const initialEdges: Edge[] = [
    { id: 'e1-manager', source: 'registrar', target: 'manager', animated: true },
    { id: 'e2-manager', source: 'strategist', target: 'manager', animated: true },
    { id: 'e3-manager', source: 'sourcing', target: 'manager', animated: true },
    { id: 'e4-manager', source: 'designer', target: 'manager', animated: true },
    { id: 'e5-manager', source: 'engineer', target: 'manager', animated: true },
    { id: 'e6-manager', source: 'director', target: 'manager', animated: true },
];

export default function AgentMindMap() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const statuses = await getAgentStatus();

                setNodes((nds) => nds.map((node) => {
                    const agentKey = node.id.toLowerCase();
                    const status = statuses[agentKey]?.status;

                    if (status === 'BUSY') {
                        return {
                            ...node,
                            style: { ...node.style, background: '#FCD34D', color: '#000', border: '2px solid #F59E0B' }, // Yellow
                            data: { ...node.data, label: `${statuses[agentKey].name} (Thinking...)` }
                        };
                    } else if (node.id === 'manager') {
                        return {
                            ...node,
                            style: { background: '#a18072', color: '#fff', border: 'none', width: 180 },
                            data: { ...node.data, label: 'Manager (Orchestrator)' }
                        };
                    } else {
                        return {
                            ...node,
                            style: { background: '#fff', color: '#000', border: '1px solid #777' },
                            data: { ...node.data, label: statuses[agentKey]?.name || node.data.label.split(' (')[0] }
                        };
                    }
                }));
            } catch (e) {
                console.error("Failed to fetch agent status", e);
            }
        }, 300000); // 5 minutes

        return () => clearInterval(interval);
    }, [setNodes]);

    return (
        <div className="h-[600px] bg-white rounded-xl shadow-inner border border-pilates-200">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Controls />
                <MiniMap
                    nodeColor={(n) => {
                        if (n.style?.background) return n.style.background as string;
                        return '#fff';
                    }}
                    maskColor="rgba(240, 240, 240, 0.6)"
                    className="bg-white border border-pilates-200 rounded-lg"
                />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
