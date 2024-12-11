export function problem(): string {
    return `
    --- Day 10: Hoof It ---
You all arrive at a Lava Production Facility on a floating island in the sky. As the others begin to search the massive industrial complex, you feel a small nose boop your leg and look down to discover a reindeer wearing a hard hat.

The reindeer is holding a book titled "Lava Island Hiking Guide". However, when you open the book, you discover that most of it seems to have been scorched by lava! As you're about to ask how you can help, the reindeer brings you a blank topographic map of the surrounding area (your puzzle input) and looks up at you excitedly.

Perhaps you can help fill in the missing hiking trails?

The topographic map indicates the height at each position using a scale from 0 (lowest) to 9 (highest). For example:

0123
1234
8765
9876
Based on un-scorched scraps of the book, you determine that a good hiking trail is as long as possible and has an even, gradual, uphill slope. For all practical purposes, this means that a hiking trail is any path that starts at height 0, ends at height 9, and always increases by a height of exactly 1 at each step. Hiking trails never include diagonal steps - only up, down, left, or right (from the perspective of the map).

You look up from the map and notice that the reindeer has helpfully begun to construct a small pile of pencils, markers, rulers, compasses, stickers, and other equipment you might need to update the map with hiking trails.

A trailhead is any position that starts one or more hiking trails - here, these positions will always have height 0. Assembling more fragments of pages, you establish that a trailhead's score is the number of 9-height positions reachable from that trailhead via a hiking trail. In the above example, the single trailhead in the top left corner has a score of 1 because it can reach a single 9 (the one in the bottom left).

This trailhead has a score of 2:

...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9
(The positions marked . are impassable tiles to simplify these examples; they do not appear on your actual topographic map.)

This trailhead has a score of 4 because every 9 is reachable via a hiking trail except the one immediately to the left of the trailhead:

..90..9
...1.98
...2..7
6543456
765.987
876....
987....
This topographic map contains two trailheads; the trailhead at the top has a score of 1, while the trailhead at the bottom has a score of 2:

10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01
Here's a larger example:

89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
This larger example has 9 trailheads. Considering the trailheads in reading order, they have scores of 5, 6, 5, 3, 1, 3, 5, 3, and 5. Adding these scores together, the sum of the scores of all trailheads is 36.

The reindeer gleefully carries over a protractor and adds it to the pile. What is the sum of the scores of all trailheads on your topographic map?
    `
}

export function input(): string {
    return `
    676781023010121078756541010565410126589652103
787692014523134569687238921076321087676543012
896543210674013278798107831089980896567122107
654100134985329143237356540123678925498033498
783210325676438050123445443294541012321044589
694309018984567267034576356789032008769655678
345678567823432178125689219878102109678724369
456969430214563089068701008765210234569013212
327854321005478873879010123674377654354321001
218901232876569912968123294589988912210132432
107650343985567803451054387487676903432101561
210545674783498712589965236596567876543650170
323432185692105605678876145645430967858743289
214981092185434104987986001034321458969801001
105670123076393213098887632125010321578932102
789889874101284332106798540136521230432840013
876776965692379876087034567287650145521051224
965460150789561045696129898398010676670569345
234321041276432038765408765498723487989678496
165432132345987129932317454389654395432310987
074540122187656087801326761230101276211001236
783458043090345196540410890121210989303456545
892169834901210105432589789032367893456327896
701078985810012234501678776543456302587410187
667654856798943107657578905494543211693217896
578983012367874038748765412387687600784506787
457832343455465129889854307898990521099615690
300761567854321012934781212387121434988794321
211650434969482103245690101236012345670188760
672349123478091014132386789845621012873279454
589678012562182365001675632736790123964560303
432547001601276478976543541345887654456781212
321232118762345569885012310212994569323998800
210321129098710378894322343200123478010878901
300410030123601256765011056123430765430765432
321567542034510349810782987001521894321045645
434788601945654878725693965432676541013236012
095699717898783965434344876501987034901107823
187659826500192854303239884567698127872787934
234549834410201601214138793298012016543396543
067812765325360519871025682105623456671230123
154908901876451456789014871234702965580145674
233217010945962359874323960189811874495432985
945606321034876543265221054076320432356781876
876545432321089012100100123165410321065690165
    `
}

export function testInput(): string {
    return `
    89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
    `
}
