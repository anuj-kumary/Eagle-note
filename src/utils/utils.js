export const searchFilter = (data, keyword) => {
  if (keyword === '') return data;
  return data.filter((el) =>
    el.tag.toLowerCase().startsWith(keyword.toLowerCase())
  );
};

export const sortByDate = (data, keyword) => {
  if (keyword === 'newDate') {
    return data.sort((a, b) => a.compareTime - b.compareTime);
  }
  return data.sort((a, b) => b.compareTime - a.compareTime);
};
