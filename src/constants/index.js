export const BOARD_SIZE = 15;

export const SNAKE_RATE_OF_CHANGE = 150;

export const KEY_DIRECTION_MAP = {
  37: "LEFT",
  38: "UP",
  39: "RIGHT",
  40: "DOWN",
};

export const OPPOSITE_DIRECTION_MAP = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

export const INITIAL_SNAKE_POSITION = [
  { x: 3, y: 2 },
  { x: 2, y: 2 },
];

export const INITIAL_FOOD_PELLET_POSITION = { x: 5, y: 5 };
