/*                                     

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

function solicitarPrestamo(prestamoSeleccionado) {
    let resultado = Math.round(prestamoSeleccionado.capital / prestamoSeleccionado.cuotas + prestamoSeleccionado.capital * prestamoSeleccionado.interes);
    return resultado;
  }

solicitarPrestamo()
 

*/

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
  
  

  /* Agrego un evento. Una vez que se le da click a "enviar", desaprece el formulario.
    Aparece un texto y un botón que te lleva a la pagina de prestamos */

    Swal.fire({
      title: "Felitaciones, has completado el formulario correctamente!",
      showCancelButton: true,
      text: "Te interesaría acceder a nuestros planes de préstamos?",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero conocer los planes de prestamos disponibles',
      cancelButtonText: 'No por el momento'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Excelente',
          html: 'Haz click <a href="/prestamos.html">AQUÍ</a> para conocerlos',
          icon: 'success',
        })
        formu.remove();
      }
    })
    
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
  newText.textContent = 'Para el supuesto de que te interese acceder a nuestros préstamos mas tarde, aquí te dejamos el enlace ';



  newBtn.addEventListener('click', function handleClick(event) {
    location.href='/prestamos.html';
  })
  const cajita = document.createElement('div')
  cajita.classList.add('divCajita');
  cajita.appendChild(newText)
  cajita.appendChild(newBtn);
  document.getElementById('nuevoID').appendChild(cajita);

}
