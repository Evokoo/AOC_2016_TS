// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		validCount = validateTriangles(data);

	return validCount;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		validCount = validateTriangles(data, true);

	return validCount;
}

//Run
solveB("input", "03");

type Sides = { a: number; b: number; c: number };

// Functions
function parseInput(data: string, partB: boolean = false): Sides[] {
	const triangles = [];
	const lines = data.split("\r\n");

	if (partB) {
		for (let i = 0; i < lines.length; i += 3) {
			const digits = lines
				.slice(i, i + 3)
				.map((section) => section.match(/\d+/g)!);

			for (let j = 0; j < 3; j++) {
				const [a, b, c] = [digits[0][j], digits[1][j], digits[2][j]].sort(
					(a, b) => +a - +b
				);
				triangles.push({ a: +a, b: +b, c: +c });
			}
		}
	} else {
		for (let triangle of lines) {
			const [a, b, c] = triangle.match(/\d+/g)!.sort((a, b) => +a - +b);
			triangles.push({ a: +a, b: +b, c: +c });
		}
	}

	return triangles;
}
function validateTriangles(data: string, partB: boolean = false): number {
	const triangles = parseInput(data, partB);

	let valid = 0;

	for (let { a, b, c } of triangles) {
		valid += a + b > c ? 1 : 0;
	}

	return valid;
}
