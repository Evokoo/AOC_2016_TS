// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		safeValue = runInstructions(instructions, 7);

	console.log(safeValue);
	return safeValue;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		safeValue = runInstructions(instructions, 12);

	return safeValue;
}

//Run
solveA("input", "23");

//Functions
type Instruction = { type: string; values: (string | number)[] };

function parseInput(data: string) {
	const instrctions: Instruction[] = [];

	for (let line of data.split("\r\n")) {
		const details = line.split(" ");

		switch (details[0]) {
			case "jnz":
			case "cpy":
				instrctions.push({
					type: details[0],
					values: [
						/\d/.test(details[1]) ? +details[1] : details[1],
						/\d/.test(details[2]) ? +details[2] : details[2],
					],
				});
				break;
			case "inc":
			case "dec":
			case "tgl":
				instrctions.push({
					type: details[0],
					values: [details[1]],
				});
				break;
			default:
				throw Error("Invalid instruction type");
		}
	}

	return instrctions;
}
function runInstructions(instructions: Instruction[], eggs: number) {
	const registers: Record<string, number> = { a: eggs, b: 0, c: 0, d: 0 };

	for (let index = 0; index < instructions.length; ) {
		const instruction = instructions[index];

		let increment: number = 1;

		switch (instruction.type) {
			case "tgl":
				const targetIndex = index + registers[instruction.values[0]];

				if (targetIndex >= instructions.length) {
					break;
				}
				if (targetIndex === index) {
					instructions[targetIndex].type = "inc";
					break;
				}

				switch (instructions[targetIndex].type) {
					case "inc":
						instructions[targetIndex].type = "dec";
						break;
					case "tgl":
					case "dec":
						instructions[targetIndex].type = "inc";
						break;
					case "jnz":
						instructions[targetIndex].type = "cpy";
						break;
					case "cpy":
						instructions[targetIndex].type = "jnz";
						break;
				}
				break;
			case "inc":
				registers[instruction.values[0]]++;
				break;
			case "dec":
				registers[instruction.values[0]]--;
				break;
			case "jnz":
				const [jx, jy] = instruction.values;

				if (typeof jx === "string" && typeof jy === "number") {
					if (registers[jx] !== 0) increment = jy;
				}
				if (typeof jx === "number" && typeof jy === "string") {
					if (jx !== 0) increment = registers[jy];
				}
				break;
			case "cpy":
				const [cx, cy] = instruction.values;

				if (typeof cx === "number" && typeof cy === "string") {
					registers[cy] = cx;
				}
				if (typeof cx === "string" && typeof cy === "string") {
					registers[cy] = registers[cx];
				}
				break;
			default:
				throw Error("Invalid Instruction");
		}

		index += increment;
	}

	return registers["a"];
}
