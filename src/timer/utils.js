import { Penalties } from 'results/actions';

export const parseTime = (time) => {
  let seconds = time / 1000;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  return { minutes, seconds };
};

export const formatElapsedTime = (time, precision) => {
  const parsedTime = parseTime(time);
  const seconds = parsedTime.seconds.toFixed(precision);
  return parsedTime.minutes ? `${parsedTime.minutes}:${seconds}` : seconds;
};

export const formatResult = (result) => {
  const time = formatElapsedTime(result.time, 2);

  if (result.penalty === Penalties.DNF) {
    return `${time} - DNF`;
  } else if (result.penalty === Penalties.PLUS_TWO) {
    return `${time} + 2 = ${formatElapsedTime(result.time + 2000, 2)}`;
  }

  return time;
};
