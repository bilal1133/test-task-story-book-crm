import { delay } from '@app/helpers';
import SocialMediaRepeatedForm from './repeater/SocialMediaRepeatedForm';
import {
  CustomInputField, InputRadio, InputSearch, LoButton, LoSelect
} from '@lolab/components';
import { useForm } from 'react-hook-form';

import {
  Col, Container, Form, FormGroup, Input, Modal, Row
} from 'reactstrap';

export interface CreateNewBusinessProps {
  isOpen: boolean;
  toggle: () => void;
}
type FormInputs = {
  companyName: string;
  phoneNumber: string;
  timeZone: string;
  tags: string;
  website: string;
  email: string;
  vatId: string;
  registrationNo: string;
  linkedPhone: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  differBillingAddress: boolean;
  socialMedia: {
    provider: string;
    link: string;
  }[];
};

export const CreateNewBusiness = ({
  isOpen, toggle
}: CreateNewBusinessProps): JSX.Element => {
  const {
    control, handleSubmit
  } = useForm<FormInputs>({ defaultValues: { companyName: 'ViralSquare' } });

  const handleFormSubmit = (e) => {
    console.log('Form Submited', e);
  };
  return (
    <Modal
      centered={true}
      isOpen={isOpen}
      toggle={toggle}
      size="xl"
    >
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
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
                    <CustomInputField
                      placeholder="Company Name"
                      control={control}
                      fieldName={'companyName'}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <CustomInputField
                  placeholder="Phone Number"
                  control={control}
                  fieldName={'phoneNumber'}
                />
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
                <CustomInputField
                  placeholder="Website"
                  control={control}
                  fieldName={'website'}
                />
              </FormGroup>
              <FormGroup>
                <CustomInputField
                  placeholder="Email"
                  control={control}
                  fieldName={'email'}
                />
              </FormGroup>
              <FormGroup>
                <CustomInputField
                  placeholder="VAT ID"
                  control={control}
                  fieldName={'vatId'}
                />
              </FormGroup>
              <FormGroup>
                <CustomInputField
                  placeholder="Registration number"
                  control={control}
                  fieldName={'registrationNumber'}
                />
              </FormGroup>
              <FormGroup>
                <CustomInputField
                  placeholder="Linked People"
                  control={control}
                  fieldName={'linkedPeople'}
                />
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
              <CustomInputField
                control={control}
                fieldName={'billingAddressLine1'}
                placeholder="Billing address line 1"
              />
              <CustomInputField
                placeholder="City"
                control={control}
                fieldName="city"
              />
              <Input placeholder="City" />
              <InputRadio
                className="mr-2"
                labelSize="sm"
                checked={true}
              >
                Mailing address different from the billing address
              </InputRadio>
            </Col>
            <Col sm="6">
              <CustomInputField
                control={control}
                fieldName={'billingAddressLine2'}
                placeholder="Billing address line 2"
              />
              <CustomInputField
                control={control}
                fieldName={'state'}
                placeholder="State"
              />

              <CustomInputField
                control={control}
                fieldName={'country'}
                placeholder="Country"
              />
            </Col>
          </Row>
          <h2 className="text-md  ">Social media</h2>

          <Row>
            <Col>
              <SocialMediaRepeatedForm controll={control} />
            </Col>
          </Row>
        </Container>
        <LoButton type="submit">Submit </LoButton>
      </Form>
    </Modal>
  );
};
