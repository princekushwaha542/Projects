let dragElement = null;

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const columns = [todo, progress, done];



// dragstart attach
function addDragStart(task) {
    task.addEventListener("dragstart", () => {
        dragElement = task;
    });
}

// update count + localStorage
function updateData() {
    let taskData = {};

    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        taskData[col.id] = Array.from(tasks).map(task => ({
            title: task.querySelector("h2").innerText,
            desc: task.querySelector("p").innerText
        }));

        if (count) count.innerText = tasks.length;
    });

    localStorage.setItem("tasks", JSON.stringify(taskData));
}


columns.forEach(column => {

    column.addEventListener("dragover", (e) => {
        e.preventDefault(); // MUST
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover-over");
    });

    column.addEventListener("drop", () => {
        column.classList.remove("hover-over");
        if (dragElement) {
            column.appendChild(dragElement);
            updateData();
        }
    });
});


document.querySelectorAll(".task").forEach(task => {
    task.setAttribute("draggable", "true");
    addDragStart(task);
});


const toggleModalBtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addTaskButton = document.querySelector("#add-new-task");

toggleModalBtn.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});


addTaskButton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value.trim();
    const taskDesc = document.querySelector("#task-desc-input").value.trim();

    if (!taskTitle) return;

    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDesc}</p>
        <button class="delete">Delete</button>
    `;

    todo.appendChild(div);
    addDragStart(div);
    updateData();

    modal.classList.remove("active");

    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";
});


document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        e.target.closest(".task").remove();
        updateData();
    }
});



if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));

    for (const colId in data) {
        const column = document.querySelector(`#${colId}`);

        data[colId].forEach(task => {
            const div = document.createElement("div");
            div.classList.add("task");
            div.setAttribute("draggable", "true");

            div.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.desc}</p>
                <button class="delete">Delete</button>
            `;

            column.appendChild(div);
            addDragStart(div);
        });
    }

    updateData();
}
