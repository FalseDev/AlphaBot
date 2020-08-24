export const processSearchInput = (parts: string[]) => {
  let perPage = +parts[parts.length - 2];
  let page = +parts[parts.length - 1];
  let control = 2; // Number of parts that don't belong to the search term

  if (Number.isNaN(page)) {
    control--;
    page = 1;
  }
  if (Number.isNaN(perPage)) {
    control--;
    perPage = 5;
  }
  const searchTerm = parts.slice(0, parts.length - control).join(" ");

  return { searchTerm, page, perPage };
};

export const processIDFindInput = (parts: string[]) => {
  const id = +parts[0];
  if (Number.isNaN(id)) return false;
  return id;
};
