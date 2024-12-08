import { input } from "./part-2-problem"
import { getStringGrid, type Coordinate } from "./part-1"

export function solve(): string {
    // Now we have to find the slope between two antenna
    // It needs to be completely factored down to the smallest slope
    // I am not sure if AOC is nice enough to give us slopes
    // that can't be simplified
    // (e.g. 5/8, 2/3, 7/13, etc.)

    // I guess I'll make that assumption first and then see if my answer is correct

    const stringGrid = getStringGrid(input())

    const antinodeSet = new Set<string>()
    const antennaMap: Record<string, Coordinate[]> = {}

    const maxRow = stringGrid.length - 1
    const maxCol = stringGrid[0].length - 1

    for (let row = 0; row <= maxRow; row++) {
        for (let col = 0; col <= maxCol; col++) {
            const antenna = stringGrid[row][col]

            if (antenna === ".") {
                continue
            }

            if (!antennaMap.hasOwnProperty(antenna)) {
                antennaMap[antenna] = [{ row, col }]
            } else {
                const allAntennaLoc = antennaMap[antenna]

                for (const antennaLoc of allAntennaLoc) {
                    const antinodes = getAllAntinodesPt2(
                        { row, col },
                        antennaLoc,
                        { minRow: 0, minCol: 0, maxRow, maxCol }
                    )
                    for (const antinode of antinodes) {
                        antinodeSet.add(
                            String(antinode.row) + "," + String(antinode.col)
                        )
                    }
                }

                allAntennaLoc.push({ row, col })
            }
        }
    }

    return `With the effects of resonant harmonics, there are ${antinodeSet.size} unique antinode locations.`
}

export interface Boundary {
    minRow: number
    maxRow: number
    minCol: number
    maxCol: number
}

export function getAllAntinodesPt2(
    ant1: Coordinate,
    ant2: Coordinate,
    bounds: Boundary
): Coordinate[] {
    const rowDiff = ant1.row - ant2.row
    const colDiff = ant1.col - ant2.col

    let lastCoord = ant1
    const antinodes: Coordinate[] = []

    // Get all points in the first end
    while (isWithinBoundary(lastCoord, bounds)) {
        antinodes.push(lastCoord)
        lastCoord = {
            row: lastCoord.row - rowDiff,
            col: lastCoord.col - colDiff,
        }
    }

    lastCoord = { row: ant1.row + rowDiff, col: ant1.col + colDiff }

    // Get all points in the other end
    while (isWithinBoundary(lastCoord, bounds)) {
        antinodes.push(lastCoord)
        lastCoord = {
            row: lastCoord.row + rowDiff,
            col: lastCoord.col + colDiff,
        }
    }

    return antinodes
}

function isWithinBoundary(pt: Coordinate, bounds: Boundary) {
    const { minRow, maxRow, minCol, maxCol } = bounds
    const { row, col } = pt

    return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol
}
