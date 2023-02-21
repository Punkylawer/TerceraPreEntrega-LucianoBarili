/*                                      Primera Pre-entrega. 

    El proyecto final tendrá por objetivo la creación de sitio que ofrezca préstamos a sus clientes.

    En esta primera parte del trabajo, lo que planifiqué hacer era solicitarle al usuario que, ingresara su nombre
completo, su edad, y que en caso de ser mayor a 18 años, pudiera elegir diferentes opciones de préstamos y
cuotas para devolver dicho préstamo.

    Una vez elegido el préstamo al que quiere acceder el usuario y la cantidad de cuotas de devolución, el sistema
debe retornar el valor al que asciende cada una de las cuotas.

*/

let nombreYApellido = prompt('Ingrese su nombre y apellido : ');
let edadUsuario = parseInt(prompt('Ingrese su edad :'));

let prestamoA = 5000;
let prestamoB = 10000;
let prestamoC = 15000;

let cuotasA = 6;
let cuotasB = 12;
let cuotasC = 24;

let prestamoElegido;
let cantidadCuotas;



    function practico() {
    if(edadUsuario < 18) {
        alert('Siendo menor de edad no puede acceder a nuestros préstamos');
            } else {    
                alert('Felicitaciones, es mayor de edad y esta habilitado para continuar.');
                prestamoElegido = parseInt(prompt('Elija el préstamo en dolares al que quiere acceder : \n 1 - 5000 dls \n 2 - 10000 dls \n 3 - 15000 dls'));
                cantidadCuotas = parseInt(prompt('Elija la cantidad de cuotas que necesita para devolver el préstamo : \n 1 - 6 \n 2 - 12 \n 3 - 24'));
                let funcionCalculoCuotas;

                    while((prestamoElegido != 0 || prestamoElegido <= 3) && cantidadCuotas <= 3) {
                        switch(prestamoElegido) {
                            case 1:
                                prestamoElegido = prestamoA;                 
                                if(cantidadCuotas == 1) {  
                                    cantidadCuotas = cuotasA;
                                    funcionCalculoCuotas = calculoCuotas(prestamoElegido,cantidadCuotas);
                                    alert('Por el préstamo y cuotas elegidas, UD debera pagar por mes la suma de ' + funcionCalculoCuotas + 'USD')
                                    break;
                                }
                            case 1:
                                prestamoElegido = prestamoA;                 
                                if(cantidadCuotas == 2) {  
                                    cantidadCuotas = cuotasB;
                                    funcionCalculoCuotas = calculoCuotas(prestamoElegido,cantidadCuotas);
                                    alert('Por el préstamo y cuotas elegidas, UD debera pagar por mes la suma de ' + funcionCalculoCuotas + 'USD')
                                    break;
                                    }
                            case 1:
                                prestamoElegido = prestamoA;                 
                                if(cantidadCuotas == 3) {  
                                    cantidadCuotas = cuotasC;
                                    funcionCalculoCuotas = calculoCuotas(prestamoElegido,cantidadCuotas);
                                    alert('Por el préstamo y cuotas elegidas, UD debera pagar por mes la suma de ' + funcionCalculoCuotas + 'USD')
                                    break;
                                    }
                            case 2:
                                prestamoElegido = prestamoB;                 
                                if(cantidadCuotas == 1) {
                                    cantidadCuotas = cuotasA;
                                    funcionCalculoCuotas = calculoCuotas(prestamoElegido,cantidadCuotas);
                                    alert('Por el préstamo y cuotas elegidas, UD debera pagar por mes la suma de ' + funcionCalculoCuotas + 'USD')
                                    break;
                                }
                            case 2:
                                prestamoElegido = prestamoB;                 
                                if(cantidadCuotas == 2) {
                                    cantidadCuotas = cuotasB;
                                    funcionCalculoCuotas = calculoCuotas(prestamoElegido,cantidadCuotas);
                                    alert('Por el préstamo y cuotas elegidas, UD debera pagar por mes la suma de ' + funcionCalculoCuotas + 'USD')
                                    break;
                                    }
                            case 2:
                                prestamoElegido = prestamoB;                 
                                if(cantidadCuotas == 3) {
                                    cantidadCuotas = cuotasC;
                                    funcionCalculoCuotas = calculoCuotas(prestamoElegido,cantidadCuotas);
                                    alert('Por el préstamo y cuotas elegidas, UD debera pagar por mes la suma de ' + funcionCalculoCuotas + 'USD')
                                    break;
                                    }
                            case 3:
                                prestamoElegido = prestamoC;                 
                                if(cantidadCuotas == 1) {
                                    cantidadCuotas = cuotasA;
                                    funcionCalculoCuotas = calculoCuotas(prestamoElegido,cantidadCuotas).mathRound(funcionCalculoCuotas);
                                    alert('Por el préstamo y cuotas elegidas, UD debera pagar por mes la suma de ' + funcionCalculoCuotas + 'USD')
                                    break;
                                }
                            case 3:
                                prestamoElegido = prestamoC;                 
                                if(cantidadCuotas == 2) {
                                    cantidadCuotas = cuotasB;
                                    funcionCalculoCuotas = calculoCuotas(prestamoElegido,cantidadCuotas);
                                    alert('Por el préstamo y cuotas elegidas, UD debera pagar por mes la suma de ' + funcionCalculoCuotas + 'USD')
                                    break;
                                }
                            case 3:
                                prestamoElegido = prestamoC;                 
                                if(cantidadCuotas == 3) {
                                    cantidadCuotas = cuotasC;
                                    funcionCalculoCuotas = calculoCuotas(prestamoElegido,cantidadCuotas);
                                    alert('Por el préstamo y cuotas elegidas, UD debera pagar por mes la suma de ' + funcionCalculoCuotas + 'USD')
                                    break;
                                }
                            default: 
                                alert('Los valores ingresados no se corresponden a ninguno de los préstamos disponibles');
                            
                            }
                    }
                }
            }
    
        function calculoCuotas(prestamoElegido,cantidadCuotas) {
            let division = prestamoElegido / cantidadCuotas;
            return division;
        }
        
        practico();



/* Primera Pre-preentrrega - Segundo ejercicio 

Una vez finalizado el ejercicio con los prompts y alerts, ya en la página de la empresa, dejé una sección
donde el usuario consulte el promedio de edad de los clientes.

Se ingresan los valores en el primer input, y, en el segundo van apareciendo el promedio resultante de los números
ingresados.


*/

let diferentesEdades = [];

function registrarEdades(a) {
    if(a) {
        let resultado =parseInt(0);
        diferentesEdades.push(a);
        for (let i = 0; i < diferentesEdades.length; i++) {
            resultado = resultado + parseInt(diferentesEdades[i]) ;
        }
        document.getElementById("inputTres").value=resultado/diferentesEdades.length;
        document.getElementById("inputUno").value="";
    } else {
        alert('Este campo no puede quedar vacio, es obligatorio ingresar una edad');
    }
}

function limpiar() {
    diferentesEdades = [];
    document.getElementById("inputTres").value="";
}

function colorBoton() {
    document.getElementById('botonDale').style.backgroundColor="green";
}

