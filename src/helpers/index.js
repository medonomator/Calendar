export const customChunk = (array, count) => {
  const array1 = [];
  const array2 = [];
  const array3 = [];
  const array4 = [];
  const array5 = [];
  const array6 = [];
  const array7 = [];

  array.forEach((item, i) => {
    if (i === 0 || i === 7 || i === 14 || i === 21 || i === 28) {
      array1.push(item);
    }
    if (i === 1 || i === 8 || i === 15 || i === 22 || i === 29) {
      array2.push(item);
    }
    if (i === 2 || i === 9 || i === 16 || i === 23 || i === 30) {
      array3.push(item);
    }
    if (i === 3 || i === 10 || i === 17 || i === 24 || i === 31) {
      array4.push(item);
    }
    if (i === 4 || i === 11 || i === 18 || i === 25 || i === 32) {
      array5.push(item);
    }
    if (i === 5 || i === 12 || i === 19 || i === 26 || i === 33) {
      array6.push(item);
    }
    if (i === 6 || i === 13 || i === 20 || i === 27 || i === 34) {
      array7.push(item);
    }
  });

  return [array1, array2, array3, array4, array5, array6, array7];
};

export const getRandomString = () => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 12);
};
