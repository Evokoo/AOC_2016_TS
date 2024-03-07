// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		signalValue = runInstructions(instructions);

	return 0;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "25");

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
			case "out":
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
function runInstructions(instructions: Instruction[]) {
	counter: for (let input = 0; true; input++) {
		const registers: Record<string, number> = { a: input, b: 0, c: 0, d: 0 };
		const output: number[] = [];

		let iterations = 0;

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
				case "out":
					const signal = registers[instruction.values[0]];

					if (output.length === 100) {
						console.log(input);
						throw Error("Winner?");
					}

					if (signal === 0 && output.length === 0) {
						console.log(input);
						output.push(signal);
						break;
					} else if (signal === 1 && output?.at(-1) === 0) {
						output.push(signal);
						break;
					} else if (signal === 0 && output?.at(-1) === 1) {
						output.push(signal);
						break;
					}

					break;

				default:
					throw Error("Invalid Instruction");
			}

			iterations++;

			console.log(iterations, input, output);

			if (output.length === 0 && iterations === 100) {
				continue counter;
			}

			index += increment;
		}
	}

	throw Error("NO");
	// return registers["a"];
}
