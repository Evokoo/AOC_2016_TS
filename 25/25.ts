// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const commands = parseInput(data);

	for (let i = 0; i < 10_000; i++) {
		if (runCommands(commands, i)) {
			return i;
		}
	}

	throw Error("Value not found");
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
function runCommands(commands: Command[], aValue: number): boolean {
	const registers: Record<string, number> = { a: aValue, b: 0, c: 0, d: 0 };

	let output = "";

	for (let index = 0; index < commands.length; ) {
		const { type, values } = commands[index];

		switch (type) {
			case "inc":
				registers[values[0]]++;
				break;
			case "dec":
				registers[values[0]]--;
				break;
			case "jnz": {
				const jx =
					typeof values[0] === "string" ? registers[values[0]] : values[0];
				const jy =
					typeof values[1] === "string" ? registers[values[1]] : values[1];
				if (jx !== 0) {
					index += jy;
					continue;
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
			case "out": {
				const signal = String(registers[values[0]]);

				if (
					(!output && signal === "1") ||
					(output.at(-1) === "0" && signal !== "1") ||
					(output.at(-1) === "1" && signal !== "0")
				) {
					return false;
				}

				output += signal;
				break;
			}
			default:
				throw Error("Invalid Instruction");
		}

		if (output.length === 100) {
			break;
		}

		index++;
	}

	return true;
}
