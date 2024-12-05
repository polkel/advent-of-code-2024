import { input } from "./part-1-problem"

export function solve(): string {
    // Lets just use a regex to find all the mul instructions

    const mulInstruction = /mul\([1-9][0-9]{0,2},[1-9][0-9]{0,2}\)/g

    const matches = input().match(mulInstruction)

    let multiplicationSum = 0

    if (matches) {
        for (const command of matches) {
            // The numbers start at the 4th index and we need to cut off the last element
            const nums = command
                .slice(4, command.length - 1)
                .split(",")
                .map(n => parseInt(n))
            multiplicationSum += nums[0] * nums[1]
        }
    }

    return `The sum of all the multiplication instructions is ${multiplicationSum}.`
}
