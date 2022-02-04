import { delay } from '@app/helpers';
import SocialMediaRepeatedForm from './repeater/SocialMediaRepeatedForm';
import {
  CustomInputField, InputRadio, InputSearch, LoSelect
} from '@lolab/components';
import {
  useEffect, useState
} from 'react';
import {
  CardFooter, Col, Container, CustomInput, FormGroup, Input, Modal, Row
} from 'reactstrap';

export interface CreateNewBusinessProps {
  isOpen: boolean;
  toggle: () => void;
}

export const CreateNewBusiness = ({
  isOpen, toggle
}: CreateNewBusinessProps): JSX.Element => {
  return (
    <Modal
      centered={true}
      isOpen={isOpen}
      toggle={toggle}
      size="xl"
    >
      <Container
        fluid
        className="px-5 py-5 "
      >
        <Row className="">
          <Col>
            <h1 className="mb-2 text-center">Create business</h1>
            <p className="text-xs text-center">Here below add all the info about your contact</p>
          </Col>
        </Row>
        <h2 className="text-md  ">Business Information</h2>
        <Row>
          <Col sm="6">
            <Row>
              <Col sm="4">Image</Col>
              <Col sm="8">
                <FormGroup>
                  <div className="d-flex flex-column align-items-start ">
                    <label className="m-0 me-3 mx-2 text-secondary pb-1 ">Type of contact</label>
                    <div className="d-flex">
                      <InputRadio
                        className="mr-2"
                        labelSize="sm"
                        checked={true}
                      >
                        Client
                      </InputRadio>
                      <InputRadio
                        checked={false}
                        labelSize="sm"
                      >
                        Supplier
                      </InputRadio>
                    </div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Input placeholder="Company Name" />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Input placeholder="Phone Number" />
            </FormGroup>
            <FormGroup>
              <LoSelect
                onChange={(e) => {
                  console.log(e);
                }}
                placeholder="Timezone"
                options={[
                  {
                    weights: [
                      '400'
                    ],
                    value: 'ocean',
                    label: 'Ocean',
                    color: '#00B8D9'
                  },
                  {
                    value: 'slate',
                    weights: [
                      '400'
                    ],
                    label: 'Slate',
                    color: '#253858'
                  }
                ]}
              />
            </FormGroup>
            <FormGroup>
              <InputSearch
                placeholder="Tags"
                onChange={() => {}}
                name={'Tags'}
                onSearch={(val) => {}}
                onClear={function (val) {}}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Input placeholder="Website" />
            </FormGroup>
            <FormGroup>
              <Input placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Input placeholder="VAT ID" />
            </FormGroup>
            <FormGroup>
              <Input placeholder="Registration number" />
            </FormGroup>
            <FormGroup>
              <Input placeholder="Linked People" />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-2 justify-content-end">
          <a
            href="#"
            className="p"
          >
            What is Linked People?
          </a>
        </Row>
        <h2 className="text-md  text-start ">Billing Address</h2>
        <Row>
          <Col sm="6">
            <FormGroup>
              <Input placeholder="Billing address line 1" />
            </FormGroup>
            <FormGroup>
              <Input placeholder="City" />
            </FormGroup>
            <FormGroup>
              <Input placeholder="City" />
            </FormGroup>
            <FormGroup>
              <InputRadio
                className="mr-2"
                labelSize="sm"
                checked={true}
              >
                Mailing address different from the billing address
              </InputRadio>
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Input placeholder="Billing address line 2" />
            </FormGroup>
            <FormGroup>
              <Input placeholder="State" />
            </FormGroup>
            <FormGroup>
              <Input placeholder="Country" />
            </FormGroup>
          </Col>
        </Row>
        <h2 className="text-md  ">Social media</h2>

        <Row>
          <Col>
            <SocialMediaRepeatedForm />
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};
