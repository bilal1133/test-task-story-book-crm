import { delay } from '@app/helpers';
import {
  IonIcon,
  LoAvatar, LoButton, LoButtonLink, TransientIndicator
} from '@lolab/components';
import {
  useEffect, useState
} from 'react';
import {
  CardFooter, Col, Container, Modal, Row
} from 'reactstrap';

// BEWARE: all this code that is not the component itself must live in separate file(s)

interface DesktopAppWorkspace {
  id: string;
  name: string;
  selected: boolean;
}

const getWorkspacesFromDB = async (): Promise<Array<DesktopAppWorkspace>> => {
  await delay(2); // only here for demo purposes
  return [
    {
      id: 'some_id_1',
      name: 'Name Workspace 1',
      selected: true
    },
    {
      id: 'some_id_2',
      name: 'Name Workspace 2',
      selected: false
    }
  ];
};

interface UseWorkspacesState {
  loadingWorkspaces: boolean;
  workspaces: Array<DesktopAppWorkspace>;
}

const useWorkspaces = () => {

  const [
    state,
    setState
  ] = useState<UseWorkspacesState>({
    loadingWorkspaces: true,
    workspaces: []
  });

  useEffect(
    () => {
      getWorkspacesFromDB().then(_workspaces => {
        setState(prevState => {
          const newState: UseWorkspacesState = {
            ...prevState,
            loadingWorkspaces: false,
            workspaces: _workspaces
          };
          return newState;
        });
      });
    },
    []
  );

  return state;
};

export interface ModalExampleProps {
  isOpen: boolean;
  toggle: () => void; // we do NOT need to 'toggle' this modal, but this is just an example so I'll keep it here
}

export const ModalExample = ({
  isOpen,
  toggle // we do NOT need to 'toggle' this modal, but this is just an example so I'll keep it here
}: ModalExampleProps): JSX.Element => {

  const {
    workspaces, loadingWorkspaces
  } = useWorkspaces();

  const doSwitch = async () => {
    await delay(2); // only here for demo purposes
    alert('...action...');
  };

  const selectAccount = async () => alert('...action...');

  return (
    <Modal
      centered={true}
      isOpen={isOpen}
      toggle={toggle} // we do NOT need to 'toggle' this modal, but this is just an example so I'll keep it here
      // size="xl"
      backdrop="static"
      modalClassName="prevent-clickout-close"
    >

      <Container
        fluid
        className="px-5 py-5 text-center"
      >
        <Row>
          <Col>
            <h1 className="mb-2">Switch Workspace</h1>
            <p className="text-xs text-secondary mb-5">Select a workspace below or log into a new one</p>
            <TransientIndicator isLoading={loadingWorkspaces}>
              {workspaces.map(_workspace => <>
                <div
                  key={_workspace.id}
                  className="d-flex align-items-center justify-content-center mb-3 cursor-pointer"
                  onClick={selectAccount}
                  role="button"
                  tabIndex={-1}
                >
                  <div className="position-relative">
                    <LoAvatar
                      appearance="CIRCLE"
                      size="xl"
                      imageUrls={[
                        '/img/placeholder-profile-pic.jpg'
                      ]}
                    />
                    {_workspace.selected && (
                      <span className="position-absolute left pt-3 pl-3">
                        <IonIcon
                          name="checkmark-outline"
                          fontSize="3rem"
                          style={{ color: 'white' }}
                        />
                      </span>
                    )}
                  </div>
                  <p className="mb-0 ml-4">{_workspace.name}</p>
                </div>
              </>)}
              <LoButton
                className="mt-5"
                block={true}
                animateResponse={true}
                onClick={doSwitch}
              >Switch</LoButton>
              <LoButtonLink className="mt-3 w-100 justify-content-center text-secondary">
                <span className="text-xs">Login into a new workspace</span>
              </LoButtonLink>
            </TransientIndicator>
          </Col>
        </Row>
      </Container>

      <CardFooter className="text-center p-4">
        <span className="text-secondary text-xs">
          Every time you switch workspace, your saved apps will change.
          <br />
          But don’t worry, they will be back as soon as you switch back.
        </span>
      </CardFooter>

    </Modal>
  );

};
