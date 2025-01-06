// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return followDirections(parseInput(data));
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return followDirections(parseInput(data), new Set());
}

type Path = {
	x: number;
	y: number;
	bearing: number;
};

type Direction = {
	turn: number;
	steps: number;
};

// Functions
function parseInput(data: string): Direction[] {
	const directions: Direction[] = [];

	for (const input of data.split(", ")) {
		const [direction, steps] = [input[0], input.slice(1)];

		directions.push({
			turn: direction === "R" ? 90 : -90,
			steps: Number(steps),
		});
	}

	return directions;
}
function followDirections(
	directions: Direction[],
	visited?: Set<string>
): number {
	const path: Path = { x: 0, y: 0, bearing: 0 };

	for (const { turn, steps } of directions) {
		path.bearing = (path.bearing + turn + 360) % 360;

		for (let i = 0; i < steps; i++) {
			switch (path.bearing) {
				case 0:
					path.y += 1;
					break;
				case 90:
					path.x += 1;
					break;
				case 180:
					path.y -= 1;
					break;
				case 270:
					path.x -= 1;
					break;
				default:
					throw Error("Invalid bearing");
			}

			if (visited) {
				const coord = `${path.x},${path.y}`;

				if (visited.has(coord)) {
					return TOOLS.manhattanDistance(
						{ x: 0, y: 0 },
						{ x: path.x, y: path.y }
					);
				} else {
					visited.add(coord);
				}
			}
		}
	}

	return TOOLS.manhattanDistance({ x: 0, y: 0 }, { x: path.x, y: path.y });
}
