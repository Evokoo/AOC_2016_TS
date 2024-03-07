// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		ipArray = parseInput(data),
		validIp = validateIPs(ipArray);

	return validIp.length;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		ipArray = parseInput(data),
		validIp = validateIPs(ipArray, true);

	return validIp.length;
}

//Run
solveB("example_b", "07");

type IP = { original: string; sections: string[] };

// Functions
function parseInput(data: string) {
	const ipArray: IP[] = [];

	for (let ip of data.split("\r\n")) {
		const sections = ip.match(/\[\w+\]|\w+/g) || [];
		ipArray.push({ original: ip, sections: sections });
	}

	return ipArray;
}
function validTLS(ip: IP): boolean {
	let isValid = false;

	for (let section of ip.sections) {
		let isBridge = false;

		if (section[0] === "[") {
			section = section.slice(1, -1);
			isBridge = true;
		}

		for (let i = 0; i < section.length - 3; i++) {
			const a = section[i];
			const b = section[i + 1];
			const c = section[i + 2];
			const d = section[i + 3];

			if (a === d && b === c && a !== b) {
				if (isBridge) {
					return false;
				} else {
					isValid = true;
				}
			}
		}
	}

	return isValid;
}
function validSSL(ip: IP): boolean {
	const ABA: Set<string> = new Set();
	const BAB: Set<string> = new Set();

	for (let section of ip.sections) {
		let isBridge = false;

		if (section[0] === "[") {
			section = section.slice(1, -1);
			isBridge = true;
		}

		for (let i = 0; i < section.length - 2; i++) {
			const a = section[i];
			const b = section[i + 1];
			const c = section[i + 2];

			if (a === c && a !== b) {
				if (isBridge) {
					if (ABA.has(b + a + b)) return true;
					else BAB.add(a + b + c);
				} else {
					if (BAB.has(b + a + b)) return true;
					else ABA.add(a + b + c);
				}
			}
		}
	}

	return false;
}
function validateIPs(ipArray: IP[], partB: boolean = false) {
	const validIp: IP[] = [];

	for (let ip of ipArray) {
		if (partB) {
			const SSL = validSSL(ip);
			if (SSL) validIp.push(ip);
		} else {
			const TLS = validTLS(ip);
			if (TLS) validIp.push(ip);
		}
	}

	return validIp;
}
