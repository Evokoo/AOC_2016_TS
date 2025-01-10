// Imports
import TOOLS from "tools";
import Scramber from "./Scramber.ts";

//Solutions
export function solveA(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day);
	const instructions = parseInput(data);
	const input = fileName.startsWith("example") ? "abcde" : "abcdefgh";
	return scramblePassword(input, instructions);
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day);
	const instructions = parseInput(data);
	const input = fileName.startsWith("example") ? "abcde" : "abcdefgh";
	const target = fileName.startsWith("example") ? "decab" : "fbgdceah";
	const allPasswords = TOOLS.generateStringPermutations(input);

	for (const password of allPasswords) {
		if (scramblePassword(password, instructions) === target) {
			return password;
		}
	}

	throw Error("Password not found");
}

type Instruction = { type: string; a: number | string; b?: number | string };

// Functions
function parseInput(data: string): Instruction[] {
	const instructions: Instruction[] = [];

	for (const line of data.split("\n")) {
		const words = line.split(" ");

		if (words[0] === "rotate") {
			if (words[1] === "based") {
				instructions.push({ type: "Rotate", a: words[6]! });
			} else if (words[1] === "right") {
				instructions.push({ type: "Rotate", a: Number(words[2]) });
			} else {
				instructions.push({ type: "Rotate", a: -Number(words[2]) });
			}
		} else if (words[0] === "swap") {
			if (words[1] === "letter") {
				instructions.push({ type: "Swap", a: words[2], b: words[5] });
			} else {
				instructions.push({
					type: "Swap",
					a: Number(words[2]),
					b: Number(words[5]),
				});
			}
		} else if (words[0] === "reverse") {
			instructions.push({
				type: "Reverse",
				a: Number(words[2]),
				b: Number(words[4]),
			});
		} else if (words[0] === "move") {
			instructions.push({
				type: "Move",
				a: Number(words[2]),
				b: Number(words[5]),
			});
		} else {
			console.log(line);
			throw Error("Invalid line");
		}
	}

	return instructions;
}
function scramblePassword(input: string, instructions: Instruction[]) {
	const scrambler = new Scramber(input);

	for (const instruction of instructions) {
		switch (instruction.type) {
			case "Rotate":
				scrambler.rotate(instruction.a);
				break;
			case "Swap":
				scrambler.swap(instruction.a, instruction.b!);
				break;
			case "Move":
				scrambler.move(instruction.a as number, instruction.b as number);
				break;
			case "Reverse":
				scrambler.reverse(instruction.a as number, instruction.b as number);
				break;
			default:
				throw Error("Invalid type");
		}
	}

	return scrambler.getPassword;
}
