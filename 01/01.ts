// Imports
import TOOLS from "../00/tools";

//Type & Interface
type Direction = { turn: number; move: number };
type Point = { x: number; y: number };

interface Taxi {
	pos: Point;
	bearing: number;
}

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		directions = parseInput(data),
		distance = navigate(directions);

	return distance;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		directions = parseInput(data),
		distance = navigate(directions, true);

	return distance;
}

//Run
solveB("example_B", "01");

// Functions
function parseInput(data: string): Direction[] {
	const directions = [];

	for (let direction of data.split(", ")) {
		const turn = direction.slice(0, 1) === "R" ? 90 : -90;
		const move = +direction.slice(1);

		directions.push({ turn, move });
	}

	return directions;
}
function navigate(directions: Direction[], partB: boolean = false): number {
	const taxi: Taxi = {
		pos: { x: 0, y: 0 },
		bearing: 0,
	};

	const path: Set<string> = new Set();

	for (const { turn, move } of directions) {
		taxi.bearing += turn;
		taxi.bearing = (taxi.bearing + (taxi.bearing < 0 ? 360 : 0)) % 360;

		for (let i = 0; i < move; i++) {
			switch (taxi.bearing) {
				case 0:
					taxi.pos.y += 1;
					break;
				case 90:
					taxi.pos.x += 1;
					break;
				case 180:
					taxi.pos.y -= 1;
					break;
				case 270:
					taxi.pos.x -= 1;
					break;
				default:
					throw Error("Invalid bearing");
			}

			if (partB) {
				const location = `${taxi.pos.y}-${taxi.pos.x}`;

				if (path.has(location)) {
					return TOOLS.manhattanDistance({ x: 0, y: 0 }, taxi.pos);
				} else {
					path.add(location);
				}
			}
		}
	}

	return TOOLS.manhattanDistance({ x: 0, y: 0 }, taxi.pos);
}
