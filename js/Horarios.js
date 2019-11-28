$(document).ready(function () {

    let base = window.location.origin;
    let id = localStorage.getItem("id");
    $.ajax({
        url: base + "/api/usuarios/" + id,
        type: "GET",
        success: function (result) {
            $(".userfoto").attr("src", "/api/public/img/" + result.foto);
            $("#username").text(result.nombre + " " + result.apellidoPaterno + " " + result.apellidoMaterno);

            $.ajax({
                url: "/api/horarios",
                type: "GET",
                success: function (resulta2) {
                    //los pone en la tabla
                    resulta2.records.forEach(element => {
                        let dow;
                        switch (element.diaDeLaSemana) {
                            case '1':
                                dow = 'Lunes';
                                break;
                            case '2':
                                dow = 'Martes';
                                break;
                            case '3':
                                dow = 'Miercoles';
                                break;
                            case '4':
                                dow = 'Jueves';
                                break;
                            case '5':
                                dow = 'Viernes';
                                break;
                        }
                        $('tbody').append(
                            "<tr class='clickable-row' data-id=" + element.id + ">" +
                            "<td>" + dow + "</td>" +
                            "<td>" + element.hora.replace(/:00$/, "") + "</td>" +
                            "<td style='padding: 1px'><img src='/api/public/img/" + element.foto + "' alt='' class='rounded-circle' height='45px' width='45px'></td>" +
                            "<td>" + element.profesor + "</td>" +
                            "<td>" + element.salon + "</td>" +
                            "<td>" + element.curso + "</td>" +
                            "<td>" + element.grupo + "</td>" +
                            "<td>" + element.cicloEscolar + "</td>" +
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
                            let usrid = $(this).data("id");

                            //click en modificar
                            $('.card-header ul').children('li').eq(2).children('a').off();
                            $('.card-header ul').children('li').eq(2).children('a').click(function (e) {

                                e.preventDefault()
                                $(this).tab('show')

                                $('.card-header ul').children('li').eq(3).children('a').css("visibility", "hidden");
                                $.ajax({
                                    url: "/api/usuarios",
                                    type: "GET",
                                    success: function (result) {
                                        $('.card-body #modify #mod-profesor').empty();
                                        result.records.forEach(element => {
                                            if (element.category == 2) {
                                                $('.card-body #modify #mod-profesor').append(
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
                                        $('.card-body #modify #mod-curso').empty();
                                        result.records.forEach(element => {
                                            $('.card-body #modify #mod-curso').append(
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
                                        $('.card-body #modify #mod-grupo').empty();
                                        result.records.forEach(element => {
                                            $('.card-body #modify #mod-grupo').append(
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
                                        $('.card-body #modify #mod-salon').empty();
                                        result.records.forEach(element => {
                                            $('.card-body #modify #mod-salon').append(
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
                                //traer info 
                                $.ajax({
                                    url: "/api/horarios/" + usrid,
                                    type: "GET",
                                    success: function (x) {
                                        //los pone en la tabla
                                        $('.tab-pane#modify #mod-dow').val(x.diaDeLaSemana);
                                        $('.tab-pane#modify #mod-hora').val(x.hora.replace(/:00$/, ""));
                                        $('.tab-pane#modify #mod-cicloEscolar').val(x.cicloEscolar);
                                        $('.tab-pane#modify #mod-profesor').val(x.profesor);
                                        $('.tab-pane#modify #mod-curso').val(x.curso);
                                        $('.tab-pane#modify #mod-grupo').val(x.grupo);
                                        $('.tab-pane#modify #mod-salon').val(x.salon);

                                        $('#mod-btn').click(function (x) {
                                            let dow = $('.tab-pane#modify #mod-dow').val();
                                            let hora = $('.tab-pane#modify #mod-hora').val();
                                            let cicloEscolar = $('.tab-pane#modify #mod-cicloEscolar').val();
                                            let profesor = $('.tab-pane#modify #mod-profesor').val();
                                            let curso = $('.tab-pane#modify #mod-curso').val();
                                            let grupo = $('.tab-pane#modify #mod-grupo').val();
                                            let salon = $('.tab-pane#modify #mod-salon').val();
        
                                            $.ajax({
                                                url: "/api/validate/salon",
                                                type: "POST",
                                                dataType: 'json',
                                                data: JSON.stringify({
                                                    'salon': salon,
                                                    'hora': hora,
                                                    'diaDeLaSemana': dow,
                                                    'id': usrid
                                                }),
                                                success: function (x) {
                                                    $.ajax({
                                                        url: "/api/validate/grupo",
                                                        type: "POST",
                                                        dataType: 'json',
                                                        data: JSON.stringify({
                                                            'grupo': grupo,
                                                            'hora': hora,
                                                            'diaDeLaSemana': dow,
                                                            'id': usrid
                            
                                                        }),
                                                        success: function (x) {
                                                            $.ajax({
                                                                url: "/api/validate/profesor",
                                                                type: "POST",
                                                                dataType: 'json',
                                                                data: JSON.stringify({
                                                                    'profesor': profesor,
                                                                    'hora': hora,
                                                                    'diaDeLaSemana': dow,
                                                                    'id': usrid
                                                                }),
                                                                success: function (x) {
                                                                    $.ajax({
                                                                        url: "/api/horarios/"+usrid,
                                                                        type: "PATCH",
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
                                                                            alert("horario modificado");
                                                                            window.location.reload();
                                                                        },
                                                                        error: function (y) {
                                                                            alert("error al modificar el horario");
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
                                    error: function (n) {
                                        alert("error al cargar usuarios");
                                    }
                                });

                            });

                            //click en borrar
                            $('.card-header ul').children('li').eq(3).children('a').off();
                            $('.card-header ul').children('li').eq(3).children('a').click(function (e) {
                                e.preventDefault()
                                $(this).tab('show')
                                $('.modal').modal();
                                $('.modal button.btn-primary').click(function (params) {
                                    $.ajax({
                                        url: "/api/horarios/" + usrid,
                                        type: "DELETE",
                                        success: function (x) {
                                            alert("horario eliminado");
                                            window.location.reload();
                                        },
                                        error: function (y) {
                                            alert("error al eliminar el horario");
                                        }
                                    });
                                });
                            });
                        }
                    });

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
                        'hora': hora,
                        'diaDeLaSemana': dow
                    }),
                    success: function (x) {
                        $.ajax({
                            url: base + "/api/validate/grupo",
                            type: "POST",
                            dataType: 'json',
                            data: JSON.stringify({
                                'grupo': grupo,
                                'hora': hora,
                                'diaDeLaSemana': dow

                            }),
                            success: function (x) {
                                $.ajax({
                                    url: base + "/api/validate/profesor",
                                    type: "POST",
                                    dataType: 'json',
                                    data: JSON.stringify({
                                        'profesor': profesor,
                                        'hora': hora,
                                        'diaDeLaSemana': dow
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
            $('.card-body #add #profesor').empty();
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
            $('.card-body #add #curso').empty();
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
            $('.card-body #add #grupo').empty();
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
            $('.card-body #add #salon').empty();
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
    x.preventDefault();
    window.location.href = "/";
    localStorage.removeItem("id");
});
