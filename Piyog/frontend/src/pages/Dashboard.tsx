import { useState, useRef, useEffect } from 'react';
import AgentMindMap from '../components/dashboard/AgentMindMap';
import { Play, Terminal } from 'lucide-react';
import { chatWithAgents } from '../lib/api';

const Dashboard = () => {
    const [query, setQuery] = useState('');
    const [logs, setLogs] = useState<string[]>(['System initialized. Waiting for command...']);
    const [isProcessing, setIsProcessing] = useState(false);
    // Simple session ID for memory
    const [threadId] = useState(() => Math.random().toString(36).substring(7));
    const logsEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [logs, isProcessing]);

    const handleRun = async () => {
        if (!query.trim()) return;
        setIsProcessing(true);
        setLogs(prev => [...prev, `User: ${query}`]);

        try {
            const result = await chatWithAgents(query, threadId);

            // Only show the final Manager summary as requested
            setLogs(prev => [...prev, `Manager: ${result.response}`]);

            setIsProcessing(false);
            setQuery(''); // Clear input

        } catch (error) {
            console.error(error);
            setLogs(prev => [...prev, `Manager: Error: Failed to connect to agent cluster.`]);
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 h-[calc(100vh-64px)]flex flex-col">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-pilates-900">Virtual HQ</h1>
                    <p className="text-pilates-600">Real-time Agent Orchestration & Monitoring</p>
                </div>
                <div className="flex gap-2">
                    <select className="px-4 py-2 rounded-lg border border-pilates-300 bg-white text-pilates-800 text-sm">
                        <option value="gemini">Provider: Google Gemini</option>
                        <option value="deepseek">Provider: DeepSeek</option>
                    </select>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> ONLINE
                    </span>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-8 h-full">
                {/* Visualizer */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-pilates-200 flex-1 min-h-[500px]">
                        <h2 className="text-lg font-semibold mb-4 text-pilates-800">Agent Mesh</h2>
                        <AgentMindMap />
                    </div>
                </div>

                {/* Command & Logs */}
                <div className="flex flex-col gap-4">
                    {/* Input */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-pilates-200">
                        <h2 className="text-lg font-semibold mb-4 text-pilates-800">Command Center</h2>
                        <div className="space-y-4">
                            <textarea
                                className="w-full p-4 rounded-lg bg-pilates-50 border border-pilates-200 focus:outline-none focus:ring-2 focus:ring-pilates-400 resize-none text-pilates-900 placeholder:text-pilates-400"
                                rows={4}
                                placeholder="Describe a task (e.g., 'Design a new sustainable yoga mat line' or 'Analyze Q3 marketing performance')..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            ></textarea>
                            <button
                                onClick={handleRun}
                                disabled={isProcessing}
                                className="w-full py-3 bg-pilates-900 hover:bg-pilates-800 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isProcessing ? (
                                    <>Processing...</>
                                ) : (
                                    <><Play className="w-4 h-4" /> Dispatch Agents</>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Logs - Converted to Chat Interface */}
                    <div className="bg-white p-6 rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col border border-pilates-200">
                        <h2 className="text-lg font-semibold mb-4 text-pilates-800 flex items-center gap-2">
                            Interaction History
                        </h2>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            {logs.map((log, i) => {
                                const isUser = log.startsWith('User:');
                                const content = log.replace(/^(User:|Manager:)/, '').trim();

                                // Skip system init message for cleaner chat if desired, or style it potentially
                                if (log.includes('System initialized')) return (
                                    <div key={i} className="text-center text-xs text-pilates-400 my-2 italic">
                                        {log}
                                    </div>
                                );

                                return (
                                    <div key={i} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-lg text-sm ${isUser
                                            ? 'bg-pilates-900 text-white rounded-tr-none'
                                            : 'bg-pilates-50 text-pilates-800 border border-pilates-200 rounded-tl-none'
                                            }`}>
                                            <div className="font-xs font-bold mb-1 opacity-70">
                                                {isUser ? 'You' : 'Expert Agent'}
                                            </div>
                                            <div
                                                className="leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: content }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Progress Indicator */}
                            {isProcessing && (
                                <div className="flex justify-start">
                                    <div className="bg-pilates-50 text-pilates-800 border border-pilates-200 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                                        <div className="flex items-center gap-2 text-sm">
                                            <div className="w-2 h-2 bg-pilates-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-pilates-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-pilates-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            <span className="ml-2 text-pilates-500 italic">Consulting with agents...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={logsEndRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
