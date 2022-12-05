//alert("estoy funcionando");
console.log('estoy funcionando');
//variables 
const xhttp = new XMLHttpRequest();
let res;
let Bciudad;
let Nciudad = [];
let Ntipo = [];
let uniqueCiudad = [];
let uniqueTipo = [];
let datos;

//inicializa select del documento HMTL
/*
$(document).ready(function(){
    $('select').formSelect();
  });
*/


//se trae las ciudades y tipos
function busquedaCiudadesResultadoCyT() {
    for (let contador of datos) {
        Nciudad.push(contador.Ciudad);
        Ntipo.push(contador.Tipo);
    }
}
// trae los elementos al HTML y los hace visibles


function busquedaCiudadesResultado() {
    res = document.querySelector('#res');

    res.innerHTML = ''; //aqui se esta limpiado todo
    for (let contador of datos) {
        Nciudad.push(contador.Ciudad);
        Ntipo.push(contador.Tipo);
    }

    for (let contador of datos) {
        res.innerHTML += `
<div class="card horizontal">
        <div class="card-image">
        <img src="img/home.jpg">
        </div>
    <div class="card-stacked">
        <div class="card-content">
            <div>
                <b>Direccion: ${contador.Direccion}</b>
                <p></p>
            </div>
            <div>
                <b>Ciudad: ${contador.Ciudad}</b>
                <p></p>
            </div>
            <div>
                <b>Telefono: ${contador.Telefono}</b>
                <p></p>
            </div>
            <div>
                <b>Código postal: ${contador.Codigo_Postal} </b>
                <p></p>
            </div>
            <div>
                <b>Precio: ${contador.Precio} </b>
                <p></p>
            </div>
            <div>
                <b>Tipo: ${contador.Tipo}</b>
                <p></p>
            </div>
        </div>
        <div class="card-action right-align">
            <a href="#">Ver más</a>
        </div>
    </div>
</div>`;



    }

}


//se trae los datos
xhttp.open('GET', 'data.json', true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        datos = JSON.parse(this.responseText);
        document.querySelector('#buscar').addEventListener('click', traerdatos);

        function traerdatos() {
            console.log('dentro de la función');
            // con esto se puede acceder a acada uno de os metodos

            xhttp.open('GET', 'data.json', true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let datos = JSON.parse(this.responseText);
                    //console.log(datos);

                    busquedaCiudadesResultado();
                    busquedaCiudadesResultadoCyT();

                    //console.log(Nciudad);

                    //sacar ciudades repetidas

                    Nciudad.forEach(function(item) {
                        if (!uniqueCiudad.includes(item)) {
                            uniqueCiudad.push(item);
                        }
                    });
                    console.log(uniqueCiudad);

                    //trae la ciudad seleccionada;

                    let resultado = "New York";
                    const Ciudades = datos.filter(function(c) {
                        return (c.Ciudad === resultado);
                    });
                    console.log(Ciudades);


                    //console.log(Ntipo);

                    //sacar ciudades Tipos

                    Ntipo.forEach(function(item) {
                        if (!uniqueTipo.includes(item)) {
                            uniqueTipo.push(item);
                        }
                    });
                    console.log(uniqueTipo);

                    //trae la ciudad seleccionada;

                    let resultado2 = "Casa de Campo";
                    const Tipo = datos.filter(function(c) {
                        return (c.Tipo === resultado);
                    });
                    console.log(Tipo);



                }



            }
        }
    }
}