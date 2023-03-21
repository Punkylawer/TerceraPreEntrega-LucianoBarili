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
  { nombre: "Plan 0", capital: 500000,cuotas: 6, interes: 0.10 },
  { nombre: "Plan 1", capital: 500000,cuotas: 12, interes: 0.20},
  { nombre: "Plan 2",capital: 500000,cuotas: 24, interes: 0.30},
  { nombre: "Plan 3",capital: 1000000,cuotas: 6 , interes: 0.10 },
  { nombre: "Plan 4",capital: 1000000,cuotas: 12, interes: 0.20 },
  { nombre: "Plan 5",capital: 1000000,cuotas: 24, interes: 0.30 },
  { nombre: "Plan 6",capital: 2000000,cuotas: 6, interes: 0.10 },
  { nombre: "Plan 7",capital: 2000000,cuotas: 12, interes: 0.20 },
  { nombre: "Plan 8",capital: 2000000,cuotas: 24, interes: 0.30 }
];



function eleccionPrestamo() {
  let planes = "";
  prestamos.forEach(function(currentElement,  index) { 
  planes = planes + "\n Plan " + index + " :  con un Capital de $" + currentElement.capital + " y "+ currentElement.cuotas + " cuotas de financiación." 
})

  let prestamoAElegir = parseInt(prompt("Por favor, elija el préstamo al que quiera acceder: " + planes));
  return prestamoAElegir;
}


function solicitarPrestamo() {
  let edadUsuario = parseInt(prompt('Ingrese su edad. Recuerde que para acceder a nuestros préstamos debe ser mayor a 18 años.'));
  if(edadUsuario < 18) {
    alert('La edad ingresada no lo habilita a acceder a nuestros préstamos');
  } else {
    let prestamoAElegir = eleccionPrestamo();
    let prestamoSeleccionado = prestamos[prestamoAElegir];
    let resultado = Math.round(prestamoSeleccionado.capital / prestamoSeleccionado.cuotas + prestamoSeleccionado.capital * prestamoSeleccionado.interes);
    alert(`El valor mensual de la cuota para la devolución del préstamo que has solicitado, asciende a la suma de $  ${resultado}.`)
    return resultado;
  }
}

solicitarPrestamo()
*/

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
  console.log(objetoFormulario);
  localStorage.setItem('formulario', JSON.stringify(objetoFormulario))
  
  // Agregar JSON.parse y console.log para verificar stringify y parse
  let datosAlmacenados = JSON.parse(localStorage.getItem('formulario'));
  console.log(datosAlmacenados);

}


/*

a)
Tengo que guardar el objetoFormulario, para guardar los datos ingresados por los usuarios, 
cada uno en un objetoFormulario
b)
Tengo que crear una funcion que inserte un html en el html original mediante el cual luego del evento Submit 
del formulario, aparezca al lado de enviar un nuevo boton que sea "ir a los préstamos"
c) agregar funciones a cada input con estructura if para validar y limitar ciertas cuestiones.
Ejemplo. en edad un if que diga que el numero tecleado tiene que ir entre 1 y 120
en numero de telefono, agregar el pre fijo local de alguna manera 
en correo electronico solicitar el arroba

*/


