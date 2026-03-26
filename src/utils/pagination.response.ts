export interface PaginationMeta{
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class PaginationResult<T> {
  data: T[];
  meta: PaginationMeta;
  constructor(data: T[], total: number, page: number, limit: number ){
    this.data = data;
    this.meta = {
      page: page,
      limit: limit,
      total: total,
      totalPages: Math.ceil(total / limit)
    }
  }
}