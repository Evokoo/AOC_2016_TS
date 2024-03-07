// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		lastElf = josephusFormula(+data, 2);

	return lastElf;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		lastElf = findLastElf(+data);

	return lastElf;
}

//Run
solveB("input", "19");

//Functions
function josephusFormula(n: number, k: number): number {
	if (n === 1) return 1;

	let position = 0;
	for (let i = 2; i <= n; i++) {
		position = (position + k) % i;
	}

	return position + 1;
}
function findLastElf(n: number) {
	let elf = 1;

	for (let i = 1; i < n; i++) {
		elf = (elf % i) + 1;

		if (elf > (i + 1) / 2) {
			elf++;
		}
	}

	return elf;
}
