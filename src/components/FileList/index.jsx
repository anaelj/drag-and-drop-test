/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { ContainerFileList, FileInfo, Preview } from "./styles";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

function FileList({ files }) {
  
  return (
    <ContainerFileList>
      {files.map((uploadedFile, idx) => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}
                {!!uploadedFile.url && (
                  <button onClick={() => {}}>Excluir</button>
                )}
              </span>
            </div>
          </FileInfo>
          <div>
            {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: "#c2c2c2" },
                }}
                strokeWidth={10}
                percentage={uploadedFile.progress}
              />
            )}

            {uploadedFile.url && (
              <a href="#" target="_blank" rel="noopener noreferrer">
                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />;
              </a>
            )}
            {uploadedFile.uploaded && (
              <MdCheckCircle size={24} color="#78e5d5" />
            )}
            {uploadedFile.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </ContainerFileList>
  );
}

export default FileList;
