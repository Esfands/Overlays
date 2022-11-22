/* eslint-disable prettier/prettier */

import { formatCurrency } from "./formatters";

const getRandomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

export const getOutcomeText = (
  winnerName: string,
  winnerAmt: number,
  loserName: string,
  loserAmt: number,
) => {
  const formattedWinnerAmt = formatCurrency(winnerAmt);
  const formattedLoserAmt = formatCurrency(loserAmt);

  const winnerText = getRandomElement([
    `Luck hits "${winnerName}" with a massive ${formattedWinnerAmt} Ret Coin win.`,
    `Twitch local "${winnerName}" wins ${formattedWinnerAmt} Ret Coin at the tables.`,
    `Chatter "${winnerName}" scrapes up ${formattedWinnerAmt} Ret Coin at the tables.`,
    `Chatter "${winnerName}" leads the believers with ${formattedWinnerAmt} Ret Coin in total winnings.`,
  ]);

  const loserText = getRandomElement([
    `Shameless: Twitch user "${loserName}" burns ${formattedLoserAmt} Ret Coin on unlikely bet.`,
    `Shameless gambler "${loserName}" sells their house to throw away ${formattedLoserAmt} Ret Coin.`,
    `Gambling addict "${loserName}" absolutely blows it with a loss of ${formattedLoserAmt} Ret Coin.`,
    `Shameless bettor "${loserName}" forks over ${formattedLoserAmt} Ret Coin for a wildly misplaced gamble.`,
  ]);

  return `${winnerText} ${loserText}`;
};

export const getRefundText = (total: number) => {
  const formattedTotal = formatCurrency(total);

  return getRandomElement([
    `Up and coming Twitch streamer Esfand "Sukhbeer" TV admits to scamming viewers out of ${formattedTotal} Ret Coin. Refunds to follow shortly.`,
    `Local Iranian male (5'6", long black hair) last seen robbing a bank with ${formattedTotal} Ret Coin. Likely wearing a black t-shirt and red shorts.`,
    `Short, dark-haired male closely resembling Lord Farquad from the movie series Shrek seen quiety stealing ${formattedTotal} Ret Coin from Twitch viewers.`
  ]);
};
