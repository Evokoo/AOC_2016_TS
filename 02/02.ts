// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day);
	const directions = parseInput(data);
	return findCode(directions, 1);
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day);
	const directions = parseInput(data);
	return findCode(directions, 2);
}

type Direction = [number, number];
type Point = { x: number; y: number };

// Functions
function parseInput(data: string): Direction[][] {
	return data.split("\n").map((input) =>
		[...input].map((press) => {
			switch (press) {
				case "U":
					return [0, -1];
				case "D":
					return [0, 1];
				case "L":
					return [-1, 0];
				case "R":
					return [1, 0];
				default:
					throw Error("Invalid press");
			}
		})
	);
}
function getKeyCoordinate(keypad: string[][], targetKey: string): Point {
	for (let y = 0; y < keypad.length; y++) {
		for (let x = 0; x < keypad[0].length; x++) {
			if (keypad[y][x] === targetKey) {
				return { x, y };
			}
		}
	}

	throw Error(`Key not found on provided keypad`);
}
function getKeypad(type: number): string[][] {
	const keypads: Record<number, string[][]> = {
		1: [
			["1", "2", "3"],
			["4", "5", "6"],
			["7", "8", "9"],
		],
		2: [
			["0", "0", "1", "0", "0"],
			["0", "2", "3", "4", "0"],
			["5", "6", "7", "8", "9"],
			["0", "A", "B", "C", "0"],
			["0", "0", "D", "0", "0"],
		],
	};

	return keypads[type];
}
function findCode(directions: Direction[][], keypadType: number): string {
	const keypad: string[][] = getKeypad(keypadType);
	const position: Point = getKeyCoordinate(keypad, "5");

	return directions
		.map((directionSet) => {
			for (const [dx, dy] of directionSet) {
				const [x, y] = [position.x + dx, position.y + dy];

				if (keypad[y] && keypad[y][x] && keypad[y][x] !== "0") {
					position.y = y;
					position.x = x;
				}
			}

			return keypad[position.y][position.x];
		})
		.join("");
}
