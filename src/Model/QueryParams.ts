import type { TablePaginationConfig } from 'antd/lib/table';
import type { SorterResult } from 'antd/lib/table/interface';

export default interface queryParams {
  search?: string;
  page?: number;
  sorter?: SorterResult<any> | SorterResult<any>[];
  total?: number;
  sortField?: string;
  sortOrder?: string;
  withSets?: boolean;
}