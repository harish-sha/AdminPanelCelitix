import { useState } from 'react';
import Editor from '@monaco-editor/react';

const CollaborativeEditor = () => {
  const [code, setCode] = useState('// Start typing your code here...');

  return (
    <div className="bg-white shadow rounded p-4 w-full">
      <h3 className="font-semibold mb-2">Code Editor</h3>
      <Editor
        height="350px"
        defaultLanguage="javascript"
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value)}
        className="rounded overflow-hidden"
      />
    </div>
  );
};

export default CollaborativeEditor;