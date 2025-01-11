import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { solveA } from "./25.ts";

const currentDay = path.basename(Deno.cwd());

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		it.skip("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(0);
		});

		it("Solution", () => {
			expect(solveA("input", currentDay)).toBe(192);
		});
	});
});
