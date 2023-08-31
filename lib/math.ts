export const average = (...args: number[]) => {
  let sum = 0;

  for (const value of args) {
    sum += value;
  }

  const result = sum / args.length;

  return Number(result.toFixed(2));
};
