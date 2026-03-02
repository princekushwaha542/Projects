const car = document.getElementById("car");
const wheels = document.querySelectorAll(".wheel");
const speedDisplay = document.getElementById("speedValue");

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

  if (keys["ArrowRight"]) {
    speed += 0.4;
  }

  if (keys["ArrowLeft"]) {
    speed -= 0.4;
  }

  speed *= 0.95;

  if (speed > 15) speed = 15;
  if (speed < -10) speed = -10;

  positionX += speed;

  const maxRight = window.innerWidth - 250; // car width approx
  if (positionX < 0) positionX = 0;
  if (positionX > maxRight) positionX = maxRight;

  car.style.left = positionX + "px";

  wheelRotation += speed * 5;
  wheels.forEach(wheel => {
    wheel.style.transform = `rotate(${wheelRotation}deg)`;
  });

  if (speedDisplay) {
    speedDisplay.textContent = Math.abs(speed).toFixed(1);
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
window.addEventListener("DOMContentLoaded", function(){

  const carBody = document.querySelector(".car");
  const roof = document.querySelector(".roof");
  const colorPicker = document.getElementById("colorPicker");

  function changeCarColor(color){
    if(carBody) carBody.style.background = color;
    if(roof) roof.style.background = color;
  }

  if(colorPicker){
    colorPicker.addEventListener("input", function(){
      changeCarColor(this.value);
    });
  }

  window.randomColor = function(){
    const r = Math.floor(Math.random()*255);
    const g = Math.floor(Math.random()*255);
    const b = Math.floor(Math.random()*255);
    changeCarColor(`rgb(${r},${g},${b})`);
  }

  window.setColor = function(color){
    changeCarColor(color);
  }

});
