import { input } from "./part-1-problem"

export function solve(): string {
    // I am behind by a few days so until I'm caught up,
    // these next few problems will be solved in a quick and dirty way

    // I don't think the order of stones matter right now
    // We just need to follow the rules of each stone per blink
    // I think we can do this recursively per stone
    // We can find out how many stones, each initial stone will have
    // after 25 blinks

    // First we need to convert the initial input to an array of numbers
    const nums = inputToNum(input())

    // Now we create a recursion for blinks with the initial stone number and reps
    // It will return 1 for the base case, but otherwise adds up the two stones

    // Okay, we can't do this recursively because we run out of stack call size
    // We'll have to do this iteratively

    const numStones = getStonesAfterBlinksIterative(nums, 25)

    return `After 25 blinks, there are ${numStones} stones.`
}

export function inputToNum(input: string): number[] {
    return input
        .trim()
        .split(" ")
        .map(n => parseInt(n))
}

// This does not work, too many recursions causing RangeError
export function getStonesAfterBlinks(stone: number, blinks: number): number {
    const numString = String(stone)

    // Base case where we are out of blinks
    if (blinks === 0) {
        return 1
    } else if (stone === 0) {
        return getStonesAfterBlinks(1, blinks - 1)
    } else if (numString.length % 2 === 0) {
        const num1 = parseInt(numString.slice(0, numString.length / 2))
        const num2 = parseInt(numString.slice(numString.length / 2))
        return (
            getStonesAfterBlinks(num1, blinks - 1) +
            getStonesAfterBlinks(num2, blinks - 1)
        )
    } else {
        return getStonesAfterBlinks(stone * 2024, blinks - 1)
    }
}

export function getStonesAfterBlinksIterative(
    stones: number[],
    blinks: number
): number {
    // The order doesn't really matter right now so we'll do a breadth first iteration
    // We run into the risk here of having a really large array

    const stonesClone = [...stones]
    let repsRemaining = blinks

    while (repsRemaining !== 0) {
        repsRemaining--

        // Need to record this because we will mutate the stone array as
        // we iterate through it
        const currStonesLength = stonesClone.length

        for (let i = 0; i < currStonesLength; i++) {
            const currStone = stonesClone[i]
            const currStoneString = String(currStone)
            if (currStone === 0) {
                stonesClone[i] = 1
            } else if (currStoneString.length % 2 === 0) {
                const num1 = parseInt(
                    currStoneString.slice(0, currStoneString.length / 2)
                )
                const num2 = parseInt(
                    currStoneString.slice(currStoneString.length / 2)
                )
                stonesClone[i] = num1
                stonesClone.push(num2)
            } else {
                stonesClone[i] = stonesClone[i] * 2024
            }
        }
    }

    return stonesClone.length
}
