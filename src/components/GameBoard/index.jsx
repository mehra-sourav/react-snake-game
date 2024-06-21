import { useState } from "react";
import { GameBoardContainer, SnakeSegment, Food } from "./GameBoard.styles";

const GameBoard = () => {
  const [snakePosition, setSnakePosition] = useState([{ x: 2, y: 2 }]); // Initial snake position
  const [foodPosition, setFoodPosition] = useState({ x: 5, y: 5 }); // Initial food pellet position
  const [snakeDirection, setSnakeDirection] = useState("RIGHT"); // Initial snake direction

  return (
    <GameBoardContainer>
      {snakePosition.map((segment, index) => (
        <SnakeSegment
          key={index}
          style={{ gridRowStart: segment.y, gridColumnStart: segment.x }}
        />
      ))}
      <Food
        style={{
          gridRowStart: foodPosition.y,
          gridColumnStart: foodPosition.x,
        }}
      />
    </GameBoardContainer>
  );
};

export default GameBoard;
