Trabajo Práctico Final de FrontEnd para Codo a Codo Java Full Stack.

Notas:  Al ingresar a la landing page, el usuario no estara logueado por lo que debera iniciar sesion.
	      Como nombre de usuario, ingresara un email con formato correcto (ej. ejemplo@email.com) y una contraseña compuesta
	      de un caracter en minuscula, un caracter en mayuscula, un numero, y un tamaño minimo de 8 caracteres.
	      Comprobados los formatos de usuario y contraseña, se avisara al usuario en forma de texto y destello en rojo de el/los campos
	      que no cumplan con el formato indicado.
	      A continuacion, se enviaran usuario y contraseña a la API 'https://reqres.in' (con metodo POST), para comprobar la existencia de estos
	      datos en la base de datos de la api.

	los datos que se pueden mandar a la api y devuelven una busqueda positiva son:

  	E-mail			              	Devuelve el token
    ------------------------------------------------------
    eve.holt@reqres.in			    QpwL5tke4Pnpja7X4
    george.bluth@reqres.in      QpwL5tke4Pnpja7X1   
    janet.weaver@reqres.in		  QpwL5tke4Pnpja7X2
    emma.wong@reqres.in			    QpwL5tke4Pnpja7X3
    charles.morris@reqres.in		QpwL5tke4Pnpja7X5
    tracey.ramos@reqres.in 		  QpwL5tke4Pnpja7X6			

	Si el usuario es otro que los anteriores, el programa seguira adelante a los fines de testeo, y mostrara el usuario logueado en la landing page, hasta que este cierre sesion.
