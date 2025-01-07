// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const [width, height] = fileName.startsWith("example") ? [7, 3] : [50, 6];
	return simulateScreen(parseInput(data), width, height);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

type Instruction = { type: string; x: number; y: number };
type Screen = Map<number, Set<number>>;

// Functions
function parseInput(data: string) {
	const instructions: Instruction[] = [];

	for (const line of data.split("\n")) {
		const [a, b] = (line.match(/\d+/g) || []).map(Number);

		if (line.startsWith("rect")) {
			instructions.push({ type: "Rectangle", x: a, y: b });
		}

		if (line.startsWith("rotate column")) {
			instructions.push({ type: "Column", x: a, y: b });
		}

		if (line.startsWith("rotate row")) {
			instructions.push({ type: "Row", x: b, y: a });
		}
	}

	return instructions;
}
function simulateScreen(
	instructions: Instruction[],
	width: number,
	height: number
) {
	const screen: Screen = new Map();

	for (const { type, x, y } of instructions) {
		//Rectangle
		if (type === "Rectangle") {
			for (let row = 0; row < y; row++) {
				const currentRow = screen.get(row) ?? new Set();

				for (let col = 0; col < x; col++) {
					currentRow.add(col);
				}

				screen.set(row, currentRow);
			}
		}
		//Column
		if (type === "Column") {
			const rowsToUpdate: Set<number> = new Set();

			for (const [row, columns] of screen) {
				if (columns.has(x)) {
					rowsToUpdate.add((row + y) % height);
					columns.delete(x);
				}
				screen.set(row, columns);
			}

			for (const row of rowsToUpdate) {
				const updatedRow = screen.get(row) ?? new Set();
				updatedRow.add(x);
				screen.set(row, updatedRow);
			}
		}
		//Row
		if (type === "Row") {
			const newRow: Set<number> = new Set();
			const currentRow = screen.get(y) ?? new Set();

			for (const column of currentRow) {
				newRow.add((column + x) % width);
			}

			screen.set(y, newRow);
		}
	}

	return countPixels(screen);
}

function countPixels(screen: Screen): number {
	let count = 0;

	for (const [_, columns] of screen) {
		count += columns.size;
	}

	return count;
}
function displayScrren(screen: Screen, rows: number, columns: number): void {
	const grid = Array.from({ length: rows }, () =>
		Array.from({ length: columns }, () => ".")
	);

	for (const [y, xRange] of screen) {
		for (const x of xRange) {
			grid[y][x] = "#";
		}
	}

	const flat = grid.map((row) => row.join("")).join("\n");

	console.log(flat + "\n");
}
