window.onload=setPage;

function setPage() {
let formu = document.getElementById('div1');

let datosAlmacenados = JSON.parse(localStorage.getItem('prestamos'));

for(i = 0; i < datosAlmacenados.length; i ++) {
    
    const texto = document.createElement('p');
    texto.textContent = datosAlmacenados[i].nombre;
    formu.appendChild(texto);

}
}


/*Dentro del for tengo que hacer lo que hicimos en el index, de generar un div con adentro un parrafo
con etiqueta P lo puedo hacer, y eso lo voy a meter dentro de un div. Ese div se lo tengo que meter a
la variable formu. Le pongo un boton que sea agregar, y a ese boton le agrego un evento haciendo que
esa informacion que tengo en la cajita div del numero de plan que se guarde en otro arreglo.

Modificaria la P de texto por div y ahi adentro crearia las otras etiquetas.

draw.io
*/