window.onload = init;

function init() {
    document.querySelector('.btn-primary').addEventListener('click', signin);

    
}

function signin() {
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
            window.location.href = "admin.html";
        }).catch(function(err) {
            console.log(err);
        })
    
}