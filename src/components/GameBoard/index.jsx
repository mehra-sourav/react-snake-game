import { useState, useEffect } from "react";
import {
  KEY_DIRECTION_MAP,
  OPPOSITE_DIRECTION_MAP,
  SNAKE_RATE_OF_CHANGE,
  BOARD_SIZE,
} from "@/constants";
import {
  GameBoardContainer,
  SnakeSegment,
  FoodPellet,
} from "./GameBoard.styles";

const GameBoard = () => {
  const [snakePosition, setSnakePosition] = useState([
    { x: 2, y: 2 },
    { x: 3, y: 2 },
  ]); // Initial snake position
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

      const isFoodEatem = isSnakeOnFood(newHead);

      if (isFoodEatem) {
        let newFoodPosition = generateFoodPosition();
        setFoodPosition(newFoodPosition);
        return [newHead, ...prevSnake];
      }

      return [newHead, ...prevSnake.slice(0, -1)];
    });
  };

  //   Checks if snake's head is on the same coordinates as food
  const isSnakeOnFood = (head) => {
    return head.x === foodPosition.x && head.y === foodPosition.y;
  };

  // Generates random food coordinates within the board
  const generateFoodPosition = () => {
    const newFoodPosition = {
      x: Math.floor(Math.random() * BOARD_SIZE) + 1,
      y: Math.floor(Math.random() * BOARD_SIZE) + 1,
    };
    return newFoodPosition;
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
