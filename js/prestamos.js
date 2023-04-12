//Segunda pagina. Pagina de prestamos que se habilita luego de llenar el formulario.

window.addEventListener('load', function() {
    setPage();
    });

let prestamos = [];

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


//Creo una funcion donde utilizo DOM. Creo clases de bootstrap. 
function setPage() {
let formu = document.getElementById('div1');
formu.classList.add('container');
formu.classList.add('row');
formu.classList.add('justify-content-around');

//También traigo los datos del array préstamos de "script.js" creando una variable a tales fines. Esto era de la 3ra entrega. Ahora uso json.
let datosAlmacenados = JSON.parse(localStorage.getItem('prestamos'));

//Creo el carrito y las variables que uso en el bucle de la funcion recorrerCarrito.
let carritoPrestamos = [];
let totalMontoPrestamos = 0;
let totalMontoDevolucion = 0;
let domCarrito = document.getElementById('carrito');
let domBtnVaciar = document.getElementById('boton-vaciar'); 


// Creo tabla para carrito de préstamos.  

let tabla = document.createElement('table');
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


//Funcion para mostrarle al usuario la plata que va a tener que devolver por los planes elegidos.
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
            recorrerCarrito(carritoPrestamos);
        })
        tbody.appendChild(fila);
    }
    localStorage.setItem('totalMontoDevolucion', totalMontoDevolucion);
    let mostrarTotal = document.getElementById('total');
    mostrarTotal.textContent = totalMontoPrestamos;
    let mostrarTotalADevolver = document.getElementById('totalDevolucion');
    mostrarTotalADevolver.textContent = totalMontoDevolucion;
    let mostrarValorCuotaMensual = document.getElementById('totalCuotaDevolucion');
    mostrarValorCuotaMensual.textContent = Math.round(totalMontoDevolucion / valorCuotaMensual);
    //mostrarValorCuotaMensual.textContent = valorCuotaMensual;
}

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
            Swal.fire({
                icon: 'error',
                title: 'Préstamo ya elegido.',
                text: 'El sistema no habilita a elegir dos veces el mismo plan de préstamo.',      
            });
        } else {
            if(carritoPrestamos.length < 2) {
                carritoPrestamos.push(prestamo);
                recorrerCarrito(carritoPrestamos);
                

                
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

