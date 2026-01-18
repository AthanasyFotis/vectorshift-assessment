// frontend/src/nodes/transformNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.type || 'uppercase');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
      ]}
    >
      <label className="custom-label">
        Action:
        <select value={transformType} onChange={(e) => setTransformType(e.target.value)}>
          <option value="uppercase">To Uppercase</option>
          <option value="lowercase">To Lowercase</option>
        </select>
      </label>
    </BaseNode>
  );
};