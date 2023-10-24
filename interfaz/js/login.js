window.onload = init;

function init() {
    if(!localStorage.getItem("token")){
         document.querySelector('.btn-primary').addEventListener('click', login);
    }
    else{
        window.location.href ="admin.html";
    }
}

function login() {
    var Correo = document.getElementById('input-mail').value;
    var Contraseña = document.getElementById('input-password').value;

    console.log(Correo, Contraseña);

    axios({
        method: 'post',
        url: 'http://localhost:3000/usuarios/login',
        data: {
            Correo: Correo,
            Contraseña: Contraseña
            }
    }).then(function (res) {
            if(res.data.code == 200){
                localStorage.setItem("token", res.data.message);
                window.location.href ="menuAdmin.html";
            }
            else{
                alert("usuario y/o contraseña incorrectos")
            }
    }).catch(function(err) {
            console.log(err);
    })

}
