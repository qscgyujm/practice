import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import { EditItemProps } from '../ts/EditItem';

type FileUploadProps = Pick<EditItemProps, 'uploadFile'>

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
`;

const FileUpload: React.FC<FileUploadProps> = (props) => {
  console.log(props);
  const { uploadFile } = props;

  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    // @ts-ignore
    const file = e.currentTarget.files[0];
    const fileSize = file && file.size;
    const fileType = file && file.name.slice(-3);

    console.log(file);

    formData.append('file', file);

    if (file) {
      uploadFile(formData);
    }
  };

  return (
    <div>
      <FileInput
        id="file"
        type="file"
        // accept=".pdf, .txt, .ppt"
        onChange={uploadFileHandler}
      />
      <FileLabel
        htmlFor="file"
      >
        <Button
          as="span"
        >
          +
        </Button>
      </FileLabel>
    </div>
  );
};

export default FileUpload;
