//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    prefix: "$"
})

function setSearch() {
    $(document).ready(function() {
        $('select').material_select();
    });
    let busqueda = $('#checkPersonalizada')
    busqueda.on('change', (e) => {
        if (this.customSearch == false) {
            this.customSearch = true
        } else {
            this.customSearch = false
        }
        $('#personalizada').toggleClass('invisible')
    })
    return busqueda;
}

setSearch()