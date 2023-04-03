/*                                      Segunda Pre-entrega. 

    El proyecto final tendrá por objetivo la creación de sitio que ofrezca préstamos a sus clientes.

    En esta segunda pre entrega lo que quiería lograr era que el usuario validara su edad, 
    y una vez que se confirmara que era mayor de 18 años, pudiera elegir entre una serie de paquetes de prestamos
    los cuales están ya pre establecidos.

    El arreglo préstamos contiene los paquetes de préstamos en forma de objetos. 
    Cree una función que itera sobre el arreglo con el método forEach y le muestra al usuario los diferentes planes.
    Luego cree otra función que es la que ejecuta todo, validando edad, ejecutando la iteracion de eleccion de prestamo, y
    calculando cual es el valor de la cuota que tiene que devolver el tomador del prestamo para su cancelacion

    Si el usuario completa los datos del formulario HTML automaticamente le permite ingresar nuevamente la edad y elegir prestamo.




const prestamos = [
  { id: 0, nombre: "Plan 0", capital: 500000,cuotas: 6, interes: 0.10 },
  { id: 1, nombre: "Plan 1", capital: 500000,cuotas: 12, interes: 0.20},
  { id: 2, nombre: "Plan 2",capital: 500000,cuotas: 24, interes: 0.30},
  { id: 3, nombre: "Plan 3",capital: 1000000,cuotas: 6 , interes: 0.10 },
  { id: 4, nombre: "Plan 4",capital: 1000000,cuotas: 12, interes: 0.20 },
  { id: 5, nombre: "Plan 5",capital: 1000000,cuotas: 24, interes: 0.30 },
  { id: 6, nombre: "Plan 6",capital: 2000000,cuotas: 6, interes: 0.10 },
  { id: 7, nombre: "Plan 7",capital: 2000000,cuotas: 12, interes: 0.20 },
  { id: 8,nombre: "Plan 18",capital: 2000000,cuotas: 24, interes: 0.30 }
];

*/

/*
function solicitarPrestamo(prestamoSeleccionado) {
    let resultado = Math.round(prestamoSeleccionado.capital / prestamoSeleccionado.cuotas + prestamoSeleccionado.capital * prestamoSeleccionado.interes);
    return resultado;
  }

solicitarPrestamo()
*/ 

/* Array PRESTAMOS guardo en localStorage */




//localStorage.setItem('prestamos', JSON.stringify(prestamos));


/* Aplico DOM, EVENTOS, LOCALSTORAGE Y JSON  
Creo un objeto que guarda los datos ingresados por el usuario en el FORMULARIO que está en la página principal */
let formu = document.getElementById('formulario');

document.addEventListener('submit', funcionEnviar);

function funcionEnviar(event) {
  event.preventDefault();
  let nombre = document.getElementById('nombre').value;
  let apellido = document.getElementById('apellido').value;
  let edad = document.getElementById('edad').value;
  let telefono = document.getElementById('telefono').value;
  let correo = document.getElementById('correo').value;
  let proyecto = document.getElementById('proyecto').value;
  
  let objetoFormulario = {
    nombre,
    apellido,
    edad,
    telefono,
    correo,
    proyecto,
  }
  

  // Almaceno todo en localStorage. Agregar JSON.parse y console.log para verificar stringify y parse
  localStorage.setItem('formulario', JSON.stringify(objetoFormulario))
  let datosAlmacenados = JSON.parse(localStorage.getItem('formulario'));
  

  /* Una vez cargados los datos por el usuario, se remueve el formulario */
  document.getElementById('formulario').remove();
  document.getElementById('textoRemove').remove();
  
  /* Creo dos elementos. Un elemento P y un Button. Le agrego clases. */

  const newBtn = document.createElement('button');
  newBtn.classList.add('btn');
  newBtn.classList.add('btn-primary');
  newBtn.classList.add('mb-3');
  newBtn.classList.add('text-center');
  const newText = document.createElement('p');
  newText.classList.add('text-center');
  newText.classList.add('nuevo-texto');
  newBtn.textContent = 'Ver nuestros préstamos';
  newText.textContent = 'Bienvenido, a continuación podrás acceder a nuestros planes: ';

  /* Agrego un evento. Una vez que se le da click a "enviar", desaprece el formulario.
    Aparece un texto y un botón que te lleva a la pagina de prestamos */

  newBtn.addEventListener('click', function handleClick(event) {
    location.href='paginas/prestamos.html';
  })
  const cajita = document.createElement('div')
  cajita.classList.add('divCajita');
  cajita.appendChild(newText)
  cajita.appendChild(newBtn);
  document.getElementById('nuevoID').appendChild(cajita);

}
