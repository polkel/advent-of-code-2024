import { input } from "./part-1-problem"

export function solve(): string {
    // The straightforward way to solve this to just create a grid of the paths
    // And an algorithm to traverse the path one by one

    // Perhaps we can make it faster by logging the col and row of the obstacles
    // using this knowledge, just do math to keep a set of pairs

    // We'll keep a record of the obstacles in two arrays of the paths
    // One where the first index is the row, the other is the column
    // Our coordinate system will be (row, col) with top left being 0,0

    // We can move "up" from any position by pulling the colFirst array
    // and doing lastIndexOf("#") from the row position of the guard
    // We should now have the row,col of the obstacle
    // Hence the next position of the guard before they turn.

    // We can write a function to record all points "row,col" that was traversed
    // and keep it in a set as strings to maintain unique visited count
    // Repeat this method for all turns until lastIndexOf returns a -1

    const { rowFirst, colFirst, location } = getGridArrays(input())

    // Two lines for location type safety
    const guard: Guard = { location, direction: Direction.Up }

    // Used for the while loop
    let guardLastLocation: Coordinate | null = guard.location

    // set to keep track of all unique coords
    const uniqueCoords = new Set<string>()

    while (guardLastLocation) {
        const res = getGuardPath({ guard, rowFirst, colFirst })
        guardLastLocation = res.newLocation

        // Set up guard for next trip
        if (res.newLocation) {
            guard.location = res.newLocation
            guard.direction = getNextDirection(guard.direction)
        }

        // Add paths to the set
        for (const coord of res.path) {
            uniqueCoords.add(coord)
        }
    }

    return `The guard visited ${uniqueCoords.size} distinct positions before leaving the area.`
}

export type Guard = {
    location: Coordinate
    direction: Direction
}

export enum Direction {
    Up,
    Right,
    Down,
    Left,
}

export function getGridArrays(input: string): {
    rowFirst: string[][]
    colFirst: string[][]
    location: Coordinate
} {
    const lines = input.trim().split("\n")
    const rowFirst: string[][] = []
    const colFirst: string[][] = []
    let location: Coordinate | null = null

    for (let row = 0; row < lines.length; row++) {
        const rowString = lines[row]
        rowFirst.push(rowString.split(""))

        for (let col = 0; col < rowString.length; col++) {
            const letter = rowString[col]
            if (letter === "^") {
                location = { row, col }
            }

            if (colFirst[col] === undefined) {
                colFirst[col] = [letter]
            } else {
                colFirst[col].push(letter)
            }
        }
    }

    if (!location) {
        throw Error("Did not find guard.")
    }

    return {
        rowFirst,
        colFirst,
        location,
    }
}

export function getNextDirection(input: Direction): Direction {
    switch (input) {
        case Direction.Up:
            return Direction.Right
            break
        case Direction.Right:
            return Direction.Down
            break
        case Direction.Down:
            return Direction.Left
            break
        case Direction.Left:
            return Direction.Up
            break
    }
}

export interface Coordinate {
    row: number
    col: number
}

interface GetGuardPathRequest {
    guard: Guard
    rowFirst: string[][]
    colFirst: string[][]
}

interface GetGuardPathResponse {
    path: string[]
    newLocation: Coordinate | null
}

// Returns an array of coordinate strings (i.e."row,col") and the next guard location.
// newLocation is null if the guard made it out of the path.
// We return a string so that we can store it in a set.
export function getGuardPath(req: GetGuardPathRequest): GetGuardPathResponse {
    const { guard, rowFirst, colFirst } = req

    const result: GetGuardPathResponse = {
        path: [],
        newLocation: null,
    }

    let guardLeft: boolean = false
    let guardObstacle: Coordinate | null = null

    if (guard.direction === Direction.Up) {
        // Get the vertical column the guard is moving in
        const currCol = colFirst[guard.location.col]

        // Find the obstacle's row the guard will hit
        const obstacleRow = currCol
            .slice(0, guard.location.row)
            .lastIndexOf("#")

        if (obstacleRow === -1) {
            guardLeft = true
            guardObstacle = { row: -1, col: guard.location.col }
        } else {
            guardObstacle = { row: obstacleRow, col: guard.location.col }
        }
    } else if (guard.direction === Direction.Down) {
        const currCol = colFirst[guard.location.col]

        const obstacleRow = currCol.slice(guard.location.row + 1).indexOf("#")

        if (obstacleRow === -1) {
            guardLeft = true
            guardObstacle = { row: rowFirst.length, col: guard.location.col }
        } else {
            guardObstacle = {
                row: guard.location.row + obstacleRow + 1,
                col: guard.location.col,
            }
        }
    } else if (guard.direction === Direction.Right) {
        const currRow = rowFirst[guard.location.row]

        const obstacleCol = currRow.slice(guard.location.col + 1).indexOf("#")

        if (obstacleCol === -1) {
            guardLeft = true
            guardObstacle = { row: guard.location.row, col: colFirst.length }
        } else {
            guardObstacle = {
                row: guard.location.row,
                col: guard.location.col + obstacleCol + 1,
            }
        }
    } else if (guard.direction === Direction.Left) {
        const currRow = rowFirst[guard.location.row]

        const obstacleCol = currRow
            .slice(0, guard.location.col)
            .lastIndexOf("#")

        if (obstacleCol === -1) {
            guardLeft = true
            guardObstacle = { row: guard.location.row, col: -1 }
        } else {
            guardObstacle = {
                row: guard.location.row,
                col: obstacleCol,
            }
        }
    }

    if (!guardObstacle) {
        throw Error("Guard obstacle not defined.")
    }

    const path = getAllCoordinatesInPath({
        start: guard.location,
        end: guardObstacle,
    })

    result.path = path

    if (!guardLeft) {
        const coordinatePair = path[path.length - 1]
            .split(",")
            .map(p => parseInt(p))
        result.newLocation = {
            row: coordinatePair[0],
            col: coordinatePair[1],
        }
    }

    return result
}

// returns string coordinates "row,col"
export function getAllCoordinatesInPath(req: {
    start: Coordinate
    end: Coordinate
}): string[] {
    const { start, end } = req
    const { row: startRow, col: startCol } = start
    const { row: endRow, col: endCol } = end

    const path: string[] = []

    if (startRow !== endRow && startCol !== endCol) {
        throw Error("Guard cannot move diagonally")
    } else if (startRow !== endRow) {
        // We are moving vertically
        if (startRow > endRow) {
            for (let row = startRow; row !== endRow; row--) {
                path.push([String(row), String(startCol)].join(","))
            }
        } else {
            for (let row = startRow; row !== endRow; row++) {
                path.push([String(row), String(startCol)].join(","))
            }
        }
    } else if (startCol !== endCol) {
        // We are moving horizontally
        if (startCol > endCol) {
            for (let col = startCol; col !== endCol; col--) {
                path.push([String(startRow), String(col)].join(","))
            }
        } else {
            for (let col = startCol; col !== endCol; col++) {
                path.push([String(startRow), String(col)].join(","))
            }
        }
    } else {
        // start and end are equal, so we push one coordinate
        // I don't think this should ever happen because we will input
        // The same coordinates ever
        path.push([String(startRow), String(startCol)].join(","))
    }

    return path
}
