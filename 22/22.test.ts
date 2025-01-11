import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { solveA, solveB } from "./22.ts";

const currentDay = path.basename(Deno.cwd());

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe.skip("Part A", () => {
		it.skip("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(0);
		});

		it("Solution", () => {
			expect(solveA("input", currentDay)).toBe(892);
		});
	});

	describe("Part B", () => {
		it("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(7);
		});

		it.skip("Solution", () => {
			expect(solveB("input", currentDay)).toBe(0);
		});
	});
});
