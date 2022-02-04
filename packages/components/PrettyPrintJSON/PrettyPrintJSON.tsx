import { prettyPrintJSON } from '@app/helpers';
import { IonIcon } from '@lolab/components';
import { useState } from 'react';
import { Collapse } from 'reactstrap';

export const PrettyPrintJSON = ({
  text, val
}: { text: string; val: unknown }): JSX.Element => {

  const [
    isOpen,
    setIsOpen
  ] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return <>

    <div
      className="d-flex align-items-center cursor-pointer no-select"
      onClick={toggle}
      tabIndex={-1}
      role="button"
    >
      <IonIcon name={isOpen ? 'chevron-down-outline' : 'chevron-forward-outline'} />
      <span className="ml-1">{text}</span>
    </div>

    <Collapse isOpen={isOpen}>
      <pre>{prettyPrintJSON(val)}</pre>
    </Collapse>

  </>;
};
