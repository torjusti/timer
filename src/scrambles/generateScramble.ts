const generateScramble = (scrambler: string) => {
  return (<any> window).scramblers[scrambler].getRandomScramble().scramble_string.trim();
};

export default generateScramble;
