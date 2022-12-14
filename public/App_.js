let Nciudad = [];
let Ntipo = [];
let uniqueCiudad = [];
let uniqueTipo = [];
let datos;

document.addEventListener('click', traerdatos());

function traerdatos() {
    console.log('dentro de la funcion');

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'data.json', true);

    xhttp.send();

    xhttp.onload = function() {

        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            datos = JSON.parse(this.responseText);
            //console.log(datos);

            //se trae las ciudades y tipos

            for (let contador of datos) {
                Nciudad.push(contador.Ciudad);
                Ntipo.push(contador.Tipo);
            }

            //sacar ciudades repetidas

            Nciudad.forEach(function(item) {
                if (!uniqueCiudad.includes(item)) {
                    uniqueCiudad.push(item);
                }
            });
            //console.log(uniqueCiudad);

            //sacar ciudades Tipos

            Ntipo.forEach(function(item) {
                if (!uniqueTipo.includes(item)) {
                    uniqueTipo.push(item);
                }
            });
            //console.log(uniqueTipo);

            $(document).ready(function() {
                $('select').material_select();
            });
            //console.log("en la funcion select");
            let ciudadS = document.querySelector('#ciudad');

            uniqueCiudad.forEach(function(numero) {
                //console.log(numero);
                ciudadS.innerHTML += `<option value = "${numero}" >${numero}</option>`;
            });

            //console.log("en la funcion select");
            let tipoS = document.querySelector('#tipo');

            uniqueTipo.forEach(function(numero) {
                //console.log(numero);
                tipoS.innerHTML += `<option value = "${numero}" >${numero}</option>`;
            });


        }

    }
}
//llena el resultado de la busqueda

function busquedaCiudadesResultado(busqueda) {
    res = document.querySelector('#res');

    res.innerHTML = ''; //aqui se esta limpiado todo


    for (let contador of busqueda) {
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


document.querySelector('#buscar').addEventListener('click', tarerCiudades);

function tarerCiudades() {
    let ciudadesSelect = document.getElementById('ciudad');
    let ciudadSelect = ciudadesSelect.value;
    //alert(ciudadSelect);

    let tiposSelect = document.getElementById('tipo');
    let tipoSelect = tiposSelect.value;
    //alert(tipoSelect + ' y ' + ciudadSelect);

    let ciudadesPrecios = document.getElementById('rangoPrecio');
    let ciudadesPrecio = ciudadesPrecios.value;
    let rango = ciudadesPrecio.split(';');
    let base = rango[0],
        limite = rango[1];
    let preciosCiudades = [''];
    console.log('es la base' +
        base + 'y  :' +
        typeof(base) + 'rango es: ' + rango);
    console.log('limite');
    console.log(limite);

    //1000;100000

    //busqueda por ciudades

    if (ciudadSelect !== '' && tipoSelect === '') {
        let resultado = ciudadSelect;
        const Ciudades = datos.filter(function(c) {
            return (c.Ciudad === resultado);
        });
        //console.log(Ciudades);
        busquedaCiudadesResultado(Ciudades);
    }

    //busqueda por tipo

    if (tipoSelect !== '' && ciudadSelect === '') {
        let resultado2 = tipoSelect;
        const Tipos = datos.filter(function(c) {
            return (c.Tipo === resultado2);
        });
        console.log(Tipos);
        busquedaCiudadesResultado(Tipos);
    }

    //busqueda por ciudades y tipos

    if (tipoSelect !== '' && ciudadSelect !== '') {
        let resultado = ciudadSelect;
        const Ciudades = datos.filter(function(c) {
            return (c.Ciudad === resultado);
        });


        let resultado2 = tipoSelect;
        const Tipos = Ciudades.filter(function(c) {
            return (c.Tipo === resultado2);
        });
        console.log(Tipos);
        busquedaCiudadesResultado(Tipos);
    }



    //trae las ciudades con precios 
    if (tipoSelect === '' && ciudadSelect === '' && limite !== '') {
        preciosCiudades = [];
        for (let contador of datos) {

            busquedaNumero = conversioAnumero(contador.Precio);

            //console.log(busquedaNumero);

            if (busquedaNumero >= limite) {

                let precioEncontrado = contador.Precio;

                let resultado2 = precioEncontrado;
                const Precios = datos.filter(function(c) {
                    return (c.Precio === resultado2);
                });

                preciosCiudades.push(Precios);

            }

        }

        console.log(preciosCiudades);
        busquedaCiudadesResultado(preciosCiudades);
    }
    // trae todos las ciudades y tipos

    if (tipoSelect === '' && ciudadSelect === '' && preciosCiudades[0] === '') {
        busquedaCiudadesResultado(datos);
    }


    function conversioAnumero(precioEnviado) {
        let numeros = precioEnviado.replace("$", "");
        let numero = numeros.replace(",", "");
        //console.log(parseInt(numero));
        return parseInt(numero);
    }

}