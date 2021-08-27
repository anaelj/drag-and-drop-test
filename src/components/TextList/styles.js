import styled from "styled-components";

export const ContainerTextList = styled.ul`
  margin-top: 20px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
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
  flex-direction: column;
`;
