import {readfile} from './readfile';

// const input = [
//     '467..114..',
//     '...*......',
//     '..35..633.',
//     '......#...',
//     '617*......',
//     '.....+.58.',
//     '..592.....',
//     '......755.',
//     '...$.*....',
//     '.664.598..',
// ];

type Coordinate = {
    x: number,
    y: number
};

const coordinate = (x: number, y: number): Coordinate => ({x, y})

const is_digit = (char: string) => !! char.match(/^\d$/)

const is_special_char = (char: string) => !!char.match(/^[^0-9a-z.]$/i)


const is_valid_coordinate = (coord: Coordinate, input: string[]): boolean =>
    coord.x >= 0 && coord.y >= 0 && coord.x < input[0].length && coord.y < input.length

const get_adjacent_cells = (coord: Coordinate, input: string[]): Coordinate[] => {
    const coords: Coordinate[] = [];

    if (is_valid_coordinate(coordinate(coord.x-1, coord.y-1), input)) {
        coords.push(coordinate(coord.x-1, coord.y-1))
    }
    if (is_valid_coordinate(coordinate(coord.x-1, coord.y), input)) {
        coords.push(coordinate(coord.x-1, coord.y))
    }
    if (is_valid_coordinate(coordinate(coord.x-1, coord.y+1), input)) {
        coords.push(coordinate(coord.x-1, coord.y+1))
    }
    if (is_valid_coordinate(coordinate(coord.x, coord.y-1), input)) {
        coords.push(coordinate(coord.x, coord.y-1))
    }
    if (is_valid_coordinate(coordinate(coord.x, coord.y+1), input)) {
        coords.push(coordinate(coord.x, coord.y+1))
    }
    if (is_valid_coordinate(coordinate(coord.x+1, coord.y-1), input)) {
        coords.push(coordinate(coord.x+1, coord.y-1))
    }
    if (is_valid_coordinate(coordinate(coord.x+1, coord.y), input)) {
        coords.push(coordinate(coord.x+1, coord.y))
    }
    if (is_valid_coordinate(coordinate(coord.x+1, coord.y+1), input)) {
        coords.push(coordinate(coord.x+1, coord.y+1))
    }

    return coords
}

const consolidate_coordinates_to_numbers = (numberCoords: Coordinate[], input: string[]): number => {
    // build list of cells around each number in numberCoords
    const cells = numberCoords.map(coordinate => get_adjacent_cells(coordinate, input))
        .reduce((acc, cur) => [...acc, ...cur], [])
        .filter(coord => is_special_char(input[coord.y][coord.x]))

    // if any of the cells contain a special character, this number is one we want to keep
    if (cells.length > 0) {
        // figure out the number and return it
        return Number(numberCoords
            .map(coord => input[coord.y][coord.x])
            .reduce((acc, cur) => acc.concat(cur), '')
        )
    }
    // otherwise return zero
    return 0;
}

const part1 = () => {
    const input: string[] = readfile('./data/3')
    const validNumbers: number[] = []
    const numberCoords: Coordinate[] = []

    input.map((line: string, y: number) => {
        line.split('').map((char, x) => {
            if (! is_digit(char)) {
                if (numberCoords.length > 0) {
                    const number = consolidate_coordinates_to_numbers(numberCoords, input)
                    if (number > 0) {
                        validNumbers.push(number)
                    }
                    while (numberCoords.length > 0) numberCoords.pop()
                }
            } else {
                numberCoords.push(coordinate(x,y))
            }
        })
    })

    return validNumbers.reduce((acc, cur) => acc + cur, 0)
}

console.log(part1())
