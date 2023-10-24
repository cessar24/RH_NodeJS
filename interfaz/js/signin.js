window.onload = init;
var headers = {};

function init (){
    if(localStorage.getItem("token")){
        headers = {
            headers:{
                'Authorization' : "bearer" + localStorage.getItem("token")
            }
        }
        document.querySelector('.btn-primary').addEventListener('click', signin);
    }
    else{
        window.location.href = "index.html";
    }
}

function signin() {
    console.log("estas en siging");
    var name = document.getElementById('input-name').value;
    var lastname = document.getElementById('input-lastname').value;
    var tel = document.getElementById('input-phone').value;
    var mail = document.getElementById('input-mail').value;
    var address = document.getElementById('input-address').value;

    console.log(name, lastname, tel, mail, address);

    axios({
        method: 'post',
        url: 'http://localhost:3000/empleados/Registrar',
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