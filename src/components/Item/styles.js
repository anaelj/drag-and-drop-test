import styled, { css } from "styled-components";

export const Moviment = styled.div` 

  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  /* border: 1px solid; */
  cursor: pointer;
  background: black;
  div {
    display: flex;
    flex-direction: column;
    div {
      width: 30px;
      height: 30px;
    }
  }
  
  `;

export const Container = styled.div`
  cursor: move;
  position: absolute;
  padding: 0px;

  ul {
    color: white;
    list-style: none;
    cursor: pointer;
    background: black;
    margin: 0px;
    font-size: 16px;
  }

   /* ${(props) => css`
    color: props.cor;
  
  `};  */

  ${(props) =>
    props.isDragging &&
    css`
      display: none; 
      /* border: 2px dashed rgba(0, 0, 0, 0.2);
      padding-top: 31px;
      border-radius: 0;
      background: transparent;
      box-shadow: none;
      cursor: grabbing;
      p,
      img,
      header {
        opacity: 0;
      }  */
    `}/* left: 300px; */
  /* ${(props) =>
    props.posLeft &&
    css`
      position: absolute;
      left: 800px;
    `} */
`;
