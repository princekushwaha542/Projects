// const { createElement } = require("react");

let filters = {
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
    Saturation: {
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
const resetBtn = document.querySelector("#reset-btn");
const downloadBtn = document.querySelector("#download-btn")
let image = null
let file = null

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

    input.addEventListener("input" ,(event) =>{
        filters[name].value = input.value;
        applyfilters();
    })
    return div
}
function createFilters(){
    Object.keys(filters).forEach(key =>{
    const filterElement = createFilterElement(key , filters[ key ].unit, filters[ key ].value ,filters[ key ].min ,filters[ key ].max)
    filtersContainer.appendChild(filterElement);

    })
}
createFilters()


imgInput.addEventListener("change",(e) =>{
    let file = e.target.files[0];
    let img = new Image();
    img.src = URL.createObjectURL(file);
    imageCanvas.style.display = "block"
    const imagePlaceHolder = document.querySelector(".placeholder");
    imagePlaceHolder.style.display = "none";
    img.onload = ()=>{
        image = img
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        
        canvasCtx.drawImage(img,0,0)
    }
})
function applyfilters() {
    if (!image) return;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

    canvasCtx.filter = `
        brightness(${filters.Brightness.value}%)
        contrast(${filters.Contrast.value}%)
        saturate(${filters.Saturation.value}%)
        hue-rotate(${filters.HueRotation.value}deg)
        blur(${filters.Blur.value}px)
        grayscale(${filters.Grayscale.value}%)
        sepia(${filters.Sepia.value}%)
        opacity(${filters.Opacity.value}%)
        invert(${filters.Invert.value}%)
    `;

    canvasCtx.drawImage(image, 0, 0);
}
resetBtn.addEventListener("click",()=>{
    filters = {
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
    Saturation: {
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
    applyfilters()
    filtersContainer.innerHTML= ""
    createFilters()
})
downloadBtn.addEventListener("click" , () =>{
    const link = document.createElement("a")
    link.download ="edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})