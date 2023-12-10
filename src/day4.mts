import { readfile } from './readfile.mjs'

const input = [
    'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
    'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
    'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
    'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
    'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
    'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'
]

type Scratchcard = {
    name: string,
    winningNumbers: number[],
    myNumbers: number[],
    matches: number[],
    score: number,
}

const scratchcard_from_line = (line: string): Scratchcard => {
    const [name, numbers] = line.split(':').map(part => part.trim())
    const [winningNumbers, myNumbers] = numbers
        .split('|')
        .map(numberSet => numberSet
            .split(' ')
            .map(number => Number(number.trim()))
            .filter((n: number) => n != 0)
        )
    const matches = myNumbers.filter(num => winningNumbers.includes(num))

    return {
        name,
        winningNumbers,
        myNumbers,
        matches,
    }
}

const part1 = () => {
    const input = readfile('./data/4')

    return input
        .map((line: string): number => {
            const scratchcard = scratchcard_from_line(line)
            return Math.floor(Math.pow(2, scratchcard.matches.length - 1))
        })
        .reduce((acc: number, cur: number) => acc + cur, 0)
}

const part2 = () => {
    const input = readfile('./data/4')
    const scratchcards: number[] = []

    // populate the scratchcardMap
    input.forEach((line, index) => {
        scratchcards.push(1)
    })

    input.forEach((line, index) => {
        const scratchcard = scratchcard_from_line(line)

        const cards_to_copy = scratchcard.matches.length

        for (let cards = 0; cards < scratchcards[index]; cards++) {
            for (let i = 1; i <= cards_to_copy; i++) {
                if (scratchcards.length < index + i) {
                    break
                }
                scratchcards[index+i]++
            }
        }
    })

    return scratchcards.reduce((acc,cur) => acc + cur, 0)
}

console.log(part2())