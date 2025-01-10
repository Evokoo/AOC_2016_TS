export default class Scramber {
	private password: string[];
	private charCount: number;

	constructor(password: string) {
		this.password = [...password];
		this.charCount = password.length;
	}

	public swap(a: number | string, b: number | string): void {
		if (typeof a === "number" && typeof b === "number") {
			[this.password[a], this.password[b]] = [
				this.password[b],
				this.password[a],
			];
		} else if (typeof a === "string" && typeof b === "string") {
			const indexA = this.password.indexOf(a);
			const indexB = this.password.indexOf(b);

			this.swap(indexA, indexB);
		} else {
			if (typeof a !== typeof b) {
				throw TypeError("Type mismatch");
			} else {
				throw TypeError("Invalid types");
			}
		}
	}

	public rotate(input: number | string): void {
		if (typeof input === "number") {
			const result = Array(this.charCount).fill("");

			for (let i = 0; i < this.charCount; i++) {
				const newIndex = (i + input + this.charCount) % this.charCount;
				result[newIndex] = this.password[i];
			}

			this.password = result;
		} else if (typeof input === "string") {
			const index = this.password.indexOf(input);
			this.rotate(index + (index >= 4 ? 2 : 1));
		} else {
			throw TypeError("Invalid Type");
		}
	}

	public reverse(a: number, b: number): void {
		while (a < b) {
			this.swap(a, b);
			a++;
			b--;
		}
	}

	public move(a: number, b: number): void {
		const char = this.password.splice(a, 1)[0];
		this.password.splice(b, 0, char);
	}

	get getPassword() {
		return this.password.join("");
	}
}
