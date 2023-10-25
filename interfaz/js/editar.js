window.onload = init;
var headers = {};
var url = "http://localhost:3000/empleados";
var id ;

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
        id = i+1;
        tabla.innerHTML +=`<tr><p>${empleados[i].Nombre} ${empleados[i].Apellido} ${empleados[i].Telefono}
        ${empleados[i].Correo} ${empleados[i].Direccion}<button class="btn btn-primary" id='${id}'>Editar</button></p></tr>`;

        var boton = document.getElementById(id);
        document.querySelector('.btn-secondary').addEventListener('click', Editar);
    }
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
    console.log("estas en el editor");
    var name = document.getElementById('input-name').value;
    var lastname = document.getElementById('input-lastname').value;
    var tel = document.getElementById('input-phone').value;
    var mail = document.getElementById('input-mail').value;
    var address = document.getElementById('input-address').value;

    console.log(name, lastname, tel, mail, address);

    axios({
        method: 'put',
        url: 'http://localhost:3000/empleados/'+ id,
        data: {
            Nombre: name,
            Apellido: lastname,
            Telefono: tel,
            Correo: mail,
            Direccion: address
            }
        }).then(function(res) {
            console.log(res);
            alert("registro exitoso");
        }).catch(function(err) {
            console.log(err);
        })
    
}
