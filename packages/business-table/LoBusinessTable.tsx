import { delay } from '@app/helpers';
import { InputSearch, IonIcon, LoButton, LoDataTable } from '@lolab/components';
import { useUser } from '@lolab/database';
import { useState } from 'react';
import { ButtonGroup, CardBody, CardFooter, Col, Container, Modal, Row } from 'reactstrap';

export interface LoCrmProps {}
const columns = [
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
];

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
  },
];

export const LoCrm = ({}: LoCrmProps): JSX.Element => {
  const { user } = useUser({ debug: { caller: 'LoCrm' } }); // this is a custom hook, in case you need it
  console.log('0-0-0-', user);
  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center ">
        <div className="d-flex align-items-center">
          <LoButton icon="add-outline" size="sm" />
          <InputSearch
            name="Search"
            size="sm"
            onChange={(e) => {
              console.log(e);
            }}
          />
          <IonIcon name="options-outline" fontSize={'20px'} />
        </div>
        <ButtonGroup className="mb-1">
          <LoButton size="sm">Duplicate</LoButton>
          <LoButton size="sm">Delete</LoButton>
          <LoButton size="sm">Export</LoButton>
        </ButtonGroup>
      </div>
      <LoDataTable columns={columns} data={data} selectableRows defaultSortFieldId={1} />
    </>
  );
  return <h1>This it the component for business Table</h1>;
};
