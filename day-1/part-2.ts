import { input } from "./part-2-problem"

export function solve(): string {
    // No need to sort lists
    // We just need to know the occurences of the numbers on each list

    const lineArrays = input()
        .trim()
        .split("\n")
        .map(l => {
            return l.split(/\s+/).map(n => parseInt(n))
        })

    const occurrenceList1: Record<string, number> = {}
    const occurrenceList2: Record<string, number> = {}

    lineArrays.forEach(la => {
        const num1 = la[0]
        const num2 = la[1]

        if (occurrenceList1.hasOwnProperty(String(num1))) {
            occurrenceList1[String(num1)]++
        } else {
            occurrenceList1[String(num1)] = 1
        }

        if (occurrenceList2.hasOwnProperty(String(num2))) {
            occurrenceList2[String(num2)]++
        } else {
            occurrenceList2[String(num2)] = 1
        }
    })

    // Then we loop through the keys of occurrenceList1
    // If the key is a key of occurrenceList2
    // then add to similarityScore by parseInt(key) * occurrenceList2[key] * occurrenceList1[key]

    let similarityScore = 0

    for (const [key, value] of Object.entries(occurrenceList1)) {
        if (occurrenceList2.hasOwnProperty(key)) {
            similarityScore += parseInt(key) * occurrenceList2[key] * value
        }
    }

    return `The similarity score of the two lists is ${similarityScore}.`
}
