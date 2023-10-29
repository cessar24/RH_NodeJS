window.onload = init;
var url = "http://localhost:3000/empleados/";

function init() {
    /*if(!localStorage.getItem("token")){
         document.querySelector('.btn-primary').addEventListener('click', login);
    }
    else{
        window.location.href ="admin.html";
    }*/
    document.querySelector('.btn-primary').addEventListener('click', buscar);
    
}

function buscar() {
    var nombre = document.getElementById('input-nombre').value;

    axios({
        method: 'get',
        url: url +nombre,
        data: {
            Nombre: nombre,
            }
    }).then(function (res) {
            if(res.data.code == 200){
                console.log(res);
                displayEmpleado(res.data.message);
            }
            else{
                console.log("no existe");
                alert("no existe este empleado");
            }
    }).catch(function(err) {
            console.log(err);
    })

}

function displayEmpleado(empleados) {
    console.log(empleados, "display empleados");
    var tabla = document.getElementById('tabla');
    tabla.innerHTML = ''; // Limpia el contenido de la tabla

    for (var i = 0; i < empleados.length; i++) {
        tabla.innerHTML += `<tr><p>${empleados[i].Nombre} ${empleados[i].Apellido} ${empleados[i].Telefono}
        ${empleados[i].Correo} ${empleados[i].Direccion}</p></tr>`;
    }
}
