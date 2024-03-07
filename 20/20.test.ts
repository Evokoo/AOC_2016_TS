import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./20";

const currentDay = path.basename(__dirname);

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(3);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(17348574);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay, 9)).toBe(2);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay, 4294967295)).toBe(104);
		});
	});
});
