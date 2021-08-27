import styled from "styled-components";

export const ContainerItemSettings = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  min-width: 650px;
  width: 650px;
  z-index: 0;
`;

export const ToolbarItemSettings = styled.div`
  background: #c2c2c2;
  width: 300px;
  flex: 1;
  height: 280px;
`;

export const ContentItemSettings = styled.div`
  flex: 1;
  width: 300px;
  height: 400px;
  background: lawngreen;
`;

export const FontSetting = styled.div`

    height: 100px;

    div {
        padding-left: 5px;
        margin-top: 10px;
        label {
            padding-right: 3px;
        }
    }

`;



export const Moviment = styled.div` 

  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  /* border: 1px solid; */
  cursor: pointer;
  background: black;
  padding-left: 45px;
  padding-top: 20px;
  div {
    display: flex;
    flex-direction: column;
    height: 120px;
    div {
      width: 30px;
      height: 30px;
    }
  }
  
  `;
