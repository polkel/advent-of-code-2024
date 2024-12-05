import { parsedInput, checkSafety } from "./part-1"

export function solve(): string {
    // We can use checkSafety from the previous part
    // But now we have to run a simulation of removing one each

    const reports = parsedInput()

    let safeReports = 0

    for (const report of reports) {
        // First check the vanilla report
        if (checkSafety(report) === 1) {
            safeReports++
            continue
        }

        // Then check if there are instances of safety after removing one element
        for (let i = 0; i < report.length; i++) {
            const smallReport = [...report.slice(0, i), ...report.slice(i + 1)]
            if (checkSafety(smallReport) === 1) {
                safeReports++
                break
            }
        }
    }

    return `After adding the Problem Dampener, there are now ${safeReports} safe reports.`
}
