// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const limit = fileName.startsWith("example") ? 10 : 40;
	return countSafeTiles(data, limit);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return countSafeTiles(data, 400000);
}

// Functions
function countSafeTiles(row: string, limit: number): number {
	let count = row.replace(/\^/g, "").length;

	for (let i = 0; i < limit - 1; i++) {
		let nextRow = "";

		for (let j = 0; j < row.length; j++) {
			const tile = getTile(row[j - 1] ?? ".", row[j], row[j + 1] ?? ".");
			if (tile === ".") count++;
			nextRow += tile;
		}
		row = nextRow;
	}
	return count;
}

function getTile(l: string, c: string, r: string): string {
	const patterns: Record<string, string> = {
		"^^.": "^",
		".^^": "^",
		"^..": "^",
		"..^": "^",
	};

	return patterns[l + c + r] ?? ".";
}
