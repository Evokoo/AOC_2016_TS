// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const maze = parseInput(data);
	const distanceMap = getDistanceMap(maze);
	return getShortestPath(distanceMap);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const maze = parseInput(data);
	const distanceMap = getDistanceMap(maze);
	return getShortestPath(distanceMap, true);
}

type Point = { x: number; y: number };
type Maze = {
	path: Set<string>;
	locations: Map<number, Point>;
};
type DistanceMap = Map<number, Map<number, number>>;
type State = { x: number; y: number; steps: number };

// Functions
function parseInput(data: string): Maze {
	const maze: Maze = {
		path: new Set(),
		locations: new Map(),
	};
	const grid = data.split("\n");

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			const tile = grid[y][x];

			if (tile === "#") continue;
			if (tile !== ".") maze.locations.set(Number(tile), { x, y });

			maze.path.add(`${x},${y}`);
		}
	}

	return maze;
}
function getDistanceMap({ path, locations }: Maze) {
	const distanceMap: DistanceMap = new Map();
	const locationArr = [...locations];

	for (let i = 0; i < locationArr.length; i++) {
		const origin = locationArr[i];
		const originMap = distanceMap.get(origin[0]) ?? new Map();

		for (let j = i + 1; j < locationArr.length; j++) {
			const target = locationArr[j];
			const targetMap = distanceMap.get(target[0]) ?? new Map();
			const distance = traverseMaze(origin[1], target[1]);
			originMap.set(target[0], distance);
			targetMap.set(origin[0], distance);
			distanceMap.set(target[0], targetMap);
		}

		distanceMap.set(origin[0], originMap);
	}

	return distanceMap;

	function traverseMaze(start: Point, target: Point): number {
		const queue: State[] = [{ x: start.x, y: start.y, steps: 0 }];
		const seen: Set<string> = new Set();

		while (queue.length) {
			const current = queue.shift()!;

			if (current.x === target.x && current.y === target.y) {
				return current.steps;
			} else {
				pushNewStates(current);
			}
		}

		throw Error("Path not found");

		function pushNewStates({ x, y, steps }: State): void {
			const directions = [
				[0, 1],
				[0, -1],
				[1, 0],
				[-1, 0],
			];

			for (const [dx, dy] of directions) {
				const [nx, ny] = [dx + x, dy + y];
				const coord = `${nx},${ny}`;

				if (path.has(coord) && !seen.has(coord)) {
					queue.push({ x: nx, y: ny, steps: steps + 1 });
					seen.add(coord);
				}
			}
		}
	}
}
function getShortestPath(distanceMap: DistanceMap, roundTrip: boolean = false) {
	const queue = [{ location: 0, steps: 0, seen: new Set([0]) }];
	const shortest = { route: new Set(), steps: Infinity };

	while (queue.length) {
		const current = queue.shift()!;

		if (current.seen.size === distanceMap.size) {
			if (roundTrip) {
				current.steps += distanceMap.get(current.location)!.get(0)!;
			}

			if (current.steps < shortest.steps) {
				shortest.route = current.seen;
				shortest.steps = current.steps;
			}
		}

		for (const [id, distance] of distanceMap.get(current.location)!) {
			if (!current.seen.has(id)) {
				queue.push({
					location: id,
					steps: current.steps + distance,
					seen: current.seen.union(new Set([id])),
				});
			}
		}
	}

	return shortest.steps;
}
