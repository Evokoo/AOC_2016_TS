// Imports
import TOOLS from "../00/tools";
import crypto from "crypto";

//Solutions
export function solveA(fileName: string, day: string): string {
	const roomID = TOOLS.readData(fileName, day),
		password = getPassword(roomID);

	return password;
}
export function solveB(fileName: string, day: string): string {
	const roomID = TOOLS.readData(fileName, day),
		password = getPassword(roomID, true);

	return password;
}

//Run
solveB("example_a", "05");

// Functions
function getHash(string: string, index: number): string {
	return crypto.createHash("md5").update(`${string}${index}`).digest("hex");
}
function validHash(hash: string, partB: boolean = false) {
	if (partB) {
		return hash.startsWith("00000") && /[0-7]/.test(hash[5]);
	} else {
		return hash.startsWith("00000");
	}
}
function getPassword(roomID: string, partB: boolean = false) {
	if (partB) {
		let password = Array(8).fill("");

		for (let i = 0; true; i++) {
			const hash = getHash(roomID, i);

			if (validHash(hash, partB)) {
				const index = +hash[5];
				password[index] = password[index] || hash[6];
			}
			if (password.every((char) => char)) break;
		}
		return password.join("");
	} else {
		let password = "";

		for (let i = 0; true; i++) {
			const hash = getHash(roomID, i);
			if (validHash(hash)) password += hash[5];
			if (password.length === 8) break;
		}
		return password;
	}
}
