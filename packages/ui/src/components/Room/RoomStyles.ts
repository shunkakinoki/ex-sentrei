import styled from "styled-components";

const RoomStyles = styled.div`
  #root {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  }

  #root > div {
    position: relative;
    width: 30vw;
    height: 30vw;
    background: grey;
    border-radius: 5px;
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.5s, opacity 0.5s;
    will-change: transform;
    border: 10px solid white;
    cursor: grab;
    overflow: hidden;
  }

  #root > div > div {
    will-change: transform;
    height: 100%;
    margin: 0vw 0;
  }

  #root > div > div > * {
    height: 100%;
    background-size: cover;
    background-position: center center;
    margin: 0vw 0;
  }

  #root > div.dragging {
    cursor: grabbing;
  }

  #root > div.disabled {
    opacity: 0.5;
    cursor: default;
  }

  #root > div:hover {
    box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
  }

  button {
    position: absolute;
    top: 20px;
    left: 20px;
  }
`;

export default RoomStyles;
