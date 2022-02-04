import {
  ActionMenu, InputSearch, IonIcon, LoButton, LoDataTable
} from '@lolab/components';
import {
  ButtonGroup, DropdownItem, DropdownMenu
} from 'reactstrap';
import { useUserBusiness } from '@lolab/database/useUserBusiness';
import { useUserData } from '@lolab/database';
import tableColumns from './coulmns';
import { CreateNewBusiness } from '@lolab/business-table/CreateNewBusiness';
import { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoCrmProps {}

const data = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988'
  },
  {
    id: 2,
    title: 'Ghostwriters',
    year: '1984'
  }
];

export const LoCrm = ({}: LoCrmProps): JSX.Element => {
  const [
    createNewModalopen,
    setCreateNewModalopen
  ] = useState<boolean>(false);
  const { userData } = useUserData();
  const {
    usersBusinessData, loadingUsersData
  } = useUserBusiness();
  console.log('UserData', userData, '😂🌱', usersBusinessData);

  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true
    },
    {
      name: 'Year',
      selector: (row) => row.year,
      sortable: true
    },
    {
      name: 'action',
      // eslint-disable-next-line react/display-name
      cell: () => {
        return (
          <ActionMenu
            direction="right"
            icon="ellipsis-vertical-outline"
            actions={[
              {
                id: '1',
                icon: 'duplicate-outline',
                label: 'Duplicate'
              },
              {
                id: '2',
                icon: 'trash-outline',
                label: 'Delete'
              },
              {
                id: '3',
                icon: 'download-outline',
                label: 'Export in CSV'
              }
            ]}
            context={undefined}
          ></ActionMenu>
        );
      },

      sortable: false
    }
  ];

  const toggleVisible = () => {
   
    setCreateNewModalopen(!createNewModalopen);
  };
  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center ">
        <CreateNewBusiness
          isOpen={createNewModalopen}
          toggle={toggleVisible}
        />
        <div className="d-flex align-items-center">
          <LoButton
            onClick={toggleVisible}
            icon="add-outline"
            size="sm"
            className="mr-4"
          />
          <InputSearch
            name="Search"
            size="sm"
            onChange={(e) => {
              console.log(e);
            }}
            onSearch={(e) => {
              console.log(e);
            }}
            onClear={(e) => {
              console.log(e);
            }}
          />
          <IonIcon
            name="options-outline"
            fontSize={'20px'}
          />
        </div>
        <ButtonGroup className="mb-1">
          <LoButton size="sm">Duplicate</LoButton>
          <LoButton size="sm">Delete</LoButton>
          <LoButton size="sm">Export</LoButton>
        </ButtonGroup>
      </div>
      <LoDataTable
        columns={columns}
        data={data}
        selectableRows
        defaultSortFieldId={1}
      />
    </>
  );
};
