import {ConversionMap, SeedRange} from "./day05.mjs";

declare var self: Worker;

self.onmessage = ({data: {seed_range, conversion_maps}}: MessageEvent) => {
    postMessage(
        do_work(seed_range, conversion_maps)
    )
}

const do_work = (seed_range: SeedRange, conversion_maps: ConversionMap[]) => {
    let lowest = Infinity

    const range_end = seed_range.rangeStart + seed_range.rangeLength

    console.log(id, 'processing', seed_range.rangeLength, 'seeds')

    for (let seed: number = seed_range.rangeStart; seed < range_end; seed++) {
        const seed_location: number = conversion_maps
            .reduce((seed: number, conversion_map: string[]): number => {
                // apply conversion to seed
                for (const map of conversion_map) {
                    // check if seed is in this mapping
                    const [destStart, sourceStart, length] = map.split(' ').map(Number)

                    if (seed >= sourceStart && seed <= sourceStart + length - 1) {
                        // return the mapped value
                        return destStart + seed - sourceStart
                    }
                }

                // if we didn't map the seed, return its current value
                return seed
            }, seed)

        // if the lowest location number is lower than the previous lowest, store the new lowest
        lowest = Math.min(lowest, seed_location)
    }

    return lowest
}