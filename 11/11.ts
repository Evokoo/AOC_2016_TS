// Imports
import TOOLS from "tools";
import { BinaryHeap } from "@std/data-structures";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return moveItems(parseInput(data));
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

type Layout = Map<number, Set<string>>;
type Items = { layout: Layout; itemCount: number };
type State = {
	cost: number;
	level: number;
	floors: Layout;
};

// Functions
function parseInput(data: string): Items {
	const items: Items = { layout: new Map(), itemCount: 0 };

	for (const [index, line] of data.split("\n").entries()) {
		const floor: Set<string> = new Set();

		(line.match(/(?<=a )[\w+\-]+\s\w+/g) || []).forEach((match) => {
			const [element, type] = match.split(" ");
			floor.add(`${element.slice(0, 2)}-${type[0]}`.toUpperCase());
			items.itemCount++;
		});

		items.layout.set(index, floor);
	}

	return items;
}

function moveItems({ layout, itemCount }: Items): number {
	const queue: BinaryHeap<State> = new BinaryHeap((a, b) => a.cost - b.cost);
	const seen: Set<string> = new Set();

	queue.push({ cost: 0, level: 0, floors: layout });

	while (queue.length) {
		const currentState = queue.pop()!;

		if (allItemsMoved(currentState, itemCount)) {
			return currentState.cost;
		}

		for (const nextState of getNextStates(currentState)) {
			const stateKey = getStateKey(nextState);

			if (!seen.has(stateKey)) {
				queue.push(nextState);
				seen.add(stateKey);
			}
		}
	}

	throw Error("Moves Count not found");
}

function allItemsMoved({ level, floors }: State, target: number): boolean {
	return level === 3 && floors.get(3)!.size === target;
}
function getNextStates({ cost, level, floors }: State): State[] {
	const possibleMoves = getPossibleMoves(floors.get(level) ?? new Set());
	const newStates: State[] = [];

	for (const move of possibleMoves) {
		for (const direction of [-1, 1]) {
			const nextLevel = level + direction;

			if (nextLevel < 0 || nextLevel > 3) {
				continue;
			}

			const nextFloors = structuredClone(floors);

			//Update current floor
			const currentFloor = nextFloors.get(level)!;
			nextFloors.set(level, currentFloor.difference(move));

			//Update next floor
			const nextFloor = nextFloors.get(nextLevel)!;
			nextFloors.set(nextLevel, nextFloor.union(move));

			if (
				isValidFloor(nextFloors.get(level)!) &&
				isValidFloor(nextFloors.get(nextLevel)!)
			) {
				newStates.push({
					cost: cost + 1,
					level: nextLevel,
					floors: nextFloors,
				});
			}
		}
	}

	return newStates;
}
function getPossibleMoves(floor: Set<string>): Set<string>[] {
	const items = [...floor];
	const combinations = items.map((item) => new Set([item]));

	for (let i = 0; i < items.length; i++) {
		for (let j = i + 1; j < items.length; j++) {
			combinations.push(new Set([items[i], items[j]]));
		}
	}

	return combinations;
}
function isValidFloor(floor: Set<string>): boolean {
	const generators: Set<string> = new Set();
	const microchips: Set<string> = new Set();

	for (const item of floor) {
		const [id, type] = item.split("-");

		if (type === "M") microchips.add(id);
		if (type === "G") generators.add(id);
	}

	if (generators.size > 0) {
		for (const id of microchips) {
			if (!generators.has(id)) return false;
		}
	}

	return true;
}
function getStateKey({ level, floors }: State): string {
	const key: string[] = [String(level)];

	for (const [_, items] of floors) {
		let [g, m] = [0, 0];

		for (const item of items) {
			item.at(-1) === "G" ? g++ : m++;
		}

		key.push(JSON.stringify([g, m]));
	}

	return key.join(",");
}
