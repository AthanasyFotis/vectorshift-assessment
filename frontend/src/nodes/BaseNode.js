import { Handle, useReactFlow } from 'reactflow';
import { Card, Text, Group, ActionIcon, Tooltip, Box } from '@mantine/core';
import { IconTrash, IconGripVertical } from '@tabler/icons-react';
import { motion } from 'framer-motion';

// Framer Motion Animation Variants
const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { type: "spring", stiffness: 100 } 
  },
  hover: { 
    scale: 1.02, 
    borderColor: "#6366f1", // Indigo highlight
    boxShadow: "0px 10px 20px rgba(99, 102, 241, 0.2)"
  }
};

export const BaseNode = ({ id, data, title, children, handles = [] }) => {
  const { setNodes } = useReactFlow();

  const handleDelete = () => {
      
      if (window.confirm(`Are you sure you want to delete the ${title} node?`)) {
          setNodes((nodes) => nodes.filter((node) => node.id !== id));
      }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={nodeVariants}
      style={{ minWidth: '250px' }} // Ensures card isn't too skinny
    >
      <Card 
        shadow="sm" 
        padding="sm" 
        radius="md" 
        withBorder 
        style={{ 
            overflow: 'visible', 
            background: 'rgba(255, 255, 255, 0.95)', 
            backdropFilter: 'blur(10px)',
            border: '1px solid #e9ecef'
        }}
      >
        {/* Header with Title and Delete Button */}
        <Card.Section withBorder inheritPadding py="xs" bg="gray.0">
          <Group justify="space-between">
            <Group gap="xs">
                <IconGripVertical size={16} color="gray" style={{cursor: 'grab'}} />
                <Text fw={700} size="sm" c="dimmed" tt="uppercase" ls="xs">
                    {title}
                </Text>
            </Group>
            
            <Tooltip label="Delete Node" withArrow>
                <ActionIcon 
                    color="red" 
                    variant="subtle" 
                    size="sm" 
                    onClick={handleDelete}
                    className="nodrag" // Prevents dragging when clicking delete
                >
                    <IconTrash size={16} />
                </ActionIcon>
            </Tooltip>
          </Group>
        </Card.Section>

        {/* The Node Content (Inputs, Dropdowns, etc) */}
        <Box mt="sm">
            {children}
        </Box>

        {/* The Connection Dots (Handles) */}
        {handles.map((handle, index) => (
          <Handle
            key={index}
            type={handle.type}
            position={handle.position}
            id={`${id}-${handle.id}`}
            style={{
                ...handle.style,
                width: 10,
                height: 10,
                background: '#6366f1', // Indigo Brand Color
                border: '2px solid white',
                zIndex: 10
            }}
          />
        ))}
      </Card>
    </motion.div>
  );
};