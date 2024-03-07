// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string, size: number): number {
	const data = TOOLS.readData(fileName, day),
		row = parseInput(data),
		mapData = generateMap(row, size);

	return mapData.safeTiles;
}
export function solveB(fileName: string, day: string, size: number): number {
	const data = TOOLS.readData(fileName, day),
		row = parseInput(data),
		mapData = generateMap(row, size);

	return mapData.safeTiles;
}

//Run
// solveA("example_a", "18", 10);

//Functions
type MapData = {
	safeTiles: number;
	trapTiles: number;
};

function parseInput(data: string): string[] {
	return [...data];
}
function isTrap(l: string, c: string, r: string): boolean {
	if (l === c && c === "^" && r === ".") return true;
	if (r === c && c === "^" && l === ".") return true;
	if (l === "^" && c === "." && r === c) return true;
	if (r === "^" && c === "." && l === c) return true;

	return false;
}
function generateMap(firstRow: string[], size: number): MapData {
	let previousRow = firstRow;
	let trapTiles = firstRow.filter((tile) => tile === "^").length;
	let safeTiles = firstRow.length - trapTiles;

	for (let row = 1; row < size; row++) {
		const nextRow = [];

		for (let i = 0; i < previousRow.length; i++) {
			const [l, c, r] = [
				previousRow[i - 1] ?? ".",
				previousRow[i],
				previousRow[i + 1] ?? ".",
			];

			if (isTrap(l, c, r)) {
				nextRow.push("^");
				trapTiles++;
			} else {
				nextRow.push(".");
				safeTiles++;
			}
		}

		previousRow = nextRow;
	}

	return { safeTiles, trapTiles };
}
