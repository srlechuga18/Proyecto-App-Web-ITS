$(document).ready(function () {

    let base = window.location.origin;
    let id = localStorage.getItem("id");
    //trae datos del usuario actual
    $.ajax({
        url: base + "/api/usuarios/" + id,
        type: "GET",
        success: function (result) {
            //pone foto y nombre del usuario
            $(".userfoto").attr("src", "/api/public/img/" + result.foto);
            $("#username").text(result.nombre + " " + result.apellidoPaterno + " " + result.apellidoMaterno);

            //trae todos los usuarios 
            $.ajax({
                url: base + "/api/usuarios",
                type: "GET",
                success: function (resulta2) {
                    //los pone en la tabla
                    resulta2.records.forEach(element => {
                        $('tbody').append(
                            "<tr class='clickable-row' data-id=" + element.id + ">" +
                            "<td style='padding: 1px'><img src='/api/public/img/" + element.foto + "' alt='' class='rounded-circle' height='45px' width='45px'></td>" +
                            "<td>" + element.nombre + "</td>" +
                            "<td>" + element.apellidoPaterno + "</td>" +
                            "<td>" + element.apellidoMaterno + "</td>" +
                            "<td>" + element.email + "</td>" +
                            "<td>" + element.turno + "</td>" +
                            "</tr>");
                    });
                    //les da formato
                    $('.table').DataTable();
                    //highlight de las columnas
                    $('.table').on('click', '.clickable-row', function (event) {
                        if ($(this).hasClass('bg-info')) {
                            $(this).removeClass('bg-info');
                            //esconde los botones de modificar y borrar
                            $('.card-header ul').children('li').eq(2).children('a').css("visibility", "hidden");
                            $('.card-header ul').children('li').eq(3).children('a').css("visibility", "hidden");
                        } else {
                            $(this).addClass('bg-info').siblings().removeClass('bg-info');
                            //muestra los botones de modificar y borrar
                            $('.card-header ul').children('li').eq(2).children('a').css("visibility", "visible");
                            $('.card-header ul').children('li').eq(3).children('a').css("visibility", "visible");

                            //guarda el id del usuario seleccionado
                            let id = $(this).data("id");

                            //click en modificar
                            $('.card-header ul').children('li').eq(2).children('a').off();
                            $('.card-header ul').children('li').eq(2).children('a').click(function (e) {
                                console.log(id);
                                e.preventDefault()
                                $(this).tab('show')
                            });

                            //click en borrar
                            $('.card-header ul').children('li').eq(3).children('a').off();
                            $('.card-header ul').children('li').eq(3).children('a').click(function (e) {
                                console.log(id);
                                e.preventDefault()
                                $(this).tab('show')
                            });
                        }
                    });

                },
                error: function (resp) {
                    alert("error al cargar usuarios");
                }
            });

            $('#add-btn').click(function (x) {
                let pass = $('.tab-pane#add #pwd').val();
                let email = $('.tab-pane#add #email').val();
                let nombre = $('.tab-pane#add #usr').val();
                let apellidoPaterno = $('.tab-pane#add #apellidoPaterno').val();
                let apellidoMaterno = $('.tab-pane#add #apellidoMaterno').val();
                let turno = $('.tab-pane#add #turno').val();
                let category = $('.tab-pane#add #cat').val();
                let file = document.querySelector('input[type=file]').files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                    $.ajax({
                        url: base + "/api/usuarios",
                        type: "POST",
                        dataType: 'json',
                        data: JSON.stringify({
                            'pass': pass,
                            'email': email,
                            'nombre': nombre,
                            'apellidoPaterno': apellidoPaterno,
                            'apellidoMaterno': apellidoMaterno,
                            'turno': turno,
                            'foto': reader.result,
                            'category': category
                        }),
                        success: function (x) {
                            console.log(x);
                            alert("usuario creado");
                            window.location.reload();
                        },
                        error: function (y) {
                            alert("error al crear el usuario");
                        }
                    });
                }

            });

        },
        error: function (resp) {
            alert("inicie sesion");
            window.location.href = "/";
        }
    });

});

//cambiar entre tabs 
$('#crud a').click(function (e) {
    e.preventDefault()
    if ($('.table .clickable-row').hasClass('bg-info')) {
        $('.table .clickable-row').removeClass('bg-info');
    }
    $('.card-header ul').children('li').eq(2).children('a').css("visibility", "hidden");
    $('.card-header ul').children('li').eq(3).children('a').css("visibility", "hidden");
    $(this).tab('show')
});

//side panel
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

//log out
$("#log-out").click(function (x) {
    localStorage.removeItem("id");
    window.location.href = "/";
});

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});