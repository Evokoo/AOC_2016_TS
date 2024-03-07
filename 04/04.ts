// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		validRooms = validateRooms(parseInput(data)),
		sectorSum = validRooms.reduce((acc, { sectorID }) => acc + sectorID, 0);

	return sectorSum;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		validRooms = validateRooms(parseInput(data)),
		decryptedRooms = validRooms.map(decryptRoomName),
		northPoleSector = decryptedRooms.find((room) =>
			room.name.includes("north")
		);

	return northPoleSector!.sectorID;
}

//Run
solveB("input", "04");

interface Room {
	name: string;
	checksum: string;
	sectorID: number;
}

// Functions
function parseInput(data: string): Room[] {
	const lines = data.split("\r\n");
	const rooms: Room[] = [];

	for (let line of lines) {
		const name = line.match(/[a-z\-]+(?=\d)/)![0];
		const sectorID = +line.match(/\d+/)![0];
		const checksum = line.match(/(?<=\[)(\w+)(?=\])/)![0];

		rooms.push({ name, sectorID, checksum });
	}

	return rooms;
}
function decryptRoomName({ name, sectorID, checksum }: Room) {
	const decryptedName = name.replace(/./g, ($) => {
		if ($ === "-") return " ";

		const charCode = (($.charCodeAt(0) - 96 + sectorID) % 26) + 96;
		return String.fromCharCode(charCode);
	});

	return { name: decryptedName, sectorID, checksum };
}
function validChecksum(name: string, checksum: string): boolean {
	const charCount: Record<string, number> = {};

	for (let char of name.replace(/\-/g, "")) {
		charCount[char] = (charCount[char] || 0) + 1;
	}

	const decodedName = Object.entries(charCount)
		.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
		.map(([char, _]) => char)
		.join("")
		.slice(0, 5);

	return decodedName === checksum;
}
function validateRooms(rooms: Room[]): Room[] {
	let validRooms: Room[] = [];

	for (let { name, sectorID, checksum } of rooms) {
		if (validChecksum(name, checksum)) {
			validRooms.push({ name, sectorID, checksum });
		}
	}

	return validRooms;
}
