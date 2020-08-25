interface pageInfo {
  total: number;
  currentPage: number;
  lastPage?: number;
  hasNextPage?: Boolean;
  perPage: number;
}

export default pageInfo;
