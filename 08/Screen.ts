type Point = { x: number; y: number };

export default class Screen {
	grid: string[][];
	height: number;
	width: number;

	private readonly PIXEL_ON = "*";
	private readonly PIXEL_OFF = "_";

	constructor(width: number, height: number) {
		this.height = height;
		this.width = width;
		this.grid = this.setGrid(width, height);
	}

	private setGrid = (width: number, height: number): string[][] => {
		return Array.from({ length: height }, () =>
			Array(width).fill(this.PIXEL_OFF)
		);
	};

	private updateGrid = (points: Point[]): void => {
		for (let { x, y } of points) {
			this.grid[y][x] = this.PIXEL_ON;
		}
	};

	public countPixels = (): number => {
		let pixels = 0;

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				if (this.grid[y][x] === this.PIXEL_ON) {
					pixels++;
				}
			}
		}

		return pixels;
	};

	public printScreen = (): string => {
		return this.grid.map((row) => row.join("")).join("\n");
	};

	public addRectangle = (width: number, height: number): void => {
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				this.grid[y][x] = this.PIXEL_ON;
			}
		}
	};

	public rotate = (direction: string, index: number, amount: number): void => {
		const toUpdate: Point[] = [];

		if (direction === "x") {
			for (let y = this.height - 1; y >= 0; y--) {
				const currentPoint = this.grid[y][index];

				if (currentPoint === this.PIXEL_ON) {
					this.grid[y][index] = this.PIXEL_OFF;
					toUpdate.push({ x: index, y: (y + amount) % this.height });
				}
			}
		}

		if (direction === "y") {
			for (let x = this.width - 1; x >= 0; x--) {
				const currentPoint = this.grid[index][x];

				if (currentPoint === this.PIXEL_ON) {
					this.grid[index][x] = this.PIXEL_OFF;
					toUpdate.push({ x: (x + amount) % this.width, y: index });
				}
			}
		}

		this.updateGrid(toUpdate);
	};
}
