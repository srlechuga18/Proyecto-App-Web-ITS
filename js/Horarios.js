$(document).ready(function () {

    let base = window.location.origin;
    let id = localStorage.getItem("id");
    $.ajax({
        url: base + "/api/usuarios/" + id,
        type: "GET",
        success: function (result) {
            console.log(result);
            $(".userfoto").attr("src", "/api/public/img/" + result.foto);
            $("#username").text(result.nombre + " " + result.apellidoPaterno + " " + result.apellidoMaterno);

            $.ajax({
                url: "/api/horarios",
                type: "GET",
                success: function (resulta2) {
                    //los pone en la tabla
                    resulta2.records.forEach(element => {
                        let hora = element.hora.replace(/:00$/,"");
                        $('tbody').append(
                            "<tr class='clickable-row' data-id=" + element.id + ">" +
                            "<td style='padding: 1px'><img src='/api/public/img/" + element.foto + "' alt='' class='rounded-circle' height='45px' width='45px'></td>" +
                            "<td>" + element.nombre + "</td>" +
                            "<td>" + element.apellidoPaterno + "</td>" +
                            "<td>" + element.apellidoMaterno + "</td>" +
                            "<td>" + element.email + "</td>" +
                            "<td>" + element.turno + "</td>" +
                            "<td>" + category + "</td>" +
                            "</tr>");
                    });
                    //les da formato
                    //$('.table').DataTable();
                    //highlight de las columnas
                    /* $('.table').on('click', '.clickable-row', function (event) {
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
                            let usrid = $(this).data("id"); */

                    //click en modificar
                    /* $('.card-header ul').children('li').eq(2).children('a').off();
                    $('.card-header ul').children('li').eq(2).children('a').click(function (e) {

                        e.preventDefault()
                        $(this).tab('show')

                        $('.card-header ul').children('li').eq(3).children('a').css("visibility", "hidden");
                        //traer info 
                        $.ajax({
                            url: base + "/api/usuarios/" + usrid,
                            type: "GET",
                            success: function (n) {
                                $('.tab-pane#modify #email2').val(n.email);
                                $('.tab-pane#modify #nombre').val(n.nombre);
                                $('.tab-pane#modify #apellidoPaterno2').val(n.apellidoPaterno);
                                $('.tab-pane#modify #apellidoMaterno2').val(n.apellidoMaterno);
                                $('.tab-pane#modify #turno2').val(n.turno);

                                //modify data
                                $('#modify-dts-btn').click(function (x) {
                                    let email = $('.tab-pane#modify #email2').val();
                                    let nombre = $('.tab-pane#modify #nombre').val();
                                    let apellidoPaterno = $('.tab-pane#modify #apellidoPaterno2').val();
                                    let apellidoMaterno = $('.tab-pane#modify #apellidoMaterno2').val();
                                    let turno = $('.tab-pane#modify #turno2').val();

                                    $.ajax({
                                        url: base + "/api/usuarios/" + usrid,
                                        type: "PATCH",
                                        data: JSON.stringify({
                                            'nombre': nombre,
                                            'apellidoPaterno': apellidoPaterno,
                                            'apellidoMaterno': apellidoMaterno,
                                            'email': email,
                                            'turno': turno
                                        }),
                                        success: function (x) {
                                            alert("datos modificados");
                                            window.location.reload();
                                        },
                                        error: function (x) {
                                            alert("error al modificar los datos");
                                        }
                                    });
                                });

                            },
                            error: function (n) {
                                alert("error al cargar usuarios");
                            }
                        });

                    });
*/
                    //click en borrar
                    /* $('.card-header ul').children('li').eq(3).children('a').off();
                    $('.card-header ul').children('li').eq(3).children('a').click(function (e) {
                        e.preventDefault()
                        $(this).tab('show')
                        $('.modal').modal();
                        $('.modal button.btn-primary').click(function (params) {
                            $.ajax({
                                url: base + "/api/usuarios/" + usrid,
                                type: "DELETE",
                                success: function (x) {
                                    alert("usuario eliminado");
                                    window.location.reload();
                                },
                                error: function (y) {
                                    alert("error al eliminar el usuario");
                                }
                            });
                        });
                    }); */
                    //}
                    //});

                },
                error: function (resp) {
                    alert("No se encontrarn horarios");
                }
            });

            $('#add-btn').click(function (x) {
                let dow = $('.tab-pane#add #dow').val();
                let hora = $('.tab-pane#add #hora').val();
                let cicloEscolar = $('.tab-pane#add #cicloEscolar').val();
                let profesor = $('.tab-pane#add #profesor').val();
                let curso = $('.tab-pane#add #curso').val();
                let grupo = $('.tab-pane#add #grupo').val();
                let salon = $('.tab-pane#add #salon').val();
                //validar salon hora
                $.ajax({
                    url: base + "/api/validate/salon",
                    type: "POST",
                    dataType: 'json',
                    data: JSON.stringify({
                        'salon': salon,
                        'hora': hora
                    }),
                    success: function (x) {
                        $.ajax({
                            url: base + "/api/validate/grupo",
                            type: "POST",
                            dataType: 'json',
                            data: JSON.stringify({
                                'grupo': grupo,
                                'hora': hora
                            }),
                            success: function (x) {
                                $.ajax({
                                    url: base + "/api/validate/profesor",
                                    type: "POST",
                                    dataType: 'json',
                                    data: JSON.stringify({
                                        'profesor': profesor,
                                        'hora': hora
                                    }),
                                    success: function (x) {
                                        $.ajax({
                                            url: base + "/api/horarios",
                                            type: "POST",
                                            dataType: 'json',
                                            data: JSON.stringify({
                                                'diaDeLaSemana': dow,
                                                'hora': hora,
                                                'cicloEscolar': cicloEscolar,
                                                'profesor': profesor,
                                                'curso': curso,
                                                'grupo': grupo,
                                                'salon': salon
                                            }),
                                            success: function (x) {
                                                alert("horario creado");
                                                window.location.reload();
                                            },
                                            error: function (y) {
                                                alert("error al crear el horario");
                                            }
                                        });
                                    },
                                    error: function (y) {
                                        alert('Este profesor se encuentra ocupado');
                                    }
                                });
                            },
                            error: function (y) {
                                alert('Este grupo se encuentra ocupado');
                            }
                        });
                    },
                    error: function (y) {
                        alert('Este salon se encuentra ocupado');
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

    $(this).tab('show');
    $.ajax({
        url: "/api/usuarios",
        type: "GET",
        success: function (result) {
            result.records.forEach(element => {
                if (element.category == 2) {
                    $('.card-body #add #profesor').append(
                        "<option value=" + element.id + ">"
                        + element.nombre + " " + element.apellidoPaterno + " " + element.apellidoMaterno +
                        "</option>"
                    );
                }
            });
        },
        error: function (resp) {
            alert("error al consultar profesores");
        }
    });
    $.ajax({
        url: "/api/cursos",
        type: "GET",
        success: function (result) {
            result.records.forEach(element => {
                $('.card-body #add #curso').append(
                    "<option value=" + element.id + ">"
                    + element.nombre +
                    "</option>"
                );
            });
        },
        error: function (resp) {
            alert("error al consultar cursos");
        }
    });
    $.ajax({
        url: "/api/grupos",
        type: "GET",
        success: function (result) {
            result.records.forEach(element => {
                $('.card-body #add #grupo').append(
                    "<option value=" + element.id + ">"
                    + element.semestre + " " + element.nombre +
                    "</option>"
                );
            });
        },
        error: function (resp) {
            alert("error al consultar cursos");
        }
    });
    $.ajax({
        url: "/api/salones",
        type: "GET",
        success: function (result) {
            result.records.forEach(element => {
                $('.card-body #add #salon').append(
                    "<option value=" + element.id + ">"
                    + element.nombre + " " + element.edificio +
                    "</option>"
                );
            });
        },
        error: function (resp) {
            alert("error al consultar cursos");
        }
    });
});

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$("#log-out").click(function (x) {
    localStorage.removeItem("id");
    window.location.href = "/";
});