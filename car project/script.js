const car = document.getElementById("car");
const wheels = document.querySelectorAll(".wheel");
const speedDisplay = document.getElementById("speedValue");

let positionX = 100;
let speed = 0;
let wheelRotation = 0;

const keys = {};

// Key press detect
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function gameLoop() {

  // Acceleration
  if (keys["ArrowRight"]) {
    speed += 0.4;
  }

  // Brake / Reverse
  if (keys["ArrowLeft"]) {
    speed -= 0.4;
  }

  // Friction
  speed *= 0.95;

  // Speed limit
  if (speed > 15) speed = 15;
  if (speed < -10) speed = -10;

  // Update position
  positionX += speed;

  // Screen boundary control
  const maxRight = window.innerWidth - 250; // car width approx
  if (positionX < 0) positionX = 0;
  if (positionX > maxRight) positionX = maxRight;

  car.style.left = positionX + "px";

  // Wheel rotation
  wheelRotation += speed * 5;
  wheels.forEach(wheel => {
    wheel.style.transform = `rotate(${wheelRotation}deg)`;
  });

  // Speed display (if exists)
  if (speedDisplay) {
    speedDisplay.textContent = Math.abs(speed).toFixed(1);
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();