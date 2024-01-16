export const filterArrayBySearchString = <T>(
  array: T[],
  key: keyof T,
  searchString: string
): T[] => {
  const regex = new RegExp(searchString, "i"); // 'i' flag for case-insensitive search
  const filteredArray = array.filter((item) => regex.test(`${item[key]}`));
  return filteredArray;
};
