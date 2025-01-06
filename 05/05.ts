// Imports
import TOOLS from "tools";
import * as CRYPTO from "node:crypto";

//Solutions
export function solveA(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day);
	return getPassword(data);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

// Functions
function getPassword(input: string) {
	let password = "";

	for (let i = 0; password.length < 8; i++) {
		const hash = CRYPTO.createHash("md5").update(`${input}${i}`).digest("hex");

		if (hash.startsWith("00000")) {
			password += hash.at(5);
		}
	}

	return password;
}
