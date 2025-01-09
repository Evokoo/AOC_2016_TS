// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const [target, fNumber] = fileName.startsWith("example")
		? [{ x: 7, y: 4 }, 10]
		: [{ x: 31, y: 39 }, Number(data)];
	return traverseMap(target, fNumber);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return traverseMap({ x: Infinity, y: Infinity }, Number(data), 50);
}

type Point = { x: number; y: number };
type State = Point & { steps: number };

// Functions
function traverseMap(target: Point, fNumber: number, range?: number): number {
	const queue: State[] = [{ x: 1, y: 1, steps: 0 }];
	const tiles: Map<string, string> = new Map();
	const seen: Set<string> = new Set();

	while (queue.length) {
		const current = queue.shift()!;

		if (range && current.steps === range) {
			return seen.size;
		} else if (current.x === target.x && current.y === target.y) {
			return current.steps;
		} else {
			pushNewStates(current);
		}
	}

	throw Error("Path to target not found");

	function pushNewStates({ x, y, steps }: State) {
		const directions = [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0],
		];

		for (const [dx, dy] of directions) {
			const [nx, ny] = [dx + x, dy + y];
			const coord = `${nx},${ny}`;

			if (nx < 0 || ny < 0) continue;

			if (getTile(nx, ny, coord) === "." && !seen.has(coord)) {
				queue.push({ x: nx, y: ny, steps: steps + 1 });
				seen.add(coord);
			}
		}
	}

	function getTile(x: number, y: number, coord: string): string {
		if (tiles.has(coord)) {
			return tiles.get(coord)!;
		} else {
			const tileValue = Math.pow(x + y, 2) + 3 * x + y + fNumber;
			const bits = tileValue.toString(2).replace(/0/g, "");
			const tile = bits.length % 2 === 0 ? "." : "#";

			tiles.set(coord, tile);

			return tile;
		}
	}
}
