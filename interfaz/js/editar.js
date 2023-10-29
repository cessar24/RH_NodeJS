window.onload = init;
var headers = {};
var url = "http://localhost:3000/empleados/";

function init (){
    if(localStorage.getItem("token")){
        headers = {
            headers:{
                'Authorization' : "bearer" + localStorage.getItem("token")
            }
        }

        document.querySelector('.btn-primary').addEventListener('click', buscar);
        document.querySelector('.btn-tertiary').addEventListener('click', Editar);
    }
    else{
        window.location.href = "index.html";
    }

}

function buscar() {
    var nombre = document.getElementById('input-id').value;

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
        ${empleados[i].Correo} ${empleados[i].Direccion}</p><button id="btn_modal" class="btn btn-secondary">Editar</button></tr>`;

        document.querySelector('.btn-secondary').addEventListener('click', modal);
    }
}
function modal(){
    var boton = document.getElementById("btn_modal");
    var modal = document.getElementById("ventanaModal");
        // Botón que abre el modal
        // Hace referencia al elemento <span> que tiene la X que cierra la ventana
        var span = document.getElementsByClassName("cerrar")[0];
        // Cuando el usuario hace click en el botón, se abre la ventana
        boton.addEventListener("click",function() {
        modal.style.display = "block";
        });
        // Si el usuario hace click en la x, la ventana se cierra
        span.addEventListener("click",function() {
        modal.style.display = "none";
        });
        // Si el usuario hace click fuera de la ventana, se cierra.
        window.addEventListener("click",function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        });
}
function Editar() {
    var id = document.getElementById('input-id').value;
    var name = document.getElementById('input-name').value;
    var lastname = document.getElementById('input-lastname').value;
    var tel = document.getElementById('input-phone').value;
    var mail = document.getElementById('input-mail').value;
    var address = document.getElementById('input-address').value;

    console.log(name, lastname, tel, mail, address);

    axios({
        method: 'put',
        url: url + id,
        data: {
            Nombre: name,
            Apellido: lastname,
            Telefono: tel,
            Correo: mail,
            Direccion: address
            }
        }).then(function(res) {
            console.log(res);
            alert("actualizacion exitosa");
        }).catch(function(err) {
            console.log(err);
        })
    
}

