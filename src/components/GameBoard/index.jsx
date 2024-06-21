import { useState, useEffect } from "react";
import { KEY_DIRECTION_MAP, OPPOSITE_DIRECTION_MAP } from "@/constants";
import {
  GameBoardContainer,
  SnakeSegment,
  FoodPellet,
} from "./GameBoard.styles";

const GameBoard = () => {
  const [snakePosition, setSnakePosition] = useState([{ x: 2, y: 2 }]); // Initial snake position
  const [foodPosition, setFoodPosition] = useState({ x: 5, y: 5 }); // Initial food pellet position
  const [snakeDirection, setSnakeDirection] = useState("RIGHT"); // Initial snake direction

  // Side effect for changing snake direction
  useEffect(() => {
    window.addEventListener("keydown", changeSnakeDirection);
    return () => window.removeEventListener("keydown", changeSnakeDirection);
  }, [snakeDirection]);

  const changeSnakeDirection = (event) => {
    const newDirection = KEY_DIRECTION_MAP[event.keyCode];
    if (
      newDirection &&
      newDirection !== OPPOSITE_DIRECTION_MAP[snakeDirection]
    ) {
      setSnakeDirection(newDirection);
    }
  };

  return (
    <GameBoardContainer>
      {snakeDirection}
      {snakePosition.map((segment, index) => (
        <SnakeSegment
          key={index}
          style={{ gridRowStart: segment.y, gridColumnStart: segment.x }}
        />
      ))}
      <FoodPellet
        style={{
          gridRowStart: foodPosition.y,
          gridColumnStart: foodPosition.x,
        }}
      />
    </GameBoardContainer>
  );
};

export default GameBoard;
