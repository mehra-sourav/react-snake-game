import { useState, useEffect } from "react";
import {
  KEY_DIRECTION_MAP,
  OPPOSITE_DIRECTION_MAP,
  SNAKE_RATE_OF_CHANGE,
} from "@/constants";
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

  // Side effect for moving snake
  useEffect(() => {
    const interval = setInterval(moveSnake, SNAKE_RATE_OF_CHANGE);
    return () => clearInterval(interval);
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

  const moveSnake = () => {
    setSnakePosition((prevSnake) => {
      const newHead = { ...prevSnake[0] };
      switch (snakeDirection) {
        case "RIGHT":
          newHead.x += 1;
          break;
        case "LEFT":
          newHead.x -= 1;
          break;
        case "DOWN":
          newHead.y += 1;
          break;
        case "UP":
          newHead.y -= 1;
          break;
        default:
          break;
      }

      return [newHead, ...prevSnake.slice(0, -1)];
    });
  };

  return (
    <GameBoardContainer>
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
