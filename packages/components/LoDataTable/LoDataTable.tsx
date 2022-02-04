import dynamic from 'next/dynamic';

export const LoDataTable = dynamic(
  () => import('react-data-table-component'),
  { ssr: false }
);
