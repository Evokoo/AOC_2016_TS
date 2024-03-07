import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./13";

const currentDay = path.basename(__dirname);

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay, { x: 7, y: 4 })).toBe(11);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay, { x: 31, y: 39 })).toBe(86);
		});
	});

	describe("Part B", () => {
		// 	test("Example", () => {
		// 		expect(solveB("example_b", currentDay)).toBe(null);
		// 	});

		test("Solution", () => {
			expect(solveB("input", currentDay, { x: 31, y: 39 })).toBe(127);
		});
	});
});
