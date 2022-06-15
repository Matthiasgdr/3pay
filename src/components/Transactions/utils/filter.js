export const filter = (array, filter) => {
  const keys = Object.keys(filter);
  const filteredArray = [];
  array.forEach((item) => {
    let isValid = true;
    keys.forEach((key) => {
      if (filter[key] && item[key] !== filter[key]) {
        isValid = false;
      }
    });
    if (isValid) {
      filteredArray.push(item);
    }
  });
  return filteredArray;
};

export default filter;
