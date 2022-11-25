//alert("estoy funcionando");
console.log('estoy funcionando');
document.querySelector('#buscar').addEventListener('click', traerdatos);

function traerdatos() {
    console.log('dentro de la función');
    // con esto se puede acceder a acada uno de os metodos
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'data.json', true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            //console.log(datos);
            let res = document.querySelector('#res');
            res.innerHTML = ''; //aqui se esta limpiado todo
            let Bciudad, Nciudad = [''],
                uniqueCiudad = [];

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

                Nciudad.push(contador.Ciudad);

            }




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
            //console.log(Ciudades);


        }



    }
}