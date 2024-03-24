const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
sizeSlider= document.querySelector("#size-slider"),
colorBtns= document.querySelectorAll(".colors .option"),
ColorPicker= document.querySelector("#Color-picker"),
ClearCanvas= document.querySelector(".clear-canvas"),

ctx = canvas.getContext("2d");



let isDrawing = false,
selectedTool = "brush",
brushWidth=5,
selectedColor= "#000";



window.addEventListener("load", () =>{
    // configurando el ancho/alto del lienzo.. offsetwidth/height devuelve el ancho/alto visible de un elemento
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});
const startDraw = () =>{
    isDrawing = true;
   ctx.beginPath();
   ctx.lineWidth = brushWidth;//pasando el grosor del pincel al grosor de la linea
   ctx.strokeStyle = selectedColor;
   ctx.fillStyle = selectedColor;
}

const drawing = (e) => {
    if(!isDrawing) return; //If isDrawing es falso no pinta
    if(selectedTool === "brush" || selectedTool === "eraser" ){
        //Seleccionando blanco como color del borrador
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff":selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);//crear la linea acorde al puntero del mouse
        ctx.stroke(); // dibujar o rellenar con color
    } else if( selectedTool=== "eraser"){

    }
   
}

toolBtns.forEach(btn => {

    btn.addEventListener("click", () =>{
        //remueve la clase que se activo previamente y activa la clickeada
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
        console.log(selectedTool);
    })
})

sizeSlider.addEventListener("change", () =>brushWidth = sizeSlider.value);

colorBtns.forEach(btn=>{
btn.addEventListener("click", () =>  {

 //remueve la clase que se activo previamente y activa la clickeada
 document.querySelector(".options .selected").classList.remove("selected");
 btn.classList.add("selected");
    //pasando el color del seleccionado al valor de color de la linea
 selectedColor = (window.getComputedStyle(btn).getPropertyValue("background-color"));
});
})

ColorPicker.addEventListener ("change", () => { 
    //pasando el valor del color seleccionado a al color de la linea
    ColorPicker.parentElement.style.background = ColorPicker.value;
    ColorPicker.parentElement.click();
} )

ClearCanvas.addEventListener("click", () =>{ 
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Limpiando el tablero
})

canvas.addEventListener("mousedown", startDraw);

canvas.addEventListener("mousemove", drawing);

canvas.addEventListener("mouseup", () => isDrawing = false);
