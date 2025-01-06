// Imports
import TOOLS from "tools";
import * as CRYPTO from "node:crypto";

//Solutions
export function solveA(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day);
	return getPassword(data);
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day);
	return getPassword(data, true);
}

// Functions
function getPassword(input: string, indexed: boolean = false) {
	const characterMap: Map<number, string> = new Map();

	for (let i = 0; characterMap.size < 8; i++) {
		const hash = CRYPTO.createHash("md5").update(`${input}${i}`).digest("hex");

		if (hash.startsWith("00000")) {
			const [a, b] = hash.slice(5, 7);

			if (indexed) {
				const index = parseInt(a, 16);

				if (index < 8 && !characterMap.has(index)) {
					characterMap.set(index, b);
				}
			} else {
				characterMap.set(characterMap.size, a);
			}
		}
	}

	return Array.from({ length: 8 }, (_, i) => characterMap.get(i)).join("");
}
