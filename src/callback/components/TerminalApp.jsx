import React, { useState } from 'react';

const TerminalApp = () => {
    const [commandInput, setCommandInput] = useState('');
    const [terminalOutput, setTerminalOutput] = useState([]);
    const [savedCommands, setSavedCommands] = useState([]);

    // Handle command input change
    const handleInputChange = (e) => {
        setCommandInput(e.target.value);
    };

    // Execute the entered command
    const executeCommand = (command) => {
        if (!command.trim()) {
            return "No command entered.";
        }

        setTerminalOutput((prev) => [...prev, `> ${command}`]);

        // Handle specific commands
        if (command === "help") {
            return "Available commands: help, clear, save";
        } else if (command === "clear") {
            setTerminalOutput([]);
            return "Terminal cleared.";
        } else if (command === "save") {
            setSavedCommands([...terminalOutput]);
            return "Commands saved successfully.";
        } else {
            return `Unknown command: ${command}`;
        }
    };

    // Handle command submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const output = executeCommand(commandInput);
        setTerminalOutput((prev) => [...prev, output]);
        setCommandInput("");
    };

    // Clear the terminal
    const handleClear = () => {
        setTerminalOutput([]);
    };

    // Save the commands to savedCommands
    const handleSave = () => {
        setSavedCommands([...terminalOutput]);
    };

    return (
        <div className="flex justify-center items-center w-full h-[80vh]  bg-gray-800 rounded-lg shadow-lg">
            <div className="w-full max-w-xl p-6 bg-gray-900 rounded-lg shadow-lg text-white">
                <h2 className="text-2xl font-semibold mb-4 text-center"> Terminal</h2>

                <div className="max-h-96 overflow-y-auto mb-4 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg">
                    {/* Terminal Output */}
                    {terminalOutput.map((output, index) => (
                        <div key={index} className="whitespace-pre-wrap font-mono text-sm mb-2">
                            {output}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={commandInput}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 border-2 border-gray-600 rounded-lg text-white font-mono text-sm"
                        placeholder="Enter command..."
                    />

                    <div className="flex md:flex-row flex-col justify-between gap-4">
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
                        >
                            Execute Command
                        </button>

                        <button
                            type="button"
                            onClick={handleClear}
                            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold"
                        >
                            Clear Terminal
                        </button>

                        <button
                            type="button"
                            onClick={handleSave}
                            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
                        >
                            Save Commands
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TerminalApp;
