const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done =document.querySelector("#done");
let dragElement = null;

const tasks = document.querySelectorAll(".task");

tasks.forEach(task =>{
    task.addEventListener("drag",(e) => {
    // console.log("dragging", e);
    dragElement = task;

    })
})

function addDragEventOnColumn(column){
    column.addEventListener("dragenter",(e) => {
        e.preventDefault();
        column.classList.add("hover-over")
    })
     column.addEventListener("dragleave",(e) => {
        e.preventDefault();
        // column.classList.remove("hover-over")
        console.log("dropped",dragElement,column);
        column.classList.remove("hover-over");
        column.appendChild(dragElement);
    })
}
addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(done);


const toggleModalBtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");

toggleModalBtn.addEventListener("click",() =>{
    modal.classList.toggle("active");

})

modalBg.addEventListener("click", ()=>{
    modal.classList.remove("active");
})