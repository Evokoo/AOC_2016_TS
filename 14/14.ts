// Imports
import TOOLS from "tools";
import * as CRYPTO from "node:crypto";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return generateValidKeys(data);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return generateValidKeys(data, true);
}

type Key = {
	index: number;
	hash: string;
	triple: string;
	quintuple: string;
};

// Functions
function generateValidKeys(salt: string, stretch: boolean = false) {
	const generatedKeys: Map<number, Key> = new Map();
	const validKeys: Key[] = [];

	for (let i = 0; validKeys.length < 64; i++) {
		const key = generatedKeys.get(i) ?? generateNewKey(salt, i, stretch);

		if (key.triple) {
			const target = key.triple[0].repeat(5);

			for (let j = i + 1; j < i + 1 + 1000; j++) {
				const futureKey =
					generatedKeys.get(j) ?? generateNewKey(salt, j, stretch);

				if (!generatedKeys.has(j)) {
					generatedKeys.set(j, futureKey);
				}

				if (futureKey.quintuple === target) {
					validKeys.push(key);
					break;
				}
			}

			generatedKeys.delete(i);
		}
	}

	return validKeys.at(-1)!.index;
}

function generateHash(salt: string, index: number): string {
	return CRYPTO.createHash("md5").update(`${salt}${index}`).digest("hex");
}

function generateNewKey(salt: string, index: number, stretch: boolean): Key {
	let hash = generateHash(salt, index);

	if (stretch) {
		for (let i = 0; i < 2016; i++) {
			hash = CRYPTO.createHash("md5").update(hash).digest("hex");
		}
	}

	const triple = findMatch(hash, 3);
	const quintuple = findMatch(hash, 5);

	return { index, hash, triple, quintuple };
}

function findMatch(hash: string, size: number): string {
	const re = RegExp(`(.)\\1{${size - 1}}`);
	return (hash.match(re) || [""])[0];
}
