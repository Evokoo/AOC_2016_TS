export default class Scrambler {
	password: String[];

	constructor(password: string, unscramble: boolean = false) {
		this.password = [...password];
	}

	public swap = (a: number | string, b: number | string): void => {
		if (typeof a === "number" && typeof b === "number") {
			[this.password[a], this.password[b]] = [
				this.password[b],
				this.password[a],
			];
		} else {
			const indexA: number = this.password.indexOf(a as string);
			const indexB: number = this.password.indexOf(b as string);

			if (indexA !== -1 && indexB !== -1) {
				[this.password[indexA], this.password[indexB]] = [
					this.password[indexB],
					this.password[indexA],
				];
			} else {
				throw Error("Characters not found");
			}
		}
	};

	public reverse = (a: number, b: number): void => {
		while (a < b) {
			this.swap(a, b);
			a++;
			b--;
		}
	};

	public move = (a: number, b: number): void => {
		const char = this.password.splice(a, 1)[0];
		this.password.splice(b, 0, char);
	};

	public rotate = (input: string | number): void => {
		let rotations;

		if (typeof input === "number") {
			rotations = input;
		} else {
			const index = this.password.indexOf(input as string);
			rotations = 1 + index + (index >= 4 ? 1 : 0);
		}

		for (let i = 0; i < Math.abs(rotations); i++) {
			if (rotations < 0) this.move(0, this.password.length - 1);
			else this.move(this.password.length - 1, 0);
		}
	};

	public print = (): string => {
		return this.password.join("");
	};
}
