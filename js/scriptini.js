if (sessionStorage.getItem("usuarioEnLinea") != null){
    /* alert(sessionStorage.getItem("usuarioEnLinea")) */
    /* document.getElementById("iniciarSesionButton").innerText = "Cerrar sesion"; */
    document.getElementById("iniciarSesionButton").innerHTML = "<a class='linkNav iniciarSesion' id='iniciarSesionButton'>Cierra Sesión</a>";
    document.getElementById("UsuarioEnLinea").innerText = "Usuario : " + sessionStorage.getItem("usuarioEnLinea");
    document.getElementById("iniciarSesionButton").addEventListener("click", miFunction);
}else{
    document.getElementById("iniciarSesionButton").innerHTML = "<a class='linkNav iniciarSesion' id='iniciarSesionButton' href='./html/iniciarSesion.html'>Iniciar Sesión</a>";
    document.getElementById("UsuarioEnLinea").innerText = '';
};

function miFunction(){
    sessionStorage.removeItem("usuarioEnLinea") ;
    /* document.getElementById("iniciarSesionButton").innerText = "Iniciar sesion"; */
    document.getElementById("iniciarSesionButton").innerHTML = "<a class='linkNav iniciarSesion' id='iniciarSesionButton' href='./html/iniciarSesion.html'>Iniciar Sesión</a>";
    document.getElementById("UsuarioEnLinea").innerText = '';
    return false;
    
};