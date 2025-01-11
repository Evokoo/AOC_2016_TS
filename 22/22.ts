// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const nodes = parseInput(data);
	return countNodePairs(nodes);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

type Node = {
	x: number;
	y: number;
	total: number;
	used: number;
	free: number;
};

type Nodes = Map<string, Node>;

// Functions
function parseInput(data: string): Nodes {
	const fileList: Nodes = new Map();

	for (const file of data.split("\n").slice(2)) {
		const [x, y, total, used, free] = (file.match(/\d+/g) || []).map(Number);
		fileList.set(`${x},${y}`, { x, y, total, used, free });
	}

	return fileList;
}
function countNodePairs(nodes: Nodes): number {
	const allNodes = [...nodes];
	let pairs = 0;

	for (let i = 0; i < allNodes.length; i++) {
		const a = allNodes[i];

		for (let j = i + 1; j < allNodes.length; j++) {
			const b = allNodes[j];

			if (a[0] === b[0]) continue;
			if (a[1].used > 0 && a[1].used <= b[1].free) pairs++;
			if (b[1].used > 0 && b[1].used <= a[1].free) pairs++;
		}
	}

	return pairs;
}
