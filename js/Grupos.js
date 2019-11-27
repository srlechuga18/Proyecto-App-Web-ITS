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

            $.ajax({
                url: base + "/api/grupos",
                type: "GET",
                success: function (resulta2) {
                    //los pone en la tabla
                    resulta2.records.forEach(element => {
                        $('tbody').append(
                            "<tr class='clickable-row' data-id=" + element.id + ">" +
                            "<td>" + element.nombre + "</td>" +
                            "<td>" + element.semestre + "</td>" +
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
                                //traer info 
                                $.ajax({
                                    url: base + "/api/grupos/" + usrid,
                                    type: "GET",
                                    success: function (n) {
                                        $('.tab-pane#modify #mod-nombre').val(n.nombre);
                                        $('.tab-pane#modify #mod-semestre').val(n.semestre);

                                        //modify data
                                        $('#mod-btn').click(function (x) {
                                            let nombre = $('.tab-pane#modify #mod-nombre').val();
                                            let semestre = $('.tab-pane#modify #mod-semestre').val();

                                            $.ajax({
                                                url: base + "/api/grupos/" + usrid,
                                                type: "PATCH",
                                                data: JSON.stringify({
                                                    'nombre': nombre,
                                                    'semestre': semestre
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
                                        alert("error al cargar grupos");
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
                                        url: base + "/api/grupos/" + usrid,
                                        type: "DELETE",
                                        success: function (x) {
                                            alert("grupo eliminado");
                                            window.location.reload();
                                        },
                                        error: function (y) {
                                            alert("error al eliminar el grupo");
                                        }
                                    });
                                });
                            });
                        }
                    });

                },
                error: function (resp) {
                    alert("error al cargar cursos");
                }
            });


            $('#add-btn').click(function (x) {
                let nombre = $('.tab-pane#add #nombre').val();
                let semestre = $('.tab-pane#add #semestre').val();
                $.ajax({
                    url: base + "/api/grupos",
                    type: "POST",
                    dataType: 'json',
                    data: JSON.stringify({
                        'nombre': nombre,
                        'semestre': semestre
                    }),
                    success: function (x) {
                        console.log(x);
                        alert("grupo creado");
                        window.location.reload();
                    },
                    error: function (y) {
                        alert("error al crear el grupo");
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