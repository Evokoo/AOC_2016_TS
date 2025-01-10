import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { solveA, solveB } from "./17.ts";

const currentDay = path.basename(Deno.cwd());

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		it("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(
				"DRURDRUDDLLDLUURRDULRLDUUDDDRR"
			);
		});

		it("Solution", () => {
			expect(solveA("input", currentDay)).toBe("RDRLDRDURD");
		});
	});

	describe("Part B", () => {
		it("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(370);
		});

		it("Solution", () => {
			expect(solveB("input", currentDay)).toBe(596);
		});
	});
});
