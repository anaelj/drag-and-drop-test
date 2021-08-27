import styled, { css } from "styled-components";

export const Teste = styled.div`
  .testeee {
    position: absolute;
    top: 200px;
    left: 300px;

    /* ${(props) =>
      props.left &&
      css`
        left: props.left;
      `} */
  }
`;

export const Main = styled.main` 
  display: flex;
  flex-direction: row;
  /* background-position: 50% 50%; */

`;
export const LeftArea = styled.div` 
  flex: 1;

  /* background-position: 50% 50%; */

`;
export const MainArea = styled.div` 
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: contain;
  flex: 2;
  z-index: 8;
/* background-position: 50% 50%; */

`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  .filelist {
    max-width: 400px;
  }
  div {
    flex: 1;
  }
`;
