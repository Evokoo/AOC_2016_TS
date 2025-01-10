import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { solveA, solveB } from "./16.ts";

const currentDay = path.basename(Deno.cwd());

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		it("Example", () => {
			expect(solveA("example_a", currentDay)).toBe("01100");
		});

		it("Solution", () => {
			expect(solveA("input", currentDay)).toBe("10010101010011101");
		});
	});

	describe("Part B", () => {
		it("Example", () => {
			expect(solveB("example_b", currentDay)).toBe("10111110011110111");
		});

		it("Solution", () => {
			expect(solveB("input", currentDay)).toBe("01100111101101111");
		});
	});
});
