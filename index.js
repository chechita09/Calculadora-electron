 // Capturar eventos del teclado
 window.addEventListener('keyup', e =>{ 
     if (e.key >= 0 && e.key <= 9 || e.key == '.'){
         writeNumber(e.key)
     }
     if (e.key == '/' || e.key == '*' || e.key == '-' || e.key == '+' ){
         getMathOperation(e.key, e.key)
     }
     if (e.key == 'Enter'){
         runOperation('igual')
     }
     if (e.key == 'Backspace'){
        borrarNumero()
     }
     if (e.key == 'Delete'){
         runOperation('clear')
     }
 })

const pantalla = document.getElementById('pantalla')
const tablero = document.getElementById('botones')
const historial = document.getElementById('historial')

pantalla.textContent = '0'

let numero1, numero2, resultado, tipoOperacion 
let operacionStatus = false // Esta variable sirve para esperar la entrada del segundo numero
                            // cuando se pulso un boton de operacion

// Capturar eventos de click sobre los elementos hijos del tablero
// para evitar hacer un evenListener para cada boton
tablero.addEventListener('click', evento => {
    const boton = evento.target // Elemento sobre el que se dio click
    const botonClass = boton.className 
    const botonId = boton.id         

    if (botonId === 'retroceder'){
        borrarNumero()
    }
    if (botonClass === 'botonNum') {
        writeNumber(boton.textContent)        
    }
    if ( botonClass === 'botonMath'){
        getMathOperation(boton.textContent, boton.textContent)
    }
    if (botonClass === 'botonOperacion') {
        runOperation(botonId)
    }
})

//Imprimir los numeros en pantalla
function writeNumber(numero) { 
    //Validadr que el numero en pantalla sea 0 y sobreescribirlo
    if (pantalla.textContent === '0' || operacionStatus === true){
        if (numero === '.'){
            pantalla.textContent += numero
        } else {
            pantalla.textContent = numero
        }
    }else {
        // Validación para que solo se pueda escribir un '.'
        if (numero === '.' && !pantalla.textContent.includes('.')){
            pantalla.textContent += numero
        }else if ( numero !== '.'){
            pantalla.textContent += numero
        }
    }
    operacionStatus = false
}

//Imprime el signo de la operacion en pantalla y guarta el primer numero
function getMathOperation(opBoton, operacion) {
    operacionStatus = true
    numero1 = Number(pantalla.textContent)
    tipoOperacion = operacion
    pantalla.textContent = opBoton
} 

// Funcionalidad para los botones de clear e igual
function runOperation(operacion) {
    if(operacion === 'clear') {
        pantalla.textContent = '0'
        numero1 = 0
        resultado = 0
    } else if (operacion === 'igual'){
        getResult(tipoOperacion, def = '') //parametro por default
    }
    operacionStatus = true
}

//Lógica de las operaciones aritméticas
function getResult(tipoOperacion) {
    numero2 = Number(pantalla.textContent)
    switch(tipoOperacion){
        case '+':
            resultado = numero1 + numero2
            break
        case '-':                 
            resultado = numero1 - numero2
            break
        case '*':
            resultado = numero1 * numero2
            break
        case '/':                
            resultado = numero1 / numero2
            break
        default:
            resultado = pantalla.textContent
            break
    }
    if (resultado === Infinity) {
        pantalla.textContent = 'Error'
    }else {
        pantalla.textContent = resultado
        historial.innerHTML += numero1 + tipoOperacion + numero2 + '=' +resultado+'<br>'
    }
}  
//Backspace
function borrarNumero() {
    let string = pantalla.textContent
    if (string.length === 1) {
        pantalla.textContent = '0'
    }else {
        let str1 = string.substring(0,string.length-1)
        pantalla.textContent = str1
    }
}