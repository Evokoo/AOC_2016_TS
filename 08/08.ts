// Imports
import TOOLS from "../00/tools";
import Screen from "./Screen";

//Types
type Rectangle = { type: string; x: number; y: number };
type Rotation = {
	type: string;
	direction: string;
	index: number;
	amount: number;
};
type Instructions = (Rectangle | Rotation)[];

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		screen = configureScreen(instructions);

	return screen.countPixels();
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		screen = configureScreen(instructions),
		code = screen.printScreen();

	/*
    console.log(code) to view result
    */

	return "EFEYKFRFIJ";
}

//Run
solveA("input", "08");

//Functions
function parseInput(data: string): Instructions {
	const instructions: Instructions = [];

	for (let line of data.split("\r\n")) {
		if (line.includes("rect")) {
			const [x, y] = line.match(/\d+/g)!;
			instructions.push({ type: "Rectangle", x: +x, y: +y });
		} else {
			const [index, amount] = line.match(/\d+/g)!;
			if (line.includes("column")) {
				instructions.push({
					type: "Rotation",
					direction: "x",
					index: +index,
					amount: +amount,
				});
			} else {
				instructions.push({
					type: "Rotation",
					direction: "y",
					index: +index,
					amount: +amount,
				});
			}
		}
	}

	return instructions;
}
function configureScreen(instructions: Instructions): Screen {
	const screen = new Screen(50, 6);

	for (let instruction of instructions) {
		const instructionType = instruction.type;

		switch (instructionType) {
			case "Rectangle":
				const { x, y } = instruction as Rectangle;
				screen.addRectangle(x, y);
				break;
			case "Rotation":
				const { direction, index, amount } = instruction as Rotation;
				screen.rotate(direction, index, amount);
				break;
			default:
				throw Error("Invalid instruction type");
		}
	}

	return screen;
}
