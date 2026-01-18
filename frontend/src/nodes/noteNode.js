// frontend/src/nodes/noteNode.js
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const NoteNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Sticky Note"
      handles={[]} // No handles for a note
    >
      <textarea 
        placeholder="Write a note..." 
        style={{ height: '60px', border: 'none', background: '#fffec8', padding: '5px' }} 
      />
    </BaseNode>
  );
};