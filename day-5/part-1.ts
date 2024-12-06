import { input } from "./part-1-problem"

export function solve() {
    // I think we use a map to record all the numbers that should go before a certain number
    // We will refer to this later
    // Then, when we get the instructions
    // Checking the array in the map if any of the numbers behind it are present.
    // If it is present, then the updates are not in the right order and we do not
    // add the middle number

    // First we split the ordering rules and the updates

    const instructions = input().trim().split("\n\n") // This should separate the two

    const orderRules = instructions[0].split("\n")
    const updates = instructions[1].split("\n").map(update => {
        return update.split(",").map(u => parseInt(u))
    })

    // Now we parse the pageOrders into a hash map
    const rulesMap = parseOrderRules(orderRules)

    let midSum = 0

    // Now we parse through each line and check if it's valid
    // If it is valid, we return add the middle number
    for (const update of updates) {
        if (hasCorrectOrder(update, rulesMap)) {
            midSum += returnMiddle(update)
        }
    }

    return `The sum of the middle page numbers of correctly-ordered updates is ${midSum}.`
}

export function parseOrderRules(rules: string[]): Record<string, number[]> {
    const rulesMap: Record<string, number[]> = {}

    for (const rule of rules) {
        const orderedNums = rule.split("|")
        if (rulesMap.hasOwnProperty(orderedNums[0])) {
            rulesMap[orderedNums[0]].push(parseInt(orderedNums[1]))
        } else {
            rulesMap[orderedNums[0]] = [parseInt(orderedNums[1])]
        }
    }

    return rulesMap
}

export function hasCorrectOrder(
    toCheck: number[],
    rulesMap: Record<string, number[]>
): boolean {
    // Start at the 2nd element and check behind. If it exists
    for (let i = 1; i < toCheck.length; i++) {
        const key = String(toCheck[i])
        if (!rulesMap.hasOwnProperty(key)) {
            continue
        }
        const rules = rulesMap[key]
        const behindArray = toCheck.slice(0, i)
        for (const num of behindArray) {
            if (rules.indexOf(num) !== -1) {
                return false
            }
        }
    }
    return true
}

export function returnMiddle<T>(array: T[]): T {
    return array[Math.floor(array.length / 2)]
}
