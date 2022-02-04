import { ActionMenuItem } from '@lolab/components';

export default [
  {
    name: 'Title',
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: 'Year',
    selector: (row) => row.year,
    sortable: true,
  },
  {
    name: 'action',
    cell: (row, index, column, id) => {
      console.log(row, index, column, id);

      return <ActionMenuItem />;
    },
    sortable: false,
  },
];
