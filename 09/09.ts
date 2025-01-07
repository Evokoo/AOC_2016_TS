// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return decompressInput(data);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return decompressInput(data, true);
}

// Functions
function decompressInput(data: string, nested: boolean = false) {
	function decompress(data: string, count: number = 0): number {
		if (!data) {
			return count;
		} else if (data[0] === "(") {
			const formula = (data.match(/\([\dx]+\)/) || [""])[0];
			const [chars, repeat] = (formula.match(/\d+/g) || []).map(Number);
			const dataSlice = data.slice(formula.length, chars + formula.length);
			const newData = data.slice(chars + formula.length);

			if (nested) {
				return decompress(newData, count + decompress(dataSlice) * repeat);
			} else {
				return decompress(newData, count + chars * repeat);
			}
		} else {
			const removed = (data.match(/[A-Z]+(?=\(|\b)/) || [""])[0];
			return decompress(data.slice(removed.length), count + removed.length);
		}
	}

	return decompress(data);
}
