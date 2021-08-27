import React, { useState } from "react";
import {
  MdFormatColorFill,
  MdFormatColorText,
  MdExtension,
  MdFormatSize,
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp,
} from "react-icons/md";
import {
  ContainerItemSettings,
  ToolbarItemSettings,
  ContentItemSettings,
  Moviment,
  FontSetting
} from "./styles";

import ColorSelector from "react-color-selector";

function ItemSettings({ data }) {
  const tools = [
    { name: "backgroundColor", icon: MdFormatColorFill },
    { name: "fontColor", icon: MdFormatColorText },
    { name: "position", icon: MdExtension },
    { name: "fontSize", icon: MdFormatSize },
  ];
  const [toolSelected, setToolSelected] = useState("backgroundColor");

  let [selectedColor, pickedColor] = useState();
  const [rangeMoviment, setRangeMoviment] = useState(5);

  let picker_data = {
    col: 12,
    row: 12,
    width: 300,
    height: 250,
    view: "both",
    theme: "dark",
    title: toolSelected === tools[0].name ? "Fundo" : "Fonte",
    cellControl: 4,
  };

  const handleMoviment = (typeMoviment) => {
    let topPosition = Number(data.top.replace("px", ""));
    let leftPosition = Number(data.left.replace("px", ""));
    switch (typeMoviment) {
      case "up":
        topPosition -= rangeMoviment;
        break;
      case "down":
        topPosition += rangeMoviment;
        break;
      case "left":
        leftPosition -= rangeMoviment;
        break;
      case "right":
        leftPosition += rangeMoviment;
        break;
      default:
        console.log("erro ao mover");
    }
    const newData = {
      id: 0, //data.id,
      top: topPosition + "px",
      left: leftPosition + "px",
      cor: pickedColor,
      texto: data.texto,
    };
    console.log(newData);
    // move(newData);
  };

  const handleGetElement = (tool) => {
    console.log(tool, tools[0].name, tools[1].name);

    switch (tool) {
      case tools[0].name:
      case tools[1].name:
        return (
          <ColorSelector
            pallet={picker_data}
            selectedColor={pickedColor}
            style={{ zIndex: "0" }}
          />
        );
      case tools[2].name:
        return (
          <Moviment>
            <div>
              <div></div>
              <div>
                <MdKeyboardArrowLeft
                  size="45"
                  color="#c2c2c2"
                  onClick={() => handleMoviment("left")}
                />
              </div>
              <div></div>
            </div>
            <div>
              <div>
                <MdKeyboardArrowUp
                  size="45"
                  color="#c2c2c2"
                  onClick={() => handleMoviment("up")}
                />
              </div>
              <div style={{ paddingLeft: "10px", paddingTop: "10px" }}>
                <input
                  type="text"
                  name="range"
                  id="idrange"
                  value={rangeMoviment}
                  onChange={(e) => setRangeMoviment(e.target.value)}
                />
              </div>
              <div>
                <MdKeyboardArrowDown
                  size="45"
                  color="#c2c2c2"
                  onClick={() => handleMoviment("down")}
                />
              </div>
            </div>
            <div>
              <div></div>
              <div>
                <MdKeyboardArrowRight
                  size="45"
                  color="#c2c2c2"
                  onClick={() => handleMoviment("right")}
                />
              </div>
              <div></div>
            </div>
          </Moviment>
        );
      case tools[3].name:
        return (
          <FontSetting>
            <div>
            <label htmlFor="fontStyle">Fonte:</label>
            <input type="text" name="fontStyle" id="fontStyle" />
              </div>  
            <div>
            <label htmlFor="fontSize">Tamanho:</label>
            <input type="number" name="fontSize"  id="fontSize" />
              </div>  
          </FontSetting>
        );

      default:
        break;
    }
  };

  return (
    <ContainerItemSettings>
      <ToolbarItemSettings>
        {tools.map((item, idx) => {
          return (
            <button
              key={idx}
              onClick={() => setToolSelected(item.name)}
              style={{ margin: "5px", border: "0px" }}
            >
              <item.icon
                size="35px"
                color={toolSelected === item.name ? "gray" : "green"}
              />
            </button>
          );
        })}
      </ToolbarItemSettings>
      <ContentItemSettings>
        {handleGetElement(toolSelected)}
      </ContentItemSettings>
    </ContainerItemSettings>
  );
}

export default ItemSettings;
