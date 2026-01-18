// frontend/src/nodes/filterNode.js
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'passed' },
        { type: 'source', position: Position.Bottom, id: 'failed' }
      ]}
    >
      <label className="custom-label">
        Condition:
        <input type="text" placeholder="Contains..." />
      </label>
    </BaseNode>
  );
};