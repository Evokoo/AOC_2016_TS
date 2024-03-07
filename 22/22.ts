// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		nodes = parseInput(data),
		viablePairs = findNodePairs(nodes);

	return viablePairs;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "22");

//Functions
type Node = {
	ID: number;
	pos: { x: number; y: number };
	total: number;
	used: number;
	free: number;
};
type Pair = { a: Node; b: Node };

function parseInput(data: string) {
	const nodes: Node[] = [];
	const nodeList = data.split("\r\n").slice(2);

	for (let [index, node] of nodeList.entries()) {
		const [x, y, total, used, free] = node.match(/\d+/g)!.map(Number);

		nodes.push({
			ID: index,
			pos: { x, y },
			total,
			used,
			free,
		});
	}

	return nodes;
}
function findNodePairs(nodes: Node[]) {
	const pairs: Pair[] = [];

	for (let i = 0; i < nodes.length; i++) {
		const nodeA = nodes[i];

		for (let j = 0; j < nodes.length; j++) {
			const nodeB = nodes[j];

			if (nodeA.ID === nodeB.ID) {
				continue;
			}

			if (nodeA.used !== 0 && nodeA.used <= nodeB.free) {
				pairs.push({ a: nodeA, b: nodeB });
			}
		}
	}

	return pairs.length;
}
