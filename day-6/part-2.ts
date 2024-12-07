import { input } from "./part-2-problem"
import {
    getGridArrays,
    getGuardPath,
    type Guard,
    getNextDirection,
    Direction,
    type Coordinate,
} from "./part-1"

export function solve(): string {
    // I have no crafty way to figure out how to geometrically get a loop
    // If I PhD'd in math maybe I could, but I'm a lowly engineer

    // Only way I can think of doing this is iterating through every empty space
    // and adding an "#"

    // Now checking for a loop is tricky as well...
    // How do we know if the guard has repeated its moves?
    // The repetition can either happen at the beginning of its path
    // And its path may vary (could be like after 1000 steps or so)

    // I think I know how to best check for a loop.
    // In the last problem, we stored each coordinate a string in a set.
    // Now, what if we stored the guard's whole path as a string in the set?
    // Something like "1,3-2,3-3,3-4,3"
    // We would know the guard is looping if it ever repeats a segment of its path
    // We can also still figure out if the guard leaves with the function from problem 1

    // But now iterating all the empty spaces will be really sad because
    // there's probably some big brain way to do this that I haven't unlocked
    // because I'm simple

    const { rowFirst, colFirst, location } = getGridArrays(input())

    let loops = 0
    let lastRowChange: number | null = null
    let lastColChange: number | null = null

    for (let rowChange = 0; rowChange < rowFirst.length; rowChange++) {
        for (let colChange = 0; colChange < colFirst.length; colChange++) {
            if (lastRowChange !== null && lastColChange !== null) {
                rowFirst[lastRowChange][lastColChange] = "."
                colFirst[lastColChange][lastRowChange] = "."
            }

            lastRowChange = null
            lastColChange = null

            // If the current coordinate is an obstacle or the guard, we continue
            if (
                rowFirst[rowChange][colChange] === "#" ||
                rowFirst[rowChange][colChange] === "^"
            ) {
                continue
            }

            lastRowChange = rowChange
            lastColChange = colChange
            rowFirst[rowChange][colChange] = "#"
            colFirst[colChange][rowChange] = "#"

            const guard: Guard = {
                location,
                direction: Direction.Up,
            }

            const paths = new Set<string>()

            let lastGuardLocation: Coordinate | null = guard.location

            while (guard.location) {
                const res = getGuardPath({ guard, rowFirst, colFirst })

                lastGuardLocation = res.newLocation

                // Let's break if the guard left
                if (!lastGuardLocation) {
                    break
                }

                // We have to be careful here because sometimes
                // res.path is a single coordinate
                // we should not check for a loop in these scenarios
                // because it might show up as a false repeat path

                // Check for loop
                if (res.path.length > 1) {
                    const pathString = res.path.join("-")
                    if (paths.has(pathString)) {
                        loops++
                        break
                    } else {
                        paths.add(pathString)
                    }
                }

                // set up guard for next trip
                guard.location = lastGuardLocation
                guard.direction = getNextDirection(guard.direction)
            }
        }
    }

    return `There are ${loops} different positions to place an obstacle for the guard to loop.`
}
