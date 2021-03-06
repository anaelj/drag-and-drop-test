import styled from "styled-components";
export const ContainerItemSettings = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  /* z-index: 0; */
  width: 100%;
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
  /* background: #909497; */
  color: white;
  select {
    margin-top: 15px;
  }
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
background: #909497;
`;


export const Moviment = styled.div` 
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  /* border: 1px solid; */
  cursor: pointer;
  background: #909497;
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
