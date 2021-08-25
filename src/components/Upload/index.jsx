import React from "react";
import Dropzone from "react-dropzone";

import {
  ContainerUpload,
  ContentUpload,
  DropContainer,
  UploadMessage,
} from "./styles";

function Upload({onUpload}) {

    const renderDragMessaage = (isDragActive, isDragReject) => {

        if (isDragReject) {
            return <UploadMessage type="error"> Arquivo não suportado.</UploadMessage>
        }
        if (isDragActive) {
            return <UploadMessage type="success"> Solte o(s) arquivo(s) aqui.</UploadMessage>
        }

        return <UploadMessage >Clique ou arraste aquivos aqui.</UploadMessage>

    }

  return (
    <ContainerUpload>
      <ContentUpload>
        <Dropzone accept="image/*" onDropAccepted={onUpload}>
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <DropContainer
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              {renderDragMessaage(isDragActive, isDragReject)}
            </DropContainer>
          )}
        </Dropzone>
      </ContentUpload>
    </ContainerUpload>
  );
}

export default Upload;
