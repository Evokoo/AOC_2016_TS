import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./05";

const currentDay = path.basename(__dirname);

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe("18f47a30");
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe("f97c354d");
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe("05ace8e3");
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe("863dde27");
		});
	});
});
