export const formatDecimal = (num) =>
  num % 1 > 0 ? parseFloat(num).toFixed(2) : num;

export const formatPercentage = (part, whole) =>
  `${part && whole ? Math.round((part / whole) * 100) : 0}%`;

export const formatSeconds = (seconds) =>
  (seconds % 60)?.toString().padStart(2, '0');

export const formatTimer = (active, minutes, seconds) =>
  active ? `${minutes}:${formatSeconds(seconds)}` : 'CLOSED';
