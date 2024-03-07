// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string, len: number): string {
	const input = TOOLS.readData(fileName, day),
		data = generateData(input, len),
		checkSum = getChecksum(data);

	return checkSum;
}
export function solveB(fileName: string, day: string, len: number): string {
	const input = TOOLS.readData(fileName, day),
		data = generateData(input, len),
		checkSum = getChecksum(data);

	return checkSum;
}

//Run
// solveB("input", "16", 35651584);

//Functions
function generateData(input: string, targetLen: number) {
	let data = input;

	while (data.length <= targetLen) {
		let a = "";
		let b = "";

		for (let n of data) {
			a += n;
			b = (n === "0" ? "1" : "0") + b;
		}

		data = a + "0" + b;
	}

	return data.slice(0, targetLen);
}
function getChecksum(data: string): string {
	let checksum: string = "";

	for (let i = 0; i < data.length - 1; i += 2) {
		let [a, b] = data.slice(i, i + 2);

		if (a === b) checksum += "1";
		else checksum += "0";
	}

	return checksum.length % 2 === 0 ? getChecksum(checksum) : checksum;
}
