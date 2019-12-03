$(document).ready(function () {

    let id = localStorage.getItem("id");
    $.ajax({
        url: "/api/usuarios/" + id,
        type: "GET",
        success: function (result) {
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

        },
        error: function (resp) {
            alert("inicie sesion");
            window.location.href = "/";
        }
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

});

