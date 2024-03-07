import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./16";

const currentDay = path.basename(__dirname);

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay, 20)).toBe("01100");
		});

		test("Solution", () => {
			expect(solveA("input", currentDay, 272)).toBe("10010101010011101");
		});
	});

	describe("Part B", () => {
		// test("Example", () => {
		// 	expect(solveB("example_b", currentDay)).toBe(null);
		// });
		test("Solution", () => {
			expect(solveB("input", currentDay, 35651584)).toBe("01100111101101111");
		});
	});
});
