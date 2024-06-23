import { useState, useEffect, useRef } from "react";
import {
  KEY_DIRECTION_MAP,
  OPPOSITE_DIRECTION_MAP,
  SNAKE_RATE_OF_CHANGE,
  BOARD_SIZE,
  INITIAL_SNAKE_POSITION,
  INITIAL_FOOD_PELLET_POSITION,
} from "@/constants";
import {
  GameBoardContainer,
  SnakeSegment,
  FoodPellet,
} from "./GameBoard.styles";

const GameBoard = ({ updateLeaderBoard }) => {
  const [snakePosition, setSnakePosition] = useState(INITIAL_SNAKE_POSITION); // Initial snake position
  const [foodPosition, setFoodPosition] = useState(
    INITIAL_FOOD_PELLET_POSITION
  ); // Initial food pellet position
  const [snakeDirection, setSnakeDirection] = useState("RIGHT"); // Initial snake direction
  const scoreRef = useRef(0); // Initial score
  const snakeMoveIntervalRef = useRef(null);

  // Side effect for changing snake direction
  useEffect(() => {
    window.addEventListener("keydown", changeSnakeDirection);
    return () => window.removeEventListener("keydown", changeSnakeDirection);
  }, [snakeDirection]);

  // Side effect for moving snake
  useEffect(() => {
    const interval = setInterval(moveSnake, SNAKE_RATE_OF_CHANGE);
    snakeMoveIntervalRef.current = interval;
    return () => clearInterval(interval);
  }, [snakePosition]);

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
    const snakeNextPosition = getSnakeNextPosition();
    const isWallCollision = checkWallCollision(snakeNextPosition[0]);
    const isSelfCollision = checkSelfCollision(
      snakeNextPosition[0],
      snakeNextPosition.slice(1)
    );

    // Continue game if snake hasn't collided with itself or any wall
    if (!isWallCollision && !isSelfCollision) {
      setSnakePosition((prevSnake) => {
        const [newHead, ...newBody] = snakeNextPosition;
        const isFoodEaten = isSnakeOnFood(newHead);

        if (isFoodEaten) {
          scoreRef.current += 1;
          let newFoodPosition = generateFoodPosition();
          setFoodPosition(newFoodPosition);
          return [newHead, ...snakePosition];
        }

        return snakeNextPosition;
      });
    }
    // Game over
    else {
      let playerName = null;

      while (!playerName) {
        playerName = prompt("Game Over!!!\nEnter your name", "Player1");
      }

      updateLeaderBoard(playerName, scoreRef.current);
      clearInterval(snakeMoveIntervalRef.current);
      restartGame();
    }
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

  // Returns the next position of snake
  const getSnakeNextPosition = () => {
    const newHead = { ...snakePosition[0] };

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

    return [newHead, ...snakePosition.slice(0, -1)];
  };

  // Checks if snake has collided with the walls
  const checkWallCollision = (snakeHeadPosition) => {
    const { x, y } = snakeHeadPosition;
    return x <= 0 || y <= 0 || x > BOARD_SIZE || y > BOARD_SIZE;
  };

  // Checks if snake has collided with its own body
  const checkSelfCollision = (snakeHeadPosition, snakeBodyPosition) => {
    const { x, y } = snakeHeadPosition;

    return snakeBodyPosition.some(
      ({ x: bodyX, y: bodyY }) => bodyX === x && bodyY === y
    );
  };

  const restartGame = () => {
    setSnakePosition(INITIAL_SNAKE_POSITION);
    setFoodPosition(INITIAL_FOOD_PELLET_POSITION);
    setSnakeDirection("RIGHT");
    scoreRef.current = 0;
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
