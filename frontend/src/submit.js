// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { Button, Modal, Text, Group, Code, Stack, Loader, ThemeIcon } from '@mantine/core';
import { IconPlayerPlay, IconCheck, IconAlertCircle } from '@tabler/icons-react';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [loading, setLoading] = useState(false);
    const [modalOpened, setModalOpened] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();
            setResult(data);
            setModalOpened(true); // Open the pretty modal instead of alert()

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error: Could not connect to the backend.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button 
                    onClick={handleSubmit}
                    loading={loading}
                    leftSection={<IconPlayerPlay size={16} />}
                    variant="gradient" 
                    gradient={{ from: 'indigo', to: 'violet', deg: 45 }}
                    size="md"
                    radius="xl"
                    style={{
                        boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)', // Glowing shadow
                        transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Run Pipeline
                </Button>
            </div>

            {/* The Professional Result Modal */}
            <Modal 
                opened={modalOpened} 
                onClose={() => setModalOpened(false)} 
                title={<Text fw={700} size="lg" c="indigo">Pipeline Analysis</Text>}
                centered
                radius="md"
                padding="xl"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
            >
                {result && (
                    <Stack gap="md">
                        {/* Summary Header */}
                        <Group align="center" gap="sm" mb="xs">
                            <ThemeIcon 
                                radius="xl" 
                                size="lg" 
                                color={result.is_dag ? 'teal' : 'red'} 
                                variant="light"
                            >
                                {result.is_dag ? <IconCheck size={20} /> : <IconAlertCircle size={20} />}
                            </ThemeIcon>
                            <Text size="md" fw={500}>
                                {result.is_dag 
                                    ? "The pipeline is valid and robust." 
                                    : "Warning: The pipeline contains loops."}
                            </Text>
                        </Group>

                        {/* Stats Grid */}
                        <Stack gap="xs" bg="gray.0" p="md" style={{ borderRadius: 8 }}>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">Number of Nodes</Text>
                                <Code color="blue" fw={700} size="md">{result.num_nodes}</Code>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">Number of Edges</Text>
                                <Code color="violet" fw={700} size="md">{result.num_edges}</Code>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="dimmed">Is Acyclic (DAG)?</Text>
                                {result.is_dag ? (
                                    <Code color="teal" fw={700} size="md">Yes</Code>
                                ) : (
                                    <Code color="red" fw={700} size="md">No</Code>
                                )}
                            </Group>
                        </Stack>
                    </Stack>
                )}
            </Modal>
        </>
    );
}