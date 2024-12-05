import { input } from "./part-1-problem"

export function solve(): string {
    // Get each line as an array of numbers
    const inputs = parsedInput()

    // For each array, we just need to check that the rule is fine
    // Return 1 if safe, 0 if unsafe
    let safeReports = 0
    for (const report of inputs) {
        safeReports += checkSafety(report)
    }

    return `There are ${safeReports} safe reports.`
}

export function parsedInput(): number[][] {
    return input()
        .trim()
        .split("\n")
        .map(l => {
            return l.split(/\s+/).map(n => parseInt(n))
        })
}

export function checkSafety(input: number[]): number {
    // Any report with only one level is safe
    if (input.length <= 1) {
        return 1
    }

    let order: "asc" | "desc" | null = null

    for (let i = 0; i < input.length - 1; i++) {
        const num1 = input[i]
        const num2 = input[i + 1]

        if (num1 === num2) {
            return 0
        }

        // This should only set order once
        if (!order && num1 < num2) {
            order = "asc"
        } else if (!order && num1 > num2) {
            order = "desc"
        }

        // Check order correctness
        if (
            (order === "asc" && num2 < num1) ||
            (order === "desc" && num1 < num2)
        ) {
            return 0
        }

        // Check the difference is between by 1 and 3
        const diff = Math.abs(num1 - num2)

        if (diff < 1 || diff > 3) {
            return 0
        }
    }

    return 1
}
