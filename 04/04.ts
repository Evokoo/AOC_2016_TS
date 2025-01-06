// Imports
import TOOLS from "tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	const rooms = praseInput(data);

	return validateRooms(rooms);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

type Room = { name: string; id: number; checksum: string };

// Functions
function praseInput(data: string): Room[] {
	const rooms: Room[] = [];

	for (const room of data.split("\n")) {
		const [name, id, checksum] = room.match(/[a-z\-]+|\d+/g) || ["", ""];

		if (name && id && checksum) {
			rooms.push({ name: name.slice(0, -1), id: Number(id), checksum });
		}
	}

	return rooms;
}

function validateRooms(rooms: Room[]) {
	let idSum = 0;

	for (const room of rooms) {
		const count: Map<string, number> = new Map();

		for (const char of room.name) {
			if (char === "-") continue;
			count.set(char, (count.get(char) ?? 0) + 1);
		}

		const code = [...count]
			.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
			.map(([key, _]) => key)
			.join("")
			.slice(0, 5);

		if (code === room.checksum) {
			idSum += room.id;
		}
	}

	return idSum;
}
