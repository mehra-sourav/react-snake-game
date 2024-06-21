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