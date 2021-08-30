/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { ContainerFileList, FileInfo, Preview } from "./styles";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { useState, useContext } from 'react';
import createContext from "../Area/context.js";

function FileList({ files }) {
  const [showSettings, setShowSettings] = useState(false);
  const { selectedItem, setSelectedItem } = useContext(createContext);

  return (
    <ContainerFileList>
      {files.map((uploadedFile) => (
        <li key={uploadedFile.id}>
          <FileInfo>
              <button
                    style={{ marginRight: "5px" }}
                    key={uploadedFile.id}
                    onClick={() => {
                      setShowSettings(!showSettings);
                      setSelectedItem(uploadedFile);
                    }}
                    >
                    <MdSettings size={24} color={showSettings && uploadedFile.id === selectedItem.id ? "gray" : "green"} />{" "}
                  </button>
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
