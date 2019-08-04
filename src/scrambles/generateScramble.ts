const generateScramble = (scrambler: string) => {
  return (window as any).scramblers[scrambler].getRandomScramble().scramble_string.trim();
};

export default generateScramble;
