export const formatDecimal = (num) =>
  num % 1 > 0 ? parseFloat(num).toFixed(2) : num;

export const formatNumber = (num) => {
  const isDecimal = num % 1 > 0;
  const isSingleDigit = Math.round(num) < 10;

  return isSingleDigit && isDecimal ? formatDecimal(num) : Math.round(num);
};

export const formatShortNumber = (num) => {
  if (num > 999999) {
    return formatNumber(num / 1000000) + 'M';
  } else if (num > 999) {
    return formatNumber(num / 1000) + 'K';
  } else {
    return num;
  }
};

export const formatPercentage = (part, whole) =>
  `${part && whole ? Math.round((part / whole) * 100) : 0}%`;

export const formatSeconds = (seconds) =>
  (Math.round(seconds) % 60)?.toString().padStart(2, '0');

export const formatTimer = (minutes, seconds) =>
  `${minutes}:${formatSeconds(seconds)}`;
