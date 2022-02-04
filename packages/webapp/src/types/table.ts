import { TableColumn } from 'react-data-table-component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LoTableColum = TableColumn<any> & { id: string; omit: boolean; selector: string; };
