/** Fix decimal to two places */
export const formatDecimal = (num: number): number =>
  num % 1 > 0 ? parseFloat(num.toFixed(2)) : num;

/** Fix decimals less than 10, round anything else */
export const formatNumber = (num: number): number => {
  const isDecimal = num % 1 > 0;
  const isSingleDigit = Math.round(num) < 10;

  return isSingleDigit && isDecimal ? formatDecimal(num) : Math.round(num);
};

/** Shorten number and add multiplicity */
export const formatShortNumber = (num: number): string => {
  if (num > 999999) {
    return formatNumber(num / 1000000) + 'M';
  } else if (num > 999) {
    return formatNumber(num / 1000) + 'K';
  } else {
    return num.toString();
  }
};

export const formatCurrency = (num: number): string =>
  Math.round(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatPercentage = (part: number, whole: number): string =>
  whole === 0 ? '0%' : Math.round((part / whole) * 100) + '%';

/** Constrain number to <60 and left-pad with zeroes */
export const formatSeconds = (seconds: number): string =>
  (Math.round(seconds) % 60)?.toString().padStart(2, '0');

/** Format numbers as M:SS */
export const formatTimer = (minutes: number, seconds: number): string =>
  `${minutes}:${formatSeconds(seconds)}`;
