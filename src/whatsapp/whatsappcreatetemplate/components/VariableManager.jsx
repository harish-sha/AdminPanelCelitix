// Variable with {{1}},{{2}},{{3}} - start
import React, { useState, useEffect, useRef } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";

const VariableManager = ({ templateFormat, setTemplateFormat, onUpdateVariables }) => {
    const containerRef = useRef(null);
    const [variables, setVariables] = useState([]);

    const addVariable = () => {
        const newVariable = { id: `${variables.length + 1}`, value: "" };
        const updatedVariables = [...variables, newVariable];
        setVariables(updatedVariables);
        setTemplateFormat((prev) => `${prev}{{${newVariable.id}}}`);
        onUpdateVariables(updatedVariables);
    };

    const handleVariableChange = (id, value) => {
        const updatedVariables = variables.map((variable) =>
            variable.id === id ? { ...variable, value } : variable
        );
        setVariables(updatedVariables);
        onUpdateVariables(updatedVariables);
    };

    const removeVariable = (id) => {
        const updatedVariables = variables
            .filter((variable) => variable.id !== id)
            .map((variable, index) => ({ ...variable, id: `${index + 1}` }));

        let updatedTemplateFormat = templateFormat;
        variables.forEach((variable, index) => {
            updatedTemplateFormat = updatedTemplateFormat.replace(
                `{{${variable.id}}}`,
                updatedVariables[index] ? `{{${index + 1}}}` : ""
            );
        });

        setVariables(updatedVariables);
        setTemplateFormat(updatedTemplateFormat);
        onUpdateVariables(updatedVariables);
    };

    useEffect(() => {
        const matches = templateFormat.match(/{{\d+}}/g) || [];
        const currentVariableIds = variables.map((variable) => variable.id);

        const newVariables = matches
            .filter((match) => !currentVariableIds.includes(match.slice(2, -2)))
            .map((match) => ({ id: match.slice(2, -2), value: "" }));

        const validVariables = variables.filter((variable) =>
            matches.includes(`{{${variable.id}}}`)
        );

        const updatedVariables = [...validVariables, ...newVariables].map((variable, index) => ({
            ...variable,
            id: `${index + 1}`,
        }));

        let updatedTemplateFormat = templateFormat;
        matches.forEach((match, index) => {
            updatedTemplateFormat = updatedTemplateFormat.replace(
                match,
                `{{${index + 1}}}`
            );
        });

        setVariables(updatedVariables);
        setTemplateFormat(updatedTemplateFormat);
        onUpdateVariables(updatedVariables);
    }, [templateFormat]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [variables]);

    return (
        <div className="w-full relative ">
            <p className='text-sm text-gray-500'>
                {templateFormat.length}/1024
            </p>
            <div className="flex justify-end items-center mb-7">
                <button
                    onClick={addVariable}
                    className="bg-[#212529] text-white px-2 py-2 font-normal rounded-md text-sm hover:bg-[#434851] absolute"
                >
                    Add Variable
                </button>
            </div>
            <div className="h-auto max-h-56 overflow-scroll" ref={containerRef} >
                {variables.map((variable, index) => (
                    <div key={variable.id} className="flex items-center mt-2 gap-5 w-full px-1">
                        <label htmlFor="" className="w-14" >{`{{${index + 1}}}`}</label>
                        <input
                            id="templateVariable"
                            name="templateVariable"
                            type="text"
                            value={variable.value}
                            onChange={(e) => handleVariableChange(variable.id, e.target.value)}
                            placeholder={`Enter value for {{${variable.id}}}`}
                            className="w-full focus:outline-none p-2 border bg-white border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button
                            onClick={() => {
                                removeVariable(variable.id);
                                toast.success(`variable removed successfully!`);
                            }}
                            className="bg-transparent text-white p-1 rounded-md text-sm"
                        >
                            <MdOutlineDeleteForever
                                className='text-red-500 cursor-pointer hover:text-red-700'
                                size={24}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VariableManager;

// Variable with {{1}},{{2}},{{3}} - End

