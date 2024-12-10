import { input } from "./part-1-problem"

export function solve(): string {
    // I want to try and iterate through this very long string of numbers once
    // I can't think of an eloquent way to do this

    // I think we can iterate through two directions
    // Once from the front and another from the back
    // Only even indices are actual values, the odd indices are spaces
    // We keep track of the block count as well (which starts at 0)
    // We'll also have the end of the list queued up with a file
    // Any time that a file switches, we check both head and tail files
    // to see if they have the same value
    // If they have the same value, then we are at the end and can add the last bit of files

    let blockCount = 0
    let filesystemChecksum = 0

    const longNumString = input().trim()

    let headIndex = 0
    let tailIndex = longNumString.length - 1

    let head: FileBlock = getFileBlock(headIndex, longNumString)
    let tail: FileBlock = getFileBlock(tailIndex, longNumString)

    while (headIndex !== tailIndex) {
        // If any of the repetitions are 0, we reload them and continue without
        // incrementing the blocks
        if (head.repetitions === 0) {
            headIndex++
            head = getFileBlock(headIndex, longNumString)
            continue
        }

        // For the tail, we don't care for the empty spaces so we skip in those scenarios as well
        if (tail.repetitions === 0 || tail.value === null) {
            tailIndex--
            tail = getFileBlock(tailIndex, longNumString)
            continue
        }

        // Now we always add the head first if it has a non-null value
        if (head.value !== null) {
            filesystemChecksum += head.value * blockCount
        } else {
            // Here we know head.value is null
            // meaning that it's an empty space we need to fill with the tail
            filesystemChecksum += tail.value * blockCount
            tail.repetitions--
        }

        // In all instances if it gets to this point, we have to decrement head.repetitions
        // and increment blockCount because we added something to the disk map
        head.repetitions--
        blockCount++
    }

    // When we break, the head and tail are now in the same FileBlock.
    // We only add the lower number of repetitions remaining
    // into the disk map, so we can just use a while loop to enforce it

    // We only need to do this if head and tail and not null
    if (head.value !== null) {
        while (head.repetitions !== 0 && tail.repetitions !== 0) {
            filesystemChecksum += head.value * blockCount
            head.repetitions--
            tail.repetitions--
            blockCount++
        }
    }

    return `The resulting filesystem checksum is ${filesystemChecksum}.`
}

export interface FileBlock {
    value: number | null
    repetitions: number
}

export function getFileBlock(index: number, longString: string): FileBlock {
    const value = index % 2 === 0 ? index / 2 : null
    const repetitions = parseInt(longString[index])

    return {
        value,
        repetitions,
    }
}
