import React, { useState, useContext } from "react";
import ItemSettings from "../ItemSettings";
import { ContainerTextList, TextItem } from "./styles.js";
import createContext from "../Area/context.js";
import { MdSettings, MdTextFields } from "react-icons/md";
import { Preview } from "./../FileList/styles";

export default function TextList({ textItens }) {
  const [showSettings, setShowSettings] = useState(false);
  const { selectedItem, setSelectedItem } = useContext(createContext);

  return (
    <ContainerTextList>
      {textItens.map(
        (item, idx) =>
          item.texto &&
          item.texto.toString().trim() && (
            <li key={idx} onClick={() => setSelectedItem(item)}>
              <TextItem selected={item.id === selectedItem.id ? true : false}>
                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    style={{ marginRight: "5px" }}
                    key={item.id}
                    onClick={() => {
                      setShowSettings(!showSettings);
                      setSelectedItem(item);
                    }}
                  >
                    <MdSettings
                      size={24}
                      color={
                        showSettings && item.id === selectedItem.id
                          ? "gray"
                          : "green"
                      }
                    />{" "}
                  </button>
                  {!item.children && <MdTextFields size="35" />}
                  {item.children && <Preview src={item.children.props.src} />}
                  <span style={{ marginLeft: "15px" }}>
                    {item.texto}
                    {/* <input
                      type="text"
                      value={item.texto}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          texto: e.target.value,
                        })
                      }
                      readOnly={item.children ? true : false}
                    /> */}
                  </span>
                </div>
              </TextItem>
              {item.id === selectedItem.id && showSettings && (
                <div>
                  {" "}
                  <ItemSettings data={item} />{" "}
                </div>
              )}
            </li>
          )
      )}
    </ContainerTextList>
  );
}
