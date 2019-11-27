$(document).ready(function () {
            
    let base = window.location.origin;
    let id = localStorage.getItem("id");
    $.ajax({
        url: base + "/api/usuarios/" + id,
        type: "GET",
        success: function (result) {
            console.log(result);
            $(".userfoto").attr("src","/api/public/img/"+result.foto);
            $("#username").text(result.nombre +" "+ result.apellidoPaterno +" "+ result.apellidoMaterno);


            $('#add-btn').click(function (x) {
                let nombre = $('.tab-pane#add #nombre').val();
                let edificio = $('.tab-pane#add #edificio').val();
                let ubicacion = $('.tab-pane#add #ubi').val();
                    $.ajax({
                        url: base + "/api/salones",
                        type: "POST",
                        dataType: 'json',
                        data: JSON.stringify({
                            'nombre': nombre,
                            'edificio': edificio,
                            'ubicacion': ubicacion
                        }),
                        success: function (x) {
                            console.log(x);
                            alert("salon creado");
                            window.location.reload();
                        },
                        error: function (y) {
                            alert("error al crear el salon");
                        }
                    });

            });

        },
        error: function (resp) {
            alert("inicie sesion");
            window.location.href = "/";
        }
    });

});

$('#crud a').click(function (e) {
    e.preventDefault()
    if ($('.table .clickable-row').hasClass('bg-info')) {
        $('.table .clickable-row').removeClass('bg-info');
    }
    $('.card-header ul').children('li').eq(2).children('a').css("visibility", "hidden");
    $('.card-header ul').children('li').eq(3).children('a').css("visibility", "hidden");
    $(this).tab('show')
});


$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$("#log-out").click(function (x) {
    localStorage.removeItem("id");
    window.location.href = "/";
});