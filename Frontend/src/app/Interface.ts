import { Compound } from './Compound';

export interface ApiResponse {
  totalItems: number;
  compounds: Compound[];
  totalPages: number;
  currentPage: number;
}
