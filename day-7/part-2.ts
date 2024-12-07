import { input } from "./part-2-problem"
import { parseInput } from "./part-1"

export function solve(): string {
    // Adding a concatenation doesn't seem too hard
    // However, now it's trickier to do this in our original stack method
    // We might just have to do it recursively from the front of the list

    // Base cases
    // If there are no numbers left in the equation
    // return currTotal === originalTotal

    // In any part of the recursion,
    // If currTotal > originalTotal
    // return false
    // All operators just increase the total, none of them decrease it

    // There's no way for us to check now if any operation is valid

    const calibrations = parseInput(input())

    let calibrationResult = 0

    for (const calibration of calibrations) {
        const { total, equation } = calibration
        if (
            isValidEquationPt2({ originalTotal: total, currTotal: 0, equation })
        ) {
            calibrationResult += total
        }
    }

    return `The total calibration result after adding the concatenation operation is ${calibrationResult}.`
}

export function isValidEquationPt2(req: {
    originalTotal: number
    currTotal: number
    equation: number[]
}): boolean {
    let validEquation: boolean = false

    const { originalTotal, currTotal, equation } = req

    // Base cases
    if (equation.length === 0) {
        return originalTotal === currTotal
    }

    if (currTotal > originalTotal) {
        return false
    }

    const numToProcess = equation[0]
    const nextEquation = equation.slice(1)

    // If we are at the first number, we just add it to the total and continue
    if (currTotal === 0) {
        return isValidEquationPt2({
            originalTotal,
            currTotal: numToProcess,
            equation: nextEquation,
        })
    }

    // Doing the operation with highest increase in value first

    // Concatenation
    const concatTotal = concatenateNumbers(currTotal, numToProcess)
    validEquation =
        validEquation ||
        isValidEquationPt2({
            originalTotal,
            currTotal: concatTotal,
            equation: nextEquation,
        })

    // Try to stop the DFS short
    if (validEquation) {
        return validEquation
    }

    // Multiplication
    const multTotal = currTotal * numToProcess
    validEquation =
        validEquation ||
        isValidEquationPt2({
            originalTotal,
            currTotal: multTotal,
            equation: nextEquation,
        })
    if (validEquation) {
        return validEquation
    }

    //Addition
    const addTotal = currTotal + numToProcess
    return (
        validEquation ||
        isValidEquationPt2({
            originalTotal,
            currTotal: addTotal,
            equation: nextEquation,
        })
    )
}

// We assume both numbers passed are integers
function concatenateNumbers(num1: number, num2: number): number {
    return parseInt(String(num1.toFixed(0)) + String(num2.toFixed(0)))
}
