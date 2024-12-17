import { input } from "./part-2-problem"
import { inputToNum } from "./part-1"
export function solve(): string {
    // Why don't we just try to use the same tactic here?
    // If we run into memory issues, maybe I can approach it with a divide and conquer strategy
    // Again, the order doesn't matter in this problem so I'm not sure why they mention it

    // Okay so as expected, we run into a size error
    // Let's fix it not by making my algorithm more efficient
    // but by splitting the arrays when they reach a certain length.
    // I don't like it, but I'm behind by 5 days so it is what it is.

    // Those methods didn't work.
    // Going to have to think about a more efficient algorithm for part 2.

    // We'll come back to this later

    // Okay I'm back from being scared of this problem.
    // Now let's try something different.

    // The issue is that we run out of memory, so how do we conserve memory?
    // Maybe we have some repeats?

    // There are a lot of repeats for single digits
    // 0-9 reappear often
    // How do we take advantage of this fact?

    // Let's see if storing it in a map makes any sense

    let stones: Record<string, number> = {}

    const initialStones = inputToNum(input())

    for (const stone of initialStones) {
        addStone(stone, 1, stones)
    }

    let blinksRemaining = 75

    while (blinksRemaining !== 0) {
        const newStones: Record<string, number> = {}
        blinksRemaining--
        for (const [stone, reps] of Object.entries(stones)) {
            const stoneNum = parseInt(stone)
            const stoneDigits = stone.length
            if (stoneNum === 0) {
                addStone(1, reps, newStones)
            } else if (stoneDigits % 2 === 0) {
                const num1 = parseInt(stone.slice(0, stoneDigits / 2))
                const num2 = parseInt(stone.slice(stoneDigits / 2))
                addStone(num1, reps, newStones)
                addStone(num2, reps, newStones)
            } else {
                addStone(stoneNum * 2024, reps, newStones)
            }
        }
        stones = newStones
    }

    let totalStones = 0

    for (const stoneNum of Object.values(stones)) {
        totalStones += stoneNum
    }

    return `After 75 blinks, there will be a total of ${totalStones}.`
}

// Mutates stones object passed in
export function addStone(
    stoneNumber: number,
    reps: number,
    stones: Record<string, number>
): void {
    const stoneString = String(stoneNumber)

    if (stones.hasOwnProperty(stoneString)) {
        stones[stoneString] += reps
    } else {
        stones[stoneString] = reps
    }
}

// ALL THIS BELOW DIDN'T WORK BUT I'M LEAVING IT HERE FOR ENTERTAINMENT PURPOSES

// Okay, so the method of splitting arrays also didn't work
// JS heap was out of memory
export function getStonesAfterBlinksIterative2(
    stones: number[],
    blinks: number
): number {
    const stonesClone = [...stones]
    let repsRemaining = blinks
    const sizeLimit = 2 ** 26

    const stonesArrays = [stonesClone]

    while (repsRemaining !== 0) {
        repsRemaining--
        splitArraySizes(stonesArrays, sizeLimit)
        console.log(stonesArrays.length)

        // At the beginning of the rep, we check if any arrays exceed our size limit
        // I will assume that the size limit is something 2 ** 26
        // if it does, we split them to half size

        // Need to record this because we will mutate the stone array as
        // we iterate through it
        for (const stoneArray of stonesArrays) {
            const currStonesLength = stoneArray.length

            for (let i = 0; i < currStonesLength; i++) {
                const currStone = stoneArray[i]
                const currStoneString = String(currStone)
                if (currStone === 0) {
                    stoneArray[i] = 1
                } else if (currStoneString.length % 2 === 0) {
                    const num1 = parseInt(
                        currStoneString.slice(0, currStoneString.length / 2)
                    )
                    const num2 = parseInt(
                        currStoneString.slice(currStoneString.length / 2)
                    )
                    stoneArray[i] = num1
                    stoneArray.push(num2)
                } else {
                    stoneArray[i] = stoneArray[i] * 2024
                }
            }
        }
    }

    let numStones = 0

    for (const stoneArray of stonesArrays) {
        numStones += stoneArray.length
    }

    return numStones
}

// Splits arrays to manageable sizes
// Manipulates the array passed in, returns nothing
export function splitArraySizes(array: number[][], sizeLimit: number): void {
    // Taking note of this because we will be mutating the array while
    // we iterate through it
    const arrayLen = array.length

    for (let i = 0; i < arrayLen; i++) {
        const currArray = array[i]
        if (currArray.length > sizeLimit) {
            const arr1 = currArray.slice(0, Math.floor(currArray.length / 2))
            const arr2 = currArray.slice(Math.floor(currArray.length / 2))

            array[i] = arr1
            array.push(arr2)
        }
    }
}
