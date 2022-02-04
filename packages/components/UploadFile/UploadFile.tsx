import React, { useState } from 'react';
import { CustomInput, FormGroup, Label, Container } from 'reactstrap';

type Props = {
  setUploadedImage(params: { imageFile: File; imageLocalSrc: string | ArrayBuffer | null }): void;
};
export const UploadFile: React.FC<Props> = ({ setUploadedImage }) => {
  const [imageFile, setImageFile] = useState<File>();

  const handleFileChange = ({ target }: { target: HTMLInputElement & EventTarget }) => {
    const file = target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFile(file);
      setUploadedImage({ imageFile: file, imageLocalSrc: reader?.result });
    };
    reader.readAsDataURL(file);
  };
  return (
    <Container>
      <FormGroup>
        <Label for="exampleCustomFileBrowser">File Browser</Label>
        <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" onChange={handleFileChange} />
      </FormGroup>
    </Container>
  );
};
