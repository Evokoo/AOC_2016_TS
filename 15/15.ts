// Imports
import TOOLS from "../00/tools";

//Types
type Disc = { ID: number; positions: number; position: number };

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		discs = parseInput(data),
		time = dropCapule(discs);

	return time;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		discs = parseInput(data, true),
		time = dropCapule(discs);

	return time;
}

//Run
solveB("example_b", "15");

//Functions
function parseInput(data: string, partB: boolean = false): Disc[] {
	const discs = [];

	for (let disc of data.split("\r\n")) {
		const [ID, positions, _, position] = (disc.match(/\d+/g) || []).map(Number);
		discs.push({ ID, positions, position });
	}

	if (partB) {
		discs.push({
			ID: discs.length + 1,
			positions: 11,
			position: 0,
		});
	}

	return discs;
}
function updateDiscs(discs: Disc[], time: number): Disc[] {
	return discs.map(({ ID, positions, position }) => {
		position = (position + time + ID) % positions;
		return { ID, positions, position };
	});
}
function dropCapule(discs: Disc[]) {
	for (let time = 0; true; time++) {
		if (updateDiscs(discs, time).every((disc) => disc.position === 0)) {
			return time;
		}
	}
}
