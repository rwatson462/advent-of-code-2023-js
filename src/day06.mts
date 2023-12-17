import { readfile } from './readfile.mjs'

const input = `Time:      7  15   30
Distance:  9  40  200`.split('\n')


const parse_input_line = (line: string) => {
    const [_, ...results] = line
        .split(' ')
        .map(v => v.trim())
        .filter(v => !!v)
        .map(Number)

    return results
}

const parse_input_line_part2 = (line: string) => {
    const [_, ...results] = line
        .split(':')
        .map(v => v.trim())
        .filter(v => !!v)
        .map(v => v.replace(/\D/g, ''))
        .map(Number)

    return results
}

const part1 = () => {
    const input = readfile('./data/6')
    const [times, distances] = input.map(parse_input_line)

    let answer = 1

    for (let i = 0; i < times.length; i++) {
        const time = times[i]
        const current_record = distances[i]

        const my_distances = []
        for (let j = 1; j < time; j++) {
            my_distances.push(j * (time - j))
        }

        my_distances.filter(dist => dist > current_record)
        answer *= my_distances.filter(dist => dist > current_record).length
    }

    return answer
}

const part2 = () => {
    const input = readfile('./data/6')
    const [times, distances] = input.map(parse_input_line_part2)

    let answer = 1

    for (let i = 0; i < times.length; i++) {
        const time = times[i]
        const current_record = distances[i]

        const my_distances = []
        for (let j = 1; j < time; j++) {
            my_distances.push(j * (time - j))
        }

        my_distances.filter(dist => dist > current_record)
        answer *= my_distances.filter(dist => dist > current_record).length
    }

    return answer
}

console.log(part2())