let previousTitle = document.title

window.addEventListener('blur', ()=>{
    previousTitle = document.title
    document.title = '¡No te vayas! Vuelve por más'
})

window.addEventListener('focus', () =>{
    document.title = previousTitle
})




const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btntodos= document.querySelector('.todos');
const btncomidas= document.querySelector('.comidas');
const btnbebidas= document.querySelector('.bebidas');
const contenedorPlatillos = document.querySelector('.platillos');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    platillos();
});


const eventos =()=>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = ()=>{
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () => {
    const btnCerrar = document.createElement('p');
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    while(navegacion.children[5]){
        navegacion.removeChild(navegacion.children[5]);
    }
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar, overlay);
}
const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});

imagenes.forEach(imagen=>{
    
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) => {
    boton.addEventListener('click', () => {
        navegacion.classList.add('ocultar');
        overlay.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}

const platillos = () => {
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');
    
    platillos.forEach(platillo => platillosArreglo = [...platillosArreglo,platillo]);

    const comidas = platillosArreglo.filter(comidas=> comidas.getAttribute('data-platillo') === 'comidas');
    const bebidas = platillosArreglo.filter(bebidas=> bebidas.getAttribute('data-platillo') === 'bebidas');
    
    mostrarPlatillos(comidas, bebidas, platillosArreglo);
}

const mostrarPlatillos = (comidas, bebidas, todos) =>{
    btncomidas.addEventListener('click', ()  =>{
        limpiarHtml(contenedorPlatillos);
        comidas.forEach(comidas=> contenedorPlatillos.appendChild(comidas));
    });
    btnbebidas.addEventListener('click', ()  =>{
        limpiarHtml(contenedorPlatillos);
        bebidas.forEach(bebidas=> contenedorPlatillos.appendChild(bebidas));
    });

    btntodos.addEventListener('click', () =>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todos => contenedorPlatillos.appendChild(todos));
    }
    );
}

const limpiarHtml = (contenedor) => {
    while( contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}