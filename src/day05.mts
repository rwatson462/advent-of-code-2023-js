import {readfile} from './readfile'

const input = [
    'seeds: 79 14 55 13',
    '',
    'seed-to-soil map:',
    '50 98 2',
    '52 50 48',
    '',
    'soil-to-fertilizer map:',
    '0 15 37',
    '37 52 2',
    '39 0 15',
    '',
    'fertilizer-to-water map:',
    '49 53 8',
    '0 11 42',
    '42 0 7',
    '57 7 4',
    '',
    'water-to-light map:',
    '88 18 7',
    '18 25 70',
    '',
    'light-to-temperature map:',
    '45 77 23',
    '81 45 19',
    '68 64 13',
    '',
    'temperature-to-humidity map:',
    '0 69 1',
    '1 0 69',
    '',
    'humidity-to-location map:',
    '60 56 37',
    '56 93 4',
];

type Conversion = {
    source: number;
    destination: number;
    range: number;
}

export type ConversionMap = {
    from: string;
    to: string;
    conversations: Conversion[];
}

export type SeedRange = {
    rangeStart: number,
    rangeLength: number
}


const get_seeds = (line: string): number[] => {
    return line.split(': ')[1].split(' ').map(Number)
}

const get_seed_ranges = (line: string): SeedRange[] => {
    const ranges = get_seeds(line)

    const seedRanges: {
        rangeStart: number,
        rangeLength: number
    }[] = []

    // get groups of 2 for the seeds, then explode them into a list of seeds
    for (let i = 0; i < ranges.length; i += 2) {
        seedRanges.push({
            rangeStart: ranges[i],
            rangeLength: ranges[i + 1],
        })
    }

    return seedRanges
}


const part1 = () => {
    const input = readfile('./data/5')

    const seeds = get_seeds(input.shift()!)

    // remove next empty line
    input.shift()

    const conversion_maps = input.join('\n').split('\n\n').map(group => group.split('\n'))

    /**
     * According to the data, the almanac that tells us how to translate the seeds is already in order
     * so we can just loop over the data and apply everything in order, no need to search for specific
     * conversion tables or any of that nonsense
     */
    const converted_seeds = conversion_maps
        .reduce((seeds, conversion_map: string[]) => {
            return seeds.map((seed: number) => {
                // apply conversion to seed
                for (const map of conversion_map) {

                    // ignore the name of the map
                    if (map[0].match(/\D/)) {
                        continue
                    }

                    // check if seed is in this mapping
                    const [destStart, sourceStart, length] = map.split(' ').map(Number)

                    if (seed >= sourceStart && seed <= sourceStart + length - 1) {
                        // return the mapped value
                        return destStart + seed - sourceStart
                    }
                }

                // if we didn't map the seed, return its current value
                return seed
            })
        }, seeds)

    return converted_seeds.sort((a: number, b: number) => a - b)[0]
}

/**
 * This is awful stuff.  Using Worker threads, I send each "set" of seeds off to be processed.
 * This resulted in over 3 hours of executing time to come to the answer.
 *
 * DO NOT RUN THIS CODE 😅
 */
const part2 = async () => {
    const input = readfile('./data/5')

    const seed_ranges = get_seed_ranges(input.shift()!)

    // remove next empty line
    input.shift()

    const conversion_maps = input
        .join('\n')
        .split('\n\n')
        .map((group: string) => group
            .split('\n')
            .filter((line: string) => line && line[0].match(/\d/))
        )


    const promises: Promise<number>[] = []
    for (const seed_range of seed_ranges) {

            promises.push(new Promise(
                (resolve: (value: number) => void) => {
                    const seed_worker = new Worker(new URL("day05_worker", import.meta.url).href)

                    seed_worker.postMessage({seed_range, conversion_maps})
                    seed_worker.onmessage = event => {
                        console.log('set', id, 'finished processing, lowest:', event.data)
                        resolve(event.data)
                        seed_worker.terminate()
                    }
                }
            ))
    }

    return Math.min(...await Promise.all(promises))
}

console.log(part2())
