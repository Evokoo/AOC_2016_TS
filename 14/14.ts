// Imports
import TOOLS from "../00/tools";
import crypto from "crypto";

//Type
type Key = {
	index: number;
	hash: string;
	triple: string;
	quintuple: string;
};

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		keyIndex = findKey(data);

	return keyIndex;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		keyIndex = findKey(data, true);

	return keyIndex;
}

//Run
// solveB("input", "14");

//Functions
function generateHash(string: string, index: number): string {
	return crypto.createHash("md5").update(`${string}${index}`).digest("hex");
}
function generateKey(salt: string, index: number, stretch: boolean): Key {
	let hash = generateHash(salt, index);

	if (stretch) {
		for (let i = 0; i < 2016; i++) {
			hash = crypto.createHash("md5").update(hash).digest("hex");
		}
	}

	const triple = (hash.match(/(.)(\1){2}/) || [""])[0];
	const quintuple = (hash.match(/(.)(\1){4}/) || [""])[0];

	return { index, hash, triple, quintuple };
}
function findKey(salt: string, partB: boolean = false) {
	const validKeys: Key[] = [];
	const generatedKeys: Map<number, Key> = new Map();

	let index = 0;

	while (validKeys.length !== 64) {
		const key = generatedKeys.get(index) ?? generateKey(salt, index, partB);

		if (key.triple.length) {
			const target = key.triple[0].repeat(5);
			const start = index + 1;
			const end = start + 1000;

			for (let j = start; j < end; j++) {
				const check = generatedKeys.get(j) ?? generateKey(salt, j, partB);

				if (!generatedKeys.has(j)) {
					generatedKeys.set(j, check);
				}

				if (check.quintuple === target) {
					validKeys.push(key);
					break;
				}
			}
		}

		generatedKeys.delete(index);

		index++;
	}

	return validKeys[63].index;
}
