import { Pizza } from 'src/application/schema/types/schema';

export interface QueryInput {
  cursor: string | null;
  limit: number;
}

export interface Result {
  results: Pizza[];
  cursor: string | null;
  hasNextPage: boolean;
  totalCount: number;
}
