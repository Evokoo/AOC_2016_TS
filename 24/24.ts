// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		grid = getGrid(data),
		gridPoints = findPoints(grid),
		shortestPath = findShortestPath(gridPoints, grid);

	return shortestPath;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		grid = getGrid(data),
		gridPoints = findPoints(grid),
		shortestPath = findShortestPath(gridPoints, grid, true);

	return shortestPath;
}

//Run
solveB("input", "24");

//Functions
type Point = { x: number; y: number };
type Location = Point & { ID: string };
type Grid = string[][];
type GridPoints = { start: Location; locations: Location[] };
interface Path {
	location: string;
	distance: number;
	seen: Set<string>;
}

function getGrid(data: string): Grid {
	return data.split("\r\n").map((row) => [...row]);
}
function findPoints(grid: Grid): GridPoints {
	const locations: Location[] = [];
	const start: Location = { ID: "0", x: 0, y: 0 };

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			if (/\d/.test(grid[y][x])) {
				const ID = grid[y][x];

				if (ID === "0") {
					start.x = x;
					start.y = y;
				} else {
					locations.push({ ID, x, y });
				}
			}
		}
	}

	return { start, locations };
}
function getNeighbours(current: Point, grid: Grid) {
	const neighbours: Point[] = [];

	for (const [nx, ny] of [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	]) {
		const [x, y] = [current.x + nx, current.y + ny];
		neighbours.push({ x, y });
	}

	return neighbours;
}
function getDistanceTable({ start, locations }: GridPoints, grid: Grid) {
	const allLocations = [start, ...locations].sort((a, b) => +a.ID - +b.ID);
	const table: Record<string, Record<number, number>> = {};

	for (let i = 0; i < allLocations.length; i++) {
		table[i] = {};

		for (let j = 0; j < allLocations.length; j++) {
			if (i === j) {
				table[i][j] = 0;
				continue;
			}

			if (table[j]) {
				table[i][j] = table[j][i];
				continue;
			}

			const pointA = { x: allLocations[i].x, y: allLocations[i].y };
			const pointB = { x: allLocations[j].x, y: allLocations[j].y };
			table[i][j] = getDistance(pointA, pointB, grid);
		}
	}

	return table;
}
function getDistance(start: Point, end: Point, grid: Grid) {
	const queue = [{ pos: start, steps: 0 }];
	const seen = new Set();

	while (queue.length) {
		const current = queue.shift()!;

		if (seen.has(JSON.stringify(current.pos))) {
			continue;
		} else {
			seen.add(JSON.stringify(current.pos));
		}

		if (current.pos.x === end.x && current.pos.y === end.y) {
			return current.steps;
		}

		for (let neighbour of getNeighbours(current.pos, grid)) {
			if (grid[neighbour.y][neighbour.x] === "#") continue;
			queue.push({ pos: neighbour, steps: current.steps + 1 });
		}
	}

	throw Error("Path not found");
}
function findShortestPath(
	gridPoints: GridPoints,
	grid: Grid,
	partB: boolean = false
) {
	const distanceTable = getDistanceTable(gridPoints, grid);
	const locationCount = Object.keys(distanceTable).length;

	const queue: Path[] = [
		{
			location: "0",
			distance: 0,
			seen: new Set(),
		},
	];

	while (queue.length) {
		const current = queue.shift()!;

		if (current.seen.has(current.location)) {
			continue;
		} else {
			current.seen.add(current.location);
		}

		if (current.seen.size === locationCount) {
			if (!partB) {
				return current.distance;
			}

			if (current.location === "0") {
				return current.distance;
			} else {
				current.seen.delete("0");
			}
		}

		for (let [ID, distance] of Object.entries(
			distanceTable[current.location]
		)) {
			if (ID === current.location) continue;

			queue.push({
				location: ID,
				distance: current.distance + distance,
				seen: new Set([...current.seen, current.location]),
			});
		}

		queue.sort((a, b) => a.distance - b.distance);
	}

	throw Error("No path found");
}
