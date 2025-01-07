// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const bots = parseInput(data);
	const chips: [number, number] = fileName.startsWith("example")
		? [5, 2]
		: [61, 17];
	return runBots(bots, chips);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const bots = parseInput(data);
	return runBots(bots);
}

type Transfer = { type: string; target: number };
type Bot = { lowTo: Transfer; highTo: Transfer; chips: Set<number> };
type Bots = Map<number, Bot>;

// Functions
function parseInput(data: string): Bots {
	const bots: Bots = new Map();

	for (const line of data.split("\n")) {
		if (line.startsWith("value")) {
			const [value, id] = (line.match(/\d+/g) || []).map(Number);
			const bot = getBot(bots, id);
			bot.chips.add(value);
			bots.set(id, bot);
		} else {
			const [a, b, c] = (line.match(/(bot|output)\s\d+/g) || []).map(
				(match) => {
					const [type, id] = match.split(" ");
					return { type, target: +id };
				}
			);

			bots.set(a.target, { ...getBot(bots, a.target), lowTo: b, highTo: c });
		}
	}

	return bots;
}
function getBot(bots: Bots, id: number): Bot {
	const blankBot = {
		lowTo: { type: "NA", target: -1 },
		highTo: { type: "NA", target: -1 },
		chips: new Set<number>(),
	};

	return bots.get(id) ?? blankBot;
}
function updateBot(bots: Bots, id: number, value: number): Bot {
	const bot = bots.get(id)!;
	bot.chips.add(value);
	return bot;
}
function runBots(bots: Bots, targetChips?: [number, number]): number {
	const output: Map<number, number> = new Map();

	while (true) {
		let exit = true;

		for (const [id, bot] of bots) {
			if (bot.chips.size === 2) {
				//Set exit condition
				exit = false;

				const [low, high] = [...bot.chips].sort((a, b) => a - b);

				for (const [index, { type, target }] of [
					bot.lowTo,
					bot.highTo,
				].entries()) {
					const value = index === 0 ? low : high;

					if (type === "output") {
						output.set(target, value);
					} else {
						bots.set(target, updateBot(bots, target, value));
					}
				}

				if (
					targetChips &&
					bot.chips.has(targetChips[0]) &&
					bot.chips.has(targetChips[1])
				) {
					return id;
				} else {
					bot.chips.delete(low);
					bot.chips.delete(high);
					bots.set(id, bot);
				}
			}
		}

		if (exit) break;
	}

	return [0, 1, 2].reduce((acc, cur) => acc * output.get(cur)!, 1);
}
