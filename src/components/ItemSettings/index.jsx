import React, { useState, useContext, useEffect } from "react";
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
  FontSetting,
} from "./styles";

import createContext from "../Area/context.js";
import { SketchPicker } from "react-color";

function ItemSettings() {
  const { selectedItem, setSelectedItem } = useContext(createContext);
  const [backGroundImage, setBackGroundImage] = useState(
    selectedItem.backGroundImage
  );
  const [position, setPosition] = useState({top: selectedItem.top, left: selectedItem.left});

  const tools = [
    { name: "backgroundColor", icon: MdFormatColorFill },
    { name: "fontColor", icon: MdFormatColorText },
    { name: "position", icon: MdExtension },
    { name: "fontSize", icon: MdFormatSize },
  ];
  const [toolSelected, setToolSelected] = useState("backgroundColor");

  let [selectedColor, pickedColor] = useState();
  const [rangeMoviment, setRangeMoviment] = useState(5);
  const [fontSize, setFontSize] = useState(
    selectedItem?.fontSize.replace("px", "")
  );
  const [fontFamily, setFontFamily] = useState(selectedItem.fontFamily);

  const handleMoviment = (typeMoviment) => {
    let topPosition = Number(selectedItem.top.replace("px", ""));
    let leftPosition = Number(selectedItem.left.replace("px", ""));
    switch (typeMoviment) {
      case "up":
        topPosition -= Number(rangeMoviment);
        break;
      case "down":
        topPosition += Number(rangeMoviment);
        break;
      case "left":
        leftPosition -= Number(rangeMoviment);
        break;
      case "right":
        leftPosition += Number(rangeMoviment);
        break;
      default:
        console.log("erro ao mover");
    }

    // const newItem = {
    //   ...selectedItem,
    //   top: topPosition + "px",
    //   left: leftPosition + "px",
    // };

    // console.log(newItem)
    setPosition({
      top: topPosition + "px",
      left: leftPosition + "px",
    })
  };

  useEffect(() => {
    setSelectedItem({
      ...selectedItem,
      backGroundImage 
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backGroundImage]);

  useEffect(() => {
    setSelectedItem({
      ...selectedItem,
      top: position.top,
      left: position.left,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const handleGetElement = (tool) => {
    // console.log(tool, tools[0].name, tools[1].name);

    switch (tool) {
      case tools[0].name:
      case tools[1].name:
        return (
          // <ColorSelector pallet={picker_data} selectedColor={pickedColor} />
          <SketchPicker
            color={selectedColor}
            onChangeComplete={(color) => pickedColor(color.hex)}
          />
        );
      case tools[2].name:
        return (
          <Moviment>
            <div>
              <button onClick={() => setBackGroundImage(!backGroundImage)}>
                Background
              </button>
            </div>
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
              <select
                id="lang"
                onChange={(e) => setFontFamily(e.target.value)}
                value={fontFamily}
              >
                <option value="Arial">Arial</option>
                <option value='"Times New Roman"'>Times New Roman</option>
                <option value="Roboto">Roboto</option>
                <option value='"Hina Mincho"'>Hina Mincho</option>
              </select>
            </div>
            <div>
              <label htmlFor="fontSize">Tamanho:</label>
              <input
                type="number"
                name="fontSize"
                id="fontSize"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
              />
            </div>
          </FontSetting>
        );

      default:
        break;
    }
  };

  useEffect(() => {
    switch (toolSelected) {
      case tools[0].name:
        const tempItemBackeground = {
          ...selectedItem,
          backgroundColor: selectedColor,
        };
        // console.log(tempItemBackeground);
        setSelectedItem(tempItemBackeground, "1");

        break;
      case tools[1].name:
        const tempItemCor = { ...selectedItem, color: selectedColor };
        setSelectedItem(tempItemCor);
        // console.log(tempItemCor, '2');
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor]);

  useEffect(() => {
    setSelectedItem({ ...selectedItem, fontSize: fontSize + "px" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontSize]);

  useEffect(() => {
    setSelectedItem({ ...selectedItem, fontFamily });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontFamily]);

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
                size="28px"
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
