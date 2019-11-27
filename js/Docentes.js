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
                            let usrid = $(this).data("id");

                            //click en modificar
                            $('.card-header ul').children('li').eq(2).children('a').off();
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

                                        //modify password
                                        $('#modify-pwd-btn').click(function (x) {
                                            let pswd = $('.tab-pane#modify #pswd').val();
                                            let pwd2 = $('.tab-pane#modify #pwd2').val();
                                            if (pswd == pwd2) {
                                                $.ajax({
                                                    url: base + "/api/usuarios/" + usrid,
                                                    type: "PATCH",
                                                    data: JSON.stringify({
                                                        'pass': pswd
                                                    }),
                                                    success: function (x) {
                                                        alert("contraseña modificada");
                                                        window.location.reload();
                                                    },
                                                    error: function (x) {
                                                        alert("error al modificar la contraseña");
                                                    }
                                                });
                                            } else {
                                                alert("Las contraseñas no coinciden");
                                                $('.tab-pane#modify #pswd').val('');
                                                $('.tab-pane#modify #pwd2').val('');
                                            }
                                        });

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

                                        //modify foto
                                        $('#modify-pic-btn').click(function (x) {
                                            let file = document.querySelector('#modify input[type=file]').files[0];
                                            var reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            reader.onloadend = function () {
                                                $.ajax({
                                                    url: base + "/api/usuarios/" + usrid,
                                                    type: "PATCH",
                                                    dataType: 'json',
                                                    data: JSON.stringify({
                                                        'foto': reader.result
                                                    }),
                                                    success: function (x) {
                                                        console.log(x);
                                                        alert("foto modificada");
                                                        window.location.reload();
                                                    },
                                                    error: function (y) {
                                                        alert("error al modificar la foto");
                                                    }
                                                });
                                            }
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
                let file = document.querySelector('#add input[type=file]').files[0];
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
