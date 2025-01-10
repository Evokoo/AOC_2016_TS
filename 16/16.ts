// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): string {
	const input = TOOLS.readData(fileName, day);
	const targetSize = fileName.startsWith("example") ? 20 : 272;
	return generateChecksum(generateData(input, targetSize));
}
export function solveB(fileName: string, day: string): string {
	const input = TOOLS.readData(fileName, day);
	return generateChecksum(generateData(input, 35651584));
}

// Functions
function invertBits(binary: string): string {
	let output = "";

	for (let i = binary.length - 1; i >= 0; i--) {
		output += binary[i] === "1" ? "0" : "1";
	}

	return output;
}
function generateData(binary: string, size: number): string {
	let data = binary;

	while (data.length < size) {
		data = data + "0" + invertBits(data);
	}

	return data.slice(0, size);
}
function generateChecksum(data: string): string {
	let checksum = "";

	for (let i = 0; i < data.length; i += 2) {
		const [a, b] = data.slice(i, i + 2);
		checksum += a === b ? "1" : "0";
	}

	return checksum.length % 2 === 0 ? generateChecksum(checksum) : checksum;
}
