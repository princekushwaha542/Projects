const car = document.getElementById("car");
const wheels = document.querySelectorAll(".wheel");

let positionX = 100;
let speed = 0;
let wheelRotation = 0;

const keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function gameLoop() {

  // Acceleration
  if (keys["ArrowRight"]) {
    speed += 0.2;
  }

  // Brake
  if (keys["ArrowLeft"]) {
    speed -= 0.2;
  }

  // Friction
  speed *= 0.98;

  // Move car
  positionX += speed;

  // Rotate wheels according to speed
  wheelRotation += speed * 5;

  wheels.forEach(wheel => {
    wheel.style.transform = `rotate(${wheelRotation}deg)`;
  });

  car.style.left = positionX + "px";

  requestAnimationFrame(gameLoop);
}

gameLoop();