// Imports
import TOOLS from "tools";
import { Computer, Command } from "./Computer.ts";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const commands = parseInput(data);
	return runCommands(commands);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const commands = parseInput(data);
	return runCommands(commands, 1);
}

// Functions
function parseInput(data: string): Command[] {
	const commands: Command[] = [];

	for (const line of data.split("\n")) {
		const [id, x, y] = line.split(" ");

		if (y) {
			commands.push({ id, x: convertValue(x), y: convertValue(y) });
		} else {
			commands.push({ id, x: convertValue(x) });
		}
	}

	return commands;

	function convertValue(value: string): string | number {
		return /\d+/.test(value) ? Number(value) : value;
	}
}
function runCommands(commands: Command[], cValue?: number) {
	const computer = new Computer();

	if (cValue) {
		computer.setRegisterC = cValue;
	}

	while (computer.getPointer < commands.length) {
		const command = commands[computer.getPointer];

		computer.exercute(command);
	}

	return computer.getRegister.a;
}
