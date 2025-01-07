// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return decompressInput(data);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

// Functions
function decompressInput(data: string) {
	let count = 0;

	while (data.length) {
		if (data[0] === "(") {
			const decompression = (data.match(/\([\dx]+\)/) || [""])[0];
			const [chars, repeat] = (decompression.match(/\d+/g) || []).map(Number);

			count += chars * repeat;
			data = data.slice(chars + decompression.length);
		} else {
			const removed = (data.match(/[A-Z]+(?=\(|\b)/) || [""])[0];
			count += removed.length;
			data = data.slice(removed.length);
		}
	}

	return count;
}
