export const parseTime = (time) => {
  let seconds = time / 1000;
  const minutes = Math.floor(seconds / 60);
  seconds = (seconds - minutes * 60);
  return { minutes, seconds };
};

export const formatElapsedTime = (time, precision) => {
  const parsedTime = parseTime(time);
  const seconds = parsedTime.seconds.toFixed(precision);
  return parsedTime.minutes ? `${parsedTime.minutes}:${seconds}` : seconds;
}
