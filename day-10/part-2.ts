import { input } from "./part-2-problem"
import { type Coordinate, coordinateToString } from "./part-1"

export function solve(): string {
    // Kinda funny because this is also DFS, but without the repetition restriction from before
    // We've already implemented this, we just have to lift the repetition restriction

    // Because my mental capacity today is that of a worm, I'm going to copy pasta from
    // part 1 and just edit.

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
                trailheadScoreSum += getTrailheadScore2({ row, col }, numGrid)
            }
        }
    }

    return `The sum of the ratings of all trailheads is ${trailheadScoreSum}.`
}

export function getTrailheadScore2(
    point: Coordinate,
    numGrid: number[][]
): number {
    const { row, col } = point
    const currNum = numGrid[row][col]
    const nextNum = currNum + 1

    const rowLength = numGrid.length
    const colLength = numGrid[0].length

    // Now if we are at the end of a trail (9), we return 1
    if (currNum === 9) {
        return 1
    }

    // Now we check up, right, left, down and add it to the trailheadScore if it's valid
    let trailheadScore = 0

    // Up
    if (row - 1 >= 0 && numGrid[row - 1][col] === nextNum) {
        trailheadScore += getTrailheadScore2({ row: row - 1, col }, numGrid)
    }

    // Right
    if (col + 1 < colLength && numGrid[row][col + 1] === nextNum) {
        trailheadScore += getTrailheadScore2({ row, col: col + 1 }, numGrid)
    }

    // Down
    if (row + 1 < rowLength && numGrid[row + 1][col] === nextNum) {
        trailheadScore += getTrailheadScore2({ row: row + 1, col }, numGrid)
    }

    // Left
    if (col - 1 >= 0 && numGrid[row][col - 1] === nextNum) {
        trailheadScore += getTrailheadScore2({ row, col: col - 1 }, numGrid)
    }

    return trailheadScore
}
