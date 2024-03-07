import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./18";

const currentDay = path.basename(__dirname);

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay, 10)).toBe(38);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay, 40)).toBe(1982);
		});
	});

	describe("Part B", () => {
		// 	test("Example", () => {
		// 		expect(solveB("example_b", currentDay)).toBe(null);
		// 	});

		test("Solution", () => {
			expect(solveB("input", currentDay, 400000)).toBe(20005203);
		});
	});
});
