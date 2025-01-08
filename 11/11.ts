// Imports
import TOOLS from "tools";
import { BinaryHeap } from "@std/data-structures";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const items = parseInput(data);
	console.log(items);

	return 0;
	// return moveItems(items);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

type Items = number[];
type State = {
	floor: number;
	cost: number;
	items: Items;
};

// Functions
function parseInput(data: string): Items {
	const items: { id: string; floor: number }[] = [];

	for (const [index, line] of data.split("\n").entries()) {
		(line.match(/(?<=a )([\w-]+\s\w+)/g) || []).forEach((item) => {
			const [a, b] = item.split(" ");
			const id = `${a.slice(0, 2)}-${b[0]}`.toUpperCase();
			items.push({ id, floor: index });
		});
	}

	console.log(items.sort((a, b) => a.id.localeCompare(b.id)));

	return items
		.sort((a, b) => a.id.localeCompare(b.id))
		.map(({ floor }) => floor);
}

// Elevator can carry 1 or 2 items, never 0
// Paired generator and microchips are safe
// Micorchips cannot exist with generators unless paired
