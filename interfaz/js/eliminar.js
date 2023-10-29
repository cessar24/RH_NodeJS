
window.onload = init;
var headers = {};
var url = "http://localhost:3000/empleados/";

function init() {
    /*if(!localStorage.getItem("token")){
         document.querySelector('.btn-primary').addEventListener('click', login);
    }
    else{
        window.location.href ="admin.html";
    }*/
    document.querySelector('.btn-primary').addEventListener('click', buscar);
    document.querySelector('.btn-secondary').addEventListener('click', eliminar);
}


function loadEmpleados(){
    axios.get(url +"empleados", headers
    ).then(function(res) {
        console.log(res);
        displayEmpleado(res.data.message);
    }).catch(function(err) {
        console.log(err);
    })
}




function buscar() {
    var id = document.getElementById('input-id').value;

    axios({
        method: 'get',
        url: url +id,
        data: {
            Id: id,
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
function eliminar() {
    var id = document.getElementById('input-id').value;
    axios({
        method: 'delete',
        url: url + id,
        data: {
            Id:id,
        }
    }).then(function (res) {
        console.log(res);
        alert("Eliminación exitosa");
        loadEmpleados();
    }).catch(function (err) {
        console.log(err);
    });
}
