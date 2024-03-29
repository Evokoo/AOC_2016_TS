import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./17";

const currentDay = path.basename(__dirname);

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(
				"DRURDRUDDLLDLUURRDULRLDUUDDDRR"
			);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe("RDRLDRDURD");
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(830);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(596);
		});
	});
});
