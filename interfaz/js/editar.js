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
    var tabla = document.getElementById('tabla');
    for(var i = 0; i < empleados.length; i++){
        var id = i+1;
        tabla.innerHTML +=`<tr><p>${empleados[i].Nombre} ${empleados[i].Apellido} ${empleados[i].Telefono}
        ${empleados[i].Correo} ${empleados[i].Direccion}<button class="btn btn-primary" id='${id}'>Editar</button></p></tr>`;
    }
    document.querySelector('.btn-primary').addEventListener('click', Editar);
}
function Editar(){
        var id = document.getElementById('').value;
        console.log("estamos dentro de la consulta");
        axios({
            method: 'put',
            url: 'http://localhost:3000/empleados/'+ id,
            data: {
                id: id,
                }
            }).then(function(res) {
                console.log(res);
                alert("eliminacion exitosa");
                window.location.href = "tabla.html";
            }).catch(function(err) {
                console.log(err);
            })
    
}
