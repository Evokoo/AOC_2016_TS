// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		words = parseInput(data),
		message = getMessage(words);

	return message;
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		words = parseInput(data),
		message = getMessage(words, true);

	return message;
}

//Run
solveA("example_a", "06");

// Functions
function parseInput(data: string): string[] {
	return data.split("\r\n");
}
function getMessage(words: string[], partB: boolean = false): string {
	const charCount: Record<number, Record<string, number>> = {};

	for (let i = 0; i < words[0].length; i++) {
		charCount[i] = {};
	}

	for (let word of words) {
		for (let i = 0; i < word.length; i++) {
			const char = word[i];
			charCount[i] = { ...charCount[i], [char]: (charCount[i][char] || 0) + 1 };
		}
	}

	const message = Object.values(charCount).reduce((acc, cur) => {
		const char = Object.entries(cur).sort((a, b) =>
			partB ? a[1] - b[1] : b[1] - a[1]
		)[0][0];
		return acc + char;
	}, "");

	return message;
}
