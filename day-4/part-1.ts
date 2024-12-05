import { input } from "./part-1-problem"

export function solve() {
    // There's a few ways to approach this one.
    // I could transform the grid into "linear" strings based on direction
    // vertical, horizontal, and the two diagonals
    // and search for all occurrences of "XMAS" and "SAMX"

    // The other way, that's probably less efficient,
    // is to break the letters into a coordinate system
    // Look in eight directions (N, NE, E, SE, etc.) for the word
    // and continue when "XMAS" is not matched

    // Let's do it the less efficient way.
    // First we have to transform the string into a coordinate grid
    const stringGrid = input().trim().split("\n") // grid[row][column] 0-index

    const { width, height } = getGridDimensions(stringGrid)

    let xmasOccurrence = 0

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            // Check all possible directions of the current coordinate for XMAS
            xmasOccurrence += checkForXmas(row, col, stringGrid)
        }
    }

    return `In this grid of strings, XMAS appears ${xmasOccurrence} times.`
}

// input must be rectangular in dimensions
export function getGridDimensions(grid: string[]): {
    width: number
    height: number
} {
    return {
        width: grid[0].length,
        height: grid.length,
    }
}

// SHOULD-DO: Make all the directional functions a single function with a direction input
// Can just change what is added to the row or col based on direction
export function north(row: number, col: number, grid: string[]): string {
    // check if dimensions exceed possibility (if row - 3 is negative)
    if (row - 3 < 0) {
        return ""
    } else {
        return (
            grid[row][col] +
            grid[row - 1][col] +
            grid[row - 2][col] +
            grid[row - 3][col]
        )
    }
}

export function northEast(row: number, col: number, grid: string[]): string {
    const { width } = getGridDimensions(grid)

    // check if dimensions exceed possibility
    if (row - 3 < 0 || col + 3 >= width) {
        return ""
    } else {
        return (
            grid[row][col] +
            grid[row - 1][col + 1] +
            grid[row - 2][col + 2] +
            grid[row - 3][col + 3]
        )
    }
}

export function east(row: number, col: number, grid: string[]): string {
    const { width } = getGridDimensions(grid)

    // check if dimensions exceed possibility
    if (col + 3 >= width) {
        return ""
    } else {
        return (
            grid[row][col] +
            grid[row][col + 1] +
            grid[row][col + 2] +
            grid[row][col + 3]
        )
    }
}

export function southEast(row: number, col: number, grid: string[]): string {
    const { width, height } = getGridDimensions(grid)

    // check if dimensions exceed possibility
    if (col + 3 >= width || row + 3 >= height) {
        return ""
    } else {
        return (
            grid[row][col] +
            grid[row + 1][col + 1] +
            grid[row + 2][col + 2] +
            grid[row + 3][col + 3]
        )
    }
}

export function south(row: number, col: number, grid: string[]): string {
    const { height } = getGridDimensions(grid)

    // check if dimensions exceed possibility
    if (row + 3 >= height) {
        return ""
    } else {
        return (
            grid[row][col] +
            grid[row + 1][col] +
            grid[row + 2][col] +
            grid[row + 3][col]
        )
    }
}

export function southWest(row: number, col: number, grid: string[]): string {
    const { height } = getGridDimensions(grid)

    // check if dimensions exceed possibility
    if (row + 3 >= height || col - 3 < 0) {
        return ""
    } else {
        return (
            grid[row][col] +
            grid[row + 1][col - 1] +
            grid[row + 2][col - 2] +
            grid[row + 3][col - 3]
        )
    }
}

export function west(row: number, col: number, grid: string[]): string {
    // check if dimensions exceed possibility
    if (col - 3 < 0) {
        return ""
    } else {
        return (
            grid[row][col] +
            grid[row][col - 1] +
            grid[row][col - 2] +
            grid[row][col - 3]
        )
    }
}

export function northWest(row: number, col: number, grid: string[]): string {
    // check if dimensions exceed possibility
    if (col - 3 < 0 || row - 3 < 0) {
        return ""
    } else {
        return (
            grid[row][col] +
            grid[row - 1][col - 1] +
            grid[row - 2][col - 2] +
            grid[row - 3][col - 3]
        )
    }
}

export function checkForXmas(row: number, col: number, grid: string[]): number {
    let xmasOccurrences = 0
    const toCheck = [
        north(row, col, grid),
        northEast(row, col, grid),
        east(row, col, grid),
        southEast(row, col, grid),
        south(row, col, grid),
        southWest(row, col, grid),
        west(row, col, grid),
        northWest(row, col, grid),
    ]

    for (const xmas of toCheck) {
        if (xmas === "XMAS") {
            xmasOccurrences++
        }
    }

    return xmasOccurrences
}
