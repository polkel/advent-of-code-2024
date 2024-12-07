import { input } from "./part-1-problem"

export function solve(): string {
    // We can solve this problem recursively.
    // We need treat the list like a stack.
    // We process the last item on the list first to see how it fits into the total number

    // Base cases
    // If we are at the last number, we only check if the number is equal to the remaining total
    // If so, return true
    // If not, return false

    // If the number is greater than the remaining total
    // return false because it's an invalid equation
    // If not, we continue

    // Then we check if it has a clean modulo, e.g. remainingTotal % number === 0
    // If so, we know we can do a division, then we continue to the next number
    // Otherwise, we only do a subtraction and continue to the next number

    // If we get a valid equation, we add the originalTotal to a sum

    // First parse the input
    const calibrations = parseInput(input())

    let calibrationResult = 0

    for (const calibration of calibrations) {
        const { total, equation } = calibration
        if (isValidEquation(total, equation)) {
            calibrationResult += total
        }
    }

    return `The total calibration result is ${calibrationResult}.`
}

export type Day7Input = {
    total: number
    equation: number[]
}[]

export function parseInput(input: string): Day7Input {
    const result = input
        .trim()
        .split("\n")
        .map(l => {
            const inputSplit = l.split(":")
            const total = parseInt(inputSplit[0])
            const equation = inputSplit[1]
                .trim()
                .split(" ")
                .map(n => parseInt(n))
            return { total, equation }
        })

    return result
}

export function isValidEquation(
    remainingTotal: number,
    remainingEquation: number[]
): boolean {
    if (remainingEquation.length === 0) {
        throw Error(
            "Invalid remainingEquation. It must have at least one element."
        )
    }

    // Base case
    if (remainingEquation.length === 1) {
        return remainingTotal === remainingEquation[0]
    }

    const numToProcess = remainingEquation[remainingEquation.length - 1]
    const nextEquation = remainingEquation.slice(
        0,
        remainingEquation.length - 1
    )

    // We know equation is invalid if the remaining number is larger than the total
    if (numToProcess > remainingTotal) {
        return false
    }

    let validEquation: boolean = false

    if (remainingTotal % numToProcess === 0) {
        const nextTotal = remainingTotal / numToProcess
        validEquation =
            validEquation || isValidEquation(nextTotal, nextEquation)

        // We try to cut the DFS short here if possible
        if (validEquation) {
            return validEquation
        }
    }

    const nextTotal = remainingTotal - numToProcess

    return validEquation || isValidEquation(nextTotal, nextEquation)
}
