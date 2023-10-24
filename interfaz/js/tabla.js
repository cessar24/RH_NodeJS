window.onload = init;
var headers = {};
var url = "http://localhost:3000/empleados";

function init (){
    if(localStorage.getItem("token")){
        headers = {
            headers:{
                'Authorization' : "bearer" + localStorage.getItem("token")
            }
        }
        loadEmpleados();
    }
    else{
        window.location.href = "index.html";
    }
}


function loadEmpleados(){
    axios.get(url +"/Empleados", headers
    ).then(function(res) {
        console.log(res);
        displayEmpleado(res.data.message);
    }).catch(function(err) {
        console.log(err);
    })
}

function displayEmpleado(empleados){
    console.log(empleados,"display empleados");
    var tabla = document.getElementById('tabla');
    for(var i = 0; i < empleados.length; i++){
        tabla.innerHTML +=`<tr><p>${empleados[i].Nombre} ${empleados[i].Apellido} ${empleados[i].Telefono}
        ${empleados[i].Correo} ${empleados[i].Direccion}</p></tr>`;
    }
}
