import { PTableColumn } from './pTableColumn.interface';

export interface TableConfig {
    cols?: PTableColumn[];
    rowsPerPageOptions?: number[];
    totalRecords?: number;
    first?: number;
    isLoading?: boolean;
    rows?: number;
}
