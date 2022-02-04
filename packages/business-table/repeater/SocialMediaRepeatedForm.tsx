import { useState } from 'react';
import Repeater from './index';
import {
  Row, Col, Input, Button, FormGroup
} from 'reactstrap';
import { LoButton } from '@lolab/components';

const SocialMediaRepeatedForm = () => {
  const [
    count,
    setCount
  ] = useState(1);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const deleteForm = (e) => {
    e.preventDefault();
    setCount(count - 1);
  };

  return (
    <Col className="justify-content-between align-items-center">
      <Repeater
        count={count}
        tag="div"
        className="row"
      >
        {(i: any) => (
          <>
            <Col
              sm={6}
              className="d-flex my-1"
            >
              <Input placeholder="Link" />
              <Button
                color="danger"
                onClick={deleteForm}
                outline
              >
                <span>Delete</span>
              </Button>
            </Col>
            {(i + 1 === count || 1 == +0) && (
              <Col
                sm={6}
                className="pe-0"
              >
                <LoButton
                  onClick={increaseCount}
                  icon="add-outline"
                  className="w-100"
                  size="lg"
                  color="neutral"
                  iconColor="#000000"
                />
              </Col>
            )}
          </>
        )}
      </Repeater>
    </Col>
  );
};

export default SocialMediaRepeatedForm;
