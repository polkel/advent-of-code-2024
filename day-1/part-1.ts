import { input } from "./part-1-problem"

export function solve(): string {
    // We need to sort the two lists first then compare them to each other
    // The most efficient sorting I can think of is merge sort which runs
    // at a time of n * log(n)

    // First let's extract arrays of numbers from the input

    const arrays = extractArrays(input())

    const sortedList1 = mergeSort(arrays.list1, "asc")
    const sortedList2 = mergeSort(arrays.list2, "asc")

    // Now we run through in linear time, calculating the differences and adding to the sum
    let distanceSum = 0
    for (let i = 0; i < sortedList1.length; i++) {
        distanceSum += Math.abs(sortedList1[i] - sortedList2[i])
    }

    return `The total distance between the two lists is ${distanceSum}.`
}

function extractArrays(input: string): { list1: number[]; list2: number[] } {
    const list1: number[] = []
    const list2: number[] = []

    const lines = input.trim().split("\n")

    for (const line of lines) {
        const lineItems = line.split(/\s+/)
        list1.push(parseInt(lineItems[0]))
        list2.push(parseInt(lineItems[1]))
    }

    return { list1, list2 }
}

// Exporting this to reuse in the future because mergeSort is not easy to implement
export function mergeSort(input: number[], order: "asc" | "desc"): number[] {
    // Merge sort algorithm is to first split each half until it's only a single unit
    // Then once everything is split, you merge, knowing that the halves are sorted

    // base case of single sized array
    if (input.length === 1 || input.length === 0) {
        return input
    }
    const mid = Math.ceil(input.length / 2)
    const left = input.slice(0, mid)
    const right = input.slice(mid)

    return merge(mergeSort(left, order), mergeSort(right, order), order)
}

// assumes that passed in left and right are already sorted in the correct order
function merge(
    left: number[],
    right: number[],
    order: "asc" | "desc"
): number[] {
    const leftLen = left.length
    const rightLen = right.length
    const res = []
    let leftCount = 0
    let rightCount = 0

    while (leftCount !== leftLen && rightCount !== rightLen) {
        const leftNum = left[leftCount]
        const rightNum = right[rightCount]

        if (leftNum < rightNum) {
            if (order === "asc") {
                res.push(leftNum)
                leftCount++
            } else {
                res.push(rightNum)
                rightCount++
            }
        } else {
            if (order === "asc") {
                res.push(rightNum)
                rightCount++
            } else {
                res.push(leftNum)
                leftCount++
            }
        }
    }

    // We've pushed the left array all the way
    if (leftCount === leftLen) {
        res.push(...right.slice(rightCount))
    } else {
        res.push(...left.slice(leftCount))
    }

    return res
}
