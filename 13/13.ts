// Imports
import TOOLS from "../00/tools";

type Point = { x: number; y: number };
interface Path {
	pos: Point;
	steps: number;
}

//Solutions
export function solveA(fileName: string, day: string, end: Point): number {
	const designerNum = +TOOLS.readData(fileName, day);
	const steps = BFS({ x: 1, y: 1 }, end, designerNum);

	return steps;
}
export function solveB(fileName: string, day: string, end: Point): number {
	const designerNum = +TOOLS.readData(fileName, day);
	const locations = BFS({ x: 1, y: 1 }, end, designerNum, true);

	return locations;
}

//Run
solveB("input", "13", { x: 31, y: 39 });

//Functions

function isWall({ x, y }: Point, num: number): boolean {
	const decimal = x * x + 3 * x + 2 * x * y + y + y * y + num,
		bits = decimal.toString(2),
		ones = bits.match(/1/g) || [];

	return ones.length % 2 !== 0;
}
function getNeighbours(point: Point): Point[] {
	const neighbours: Point[] = [];

	for (let [nx, ny] of [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	]) {
		const [x, y] = [point.x + nx, point.y + ny];

		if (x < 0 || y < 0) continue;
		else neighbours.push({ x, y });
	}

	return neighbours;
}
function BFS(
	start: Point,
	end: Point,
	designerNum: number,
	partB: boolean = false
) {
	const seen: Set<string> = new Set();
	const walls: Set<string> = new Set();
	const queue: Path[] = [{ pos: start, steps: 0 }];

	while (queue.length) {
		const current = queue.shift()!;
		const posString = JSON.stringify(current.pos);

		if (seen.has(posString) || walls.has(posString)) {
			continue;
		} else {
			seen.add(posString);
		}

		if (partB) {
			if (current.steps === 50) {
				continue;
			}
		} else {
			if (current.pos.x === end.x && current.pos.y === end.y) {
				return current.steps;
			}
		}

		for (let neighbour of getNeighbours(current.pos)) {
			if (isWall(neighbour, designerNum)) {
				walls.add(JSON.stringify(neighbour));
			} else {
				queue.push({
					pos: neighbour,
					steps: current.steps + 1,
				});
			}
		}
	}

	return seen.size;
}
