
let formu = document.getElementById('formulario');
document.addEventListener('submit', funcionEnviar);

/* Función datos formulario */
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
  alertaSweet();
}

  /* Función para mostrar alerta que permita al usuario ir a la pagina de préstamos o seguir en la principal */
  function alertaSweet() {
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
    location.href='./prestamos.html';
  })
  const cajita = document.createElement('div')
  cajita.classList.add('divCajita');
  cajita.appendChild(newText)
  cajita.appendChild(newBtn);
  document.getElementById('nuevoID').appendChild(cajita);
}


/* Función para llamar API */
function apiDivisas() {
  fetch('https://api.bluelytics.com.ar/v2/latest')
  .then(response => response.json())
  .then(data => {
  document.getElementById('dolar-oficial-C').innerHTML = `DÓLAR BNA $${data.oficial.value_buy.toFixed(2)}`;
  document.getElementById('dolar-oficial-V').innerHTML = `DÓLAR BNA $${data.oficial.value_sell.toFixed(2)}`;
  document.getElementById('dolar-blue-C').innerHTML = `DÓLAR BLUE $${data.blue.value_buy.toFixed(2)}`;
  document.getElementById('dolar-blue-V').innerHTML = `DÓLAR BLUE $${data.blue.value_sell.toFixed(2)}`;
  document.getElementById('euro-oficial-C').innerHTML = `EURO BNA $${data.oficial_euro.value_buy.toFixed(2)}`;
  document.getElementById('euro-oficial-V').innerHTML = `EURO BNA $${data.oficial_euro.value_sell.toFixed(2)}`;
  document.getElementById('euro-blue-C').innerHTML = `EURO BLUE $${data.oficial_euro.value_sell.toFixed(2)}`;
  document.getElementById('euro-blue-V').innerHTML = `EURO BLUE $${data.oficial_euro.value_sell.toFixed(2)}`;
  })
  .catch(error => console.log(error));
  }

/* Función para animar API */
function animacionApi() {
setInterval(function() {
  $('.cotizaciones-container').animate({marginLeft: '-=200px'}, 1200, 'linear', function() {
      $(this).append($(this).children().first());
      $(this).css('margin-left', '0');
  });
}, 3000);
}

apiDivisas();
animacionApi(); 