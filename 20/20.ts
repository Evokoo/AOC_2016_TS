// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		ranges = parseInput(data),
		minValid = mergeRanges(ranges)[0].upper + 1;

	return minValid;
}
export function solveB(fileName: string, day: string, max: number): number {
	const data = TOOLS.readData(fileName, day),
		ranges = parseInput(data),
		validIPs = countValidIp(mergeRanges(ranges), max);

	return validIPs;
}

//Run
// solveB("example_a", "20", 9);
// solveB("input", "20", 4294967295);

//Functions
type Range = { lower: number; upper: number };

function parseInput(data: string): Range[] {
	const ranges: Range[] = [];

	for (let range of data.split("\r\n")) {
		const [lower, upper] = range.split("-").map(Number);
		ranges.push({ lower, upper });
	}

	return ranges.sort((a, b) => a.lower - b.lower);
}
function mergeRanges(ranges: Range[]): Range[] {
	const mergedRanges = [];
	let currentRange = ranges[0];

	for (let i = 1; i < ranges.length; i++) {
		const nextRange = ranges[i];

		if (nextRange.lower <= currentRange.upper + 1) {
			currentRange.upper = Math.max(currentRange.upper, nextRange.upper);
		} else {
			mergedRanges.push(currentRange);
			currentRange = nextRange;
		}
	}

	mergedRanges.push(currentRange);

	return mergedRanges;
}
function countValidIp(ranges: Range[], max: number) {
	let validCount = 0;

	for (let i = 0; i < ranges.length; i++) {
		const a = ranges[i].upper;
		const b = ranges[i + 1]?.lower - 1 || max;

		validCount += b - a;
	}

	return validCount;
}
