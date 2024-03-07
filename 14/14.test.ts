import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./14";

const currentDay = path.basename(__dirname);

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(22728);
		});
		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(18626);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(22551);
		});
		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(20092);
		});
	});
});
