$(document).ready(function() {

    let base = window.location.origin;
    let id = localStorage.getItem("id");
    $.ajax({
        url: base + "/api/usuarios/" + id,
        type: "GET",
        success: function(result) {
            $(".userfoto").attr("src", "/api/public/img/" + result.foto);
            $("#username").text(result.nombre + " " + result.apellidoPaterno + " " + result.apellidoMaterno);

            $.ajax({
                url: "/api/usuarios",
                type: "GET",
                success: function(result) {
                    result.records.forEach(element => {
                        if (element.category == 2) {
                            $('.card-body #show #profesor-show').append(
                                "<option value=" + element.id + ">" +
                                element.nombre + " " + element.apellidoPaterno + " " + element.apellidoMaterno +
                                "</option>"
                            );
                        }
                    });

                },
                error: function(resp) {
                    alert("error al consultar profesores");
                }
            });

            searchAll();

            $('#show-btn').click(function(x) {
                if ($('.card-body #show #profesor-show').val() == 'todos') {
                    searchAll();
                } else {
                    searchUser($('.card-body #show #profesor-show').val());
                }
            });

            $('#add-btn').click(function(x) {
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
                    success: function(x) {
                        $.ajax({
                            url: base + "/api/validate/grupo",
                            type: "POST",
                            dataType: 'json',
                            data: JSON.stringify({
                                'grupo': grupo,
                                'hora': hora,
                                'diaDeLaSemana': dow

                            }),
                            success: function(x) {
                                $.ajax({
                                    url: base + "/api/validate/profesor",
                                    type: "POST",
                                    dataType: 'json',
                                    data: JSON.stringify({
                                        'profesor': profesor,
                                        'hora': hora,
                                        'diaDeLaSemana': dow
                                    }),
                                    success: function(x) {
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
                                            success: function(x) {
                                                alert("horario creado");
                                                window.location.reload();
                                            },
                                            error: function(y) {
                                                alert("error al crear el horario");
                                            }
                                        });
                                    },
                                    error: function(y) {
                                        alert('Este profesor se encuentra ocupado');
                                    }
                                });
                            },
                            error: function(y) {
                                alert('Este grupo se encuentra ocupado');
                            }
                        });
                    },
                    error: function(y) {
                        alert('Este salon se encuentra ocupado');
                    }
                });

            });

        },
        error: function(resp) {
            alert("inicie sesion");
            window.location.href = "/";
        }
    });

});

$('#crud a').click(function(e) {
    e.preventDefault()
    if ($('.table .clickable-row').hasClass('bg-danger')) {
        $('.table .clickable-row').removeClass('bg-danger');
    }
    $('.card-header ul').children('li').eq(2).children('a').css("visibility", "hidden");
    $('.card-header ul').children('li').eq(3).children('a').css("visibility", "hidden");

    $(this).tab('show');
    $.ajax({
        url: "/api/usuarios",
        type: "GET",
        success: function(result) {
            $('.card-body #add #profesor').empty();
            result.records.forEach(element => {
                if (element.category == 2) {
                    $('.card-body #add #profesor').append(
                        "<option value=" + element.id + ">" +
                        element.nombre + " " + element.apellidoPaterno + " " + element.apellidoMaterno +
                        "</option>"
                    );
                }
            });
        },
        error: function(resp) {
            alert("error al consultar profesores");
        }
    });
    $.ajax({
        url: "/api/cursos",
        type: "GET",
        success: function(result) {
            $('.card-body #add #curso').empty();
            result.records.forEach(element => {
                $('.card-body #add #curso').append(
                    "<option value=" + element.id + ">" +
                    element.nombre +
                    "</option>"
                );
            });
        },
        error: function(resp) {
            alert("error al consultar cursos");
        }
    });
    $.ajax({
        url: "/api/grupos",
        type: "GET",
        success: function(result) {
            $('.card-body #add #grupo').empty();
            result.records.forEach(element => {
                $('.card-body #add #grupo').append(
                    "<option value=" + element.id + ">" +
                    element.semestre + " " + element.nombre +
                    "</option>"
                );
            });
        },
        error: function(resp) {
            alert("error al consultar cursos");
        }
    });
    $.ajax({
        url: "/api/salones",
        type: "GET",
        success: function(result) {
            $('.card-body #add #salon').empty();
            result.records.forEach(element => {
                $('.card-body #add #salon').append(
                    "<option value=" + element.id + ">" +
                    element.nombre + " " + element.edificio +
                    "</option>"
                );
            });
        },
        error: function(resp) {
            alert("error al consultar cursos");
        }
    });
});

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$("#log-out").click(function(x) {
    x.preventDefault();
    window.location.href = "/";
    localStorage.removeItem("id");
});

//highlight de las columnas
$('.table').on('click', '.clickable-row', function(event) {
    if ($(this).hasClass('bg-danger')) {
        $(this).removeClass('bg-danger');
        //esconde los botones de modificar y borrar
        $('.card-header ul').children('li').eq(2).children('a').css("visibility", "hidden");
        $('.card-header ul').children('li').eq(3).children('a').css("visibility", "hidden");
    } else {
        $('tbody tr .bg-danger').removeClass('bg-danger');
        $(this).addClass('bg-danger');
        //muestra los botones de modificar y borrar

        if ($(this).data("id") != '') {
            $('.card-header ul').children('li').eq(2).children('a').css("visibility", "visible");
            $('.card-header ul').children('li').eq(3).children('a').css("visibility", "visible");
        } else {
            $('.card-header ul').children('li').eq(2).children('a').css("visibility", "hidden");
            $('.card-header ul').children('li').eq(3).children('a').css("visibility", "hidden");
        }
        //guarda el id del usuario seleccionado
        let usrid = $(this).data("id");
        console.log(usrid);
        //click en modificar
        $('.card-header ul').children('li').eq(2).children('a').off();
        $('.card-header ul').children('li').eq(2).children('a').click(function(e) {

            e.preventDefault()
            $(this).tab('show')

            $('.card-header ul').children('li').eq(3).children('a').css("visibility", "hidden");
            $.ajax({
                url: "/api/usuarios",
                type: "GET",
                success: function(result) {
                    $('.card-body #modify #mod-profesor').empty();
                    result.records.forEach(element => {
                        if (element.category == 2) {
                            $('.card-body #modify #mod-profesor').append(
                                "<option value=" + element.id + ">" +
                                element.nombre + " " + element.apellidoPaterno + " " + element.apellidoMaterno +
                                "</option>"
                            );
                        }
                    });
                },
                error: function(resp) {
                    alert("error al consultar profesores");
                }
            });
            $.ajax({
                url: "/api/cursos",
                type: "GET",
                success: function(result) {
                    $('.card-body #modify #mod-curso').empty();
                    result.records.forEach(element => {
                        $('.card-body #modify #mod-curso').append(
                            "<option value=" + element.id + ">" +
                            element.nombre +
                            "</option>"
                        );
                    });
                },
                error: function(resp) {
                    alert("error al consultar cursos");
                }
            });
            $.ajax({
                url: "/api/grupos",
                type: "GET",
                success: function(result) {
                    $('.card-body #modify #mod-grupo').empty();
                    result.records.forEach(element => {
                        $('.card-body #modify #mod-grupo').append(
                            "<option value=" + element.id + ">" +
                            element.semestre + " " + element.nombre +
                            "</option>"
                        );
                    });
                },
                error: function(resp) {
                    alert("error al consultar cursos");
                }
            });
            $.ajax({
                url: "/api/salones",
                type: "GET",
                success: function(result) {
                    $('.card-body #modify #mod-salon').empty();
                    result.records.forEach(element => {
                        $('.card-body #modify #mod-salon').append(
                            "<option value=" + element.id + ">" +
                            element.nombre + " " + element.edificio +
                            "</option>"
                        );
                    });
                },
                error: function(resp) {
                    alert("error al consultar cursos");
                }
            });
            //traer info 
            $.ajax({
                url: "/api/horarios/" + usrid,
                type: "GET",
                success: function(x) {
                    //los pone en la tabla
                    $('.tab-pane#modify #mod-dow').val(x.diaDeLaSemana);
                    $('.tab-pane#modify #mod-hora').val(x.hora.replace(/:00$/, ""));
                    $('.tab-pane#modify #mod-cicloEscolar').val(x.cicloEscolar);
                    $('.tab-pane#modify #mod-profesor').val(x.profesor);
                    $('.tab-pane#modify #mod-curso').val(x.curso);
                    $('.tab-pane#modify #mod-grupo').val(x.grupo);
                    $('.tab-pane#modify #mod-salon').val(x.salon);

                    $('#mod-btn').click(function(x) {
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
                            success: function(x) {
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
                                    success: function(x) {
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
                                            success: function(x) {
                                                console.log(dow,hora,cicloEscolar,profesor,curso,grupo,salon);
                                                $.ajax({
                                                    url: "/api/horarios/" + usrid,
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
                                                    success: function(x) {
                                                        alert("horario modificado");
                                                        window.location.reload();
                                                    },
                                                    error: function(y) {
                                                        alert("error al modificar el horario");
                                                    }
                                                });
                                            },
                                            error: function(y) {
                                                alert('Este profesor se encuentra ocupado');
                                            }
                                        });
                                    },
                                    error: function(y) {
                                        alert('Este grupo se encuentra ocupado');
                                    }
                                });
                            },
                            error: function(y) {
                                alert('Este salon se encuentra ocupado');
                            }
                        });

                    });
                },
                error: function(n) {
                    alert("error al cargar usuarios");
                }
            });

        });

        //click en borrar
        $('.card-header ul').children('li').eq(3).children('a').off();
        $('.card-header ul').children('li').eq(3).children('a').click(function(e) {
            e.preventDefault()
            $(this).tab('show')
            $('.modal').modal();
            $('.modal button.btn-primary').click(function(params) {
                $.ajax({
                    url: "/api/horarios/" + usrid,
                    type: "DELETE",
                    success: function(x) {
                        alert("horario eliminado");
                        window.location.reload();
                    },
                    error: function(y) {
                        alert("error al eliminar el horario");
                    }
                });
            });
        });
    }
});


function searchAll(x) {
    $.ajax({
        url: "/api/horarios",
        type: "GET",
        success: function(resulta2) {
            //los pone en la tabla
            $('tbody').empty();
            console.log(resulta2.records);
            resulta2.records.forEach(profesor => {
                profesor.cursos.forEach(curso => {
                    curso.grupos.forEach(grupo => {
                        grupo.ciclosEscolares.forEach(ce => {
                            var l = '',
                                ma = '',
                                mi = '',
                                j = '',
                                v = '';
                            var lid = '',
                                maid = '',
                                miid = '',
                                jid = '',
                                vid = '';
                            ce.horarios.forEach(horario => {
                                switch (horario.dow) {
                                    case '1':
                                        l = l + horario.hora.replace(/:00$/, "") + '/' + horario.salon + '<br>';
                                        lid = horario.id;
                                        break;
                                    case '2':
                                        ma = ma + horario.hora.replace(/:00$/, "") + '/' + horario.salon + '<br>';
                                        maid = horario.id;
                                        break;
                                    case '3':
                                        mi = mi + horario.hora.replace(/:00$/, "") + '/' + horario.salon + '<br>';
                                        miid = horario.id;
                                        break;
                                    case '4':
                                        j = j + horario.hora.replace(/:00$/, "") + '/' + horario.salon + '<br>';
                                        jid = horario.id;
                                        break;
                                    case '5':
                                        v = v + horario.hora.replace(/:00$/, "") + '/' + horario.salon + '<br>';
                                        vid = horario.id;
                                        break;
                                    default:
                                        break;
                                }
                            });
                            $('tbody').append(
                                "<tr>" +
                                "<td style='padding: 1px'><img src='/api/public/img/" + profesor.foto + "' alt='' class='rounded-circle' height='45px' width='45px'> " + profesor.nombre + "</td>" +
                                "<td>" + curso.nombre + "</td>" +
                                "<td>" + grupo.grupo + "</td>" +
                                "<td>" + ce.cicloEscolar + "</td>" +
                                "<td class='clickable-row' data-id=" + lid + ">" + l + "</td>" +
                                "<td class='clickable-row' data-id=" + maid + ">" + ma + "</td>" +
                                "<td class='clickable-row' data-id=" + miid + ">" + mi + "</td>" +
                                "<td class='clickable-row' data-id=" + jid + ">" + j + "</td>" +
                                "<td class='clickable-row' data-id=" + vid + ">" + v + "</td>" +
                                "</tr>");
                        })
                    });
                });
            });


            $('.table').DataTable();

        },
        error: function(resp) {
            alert("No se encontrarn horarios");
        }
    });
}

function searchUser(id) {
    $.ajax({
        url: "/api/usuarios/horario/" + id,
        type: "GET",
        success: function(resulta2) {
            //los pone en la tabla
            $('tbody').empty();
            console.log(resulta2.records);
            resulta2.records.forEach(profesor => {
                profesor.cursos.forEach(curso => {
                    curso.grupos.forEach(grupo => {
                        grupo.ciclosEscolares.forEach(ce => {
                            var l = '',
                                ma = '',
                                mi = '',
                                j = '',
                                v = '';
                            var lid = '',
                                maid = '',
                                miid = '',
                                jid = '',
                                vid = '';
                            ce.horarios.forEach(horario => {
                                switch (horario.dow) {
                                    case '1':
                                        l = l + horario.hora.replace(/:00$/, "") + '/' + horario.salon + '<br>';
                                        lid = horario.id;
                                        break;
                                    case '2':
                                        ma = ma + horario.hora.replace(/:00$/, "") + '/' + horario.salon + '<br>';
                                        maid = horario.id;
                                        break;
                                    case '3':
                                        mi = mi + horario.hora.replace(/:00$/, "") + '/' + horario.salon + '<br>';
                                        miid = horario.id;
                                        break;
                                    case '4':
                                        j = j + horario.hora.replace(/:00$/, "") + '/' + horario.salon + '<br>';
                                        jid = horario.id;
                                        break;
                                    case '5':
                                        v = v + horario.hora.replace(/:00$/, "") + '/' + horario.salon + '<br>';
                                        vid = horario.id;
                                        break;
                                    default:
                                        break;
                                }
                            });
                            $('tbody').append(
                                "<tr>" +
                                "<td style='padding: 1px'><img src='/api/public/img/" + profesor.foto + "' alt='' class='rounded-circle' height='45px' width='45px'> " + profesor.nombre + "</td>" +
                                "<td>" + curso.nombre + "</td>" +
                                "<td>" + grupo.grupo + "</td>" +
                                "<td>" + ce.cicloEscolar + "</td>" +
                                "<td class='clickable-row' data-id=" + lid + ">" + l + "</td>" +
                                "<td class='clickable-row' data-id=" + maid + ">" + ma + "</td>" +
                                "<td class='clickable-row' data-id=" + miid + ">" + mi + "</td>" +
                                "<td class='clickable-row' data-id=" + jid + ">" + j + "</td>" +
                                "<td class='clickable-row' data-id=" + vid + ">" + v + "</td>" +
                                "</tr>");
                        })
                    });
                });
            });

            $('.table').DataTable();

        },
        error: function(resp) {
            alert("No se encontraron horarios");
        }
    });
}