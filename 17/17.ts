// Imports
import TOOLS from "tools";
import * as CRYPTO from "node:crypto";

//Solutions
export function solveA(fileName: string, day: string): string {
	const passcode = TOOLS.readData(fileName, day);
	return traverseValut(passcode).path;
}
export function solveB(fileName: string, day: string): number {
	const passcode = TOOLS.readData(fileName, day);
	return traverseValut(passcode, true).path.length;
}

type State = { x: number; y: number; path: string };
type Direction = { dx: number; dy: number; code: string };

// Functions
function traverseValut(passcode: string, longest: boolean = false): State {
	const queue: State[] = [{ x: 0, y: 0, path: "" }];
	const longRoute: State = { x: 0, y: 0, path: "" };

	while (queue.length) {
		const current = queue.shift()!;

		if (current.x === 3 && current.y === 3) {
			if (longest) {
				if (current.path.length > longRoute.path.length) {
					longRoute.x = current.x;
					longRoute.y = current.y;
					longRoute.path = current.path;
				}
			} else {
				return current;
			}
		} else {
			pushNewStates(current);
		}
	}

	if (longest) {
		return longRoute;
	} else {
		throw Error("Path not found");
	}

	function pushNewStates({ x, y, path }: State): void {
		for (const { dx, dy, code } of getOpenDoors(passcode, path)) {
			const [nx, ny] = [dx + x, dy + y];

			if (nx >= 0 && nx < 4 && ny >= 0 && ny < 4) {
				queue.push({ x: nx, y: ny, path: path + code });
			}
		}
	}
	function getOpenDoors(passcode: string, path: string): Direction[] {
		const directions = [
			{ dx: 0, dy: -1, code: "U" },
			{ dx: 0, dy: 1, code: "D" },
			{ dx: -1, dy: 0, code: "L" },
			{ dx: 1, dy: 0, code: "R" },
		];

		const hash = CRYPTO.createHash("md5")
			.update(`${passcode}${path}`)
			.digest("hex");

		return directions.filter((_, i) => {
			return hash[i] >= "b" && hash[i] <= "f";
		});
	}
}
