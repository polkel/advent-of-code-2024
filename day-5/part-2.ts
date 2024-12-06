import { input } from "./part-2-problem"
import { parseOrderRules, hasCorrectOrder, returnMiddle } from "./part-1"

export function solve(): string {
    // Same flow as before, but now we are looking for incorrectly ordered updates
    // I'm not quite sure which sorting algorithm will work the best here

    // If we find that an update is in the incorrect order, we can use sets to help us
    // We need to make an array of numbers that are remaining to be ordered
    // We iterate through this array of numbers and find the intersection of its set
    // With the remaining numbers
    // If the resulting set does not have any numbers, we can push it into the array
    // Then we continue doing this until the last element
    // Then we have to find the middle number

    const instructions = input().trim().split("\n\n")

    const orderRules = parseOrderRules(instructions[0].split("\n"))
    const updates = instructions[1].split("\n").map(update => {
        return update.split(",").map(u => parseInt(u))
    })

    let midWrongSum = 0

    for (const update of updates) {
        if (!hasCorrectOrder(update, orderRules)) {
            midWrongSum += returnMiddle(orderCorrectly(update, orderRules))
        }
    }

    return `The sum of middle page numbers after the correct adjustments is ${midWrongSum}.`
}

export function orderCorrectly(
    update: number[],
    rules: Record<string, number[]>
): number[] {
    let remainingToSort = [...update]
    const sorted = []

    while (remainingToSort.length !== 0) {
        const remainingSet = new Set<number>(remainingToSort)
        let indexToDelete: number | null = null
        for (let i = 0; i < remainingToSort.length; i++) {
            const key = remainingToSort[i]
            if (!rules.hasOwnProperty(String(key))) {
                sorted.push(key)
                indexToDelete = i
                break
            }

            const ruleSet = new Set(rules[String(key)])
            const intersection = new Set(
                [...remainingSet].filter(rem => ruleSet.has(rem))
            )
            if (intersection.size === 0) {
                sorted.push(key)
                indexToDelete = i
                break
            }
        }
        if (indexToDelete !== null) {
            remainingToSort = [
                ...remainingToSort.slice(0, indexToDelete),
                ...remainingToSort.slice(indexToDelete + 1),
            ]
        }
    }

    return sorted
}
