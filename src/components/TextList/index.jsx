import React, { useEffect, useState } from "react";
import { MdColorLens, MdBrush, MdSettings } from "react-icons/md";
import ColorSelector from "react-color-selector";
import ItemSettings from "../ItemSettings";

import { ContainerTextList, TextItem } from "./styles.js";

export default function TextList({ textItens, changebackGroundColor }) {
  const [idSelected, setIdSelected] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

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
    const temp = { newColor: myColor, id: idSelected };
    changebackGroundColor(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myColor]);

  return (
    <ContainerTextList>
      {textItens.map(
        (item) =>
          item.texto &&
          item.texto.toString().trim() && (
            <li key={item.id}>
              <span>{item.texto}</span>
              <TextItem>
                <button
                  style={{ marginRight: "5px" }}
                  key={item.id}
                  onClick={() => {
                    setShowSettings(!showSettings);
                    setIdSelected(item.id);
                  }}
                >
                  <MdSettings size={24} color="#c2c2c2" />{" "}
                </button>
                {showSettings && <div style={{display: 'block', position: 'absolute', zIndex: '99', left: '10'}}> <ItemSettings data={item} /> </div>}
              </TextItem>
            </li>
          )
      )}
    </ContainerTextList>
  );
}
