//Segunda pagina. Pagina de prestamos que se habilita luego de llenar el formulario.

window.addEventListener('load', function() {
    setPage();
    });

// Cargar los datos del localStorage al cargar la página
window.addEventListener('load', function() {
    let datosAlmacenados = JSON.parse(localStorage.getItem('formulario'));
    if (datosAlmacenados) {
    mostrarBienvenida(datosAlmacenados.nombre);
    }
});

/* Función que saluda al usuario utilizando el dato cargado */
function mostrarBienvenida(nombre) {
    Swal.fire({
    icon: 'success',
    title: 'Bienvenido ' + nombre,
    text: 'Gracias por completar el formulario',
    });
}

/* Variables globales */
let datosAlmacenados = JSON.parse(localStorage.getItem('prestamos'));
//let prestamosElegidos = JSON.parse(localStorage.getItem('prestamosElegidos')) || [];
let prestamos = [];
let carritoPrestamos = JSON.parse(localStorage.getItem('prestamosElegidos')) || [];;
let totalMontoPrestamos = 0;
let totalMontoDevolucion = 0;
let valorCuotaMensual = 0;
let tabla;
let formu;

/* Función para Fetch */
function datosPrestamosJSon() {
fetch("./datosPrestamos.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error al cargar datosPrestamos.json");
        }
        return response.json();
    })
    .then((data) => {
        prestamos = data;
        localStorage.setItem("prestamos", JSON.stringify(prestamos));
        setPage(prestamos);
    })
    .catch((error) => {
        console.error("Error en la carga de datos:", error);
    });
}

/* Función para manipular DOM */
function setPage() {
    let formu = document.getElementById('div1');
    formu.classList.add('container');
    formu.classList.add('row');
    formu.classList.add('justify-content-around');
    //datosPrestamosJSon();
    tablaCarrito();
    agregarPlanesAlDom(formu);
}


/* Función para crear tabla donde mostrar los préstamos elegidos */
function tablaCarrito() {
    let domCarrito = document.getElementById('carrito');
    let domBtnVaciar = document.getElementById('boton-vaciar');
    carritoPrestamos = [];
    localStorage.setItem('prestamosElegidos', JSON.stringify(carritoPrestamos)); 
    tabla = document.createElement('table');
    tabla.classList.add('table');
    tabla.classList.add('table-hover');
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>Préstamo</th>
                <th>Capital</th>
                <th>Interés</th>
                <th>Cuotas</th>
                <th></th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    domCarrito.appendChild(tabla);
}

/* Función para agregar planes al Dom. Registrar la elección del préstamo. Mostrar sweetAlert */
function agregarPlanesAlDom(formu) {
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
        btnPrestamos.addEventListener('click', (event) => {
            event.preventDefault();
            let prestamo = datosAlmacenados.find(p => p.id === parseInt(btnPrestamos.getAttribute('id')));
            if((carritoPrestamos.find(c => c.id === prestamo.id) != null)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Préstamo ya elegido.',
                    text: 'El sistema no habilita a elegir dos veces el mismo plan de préstamo.',      
                });
            } else {
                if(carritoPrestamos.length < 2) {
                    carritoPrestamos.push(prestamo);
                    recorrerCarrito(carritoPrestamos);
                    //prestamosElegidos.push(carritoPrestamos);
                    localStorage.setItem('prestamosElegidos', JSON.stringify(carritoPrestamos));
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Límite superado',
                        text: 'El sistema no habilita a elegir más de dos planes de dos planes',      
                    });      
                };              
            };    
            });
        //Inserto las variables creadas.
        divPlan.appendChild(btnPrestamos);
        formu.appendChild(divPlan);
    }
}

/* Función calculadora de préstamos */
function recorrerCarrito(carritoPrestamos) {   
    totalMontoPrestamos = 0;
    totalMontoDevolucion = 0;
    valorCuotaMensual = 0;
    let tbody = tabla.querySelector('tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < carritoPrestamos.length; i++) {
        totalMontoPrestamos += carritoPrestamos[i].capital;
        totalMontoDevolucion += (carritoPrestamos[i].capital + carritoPrestamos[i].capital * carritoPrestamos[i].interes);
        if (carritoPrestamos[i].cuotas > valorCuotaMensual) {
            valorCuotaMensual = carritoPrestamos[i].cuotas;
        }
        let fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${carritoPrestamos[i].nombre}</td>
            <td>${carritoPrestamos[i].capital}</td>
            <td>${carritoPrestamos[i].interes}%</td>
            <td>${carritoPrestamos[i].cuotas}</td>
            <td><button class="btn btn-outline-danger btn-sm btn-eliminar" data-id="${[i]}">Eliminar</button></td>
        `;
            let botonEliminar = fila.querySelector('.btn-eliminar');
            botonEliminar.addEventListener('click', function(){
            let index = parseInt(this.getAttribute('data-id'));
            carritoPrestamos.splice(index,1);
            localStorage.setItem('prestamosElegidos', JSON.stringify(carritoPrestamos));
            recorrerCarrito(carritoPrestamos);
        })
        tbody.appendChild(fila);
    }
    localStorage.setItem('totalMontoDevolucion', totalMontoDevolucion);
    const options = { style: "currency", currency: "ARS", minimumFractionDigits: 2, maximumFractionDigits: 2 };
    let mostrarTotal = document.getElementById('total');
    mostrarTotal.textContent = totalMontoPrestamos.toLocaleString("es-AR", options);
    let mostrarTotalADevolver = document.getElementById('totalDevolucion');
    mostrarTotalADevolver.textContent = totalMontoDevolucion.toLocaleString("es-AR", options);;
    let mostrarValorCuotaMensual = document.getElementById('totalCuotaDevolucion');
    if(valorCuotaMensual == 0) {
        mostrarValorCuotaMensual.textContent = '$ 0,00';
    } else {
    mostrarValorCuotaMensual.textContent = Math.round(totalMontoDevolucion / valorCuotaMensual).toLocaleString("es-AR", options);
}
}