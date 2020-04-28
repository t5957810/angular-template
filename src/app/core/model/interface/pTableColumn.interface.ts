export interface PTableColumn {
  field: string;
  header: string;
  width?: string;
  style?: string;
  className?: string;
  endsWith?: string;
  withRowspan?: Boolean;
  isSort?: Boolean;
  subColumns?: string[];
  sortField?: string;
}
