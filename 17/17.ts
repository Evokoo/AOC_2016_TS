// Imports
import TOOLS from "../00/tools";
import crypto from "crypto";

//Types
type Path = {
	x: number;
	y: number;
	route: string;
};

//Solutions
export function solveA(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		route = BFS(data) as string;

	return route;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		route = BFS(data, true) as number;

	return route;
}

//Run
solveB("example_a", "17");

//Functions

function getHash(passcode: string, route: string): string[] {
	const hash = crypto
		.createHash("md5")
		.update(`${passcode}${route}`)
		.digest("hex");
	return [...hash.slice(0, 4)];
}
function isOpen(char: string): boolean {
	return /[b-f]/.test(char);
}
function BFS(passcode: string, partB: boolean = false) {
	const queue: Path[] = [{ x: 0, y: 0, route: "" }];

	let longestRoute = 0;

	while (queue.length) {
		const current = queue.shift()!;

		if (current.x === 3 && current.y === 3) {
			if (partB) {
				longestRoute = Math.max(longestRoute, current.route.length);
				continue;
			} else {
				return current.route;
			}
		}

		const [U, D, L, R] = getHash(passcode, current.route);

		if (isOpen(U) && current.y - 1 >= 0) {
			queue.push({
				x: current.x,
				y: current.y - 1,
				route: current.route + "U",
			});
		}

		if (isOpen(D) && current.y + 1 <= 3) {
			queue.push({
				x: current.x,
				y: current.y + 1,
				route: current.route + "D",
			});
		}

		if (isOpen(L) && current.x - 1 >= 0) {
			queue.push({
				x: current.x - 1,
				y: current.y,
				route: current.route + "L",
			});
		}

		if (isOpen(R) && current.x + 1 <= 3) {
			queue.push({
				x: current.x + 1,
				y: current.y,
				route: current.route + "R",
			});
		}
	}

	return longestRoute;
}
