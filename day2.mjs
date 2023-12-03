import { readfile } from "./readfile.mjs";
import { first, tap } from "./utils.mjs";


const input = [
  'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
  'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
  'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
  'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
  'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
];

function parseGames(gameList) {
  return gameList
    .map(game => {
      const [ gameId, gameDataRaw ] = game.split(':');
      const turnData = gameDataRaw.split(';').map(l => l.trim());
      const gemData = turnData.map(turn => turn
        .split(',').map(l => l.trim())
      ).map(([l]) => l.split(' ')
          .reduce((acc, cur) => tap(acc, (acc) => acc.push(cur)), [])
      ).map(([count, color]) => ({[color]: count}));

      gemData.gameId = gameId;
      return gemData;
    });
}

const thresholds = {
  red: 12,
  green: 13,
  blue: 14,
};

const part1 = () => {
  const games = parseGames(input);

  console.log(first(games));
  
  // const possibleGames = games.map(game => {
  //   // check each turn of the game to see if any of the gem counts exceeds their threshold
  //   return game.reduce(, false);
  // });
}

console.log(part1());