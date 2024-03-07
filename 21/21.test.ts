import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./21";

const currentDay = path.basename(__dirname);

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay, "abcde")).toBe("decab");
		});

		test("Solution", () => {
			expect(solveA("input", currentDay, "abcdefgh")).toBe("aefgbcdh");
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay, "decab")).toBe("abcde");
		});

		test("Solution", () => {
			expect(solveB("input", currentDay, "fbgdceah")).toBe("egcdahbf");
		});
	});
});
