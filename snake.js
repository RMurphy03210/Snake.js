import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;

//Arrays can store grid coordinates so you can access grid data by location using a pair of numbers. CSS grids start at one.
const snakeBody = [
    { x: 10, y: 11 },
]
let newSegments = 0;


export function update() {
    addSegments();

    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }

    //Goes to 1st element in snakeBody array, accesses x or y property and increments in input direction
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    })
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

//Returns the value stored in the first element of the snakeBody array.
export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
    return (
        pos1.x === pos2.x && pos1.y === pos2.y
    )
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newSegments = 0
}