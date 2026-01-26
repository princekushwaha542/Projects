// const { createElement } = require("react");

const filters = {
    Brightness:{
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Contrast:{
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Exposure:{
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Saturaction: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    HueRotation: {
        value: 0,
        min: 0,
        max : 360,
        unit: "deg"
    },
    Blur:{
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    Grayscale:{
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Sepia:{
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Opacity:{
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    Invert:{
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
}

const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");

const filtersContainer = document.querySelector(".filters");
function createFilterElement(name, unit ="%" ,value ,min ,max){
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name
    const p = document.createElement("p")
    p.innerText = name
    div.appendChild(p)
    div.appendChild(input)
    return div
}
Object.keys(filters).forEach(key =>{
    const filterElement = createFilterElement(key , filters[ key ].unit, filters[ key ].value ,filters[ key ].min ,filters[ key ].max)
    filtersContainer.appendChild(filterElement);

})

imgInput.addEventListener("change",(e) =>{
    let file = e.target.files[0];
    let img = new Image();
    img.src = URL.createObjectURL(file);

    const imagePlaceHolder = document.querySelector(".placeholder");
    imagePlaceHolder.style.display = "none";
    img.onload = ()=>{
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        
        canvasCtx.drawImage(img,0,0)
    }
})