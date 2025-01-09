// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const discs = parseInput(data);
	return dropCapsule(discs);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const discs = parseInput(data, true);
	return dropCapsule(discs);
}

type Disc = { id: number; positions: number; position: number };

// Functions
function parseInput(data: string, extraDisc: boolean = false): Disc[] {
	const discs: Disc[] = [];

	for (const disc of data.split("\n")) {
		const [id, positions, _, position] = (disc.match(/\d+/g) || []).map(Number);
		discs.push({ id, positions, position });
	}

	if (extraDisc) {
		discs.push({
			id: discs.length + 1,
			positions: 11,
			position: 0,
		});
	}

	return discs;
}

function updateDiscs(discs: Disc[], minute: number): Disc[] {
	return discs.map(({ id, positions, position }) => {
		position = (minute + id + position) % positions;
		return { id, positions, position };
	});
}

function dropCapsule(discs: Disc[]): number {
	for (let minute = 0; minute < Number.MAX_SAFE_INTEGER; minute++) {
		if (updateDiscs(discs, minute).every((disc) => disc.position === 0)) {
			return minute;
		}
	}

	throw Error("Optimal time not found");
}
