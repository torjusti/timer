interface ParsedTime {
  minutes: number;
  seconds: number;
}

/**
 * Take a number of milliseconds and parse it into minutes and seconds.
 */
export const parseTime = (time: number): ParsedTime => {
  const seconds = time / 1000;
  const minutes = Math.floor(seconds / 60);
  return { minutes, seconds: seconds - minutes * 60 };
};

/**
 * Truncate numbers from the end of a number, as per WCA regulations.
 */  
const truncate = (value: number, n: number): string => {
  const truncated = Math.floor(value * Math.pow(10, n)) / Math.pow(10, n);

  // Add zeroes to the number.
  return truncated.toFixed(n);
};

/**
 * Take a number in milliseconds and return it in a readable format.
 */
export const formatElapsedTime = (time: number, precision: number): string => {
  const parsedTime = parseTime(time);
  const seconds = truncate(parsedTime.seconds, precision);
  return parsedTime.minutes ? `${parsedTime.minutes}:${seconds}` : seconds;
};
