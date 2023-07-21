import { formatCurrency } from './formatters';

const winner = {
  names: ['Chatter "{name}"', 'Twitch local "{name}"', 'Gambling addict "{name}"'],
  actions: [
    'wins {amount} Ret Coin at the tables',
    'scrapes up {amount} Ret Coin at the tables',
    'strikes gold with a massive {amount} Ret Coin win',
    'cleans up the tables and takes home {amount} Ret Coin',
    'leads the winners with {amount} Ret Coin in total winnings',
  ],
};

const loser = {
  names: [
    'Chatter "{name}"',
    'Twitch local "{name}"',
    'Gambling addict "{name}"',
    'Shameless gambler "{name}"',
  ],
  actions: [
    'burns {amount} Ret Coin on highly unlikely bet',
    'absolutely blows it with a loss of {amount} Ret Coin',
    'leads the losers with {amount} Ret Coin in total losses',
    'mortgages their house to cover a {amount} Ret Coin loss',
    'forks over {amount} Ret Coin for a wildly misplaced gamble',
  ],
};

const refundTemplates = [
  'High stakes bet suddenly falls through with no outcome. {amount} Ret Coin nowhere to be seen. Are mods to blame?',
  'Short, dark-haired male closely resembling Lord Farquad from the Shrek movie series suspected of stealing {total} Ret Coin from viewers.',
  'Local Iranian male (5\'4", long black hair) last seen robbing a bank with {total} Ret Coin. Likely wearing a black t-shirt and red shorts.',
  'Up and coming Twitch streamer Esfand "Sukhbeer" TV admits to scamming viewers out of a whopping {total} Ret Coin. Refunds to follow shortly.',
];

const getRandomText = (arr: string[], str: string, val: string) => {
  const text = arr[Math.floor(Math.random() * arr.length)];
  return text.replace(`{${str}}`, val);
};

export const getOutcomeText = (
  winnerName: string,
  winnerAmount: number,
  loserName: string,
  loserAmount: number,
) => {
  const formattedWinnerAmount = formatCurrency(winnerAmount);
  const winnerText1 = getRandomText(winner.names, 'name', winnerName);
  const winnerText2 = getRandomText(winner.actions, 'amount', formattedWinnerAmount);
  const winnerTextFinal = `${winnerText1} ${winnerText2}.`;

  const formattedLoserAmount = formatCurrency(loserAmount);
  const loserText1 = getRandomText(loser.names, 'name', loserName);
  const loserText2 = getRandomText(loser.actions, 'amount', formattedLoserAmount);
  const loserTextFinal = `${loserText1} ${loserText2}.`;

  return `${winnerTextFinal} ${loserTextFinal}`;
};

export const getRefundText = (total: number) => {
  const formattedTotal = formatCurrency(total);
  return getRandomText(refundTemplates, 'total', formattedTotal);
};
