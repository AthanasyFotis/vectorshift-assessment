// frontend/src/nodes/fileNode.js
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const FileNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="File"
      handles={[
        { type: 'source', position: Position.Right, id: 'file' }
      ]}
    >
      <div style={{ padding: '5px' }}>
        <span style={{ fontSize: '12px' }}>Upload a file:</span>
        <input type="file" style={{ marginTop: '5px', width: '100%' }} />
      </div>
    </BaseNode>
  );
};