import { input } from "./part-2-problem"

export function solve(): string {
    // Let's do regex but with capture groups.
    const commandRegex =
        /do\(\)|don't\(\)|mul\([1-9][0-9]{0,2},[1-9][0-9]{0,2}\)/g

    const matches = input().match(commandRegex)

    let mulEnabled: boolean = true
    let multiplicationSum = 0

    if (matches) {
        for (const command of matches) {
            if (command === "do()") {
                mulEnabled = true
                continue
            }
            if (command === "don't()") {
                mulEnabled = false
                continue
            }

            if (mulEnabled) {
                // I just used the same lines from the last part
                const nums = command
                    .slice(4, command.length - 1)
                    .split(",")
                    .map(n => parseInt(n))
                multiplicationSum += nums[0] * nums[1]
            }
        }
    }

    return `Using the do's and don'ts, the new multiplication sum is ${multiplicationSum}.`
}
