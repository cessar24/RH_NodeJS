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
        document.querySelector('.btn-primary').addEventListener('click', Editar);
    }
    else{
        window.location.href = "index.html";
    }
}

function Editar() {
    var id =
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