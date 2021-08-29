import React, { useState, useContext } from "react";
import ItemSettings from "../ItemSettings";
import { ContainerTextList, TextItem } from "./styles.js";
import createContext from "../Area/context.js";
import { MdSettings } from "react-icons/md";

export default function TextList({ textItens }) {
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
                    <MdSettings size={24} color={showSettings && item.id === selectedItem.id ? "gray" : "green"} />{" "}
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
