import React, { useEffect, useContext } from "react";
import { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { Container, Moviment } from "./styles.js";
import ColorSelector from "react-color-selector";
import {
  FaArrowDown,
  FaArrowRight,
  FaArrowUp,
  FaArrowLeft,
} from "react-icons/fa";
import AreaContext from "../Area/context";

function Item({ data, index }) {
  const ref = useRef();
  const { move } = useContext(AreaContext);

  const [displayProps, setDisplayProps] = useState(false);
  const [fontSize, setFontSize] = useState("18");
  const [rangeMoviment, setRangeMoviment] = useState(5);

  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { id: data.id, top: data.top, left: data.left, cor: data.cor, texto: data.texto, children: data.children },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragRef(ref);

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
      id: data.id,
      top: topPosition + "px",
      left: leftPosition + "px",
      cor : pickedColor,
      texto: data.texto,
    };

    // console.log(newData);

    move(newData);
  };

  const handleKeyDown = (event) => {
    console.log(event);
    console.log(event.keyCode);
  };

  let [myColor, pickedColor] = useState(data.cor);
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

  // useEffect(() => {
  //   console.log(pickedColor)
  // }, [pickedColor])

  return (
    <Container
      ref={ref}
      isDragging={isDragging}
      onKeyDown={(e) => handleKeyDown(e)}
      style={{
        position: "absolute",
        left: data.left,
        top: data.top,
        color: myColor,
        border: 0,
        fontSize: fontSize >= 10 ? fontSize + "px" : "16px",
      }}
    >
      <div
        
        onClick={() => setDisplayProps(!displayProps)}
        onKeyDown={(e) => handleKeyDown(e)}
      >
         { data.children ? data.children : `${data.texto}`}
      </div>
      {displayProps && (
        <div>
          <ul>
            <li>
              <div key={index}>
                <label htmlFor="fontsize">Fonte Size:</label>
                <input
                  id="fontsize"
                  type="text"
                  onChange={(e) => setFontSize(e.target.value)}
                  value={fontSize}
                ></input>
              </div>
            </li>
            <li>
              <div>
                <ColorSelector
                  pallet={picker_data}
                  selectedColor={pickedColor}
                />
              </div>
            </li>
          </ul>
          <Moviment>
            <div>
              <div></div>
              <div>
                <FaArrowLeft onClick={() => handleMoviment("left")} />
              </div>
              <div></div>
            </div>
            <div>
              <div onClick={() => handleMoviment("up")}>
                <FaArrowUp />
              </div>
              <div>
                <input
                  type="text"
                  name="range"
                  id="idrange"
                  value={rangeMoviment}
                  onChange={(e) => setRangeMoviment(e.target.value)}
                />
              </div>
              <div>
                <FaArrowDown onClick={() => handleMoviment("down")} />
              </div>
            </div>
            <div>
              <div></div>
              <div>
                <FaArrowRight onClick={() => handleMoviment("right")} />
              </div>
              <div></div>
            </div>
          </Moviment>
        </div>
      )}
    </Container>
  );
}

export default Item;
