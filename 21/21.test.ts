import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { solveA, solveB } from "./21.ts";

const currentDay = path.basename(Deno.cwd());

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		it("Example", () => {
			expect(solveA("example_a", currentDay)).toBe("decab");
		});

		it("Solution", () => {
			expect(solveA("input", currentDay)).toBe("aefgbcdh");
		});
	});

	describe("Part B", () => {
		it("Example", () => {
			expect(solveB("example_b", currentDay)).toBe("abcde");
		});

		it("Solution", () => {
			expect(solveB("input", currentDay)).toBe("egcdahbf");
		});
	});
});
