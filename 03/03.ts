// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return validateTriangles(parseInputAsRows(data));
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return validateTriangles(parseInputAsColumns(data));
}

type Input = { a: number; b: number; c: number };

// Functions
function parseInputAsRows(data: string): Input[] {
	const triangles = [];

	for (const row of data.split("\n")) {
		const [a, b, c] = (row.match(/\d+/g) || []).map(Number);
		triangles.push({ a, b, c });
	}

	return triangles;
}
function parseInputAsColumns(data: string): Input[] {
	const columns: number[][] = [[], [], []];
	const triangles = [];

	for (const row of data.split("\n")) {
		const [a, b, c] = (row.match(/\d+/g) || []).map(Number);

		columns[0].push(a);
		columns[1].push(b);
		columns[2].push(c);

		if (columns[0].length === 3) {
			for (const column of columns) {
				const [cA, cB, cC] = column.splice(0, 3);
				triangles.push({ a: cA, b: cB, c: cC });
			}
		}
	}

	return triangles;
}
function validateTriangles(triangles: Input[]): number {
	let valid = 0;

	for (const { a, b, c } of triangles) {
		if (a + b > c && a + c > b && b + c > a) {
			valid++;
		}
	}
	return valid;
}
