//alert("estoy funcionando");
console.log('estoy funcionando');

//document.querySelector('#boton').addEventListener('click', trardatos()); //ejecuta todo
document.querySelector('#boton').addEventListener('click', trardatos); //AQui solo esta ejecuntando el botón


function trardatos() {
    console.log('dentro de la función');
    const xhttp = new XMLHttpRequest(); // con esto se puede acceder a acada uno de os metodos
    xhttp.open('GET', 'data.json', true);

    xhttp.send();
    //se va a conseguir una respuesta unavez todo enviado
    xhttp.onreadystatechange = function() {
        //se presunta por los estatus
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            //console.log(datos);
            let res = document.querySelector('#res');
            res.innerHTML = ''; //aqui se esta limpiado todo

            for (let contador of datos) {
                //console.log(contador.Direccion);
                //res.innerHTML += `<li><a href="#"> ${contador.Direccion}</a></li>`; no usar comillas simples usar esta (`)
                res.innerHTML += `                
					<tr> 
						<td> ${contador.Id}</td>
						<td>${contador.Direccion}</td > 
						<td > ${ contador.Ciudad} </td> 
						<td >${contador.Telefono}</td > 
						<td> ${ contador.Codigo_Postal}</td> 
						<td> ${contador.Tipo}</td > 
						<td> ${contador.Precio}</td> 
					</tr>`
            }
        }
    }
}

function trardatoss() {

    fetch('data.json')
        .then(res => res.json())
        .then(data => console.log(data))

}