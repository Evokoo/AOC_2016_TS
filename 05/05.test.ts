import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { solveA, solveB } from "./05.ts";

const currentDay = path.basename(Deno.cwd());

describe(`AOC 2016 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		it("Example", () => {
			expect(solveA("example_a", currentDay)).toBe("18f47a30");
		});

		it("Solution", () => {
			expect(solveA("input", currentDay)).toBe("f97c354d");
		});
	});

	describe("Part B", () => {
		it("Example", () => {
			expect(solveB("example_b", currentDay)).toBe("05ace8e3");
		});

		it("Solution", () => {
			expect(solveB("input", currentDay)).toBe("863dde27");
		});
	});
});
