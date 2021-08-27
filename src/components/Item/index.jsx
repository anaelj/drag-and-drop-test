import React, { useContext } from "react";
import { useRef } from "react";
import { useDrag } from "react-dnd";
import { Container } from "./styles.js";
import createContext from "../Area/context.js";

function Item() {
  const ref = useRef();

    const { selectedItem } = useContext(createContext);
  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: {
      id: selectedItem.id,
      top: selectedItem.top,
      left: selectedItem.left,
      color: selectedItem.color,
      texto: selectedItem.texto,
      children: selectedItem.children,
      backgroundColor: selectedItem.backgroundColor
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragRef(ref);

  
  return (
    <Container
      ref={ref}
      isDragging={isDragging}
      style={{
        position: "absolute",
        left: selectedItem.left,
        top: selectedItem.top,
        color: selectedItem.color,
        border: 0,
        fontSize: selectedItem.fontSize >= 10 ? selectedItem.fontSize + "px" : "16px",
        background: selectedItem.backgroundColor
      }}
    >
        {selectedItem.children ? selectedItem.children : `${selectedItem.texto}`}

    </Container>
  );
}

export default Item;
