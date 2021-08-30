import React from "react";
import { useRef , useContext} from "react";
import { useDrag } from "react-dnd";
import { Container } from "./styles.js";
import createContext from "../Area/context.js";

function Item({ data }) {
  const ref = useRef();

  const { setSelectedItem } = useContext(createContext);
  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragRef(ref);

  return (
    <Container
      ref={ref}
      isDragging={isDragging}
      onClick={()=> setSelectedItem(data)}
      style={{
        position: "absolute",
        left: data.left,
        top: data.top,
        color: data.color,
        border: 0,
        fontSize: data.fontSize, // >= 10 ? data.fontSize + "px" : "16px",
        fontFamily: data.fontFamily,
        background: data.backgroundColor,
      }}
    >
      {data.children ? data.children : `${data.texto}`}
    </Container>
  );
}

export default Item;
