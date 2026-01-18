from typing import List, Dict, Any

class PipelineService:
    @staticmethod
    def calculate_stats(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculates nodes, edges and checks for DAG status."""
        return {
            "num_nodes": len(nodes),
            "num_edges": len(edges),
            "is_dag": PipelineService.is_dag(nodes, edges)
        }

    @staticmethod
    def is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
        """Determines if the graph is a Directed Acyclic Graph (DAG) using DFS."""
        adj = {node['id']: [] for node in nodes}
        for edge in edges:
            src = edge['source']
            target = edge['target']
            if src in adj:
                adj[src].append(target)
                
        visited = set()
        recursion_stack = set()
        
        def dfs(node_id):
            visited.add(node_id)
            recursion_stack.add(node_id)
            
            if node_id in adj:
                for neighbor in adj[node_id]:
                    if neighbor not in visited:
                        if dfs(neighbor): return True
                    elif neighbor in recursion_stack:
                        return True
            
            recursion_stack.remove(node_id)
            return False

        for node in nodes:
            if node['id'] not in visited:
                if dfs(node['id']):
                    return False # Cycle detected
                    
        return True # DAG