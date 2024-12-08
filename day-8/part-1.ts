import { input } from "./part-1-problem"

export function solve(): string {
    // All the examples show the antinodes occurring on the outsides of each antenna
    // It seems like it could also occur in between if the circumstances are right?
    // Take for example two antennas one at (0, 0) and another at (3,6)
    // Antinodes can occur on the outsides, but it could also be at (1,2) and (2, 4)
    // Those points are twice as far away

    // My first attempt here will assume it can't occur between the nodes

    // General algo:
    // Get row,col index coordinates of every antenna in a hash map
    // As we iterate through all the coordinates, if the key for the antenna
    // already exists in the hash map, we calculate all possible antinode
    // coordinates with the other antennas on the list and add it to a set

    const stringGrid = getStringGrid(input())

    const maxRow = stringGrid.length - 1
    const maxCol = stringGrid[0].length - 1

    const antennaMap: Record<string, Coordinate[]> = {}
    const antinodeSet = new Set<string>() // antinode coordinates will be recorded as "row,col"

    // Can make this iteration faster by just using str.match(regex), but no ty
    for (let row = 0; row <= maxRow; row++) {
        for (let col = 0; col <= maxCol; col++) {
            const antenna = stringGrid[row][col]

            if (antenna === ".") {
                continue
            }

            // If it's the first antenna found of its kind, we just record and continue
            if (!antennaMap.hasOwnProperty(antenna)) {
                antennaMap[antenna] = [{ row, col }]
            } else {
                const allAntennaLoc = antennaMap[antenna]

                // Get all antinodes with current antenna with all other ones already found
                for (const antennaLoc of allAntennaLoc) {
                    const antinodes = getAntinodes({ row, col }, antennaLoc)
                    for (const antinode of antinodes) {
                        if (
                            antinode.row >= 0 &&
                            antinode.row <= maxRow &&
                            antinode.col >= 0 &&
                            antinode.col <= maxCol
                        ) {
                            antinodeSet.add(
                                String(antinode.row) +
                                    "," +
                                    String(antinode.col)
                            )
                        }
                    }
                }

                // Push antenna to the array
                allAntennaLoc.push({ row, col })
            }
        }
    }

    return `There are ${antinodeSet.size} unique locations on the map with an antinode.`
}

export interface Coordinate {
    row: number
    col: number
}

export function getStringGrid(input: string): string[][] {
    return input
        .trim()
        .split("\n")
        .map(l => l.split(""))
}

export function getAntinodes(ant1: Coordinate, ant2: Coordinate): Coordinate[] {
    const rowDiff = ant1.row - ant2.row
    const colDiff = ant1.col - ant2.col

    const res1 = { row: ant1.row + rowDiff, col: ant1.col + colDiff }
    const res2 = { row: ant2.row - rowDiff, col: ant2.col - colDiff }
    return [res1, res2]
}
