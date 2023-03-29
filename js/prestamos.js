//Segunda pagina. Pagina de prestamos que se habilita luego de llenar el formulario.


window.addEventListener('load', function() {
    setPage();
    });





//Creo una funcion donde utilizo DOM. Creo clases de bootstrap. 
function setPage() {
let formu = document.getElementById('div1');
formu.classList.add('container');
formu.classList.add('row');
formu.classList.add('justify-content-around');

//También traigo los datos del array préstamos de "script.js" creando una variable a tales fines.
let datosAlmacenados = JSON.parse(localStorage.getItem('prestamos'));

//Creo el carrito y las variables que uso en el bucle de la funcion recorrerCarrito.
let carritoPrestamos = [];
let totalMontoPrestamos = 0;
let totalMontoDevolucion = 0;
let domCarrito = document.getElementById('carrito');
let domBtnVaciar = document.getElementById('boton-vaciar'); 

//Recorro el array con un bucle For y agrego los planes de préstamos en el HTML. 
for(i = 0; i < datosAlmacenados.length; i ++) {
    
    const divPlan = document.createElement('div');
    divPlan.classList.add('col-md-4');
    divPlan.classList.add('cajitasPrestamos');
    divPlan.classList.add('border');
    divPlan.classList.add('border-success-subtle');
    divPlan.textContent = datosAlmacenados[i].nombre;
    divPlan.innerHTML = `
            <h3>${datosAlmacenados[i].nombre}</h3>
            <h3>$ ${datosAlmacenados[i].capital}</h3>
            <h3>${datosAlmacenados[i].cuotas} cuotas</h3>
            <h3>${datosAlmacenados[i].interes} % de interes mensual</h3>  
        `;
    
    const btnPrestamos = document.createElement('button');
    btnPrestamos.setAttribute('id',i);
    btnPrestamos.setAttribute('marcador', i);
    btnPrestamos.textContent = 'Seleccionar prestamo';
    btnPrestamos.classList.add('btn');
    btnPrestamos.classList.add('btn-outline-success');

    //Creo el evento para el boton de Solicitar Prestamo. Le agrego IF para que no se pueda elegir mas
    // de una vez cada prestamo. Le agrego un IF para que no se pueda tomar mas de dos prestamos.
    //Llamo a la funcion recorrerCarrito.
    btnPrestamos.addEventListener('click', (event) => {
        event.preventDefault();
        let prestamo = datosAlmacenados.find(p => p.id === parseInt(btnPrestamos.getAttribute('id')));
        if((carritoPrestamos.find(c => c.id === prestamo.id) != null)) {
            alert('Este préstamo ya ha sido seleccionado');
        } else {
            if(carritoPrestamos.length < 2) {
                carritoPrestamos.push(prestamo);
                recorrerCarrito(carritoPrestamos);
            } else {
                alert('Como máximo se pueden solicitar dos préstamos');
            }
            
        }    
        });
    //Inserto las variables creadas.
    divPlan.appendChild(btnPrestamos);
    formu.appendChild(divPlan);
}
}

// Creo la funcion recorrerCarrito. Armo un bucle For para recorrerlo. Hago las operaciones logicas para
// mostrar en el Carrito/Cotizador el resultado.
function recorrerCarrito(carritoPrestamos) {
        totalMontoPrestamos = 0;
        totalMontoDevolucion = 0;
    for ( i = 0; i < carritoPrestamos.length; i ++) {
            totalMontoPrestamos += carritoPrestamos[i].capital;
            totalMontoDevolucion += (carritoPrestamos[i].capital + carritoPrestamos[i].capital * carritoPrestamos[i].interes);
    }
    const mostrarTotal = document.getElementById('total');
    mostrarTotal.textContent = totalMontoPrestamos;
    const mostrarTotalDevolucion = document.getElementById('totalDevolucion');
    mostrarTotalDevolucion.textContent = totalMontoDevolucion;
}

