// frontend/src/nodes/joinNode.js
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const JoinNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Joiner"
      handles={[
        { type: 'target', position: Position.Left, id: 'a', style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: 'b', style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: 'output' }
      ]}
    >
      <div style={{ fontSize: '11px', color: '#777' }}>
        Combines two inputs into one string.
      </div>
    </BaseNode>
  );
};