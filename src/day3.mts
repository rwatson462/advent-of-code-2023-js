import {readfile} from './readfile'

const input = [
    '467..114..',
    '...*......',
    '..35..633.',
    '......#...',
    '617*....58',
    '.....+....',
    '..592.....',
    '......755.',
    '...$....=.',
    '.664.598..',
]


declare global {
    interface Array<T> {
        clear(): void;
    }
}

Array.prototype.clear = function(): void {
    while (this.length > 0) {
        this.pop()
    }
}

type Coordinate = {
    x: number,
    y: number
}

const coordinate = (x: number, y: number): Coordinate => ({x, y})

const is_digit = (char: string) => !! char.match(/^\d$/)

const is_special_char = (char: string) => !!char.match(/^[^0-9a-z.]$/i)

const is_valid_coordinate = (coord: Coordinate, input: string[]): boolean =>
    coord.x >= 0 && coord.y >= 0 && coord.x < input[0].length && coord.y < input.length

const get_adjacent_cells = (coord: Coordinate, input: string[]): Coordinate[] => {
    const coords: Coordinate[] = [];  // this semi-colon is required

    [-1, 0, 1].forEach(x => {
        [-1, 0, 1].forEach(y => {
            if (is_valid_coordinate(coordinate(coord.x+x, coord.y+y), input)) {
                coords.push(coordinate(coord.x+x, coord.y+y))
            }
        })
    })

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
    return 0
}

const transform_coordinate_list_to_numbers = (input: string[]) => (numberList: number[], coordinatesList: Coordinate[]) => {
    // check if coordinate list has a special character adjacent to and items
    const number = consolidate_coordinates_to_numbers(coordinatesList, input)

    // minor optimisation to only add found numbers to the list we're creating
    if (number > 0) {
        numberList.push(number)
    }

    return numberList
}

const find_number_coords_on_each_line = (numberList: Coordinate[][], line: string, y: number): Coordinate[][] => {
    const numbersFoundOnThisLine: Coordinate[][] = []
    const numberCoords: Coordinate[] = []

    line.split('')
        .forEach((char, x) => {
            if (! is_digit(char)) {
                if (numberCoords.length > 0) {
                    numbersFoundOnThisLine.push([...numberCoords])
                    numberCoords.clear();
                }
            } else {
                numberCoords.push(coordinate(x,y))
            }

            if (x === line.length-1 && numberCoords.length > 0) {
                numbersFoundOnThisLine.push([...numberCoords])
            }
        })

    if (numbersFoundOnThisLine.length > 0) {
        numberList.push(...numbersFoundOnThisLine)
    }

    return numberList
}

const part1 = (): number => {
    const input: string[] = readfile('./data/3')

    return input.reduce(find_number_coords_on_each_line, [])
        .reduce(transform_coordinate_list_to_numbers(input), [])
        .reduce((acc, cur) => acc + cur, 0)
}

console.log(part1())
