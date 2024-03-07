// Imports
import TOOLS from "../00/tools";

//Types
type Instruction = { type: string; register: string };
type Copy = Instruction & { value: number | string };
type Jump = Instruction & { value: number };
type Instructions = (Jump | Instruction | Copy)[];

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instrctions = parseInput(data),
		registerA = runInstructions(instrctions);

	return registerA;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instrctions = parseInput(data),
		registerA = runInstructions(instrctions, true);

	return registerA;
}

//Run
solveA("example_a", "12");

//Functions
function parseInput(data: string) {
	const instrctions: Instructions = [];

	for (let line of data.split("\r\n")) {
		const details = line.split(" ");

		switch (details[0]) {
			case "cpy":
				instrctions.push({
					type: "Copy",
					value: Number.isNaN(+details[1]) ? details[1] : +details[1],
					register: details[2],
				});
				break;
			case "jnz":
				instrctions.push({
					type: "Jump",
					value: +details[2],
					register: details[1],
				});
				break;
			case "inc":
				instrctions.push({
					type: "Increase",
					register: details[1],
				});
				break;
			case "dec":
				instrctions.push({
					type: "Decrease",
					register: details[1],
				});
				break;
			default:
				throw Error("Invalid instruction type");
		}
	}

	return instrctions;
}
function setupRegisters(keys: string[]): Record<string, number> {
	const registers: Record<string, number> = {};

	for (let key of keys) {
		registers[key] = 0;
	}

	return registers;
}
function runInstructions(instructions: Instructions, partB: boolean = false) {
	const registers = setupRegisters(["a", "b", "c", "d"]);

	if (partB) {
		registers["c"]++;
	}

	for (let index = 0; index < instructions.length; ) {
		const instruction = instructions[index];

		let increment: number = 1;

		switch (instruction.type) {
			case "Increase":
				registers[instruction.register]++;
				break;
			case "Decrease":
				registers[instruction.register]--;
				break;
			case "Jump":
				const jump = instruction as Jump;

				if (registers[jump.register] !== 0) {
					increment = jump.value;
				}
				break;
			case "Copy":
				const copy = instruction as Copy;

				if (typeof copy.value === "string") {
					registers[copy.register] = registers[copy.value];
				} else {
					registers[copy.register] = copy.value;
				}

				break;
		}

		index += increment;
	}

	return registers["a"];
}
