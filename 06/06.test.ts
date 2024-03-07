import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./06";

const currentDay = path.basename(__dirname);

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe("easter");
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe("kqsdmzft");
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe("advent");
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe("tpooccyo");
		});
	});
});
