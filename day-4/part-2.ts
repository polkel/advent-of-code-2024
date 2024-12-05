import { input } from "./part-2-problem"
import { getGridDimensions } from "./part-1"

export function solve(): string {
    // We can use the same idea but this time we need to check two diagonals at each coordinate
    // Now we just need "forward slash" and "backward slash" helpers

    const stringGrid = input().trim().split("\n")

    const { width, height } = getGridDimensions(stringGrid)

    let masOccurrence = 0

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (isValidMas(row, col, stringGrid)) {
                masOccurrence++
            }
        }
    }

    return `The number of times an x-shaped mas occurs is ${masOccurrence}.`
}

export function forwardSlash(row: number, col: number, grid: string[]): string {
    // If we are at either row or column edge, we cannot return a string
    const { width, height } = getGridDimensions(grid)

    if (row === 0 || col === 0 || row === height - 1 || col === width - 1) {
        return ""
    }

    return grid[row + 1][col - 1] + grid[row][col] + grid[row - 1][col + 1]
}

export function backwardSlash(
    row: number,
    col: number,
    grid: string[]
): string {
    // If we are at either row or column edge, we cannot return a string
    const { width, height } = getGridDimensions(grid)

    if (row === 0 || col === 0 || row === height - 1 || col === width - 1) {
        return ""
    }

    return grid[row - 1][col - 1] + grid[row][col] + grid[row + 1][col + 1]
}

export function isValidMas(row: number, col: number, grid: string[]): boolean {
    const toCheck = [
        forwardSlash(row, col, grid),
        backwardSlash(row, col, grid),
    ]

    for (const mas of toCheck) {
        if (mas !== "MAS" && mas !== "SAM") {
            return false
        }
    }

    return true
}
