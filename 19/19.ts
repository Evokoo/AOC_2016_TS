// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return josephusFormula(+data, 2);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return findLastElf(+data);
}

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
