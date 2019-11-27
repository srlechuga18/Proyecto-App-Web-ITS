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

        },
        error: function (resp) {
            alert("inicie sesion");
            window.location.href = "/";
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