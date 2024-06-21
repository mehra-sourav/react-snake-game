import styled from "styled-components";
import { BOARD_SIZE } from "@/constants";

export const GameBoardContainer = styled.div`
  display: grid;
  border: 1px solid white;
  grid-template-columns: repeat(${BOARD_SIZE}, 1fr);
  grid-template-rows: repeat(${BOARD_SIZE}, 1fr);
  width: 600px;
  height: 600px;
`;

export const SnakeSegment = styled.div`
  background-color: green;
  border: 1px solid black;
`;

export const FoodPellet = styled.div`
  background-color: red;
`;
