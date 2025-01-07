// Imports
import TOOLS from "tools";
import { BinaryHeap } from "@std/data-structures";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const building = parseInput(data);

	moveItems(building);
	return 0;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

// type Building = Map<number, Set<string>>;
type Building = Set<string>[];
type State = {
	index: number;
	cost: number;
	items: Set<string>;
	layout: Building;
};

// Functions
function parseInput(data: string): Building {
	const building: Building = Array(4).fill(new Set<string>());

	for (const [index, line] of data.split("\n").entries()) {
		const floor: Set<string> = new Set();

		(line.match(/(?<=a )([\w-]+\s\w+)/g) || []).forEach((item) => {
			const [a, b] = item.split(" ");
			floor.add(`${a.slice(0, 2)}-${b[0]}`.toUpperCase());
		});

		building[index] = floor;
	}

	return building;
}

function moveItems(building: Building) {
	const visited: Set<string> = new Set();
	const queue: BinaryHeap<State> = new BinaryHeap((a, b) => a.cost - b.cost);

	queue.push({ index: 0, cost: 0, items: new Set(), layout: building });

	let iterations = 0;

	while (queue.length) {
		const current = queue.pop()!;
		const stateHash = getStateHash(current);

		const floor = current.layout[current.index];
		const items = current.items;
		const allItems = new Set([...items, ...floor]);

		if (iterations === 1000) {
			throw Error("Loop Break");
		} else {
			iterations++;
		}

		if (visited.has(stateHash)) {
			continue;
		} else {
			visited.add(stateHash);
		}

		if (isValidFloor(items, floor)) {
			for (const combination of generatorCombinations(allItems)) {
				const layout = current.layout.map((floor) => new Set(floor));

				for (const item of combination) {
					layout[current.index].delete(item);
				}

				if (current.index < 3) {
					queue.push({
						index: current.index + 1,
						cost: current.cost + 1,
						items: combination,
						layout,
					});
				}

				if (current.index > 0) {
					queue.push({
						index: current.index - 1,
						cost: current.cost + 1,
						items: combination,
						layout,
					});
				}
			}
		}

		// 	const currentFloor = new Set(layout[floor]);

		// 	if (currentFloor.size === 4) {
		// 		console.log(trips);
		// 		throw Error("SAFE?");
		// 	}

		// 	if (iterations++ === 1000) {
		// 		break;
		// 	}
	}
	console.log(queue.toArray());
}

function isValidFloor(floor: Set<string>, load: Set<string>): boolean {
	const generators = new Set(
		[...floor, ...load].filter((item) => item.endsWith("G"))
	);
	const microchips = new Set(
		[...floor, ...load].filter((item) => item.endsWith("M"))
	);

	for (const chip of microchips) {
		const generator = chip[0] + "G";
		if (!generators.has(generator) && generators.size > 0) {
			return false; // Microchip is unpowered and another generator is present
		}
	}

	return true;
}
function generatorCombinations(itemSet: Set<string>): Set<string>[] {
	const items = [...itemSet];
	const combinations = items.map((item) => new Set([item]));

	for (let i = 0; i < items.length; i++) {
		for (let j = i + 1; j < items.length; j++) {
			combinations.push(new Set([items[i], items[j]]));
		}
	}

	return combinations;
}
function getStateHash({ index, layout }: State): string {
	return `${index}:${layout.map((f) => [...f].sort().join(",")).join("|")}`;
}
