// part 1 example
// const input = [
//     'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
//     'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
//     'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
//     'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
//     'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
// ];

// part 2 example
// const input = [
//     'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
//     'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
//     'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
//     'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
//     'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
// ];

import {readfile} from "./readfile.mjs";

function parseGames(gameList) {
    return gameList
        .map(game => {
            const [gameId, gameDataRaw] = game.split(':');
            const turnData = gameDataRaw.split(';').map(l => l.trim());
            const gemData = turnData
                .map(turn => turn.split(', '))
                .map(turn => turn.map(gem => gem.split(', ')))
                .map(turn => turn.reduce((acc, cur) => {
                    const [count, colour] = cur[0].split(' ');
                    return {...acc, [colour]: Number(count)}
                }, {}));

            return {
                gameId,
                gemData
            };
        });
}

const thresholds = {
    red: 12,
    green: 13,
    blue: 14,
};

const part1 = () => parseGames(readfile('./data/2'))
    .reduce((acc, game) => {
        // check each turn of the game to see if any of the gem counts exceeds their threshold
        const isGameValid = game.gemData.reduce((valid, turn) => valid && Object.keys(thresholds)
                .reduce((isValid, colour) => isValid && (turn[colour] ?? 0) <= thresholds[colour], true)
            , true)

        // if the game is valid, remember it's id
        if (isGameValid) {
            acc.push(game.gameId);
        }

        return acc;
    }, [])
    // remove "game " from all the game ids
    .map(game => game.replace(/\D/g, ''))
    .map(Number)
    .reduce((sum, id) => sum + id, 0)


const part2 = () => parseGames(readfile('./data/2'))
    .reduce((acc, game) => {
        // figure out max value of each colour in each game
        const gameData = game.gemData.reduce((gemData, turn) => {
            Object.keys(turn).forEach(colour => {
                if (gemData[colour] === undefined) {
                    gemData[colour] = 0;
                }

                gemData[colour] = Math.max(turn[colour], gemData[colour])
            });
            return gemData;
        }, {})

        return [
            ...acc,
            {
                gameId: game.gameId,
                colours: gameData,
            }
        ]
    }, [])
    .map(gameData => Object.values(gameData.colours).reduce((sum, cur) => sum * cur, 1))
    .reduce((sum, cur) => sum + cur, 0)

console.log(part2());