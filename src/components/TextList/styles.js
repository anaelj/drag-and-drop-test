import styled from "styled-components";

export const ContainerTextList = styled.ul`
  margin-top: 20px;
  li {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color: #444;
    cursor: pointer;
    & + li {
      margin-top: 15px;
    }
  }

  span {
    max-width: 195px;
  }
`;

export const TextItem = styled.div`
  margin-right: 24px;
  display: flex;
  width: 90%;
  ${(props) => props.selected && 'border: 1px dashed gray;' } 
  
  

`;
