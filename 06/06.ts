// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day);
	return correctMessage(parseInput(data));
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day);
	return correctMessage(parseInput(data), false);
}

// Functions
function parseInput(data: string): string[] {
	return data.split("\n");
}

function correctMessage(lines: string[], mostCommon: boolean = true): string {
	const messageSize: number = lines[0].length;
	const columnMaps: Map<string, number>[] = Array.from(
		{ length: messageSize },
		() => new Map()
	);

	for (const line of lines) {
		for (let i = 0; i < messageSize; i++) {
			const cMap = columnMaps[i];
			const char = line[i];
			cMap.set(char, (cMap.get(char) ?? 0) + 1);
		}
	}

	return columnMaps
		.map((cMap) => {
			const sortedCharacters = [...cMap]
				.sort((a, b) => b[1] - a[1])
				.map(([char, _]) => char);
			return mostCommon ? sortedCharacters.at(0) : sortedCharacters.at(-1);
		})
		.join("");
}
