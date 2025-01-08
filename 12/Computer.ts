export type Command = {
	id: string;
	x: string | number;
	y?: string | number;
};

export class Computer {
	private registers: { [key: string]: number };
	private pointer: number;
	private increment: number;

	constructor() {
		this.registers = { a: 0, b: 0, c: 0, d: 0 };
		this.pointer = 0;
		this.increment = 1;
	}

	private copy(x: string | number, y: string): void {
		const value = typeof x === "string" ? this.registers[x] : x;
		this.registers[y] = value;
	}

	private increrase(x: string): void {
		this.registers[x]++;
	}

	private decrease(x: string): void {
		this.registers[x]--;
	}

	private jump(x: number | string, y: number) {
		const value = typeof x === "string" ? this.registers[x] : x;

		if (value !== 0) {
			this.increment = y;
		}
	}

	private updatePointer() {
		this.pointer += this.increment;
	}

	public exercute(command: Command): void {
		this.increment = 1;

		switch (command.id) {
			case "cpy":
				this.copy(command.x, command.y as string);
				break;
			case "inc":
				this.increrase(command.x as string);
				break;
			case "dec":
				this.decrease(command.x as string);
				break;
			case "jnz":
				this.jump(command.x, command.y as number);
				break;
			default:
				throw Error("Invalid command");
		}

		this.updatePointer();
	}

	set setRegisterC(value: number) {
		this.registers["c"] = value;
	}

	get getPointer() {
		return this.pointer;
	}

	get getRegister() {
		return this.registers;
	}
}
