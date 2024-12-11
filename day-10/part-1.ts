import { input } from "./part-1-problem"

export function solve(): string {
    // This feels like a DFS

    // It needs to be a DFS for every 0
    // Where if within a DFS, if a certain coordinate was already visited, we should skip that
    // since we already branched from the coordinate

    // We make another coordinate system of row,col and to add to a set like previous problems.
    // Then we make a recursion starting from any 0
    // To look up, right, down, left for the next number and only continue if it's the next number
    // We also save the coordinates in an external set from the recursion
    // If the recursive function sees that the coordinate already exists, we skip that recursion
    // When we find a 9, we return a 1 for the trailhead to sum up, otherwise it will be a 0

    // First make a numGrid as we always do

    const numGrid = input()
        .trim()
        .split("\n")
        .map(row => {
            return row.split("").map(numString => parseInt(numString))
        })

    let trailheadScoreSum = 0

    // Now iterate to find all zeroes
    for (let row = 0; row < numGrid.length; row++) {
        for (let col = 0; col < numGrid[0].length; col++) {
            if (numGrid[row][col] === 0) {
                trailheadScoreSum += getTrailheadScore({ row, col }, numGrid)
            }
        }
    }

    return `The sum of the scores of all trailheads is ${trailheadScoreSum}.`
}

export interface Coordinate {
    row: number
    col: number
}

export function getTrailheadScore(
    point: Coordinate,
    numGrid: number[][],
    pointSet?: Set<string>
): number {
    // If coordinate is already there, we stop the recursion
    if (pointSet && pointSet.has(coordinateToString(point))) {
        return 0
    }

    const { row, col } = point
    const currNum = numGrid[row][col]
    const nextNum = currNum + 1

    const rowLength = numGrid.length
    const colLength = numGrid[0].length

    let coordSet: Set<string>

    // The only pointset created should be when we start at the trailhead
    // All DFS recursions should carry the same pointset
    if (pointSet) {
        coordSet = pointSet
    } else {
        coordSet = new Set<string>()
    }

    // We add this point to the coordSet
    coordSet.add(coordinateToString(point))

    // Now if we are at the end of a trail (9), we return 1
    if (currNum === 9) {
        return 1
    }

    // Now we check up, right, left, down and add it to the trailheadScore if it's valid
    let trailheadScore = 0

    // Up
    if (row - 1 >= 0 && numGrid[row - 1][col] === nextNum) {
        trailheadScore += getTrailheadScore(
            { row: row - 1, col },
            numGrid,
            coordSet
        )
    }

    // Right
    if (col + 1 < colLength && numGrid[row][col + 1] === nextNum) {
        trailheadScore += getTrailheadScore(
            { row, col: col + 1 },
            numGrid,
            coordSet
        )
    }

    // Down
    if (row + 1 < rowLength && numGrid[row + 1][col] === nextNum) {
        trailheadScore += getTrailheadScore(
            { row: row + 1, col },
            numGrid,
            coordSet
        )
    }

    // Left
    if (col - 1 >= 0 && numGrid[row][col - 1] === nextNum) {
        trailheadScore += getTrailheadScore(
            { row, col: col - 1 },
            numGrid,
            coordSet
        )
    }

    return trailheadScore
}

export function coordinateToString(input: Coordinate): string {
    return String(input.row) + "," + String(input.col)
}
