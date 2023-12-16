import { readfile } from './readfile'
import { first } from './utils'

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

type ConversionMap = {
    from: string;
    to: string;
    conversations: Conversion[];
}


const get_seeds = (line: string): number[] => {
    return line.split(': ')[1].split(' ').map(Number)
}

const get_seed_from_ranges = (line: string): object[] => {
    const ranges = get_seeds(line)

    const seeds: object[] = []

    // get groups of 2 for the seeds, then explode them into a list of seeds
    for (let i = 0; i < ranges.length; i += 2) {
        seeds.push({
            rangeStart: ranges[i],
            rangeLength: ranges[i+1],
        })
    }

    return seeds
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



const part2 = () => {
    const input = readfile('./data/5')

    const seeds = get_seed_from_ranges(input.shift()!)
    return seeds

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

console.log(part2())
