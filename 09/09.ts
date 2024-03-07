// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		decompressed = decompress(data);

	return decompressed.length;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		decompressed = decompressV2(data);

	console.log(decompressed);

	return 0;
}

//Run
solveB("example_b", "09");

//Functions
function decompress(unproccessed: string, processed: string = "") {
	const match = unproccessed.match(/\((\d+)x(\d+)\)/) || null;

	if (match) {
		const [str, chars, rep] = match;

		const sIndex = match.index! + str.length;
		const eIndex = sIndex + +chars;
		const decompressedStr = unproccessed.slice(sIndex, eIndex).repeat(+rep);

		processed += unproccessed.slice(0, match.index) + decompressedStr;
		unproccessed = unproccessed.slice(sIndex + +chars);
	} else {
		return processed + unproccessed;
	}

	return decompress(unproccessed, processed);
}

function decompressV2(data: string, charCount: number = 0) {
	const subStrings: string[] = [];

	while (data.length) {
		if (/^[a-z]+/i.test(data)) {
			const chars = data.match(/^[a-z]+/i) || [];
			charCount += chars.length;
			data = data.slice(chars.length);
		} else {
			const match = data.match(/\((\d+)x(\d+)\)/)!;
			const end = match[0].length + +match[1];
			const subString = data
				.slice(match[0].length, end)
				.replace(/(?<=x)\d+/g, ($) => String(+$ * +match[2]));

			subStrings.push(subString);
			data = data.slice(end);
		}
	}

	for (let subString of subStrings) {
		let count = 0;

		while (subString.length) {}
	}
}
