import { delay } from '@app/helpers';
import { LoButton } from '@lolab/components';
import { useState } from 'react';
import {
  CardBody,
  CardFooter, Col, Container, Modal, Row
} from 'reactstrap';

export interface LoCrmProps {
  isOpen: boolean;
  toggle: () => void; // we do NOT need to 'toggle' this modal, but this is just an example so I'll keep it here
}

export const LoCrm = ({
  isOpen,
  toggle // we do NOT need to 'toggle' this modal, but this is just an example so I'll keep it here
}: LoCrmProps): JSX.Element => {

  // const { user } = useUser({ debug: { caller: 'LoCrm' } }); // this is a custom hook, in case you need it

  const [
    step,
    setStep
  ] = useState<number>(1);

  const goNextStep = async () => {
    await delay(2); // to simulate network call... use 'updateDocument' function here (see in 'packages/database')
    setStep(prevState => (prevState += 1));
  };

  return (
    <Modal
      centered={true}
      isOpen={isOpen}
      toggle={toggle} // we do NOT need to 'toggle' this modal, but this is just an example so I'll keep it here
      size="xl"
      // backdrop="static"
      // modalClassName="prevent-clickout-close"
    >
      <CardBody>
       modal content here
      </CardBody>
    </Modal>
  );

};
