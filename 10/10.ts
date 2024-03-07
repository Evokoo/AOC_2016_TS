// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		bots = parseInput(data),
		botID = runBots(bots);

	return botID;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		bots = parseInput(data),
		product = runBots(bots, true);

	return product;
}

//Run
solveB("input", "10");

//Functions
type Bot = {
	low: string;
	high: string;
	chips: number[];
};
interface Bots {
	[ID: string]: Bot;
}

function parseInput(data: string): Bots {
	const bots: Bots = {};
	const chips: Map<string, number[]> = new Map();

	for (let line of data.split("\r\n")) {
		if (line.includes("value")) {
			const [chipID, botID] = line.match(/\d+/g)!;
			chips.set(botID, [...(chips.get(botID) ?? []), +chipID]);
		} else {
			const [botID, low, high] = line.match(/bot \d+|output \d+/g)!;
			const ID = +botID.split(" ")[1];
			const [lowType, lowID] = low.split(" ");
			const [highType, highID] = high.split(" ");

			bots[ID] = {
				low: lowType[0].toUpperCase() + "-" + lowID,
				high: highType[0].toUpperCase() + "-" + highID,
				chips: [],
			};
		}
	}

	for (let [ID, chipArr] of chips) {
		bots[ID].chips = chipArr;
	}

	return bots;
}
function runBots(bots: Bots, partB: boolean = false) {
	const output: Map<string, number[]> = new Map();

	while (true) {
		let validBots = Object.entries(bots).filter(
			([_, value]) => value.chips.length === 2
		);

		if (!validBots.length) {
			break;
		}

		for (let [botID, { low, high, chips }] of validBots) {
			const [lowChip, highChip] = chips.sort((a, b) => a - b);
			const [lowDest, lowID] = low.split("-");
			const [highDest, highID] = high.split("-");

			if (!partB) {
				if (lowChip === 17 && highChip === 61) {
					return +botID;
				}
			}

			if (lowDest === "O") {
				output.set(lowID, [...(output.get(lowID) ?? []), +lowChip]);
			} else {
				bots[lowID].chips.push(+lowChip);
			}

			if (highDest === "O") {
				output.set(highID, [...(output.get(highID) ?? []), +highChip]);
			} else {
				bots[highID].chips.push(+highChip);
			}

			bots[botID].chips = [];
		}
	}

	if (partB) {
		const product = ["0", "1", "2"].reduce((acc, cur) => {
			const chip = (output.get(cur) ?? [1])[0];
			return acc * chip;
		}, 1);

		return product;
	}

	throw Error("Bot ID not found");
}
