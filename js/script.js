    /*  El unico dato de la API que devuelve un token

    email: "eve.holt@reqres.in",
    password: "cityslicka",             Descubri que se le puede pasar cualquier password y devuelve token solo con el email
    token: "QpwL5tke4Pnpja7X4"          Se supone que luego desde las otras paginas de mi sitio, al cargar verifico el token guardado como variable de sesion

    
    Otros email que funcionan con la api 

    george.bluth@reqres.in              No importa la contraseña que se utilice
    janet.weaver@reqres.in
    emma.wong@reqres.in
    charles.morris@reqres.in
    tracey.ramos@reqres.in 



    
    */

    
let estado = 0;
document.getElementById("botonIniciarSesion").addEventListener("click", event => {
    event.preventDefault();         //evito el refresco al submitir para poder indicar el mensaje de error


    miFunction();                   /* miFunction(event);  */ /* Le paso el event a la funcion para hacer algo??????  */
    verificoLogin();
});


function verificoLogin() {
    if (sessionStorage.getItem("usuarioEnLinea") != null && estado == 1) {         //si existe una variable de session llamada 'usuarioEnLinea' el usuario se logeo con exito
        url_redirect('../index.html');                                        //entonces lo redirijo a la pagina principal
    };
}


function miFunction() {
    var usuario = document.getElementById('usuario').value;             //obtengo usuario del input
    var contrasena = document.getElementById('contrasena').value;       //obtengo la contraseña del input
    var salir = false;

    let esValido = validaEmail(usuario);                                //valido que el mail cumpla con ____@____.___
    let esValidPsw = validaContrasena(contrasena);

    if (esValido == true) {
        sessionStorage.setItem("usuarioEnLinea", usuario);              //si es valido lo guardo en la variable de sesion
        sessionStorage.getItem("usuarioEnLinea");
    }

    manejarErrores("usuario", "errUsr", esValido);                      //se llama a la funcion manejar errores, donde se pasa el id , id del mensaje de error y la variable esValido
    manejarErrores("contrasena", "errPsw", esValidPsw);

    if (!esValido || !esValidPsw) {
        salir = true;
        return;                                                         //si existio algun error no continuo y espero a la proxima vez
    }

    /* buscamos del API si existen los datos ingresados */
    const resultado = leoDatosDelApi(usuario, contrasena);          //verifico si existe el mail contra la API. Lo hago en este momento,
                                                                    //ya que al ser una api de prueba no permite la comprobacion de la validez del
                                                                    //token devuelto desde las otras paginas de nuestro sitio.
    return;
}

/* Valida el formato del email */

function validaEmail(usuario) {
    var formatoValido = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (usuario.match(formatoValido)) {
        return true;
    } else {
        return false;
    }
}

/* Valida la contraseña */
function validaContrasena(contrasena) {                      //Vamos a buscar al menos 1 mayuscula, 1 minuscula, 1 numero y 6 caracteres (8 caracteres como minimo)
    texto = contrasena.trim();
    mayusculas = false;
    minusculas = false;
    numeros = false;
    largo = false;

    for (i = 0; i < texto.length; i++) {
        if (texto[i] == texto[i].toUpperCase()) {
            mayusculas = true;
        }
        if (texto[i] == texto[i].toLowerCase()) {
            minusculas = true;
        }
        if (!isNaN(texto[i])) {
            numeros = true;
        }
    }

    if (texto.length >= 8) {
        largo = true;
    }

    if (minusculas && mayusculas && numeros && largo) {
        console.log('La contraseña es buena');
        return true;
    } else {
        console.log("La contraseña no sirve -" +
            "Minusculas: " + boolstr(minusculas) + " - " +
            "Mayusculas: " + boolstr(mayusculas) + " - " +
            "Numeros: " + boolstr(numeros) + " - " +
            "Largo: " + texto.length + " " + boolstr(largo))
        return false;
    }
}

function boolstr(val) {
    if (val == true) {
        return "true";
    } else {
        return "false";
    }
}

//funcion para manejar los errores
function manejarErrores(elementId, errorId, esValido) {
    const element = document.getElementById(elementId);
    const errorElement = document.getElementById(errorId);

    if (!esValido) {                                                                     //si la variable esValido es falso muestro las alertas rojas
        errorElement.style.display = "block";
        element.style = "border:3px solid lightgrey ; animation-name: blinking; animation-duration: 1s;animation-iteration-count: 4;";
    } else {
        errorElement.style.display = "none";
        element.style.border = "2px solid var(--color-relleno)";
    }
}

/* Funcion de comunicacion con el API con POST */
/* datos mandados con la solicutud POST */

async function leoDatosDelApi(usuario, contrasena) {
    document.getElementById('botonIniciarSesion').disabled = true;                     // deshabilito el boton de submit
    document.getElementById('botonIniciarSesion').style = 'background-color:grey';     // lo muestro gris

    let _datos = {
        email: `${usuario}`,
        password: `${contrasena}`,
    };

    const response = await fetch('https://reqres.in/api/login', {
        method: "POST",
        body: JSON.stringify(_datos),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    const data = await response.json();
    data_function(data);


}

/* Muestro el token que devuelve la api */
function data_function(data) {
    if (data.error == 'user not found') {
        alert('El email ingresado no existe en la API! Se dara por valido igual con fines de prueba');
    } else {
        alert(("La API devolvio este token - " + data.token));
    }

    estado = 1;
    document.getElementById('botonIniciarSesion').disabled = false;
    document.getElementById('botonIniciarSesion').style = 'var(--color-azul)';     // lo muestro normal azul
    verificoLogin();

}


function url_redirect(url) {                                                //funcion para volver a la landing page al loguear con exito
    var X = setTimeout(function () {
        window.location.replace(url);
        return true;
    }, 300);

    if (window.location = url) {
        clearTimeout(X);
        return true;
    } else {
        if (window.location.href = url) {
            clearTimeout(X);
            return true;
        } else {
            clearTimeout(X);
            window.location.replace(url);
            return true;
        }
    }
    return false;
};



function mostrarPSW() {                                                 //Checkbox para mostrar/ocultar la contraseña
    var x = document.getElementById("contrasena");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
