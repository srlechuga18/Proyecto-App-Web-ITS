$(document).ready(function () {

    let id = localStorage.getItem("id");
    $.ajax({
        url: "/api/usuarios/" + id,
        type: "GET",
        success: function (result) {
            $(".userfoto").attr("src", "/api/public/img/" + result.foto);
            $("#username").text(result.nombre + " " + result.apellidoPaterno + " " + result.apellidoMaterno);
            console.log(id);

            $.ajax({
                url: "/api/usuarios/horario/" + id,
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
                },
                error: function (resp) {
                    alert("No se encontrarn horarios");
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

});

