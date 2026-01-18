// frontend/src/nodes/textNode.js
import { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);

  // to extract variables like {{ name }}
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    let match;
    const foundVariables = new Set(); 

    while ((match = regex.exec(currText)) !== null) {
      foundVariables.add(match[1]); 
    }

    
    const variableHandles = Array.from(foundVariables).map((variable, index, array) => {
        
        const topPosition = (index + 1) * (100 / (array.length + 1)); 
        return {
            id: variable,
            type: 'target',
            position: Position.Left,
            style: { top: `${topPosition}%` }, // Dynamic positioning
            title: variable 
        };
    });

    
    setHandles([
        ...variableHandles,
        { id: 'output', type: 'source', position: Position.Right }
    ]);
  }, [currText]);

  //  auto-resize the textarea height
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    
    // Auto-grow height
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset to calculate new scrollHeight
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Initial resize on mount
  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Text"
      handles={handles} // Pass dynamic handles here
    >
      <label className="custom-label">
        Text:
        <textarea 
          ref={textareaRef}
          value={currText} 
          onChange={handleTextChange} 
          className="nodrag" // Imp: prevents dragging the node when selecting text
          style={{
             width: '100%', 
             minHeight: '40px',
             resize: 'none', //  resizing via JS
             overflow: 'hidden',
             fontFamily: 'monospace',
             fontSize: '12px'
          }}
        />
      </label>
    </BaseNode>
  );
}