// creamos los arrays (arreglo)
let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionGastos = [];
let editarItem = -1;
let botonCancelar=document.getElementById('botonCancelar');
let countLista = 0;

// Esta función se invoca al momento de hacer click en el boton "Agregar Gastos"
function clickBoton(){
    let nombreGasto = document.getElementById('nombreGasto').value;
    let detalleGasto = document.getElementById('detalleGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;

// validamos q los campos nombre gastos y valor gastos tengan información
    if(isNaN(valorGasto) || valorGasto === 0 || valorGasto === '' || valorGasto === '0'){
        alert("Debe ingresar el valor del costo")
        // volvemos a poner en blanco el campo
        document.getElementById('valorGasto').value = '';        
        // ponemos el focus en el campo de valor gasto para que el usuario ingrese un valor correcto
        document.getElementById('valorGasto').focus()        
        return;       
    } 

    if(nombreGasto === '' ){
        alert("Debe ingresar el nombre del gasto")
        // volvemos a poner en blanco el campo
        document.getElementById('nombreGasto').value = '';        
        // ponemos el focus en el campo de valor gasto para que el usuario ingrese un valor correcto
        document.getElementById('nombreGasto').focus()         
        return; 
    }
// fin validación

// validamos si el gasto ingresado es superior a US$ 150
    if(valorGasto>150){
        alert("El gasto ingresado es mayor a US$ 150")
    }
// Fin validación 

// adicionamos el valor a cada lista dependiendo del estado de la variable editarItem
    if(editarItem === -1){
        listaNombresGastos.push(nombreGasto);
        listaDescripcionGastos.push(detalleGasto);
        listaValoresGastos.push(valorGasto);
    }else{ 
        // si editarItem es distinto de -1, significa que estamos editando un item
        listaNombresGastos[editarItem] = nombreGasto;        
        listaDescripcionGastos[editarItem] =  detalleGasto;
        listaValoresGastos[editarItem] = valorGasto;
        editarItem = -1;
        document.getElementById('botonFormulario').textContent = 'Agregar Gasto';
        limpiarTextbox();
    }
    // Habilitamos en pantalla en boton cancelar   
    botonCancelar.style.display="block";

    actualizarListaGastos();
}

function actualizarListaGastos(){
// conectamos con el HTML 
    const listaElementos = document.getElementById('listaDeGastos');    
    const totalElemento=document.getElementById('totalGastos');

    let htmlLista = '';
    let totalGastos= 0;
    
    
    listaNombresGastos.forEach((elemento,posicion) =>{
        // creamos la constante y convertios a numero el valor q trae el arreglo posicion
        const valorGasto = Number(listaValoresGastos[posicion]);
        const  detalleGasto = listaDescripcionGastos[posicion];
        // creamos los elementos en HTML (boton eliminar) desde JavaScript
        htmlLista += `<li> <p> ${elemento} - USD ${valorGasto.toFixed(2)}  
                      <br><span class="descripcion"> Descripción: ${detalleGasto} </span>
                      </p>                     
                      <button onclick="eliminarGasto(${posicion});">Eliminar</button> 
                      <button onclick="actualizarGasto(${posicion});">Actualizar</button>                    
                      </li>`        

        countLista++;                    
        // calculamos el total de gastos convirtiendo el valor en numero
        totalGastos += Number(valorGasto);        
    });
    
    listaElementos.innerHTML = htmlLista;
    // lo configuramos para solo permita 2 decimales
    totalElemento.innerHTML = totalGastos.toFixed(2) ;    
    limpiarTextbox()
}

function limpiarTextbox(){
    // Seleccionamos todos los inputs de tipo 'text' y 'number'
    let camposTextoNumero = document.querySelectorAll('input[type="text"], input[type="number"], textarea[type="text"]');

    // Recorremos todos los campos y limpiamos su valor
    camposTextoNumero.forEach(function(campo) {
    campo.value = '';  // Limpiamos cada campo
    }); 
    // ponemos el focus para reiniciar el proceso
    document.getElementById('nombreGasto').focus() 
    botonCancelar.style.display="block";  
}

function eliminarGasto(posicion){    
    listaNombresGastos.splice(posicion,1);
    listaValoresGastos.splice(posicion,1);
    countLista--;     
    actualizarListaGastos(); 
    if(countLista===0){
        botonCancelar.style.display="none";
    }   
}

function actualizarGasto(posicion){
    document.getElementById('nombreGasto').value=listaNombresGastos[posicion];
    document.getElementById('valorGasto').value=listaValoresGastos[posicion];
    document.getElementById('detalleGasto').value=listaDescripcionGastos[posicion];
    document.getElementById('botonFormulario').textContent = 'Editar Gasto';
    editarItem = posicion;    
}

// Nueva función para eliminar todas las listas
function eliminarTodasLasListas() {
    // Vaciar los arrays
    listaNombresGastos = [];
    listaValoresGastos = [];
    listaDescripcionGastos = [];

    // Actualizar la lista para reflejar el cambio
    actualizarListaGastos();

    // Opcional: ocultar el botón cancelar si ya no hay elementos
    botonCancelar.style.display = "none";
}

// Seleccionamos el input y le agregamos un listener para detectar cuando se presiona una tecla
document.getElementById('valorGasto').addEventListener('keydown', function(event) {
    // Verificamos si la tecla presionada es "Enter" (código de la tecla: 13)
    if (event.key === 'Enter') {
        clickBoton();  // Llama a la función cuando se presiona "Enter"
    }
});

