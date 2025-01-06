// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return validateTSL(parseInput(data));
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return validateSSL(parseInput(data));
}

// Functions
function parseInput(data: string): string[] {
	return data.split("\n");
}
function validateTSL(ips: string[]): number {
	let valid = 0;

	for (const ip of ips) {
		if (/(?<=\[\w*)(.)(.)((?!\1)\2)((?!\2)\1)(?=\w*\])/.test(ip)) {
			continue;
		} else if (/(.)(.)((?!\1)\2)((?!\2)\1)/.test(ip)) {
			valid++;
		}
	}
	return valid;
}
function validateSSL(ips: string[]): number {
	let valid = 0;

	for (const ip of ips) {
		sections: for (const section of ip.match(/\[*\w+\]*/g) || []) {
			if (section[0] === "[") continue;

			for (let j = 0; j <= section.length - 3; j++) {
				const [a, b, c] = section.slice(j, j + 3);

				if (a === c && a !== b) {
					const re = RegExp(`(?<=\\[\\w*)${b + a + b}(?=\\w*\\])`);

					if (re.test(ip)) {
						valid++;
						break sections;
					}
				}
			}
		}
	}

	return valid;
}
