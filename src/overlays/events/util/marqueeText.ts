import { formatCurrency } from './formatters';

const winnerTemplates = [
  'Luck hits "{name}" with a massive {amount} Ret Coin win.',
  'Twitch local "{name}" wins {amount} Ret Coin at the tables.',
  'Chatter "{name}" scrapes up {amount} Ret Coin at the tables.',
  'Chatter "{name}" leads the believers with {amount} Ret Coin in total winnings.',
];

const loserTemplates = [
  'Shameless: Twitch user "{name}" burns {amount} Ret Coin on unlikely bet.',
  'Shameless gambler "{name}" sells their house to throw away {amount} Ret Coin.',
  'Gambling addict "{name}" absolutely blows it with a loss of {amount} Ret Coin.',
  'Shameless bettor "{name}" forks over {amount} Ret Coin for a wildly misplaced gamble.',
];

const refundTemplates = [
  'Up and coming Twitch streamer Esfand "Sukhbeer" TV admits to scamming viewers out of {total} Ret Coin. Refunds to follow shortly.',
  'Local Iranian male (5\'4", long black hair) last seen robbing a bank with {total} Ret Coin. Likely wearing a black t-shirt and red shorts.',
  'Short, dark-haired male closely resembling Lord Farquad from the "Shrek" movie series seen quietly stealing {total} Ret Coin from Twitch viewers.',
];

const getRandomText = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export const getOutcomeText = (
  winnerName: string,
  winnerAmount: number,
  loserName: string,
  loserAmount: number,
) => {
  const formattedWinnerAmount = formatCurrency(winnerAmount);
  const formattedLoserAmount = formatCurrency(loserAmount);

  const winnerText = getRandomText(winnerTemplates)
    .replace(/\{name\}/g, winnerName)
    .replace(/\{amount\}/g, formattedWinnerAmount);
  const loserText = getRandomText(loserTemplates)
    .replace(/\{name\}/g, loserName)
    .replace(/\{amount\}/g, formattedLoserAmount);

  return `${winnerText} ${loserText}`;
};

export const getRefundText = (total: number) => {
  const formattedTotal = formatCurrency(total);

  return getRandomText(refundTemplates).replace(/\{total\}/g, formattedTotal);
};
