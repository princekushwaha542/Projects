const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done =document.querySelector("#done");
let dragElement = null;

const columns = ([todo, progress, done]);

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
        columns.forEach(col =>{
            const tasks = 
            col.querySelectorAll(".task");
            const count = 
            col.querySelector(".right");
           
            count.innerText = tasks.length;
              
            
            
        })
    })
}
addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(done);



const toggleModalBtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addTaskButton = document.querySelector("#add-new-task")
toggleModalBtn.addEventListener("click",() =>{
    modal.classList.toggle("active");

})

modalBg.addEventListener("click", ()=>{
    modal.classList.remove("active");
})
addTaskButton.addEventListener("click" ,()=>{
     const taskTitle = document.querySelector("#task-title-input").value
     const taskDesc = document.querySelector("#task-desc-input").value
     const div = document.createElement("div");
     
     div.classList.add("task")
     div.setAttribute("draggable","true")
     
     div.innerHTML =`
     <h2>${taskTitle}</h2>
     <p>${taskDesc}</p>
     <button>Delete</button>
     `
     todo.appendChild(div);
          columns.forEach(col =>{
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");

            count.innerText = tasks.length;
            
        })
     div.addEventListener("drag",(e) =>{
        dragElement = div;
     })

     modal.classList.remove("active")


})