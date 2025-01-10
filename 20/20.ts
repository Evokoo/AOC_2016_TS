// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const ranges = parseInput(data);
	return mergeRanges(ranges)[0].max + 1;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const ranges = mergeRanges(parseInput(data));
	const limit = fileName.startsWith("example") ? 9 : 4294967295;
	return countValidIps(ranges, limit);
}

type Range = { min: number; max: number };

// Functions
function parseInput(data: string): Range[] {
	const ranges: Range[] = [];

	for (const line of data.split("\n")) {
		const [min, max] = line.split("-").map(Number);
		ranges.push({ min, max });
	}

	return ranges.sort((a, b) => a.min - b.min);
}
function mergeRanges(ranges: Range[]): Range[] {
	const merged = [];
	let currentRange = ranges[0];

	for (let i = 1; i < ranges.length; i++) {
		const nextRange = ranges[i];

		if (nextRange.min <= currentRange.max + 1) {
			currentRange.max = Math.max(currentRange.max, nextRange.max);
		} else {
			merged.push(currentRange);
			currentRange = nextRange;
		}
	}

	merged.push(currentRange);

	return merged;
}
function countValidIps(ranges: Range[], limit: number) {
	let valid = 0;

	for (let i = 0; i < ranges.length; i++) {
		const a = ranges[i].max;
		const b = ranges[i + 1]?.min - 1 || limit;

		valid += b - a;
	}

	return valid;
}
