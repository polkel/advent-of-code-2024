import { input } from "./part-2-problem"

export function solve(): string {
    // Alright well I don't think I can reuse anything I used in the last problem
    // That algorithm ran so well but now I think I actually have to build out disk map array

    // The good news is, once the largest file has moved or not, it is staying where it is
    // meaning that its filesystem checksum addition can be calculated

    // Okay what if we store everything as a FileBlock object in the correct order in an array
    // Then iterate backwards to try and move every file where we can if it can
    // After the movement, we get the position and add it to the checksum

    const longString = input().trim()

    const fileArray: FileBlock2[] = []

    for (let i = 0; i < longString.length; i++) {
        const value = i % 2 === 0 ? i / 2 : null

        let firstPosition = 0

        // We get the next first position by extrapolating from last element
        if (fileArray.length !== 0) {
            const lastItem = fileArray[fileArray.length - 1]
            firstPosition = lastItem.firstPosition + lastItem.repetitions
        }

        const repetitions = parseInt(longString[i])

        fileArray.push({
            value,
            firstPosition,
            repetitions,
        })
    }

    let filesystemChecksum = 0

    // Now we iterate from the end of fileArray to see if we can shift
    // the file backwards

    // I can cut the iteration in half if I just iterate by even and odd numbers
    // But whatever
    // I just validate using value === null

    for (let tail = fileArray.length - 1; tail >= 0; tail--) {
        const fileBlock = fileArray[tail]

        // We skip if it's an empty space
        if (fileBlock.value === null) {
            continue
        }

        // Now we cycle forward to find an empty space with the same or greater amount of repetition
        for (let head = 0; head < tail; head++) {
            const emptySpace = fileArray[head]

            if (
                emptySpace.value !== null ||
                emptySpace.repetitions < fileBlock.repetitions
            ) {
                continue
            }

            // Here we know that the emptySpace has enough room for the fileBlock
            // We set the first position of the fileBlock to the emptySpace's
            // Then calculate the remaining reps of emptySpace and new first position
            fileBlock.firstPosition = emptySpace.firstPosition

            // emptySpace firstPosition shifts by reps of fileBlock and its reps also go down
            // by the same amount
            emptySpace.repetitions -= fileBlock.repetitions
            emptySpace.firstPosition += fileBlock.repetitions

            // Now we break because the fileBlock has found its permanent home
            break
        }

        // Calculate the fileBlock's checksum contribution
        filesystemChecksum += calculateCheckSum(fileBlock)
    }

    return `After preventing file system fragmentation, the new filesystem checksum is ${filesystemChecksum}.`
}

interface FileBlock2 {
    value: number | null
    firstPosition: number
    repetitions: number
}

function calculateCheckSum(input: FileBlock2): number {
    if (input.value === null) {
        throw Error("Cannot pass in an empty space.")
    }

    let checksum = 0

    for (
        let i = input.firstPosition;
        i < input.firstPosition + input.repetitions;
        i++
    ) {
        checksum += i * input.value
    }

    return checksum
}
