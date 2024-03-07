// Imports
import TOOLS from "../00/tools";
import Scrambler from "./Scrambler";

//Types
type Instruction = { type: string };
type Swap = Instruction & { from: string | number; to: string | number };
type Reverse = Instruction & { start: number; end: number };
type Move = Instruction & { from: number; to: number };
type Rotate = Instruction & { index: string | number };
type Instructions = (Instruction | Swap | Reverse | Move | Rotate)[];

//Solutions
export function solveA(
	fileName: string,
	day: string,
	password: string
): string {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		scrambledPassword = scramblePassword(password, instructions);

	return scrambledPassword;
}
export function solveB(fileName: string, day: string, target: string): string {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		characters = [...target].sort().join(""),
		permutations = TOOLS.generatePermutations(characters);

	for (let password of permutations) {
		if (scramblePassword(password, instructions) === target) {
			return password;
		}
	}

	throw Error("Password not found");
}

//Run
solveB("example_b", "21", "decab");

// Functions
function parseInput(data: string): Instructions {
	const instructions: Instructions = [];

	for (let line of data.split("\r\n")) {
		const details = line.split(" ");

		switch (details[0]) {
			case "swap":
				const position = details[1] === "position";
				instructions.push({
					type: "Swap",
					from: position ? +details[2] : details[2],
					to: position ? +details[5] : details[5],
				});
				break;
			case "reverse":
				instructions.push({
					type: "Reverse",
					start: +details[2],
					end: +details[4],
				});
				break;
			case "rotate":
				if (details[1] === "right" || details[1] === "left") {
					instructions.push({
						type: "Rotate",
						index: +details[2] * (details[1] === "right" ? 1 : -1),
					});
				} else {
					instructions.push({
						type: "Rotate",
						index: details[6],
					});
				}
				break;
			case "move":
				instructions.push({
					type: "Move",
					from: +details[2],
					to: +details[5],
				});
				break;
			default:
				throw Error("Invalid instruction type");
		}
	}

	return instructions;
}
function scramblePassword(password: string, instructions: Instructions) {
	const scrambler = new Scrambler(password);

	for (let instruction of instructions) {
		switch (instruction.type) {
			case "Swap":
				const swap = instruction as Swap;
				scrambler.swap(swap.from, swap.to);
				break;
			case "Move":
				const move = instruction as Move;
				scrambler.move(move.from, move.to);
				break;
			case "Rotate":
				const rotate = instruction as Rotate;
				scrambler.rotate(rotate.index);
				break;
			case "Reverse":
				const reverse = instruction as Reverse;
				scrambler.reverse(reverse.start, reverse.end);
				break;
			default:
				throw Error("Invalid instruction");
		}
	}

	return scrambler.print();
}
