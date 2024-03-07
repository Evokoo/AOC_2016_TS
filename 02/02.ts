// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		directions = parseInput(data),
		code = getCode(directions);

	return code;
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		directions = parseInput(data),
		code = getCode(directions, true);

	return code;
}

//Run
solveB("example_b", "02");

//Type
type Point = { x: number; y: number };

// Functions
function parseInput(data: string): string[][] {
	return data.split("\r\n").map((str) => [...str]);
}
function getKeyPosition(keypad: string[][], key: string): Point {
	for (let y = 0; y < keypad.length; y++) {
		for (let x = 0; x < keypad[0].length; x++) {
			if (keypad[y][x] === key) {
				return { x, y };
			}
		}
	}

	throw Error("Key not found");
}
function getKeypad(partB: boolean = false): string[][] {
	if (partB) {
		return [
			["0", "0", "1", "0", "0"],
			["0", "2", "3", "4", "0"],
			["5", "6", "7", "8", "9"],
			["0", "A", "B", "C", "0"],
			["0", "0", "D", "0", "0"],
		];
	} else {
		return [
			["1", "2", "3"],
			["4", "5", "6"],
			["7", "8", "9"],
		];
	}
}
function getCode(directions: string[][], partB: boolean = false): string {
	const keypad = getKeypad(partB);
	const combination = {
		pos: getKeyPosition(keypad, "5"),
		code: "",
	};

	for (let movements of directions) {
		for (let move of movements) {
			const [nx, ny] = { U: [0, -1], D: [0, 1], R: [1, 0], L: [-1, 0] }[move]!;
			const [x, y] = [nx + combination.pos.x, ny + combination.pos.y];

			if (y < 0 || y >= keypad.length || x < 0 || x >= keypad[0].length) {
				continue;
			} else if (keypad[y][x] === "0") {
				continue;
			} else {
				combination.pos = { x, y };
			}
		}
		combination.code += keypad[combination.pos.y][combination.pos.x];
	}
	return combination.code;
}
