// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const commands = parseInput(data);
	return runCommands(commands, 7);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const commands = parseInput(data);
	return runCommands(commands, 12);
}

type Command = { type: string; values: (string | number)[] };

// Functions
function parseInput(data: string): Command[] {
	const commands: Command[] = [];

	for (const line of data.split("\n")) {
		const [type, v1, v2] = line.split(" ");

		if (v2) {
			commands.push({ type, values: [convertValue(v1), convertValue(v2)] });
		} else {
			commands.push({ type, values: [convertValue(v1)] });
		}
	}

	return commands;

	function convertValue(value: string): string | number {
		return /\d+/.test(value) ? Number(value) : value;
	}
}
function runCommands(commands: Command[], eggs: number) {
	const registers: Record<string, number> = { a: eggs, b: 0, c: 0, d: 0 };

	for (let index = 0; index < commands.length; ) {
		const { type, values } = commands[index];

		let increment: number = 1;

		switch (type) {
			case "tgl": {
				const targetIndex = index + registers[values[0]];

				if (targetIndex >= commands.length) {
					break;
				}
				if (targetIndex === index) {
					commands[targetIndex].type = "inc";
					break;
				}

				switch (commands[targetIndex].type) {
					case "inc":
						commands[targetIndex].type = "dec";
						break;
					case "tgl":
					case "dec":
						commands[targetIndex].type = "inc";
						break;
					case "jnz":
						commands[targetIndex].type = "cpy";
						break;
					case "cpy":
						commands[targetIndex].type = "jnz";
						break;
				}
				break;
			}

			case "inc":
				registers[values[0]]++;
				break;
			case "dec":
				registers[values[0]]--;
				break;
			case "jnz": {
				const [jx, jy] = values;

				if (typeof jx === "string" && typeof jy === "number") {
					if (registers[jx] !== 0) increment = jy;
				}
				if (typeof jx === "number" && typeof jy === "string") {
					if (jx !== 0) increment = registers[jy];
				}
				break;
			}

			case "cpy": {
				const [cx, cy] = values;

				if (typeof cx === "number" && typeof cy === "string") {
					registers[cy] = cx;
				}
				if (typeof cx === "string" && typeof cy === "string") {
					registers[cy] = registers[cx];
				}
				break;
			}

			default:
				throw Error("Invalid Instruction");
		}

		index += increment;
	}

	return registers["a"];
}
