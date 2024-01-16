export const findDifference = <T>(arr1: T[], arr2: T[], key: keyof T): T[] => {
  if (arr2.length === 0) {
    return arr1;
  }
  const difference = arr1.filter(
    (item1) => !arr2.some((item2) => item2[key] === item1[key])
  );
  return difference;
};
