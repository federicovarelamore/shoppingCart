// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let productosCarrito = [];


// Listeners
cargarEventListeners();

function cargarEventListeners(){
    // Función de agregar curso al carrito
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Muestra los cursos de LocalStorage
    document.addEventListener('DOMContentLoaded', () => {
        productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    //Vacia el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        productosCarrito = [];

        limpiarHTML();
    });

}


// Funciones

// Agrega el curso al carrito
function agregarCurso(e){

    e.preventDefault();
    // Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(cursoSeleccionado);
    }

}

// Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        
        // Elimina producto del arreglo productosCarrito por el data-id
        productosCarrito = productosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }   
}

// Lee los datos del curso seleccionado 
function leerDatosCurso (curso){
    // Crear un objeto con el contenido del curso selecciona do
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
     const existe = productosCarrito.some(curso => curso.id === infoCurso.id);
     if(existe){
         //Actualizamos la cantidad
         const cursos = productosCarrito.map(curso => {
             if(curso.id === infoCurso.id){
                 curso.cantidad++;
                 return curso;
             }else{
                 return curso;
             }
         });
         productosCarrito = [...cursos];
     }else{
         // Agrega elementos seleccionados al arreglo de carrito
        productosCarrito = [...productosCarrito, infoCurso ];
     }

    

    
    // console.log(productosCarrito);

    carritoHTML (); // 
}

// Muestra el carrito en el HTML
function carritoHTML (){

    // Limpiar el HTML 
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    productosCarrito.forEach( curso =>{
        const { imagen, titulo, precio, cantidad, id } = curso;

        const row = document.createElement('TR');
        row.innerHTML = `
            <td>  
                <img src="${imagen}" width="100">
            </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });


    // Agregar el carrito de compras al Storage
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(productosCarrito)); 
}


// Elimina los cursos del tbody 
function limpiarHTML(){
     
    // contenedorCarrito.innerHTML = ''; ----> Forma Lenta

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}