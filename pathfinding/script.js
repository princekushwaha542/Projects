const grid = document.getElementById("grid");
const rows = 20;
const cols = 20;

let start = null;
let end = null;
let mode = "wall";

let cells = [];

function createGrid() {
  for (let r = 0; r < rows; r++) {
    cells[r] = [];
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", handleClick);
      grid.appendChild(cell);
      cells[r][c] = cell;
    }
  }
}

function setMode(selectedMode) {
  mode = selectedMode;
}

function handleClick(e) {
  const row = e.target.dataset.row;
  const col = e.target.dataset.col;

  if (mode === "start") {
    if (start) start.classList.remove("start");
    start = e.target;
    start.classList.add("start");
  } 
  else if (mode === "end") {
    if (end) end.classList.remove("end");
    end = e.target;
    end.classList.add("end");
  } 
  else if (mode === "wall") {
    e.target.classList.toggle("wall");
  }
}

function runBFS() {
  if (!start || !end) return alert("Set start and end!");

  let queue = [];
  let visited = new Set();
  let parent = {};

  const startKey = `${start.dataset.row}-${start.dataset.col}`;
  queue.push(startKey);
  visited.add(startKey);

  while (queue.length > 0) {
    let current = queue.shift();
    let [r, c] = current.split("-").map(Number);

    if (cells[r][c] === end) break;

    let directions = [
      [0,1], [1,0], [0,-1], [-1,0]
    ];

    for (let [dr, dc] of directions) {
      let nr = r + dr;
      let nc = c + dc;
      let key = `${nr}-${nc}`;

      if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < cols &&
        !visited.has(key) &&
        !cells[nr][nc].classList.contains("wall")
      ) {
        queue.push(key);
        visited.add(key);
        parent[key] = current;
        cells[nr][nc].classList.add("visited");
      }
    }
  }

  // Reconstruct Path
  let pathKey = `${end.dataset.row}-${end.dataset.col}`;
  while (parent[pathKey]) {
    let [r,c] = pathKey.split("-").map(Number);
    cells[r][c].classList.add("path");
    pathKey = parent[pathKey];
  }
}

function clearGrid() {
  grid.innerHTML = "";
  start = null;
  end = null;
  cells = [];
  createGrid();
}

createGrid();