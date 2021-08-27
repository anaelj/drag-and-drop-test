import React, { useState, useContext } from "react";
import { MdSettings } from "react-icons/md";
import ItemSettings from "../ItemSettings";
import { ContainerTextList, TextItem } from "./styles.js";
import createContext from "../Area/context.js";

export default function TextList({ textItens, changebackGroundColor }) {
  const [showSettings, setShowSettings] = useState(false);
  const { selectedItem, setSelectedItem } = useContext(createContext);

  return (
    <ContainerTextList>
      {textItens.map(
        (item) =>
          item.texto &&
          item.texto.toString().trim() && (
            <li key={item.id}>
              <TextItem>
                <div>
                  <button
                    style={{ marginRight: "5px" }}
                    key={item.id}
                    onClick={() => {
                      setShowSettings(!showSettings);
                      setSelectedItem(item);
                    }}
                    >
                    <MdSettings size={24} color="#c2c2c2" />{" "}
                  </button>
                  <span>{item.texto}</span>
                </div>
                {item.id === selectedItem.id && showSettings && (
                  <div>
                    {" "}
                    <ItemSettings data={item} />{" "}
                  </div>
                )}
              </TextItem>
            </li>
          )
      )}
    </ContainerTextList>
  );
}
