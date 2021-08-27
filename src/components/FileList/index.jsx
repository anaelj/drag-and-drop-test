/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { ContainerFileList, FileInfo, Preview } from "./styles";
import { MdCheckCircle, MdError, MdLink, MdColorLens } from "react-icons/md";
import ColorSelector from "react-color-selector";
import { useState } from "react";
import { useEffect } from "react";

function FileList({ files, changebackGroundColor }) {
  const [idElementPaletteColorSelected, setIdElementPaletteColorSelected] =
    useState(-1);

  let [myColor, pickedColor] = useState();
  let picker_data = {
    col: 12,
    row: 12,
    width: 300,
    height: 250,
    view: "both",
    theme: "dark",
    title: "Cores",
    cellControl: 4,
  };

  useEffect(() => {
    const temp = { newColor: myColor, id: idElementPaletteColorSelected };
    changebackGroundColor(temp);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myColor]);

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
            {!uploadedFile.uploaded && (
              <button
                key={idx}
                onClick={() =>
                  setIdElementPaletteColorSelected(
                    idElementPaletteColorSelected === -1 ? uploadedFile.id : -1
                  )
                }
              >
                {" "}
                <MdColorLens size={24} color="black" />{" "}
              </button>
            )}
            {idElementPaletteColorSelected === uploadedFile.id && (
              <div style={{ display: "block", position: "absolute" }}>
                <ColorSelector
                  pallet={picker_data}
                  selectedColor={pickedColor}
                />
              </div>
            )}
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
