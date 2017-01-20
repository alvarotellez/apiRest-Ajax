//Para no tener que poner el fichero de carga al final. 
//Cuando se cargen todos los componentes se muestra la pagina
window.addEventListener("load", start);
//Aqui metemos todos los listeners de los botones
function start() {   
    document.getElementById("listarPersonas").addEventListener("click", listar);
    document.getElementById("borrarPersona").addEventListener("click", borrar);
    document.getElementById("crearPersona").addEventListener("click", crear);
    document.getElementById("editarPersona").addEventListener("click", actualizar);
}
//Funcion que muestra la lista de las personas que tenemos alamacenados en la base de datos
function listar() {   
    var oSelect = new XMLHttpRequest();
    if (oSelect) {        
        oSelect.open("GET", "../api/Persona");
        oSelect.onreadystatechange = function () {
            if (oSelect.readyState < 4) {
                document.getElementById("txtContenedor").innerHTML = "Cargando...";
            } else {
                if (oSelect.readyState == 4 && oSelect.status == 200) {
                    //document.getElementById("txtContenedor").innerHTML = oSelect.responseText;
                    var arrayPersonas = JSON.parse(oSelect.responseText);
                    escribirTabla(arrayPersonas);
                }
            }
        }
    }
    oSelect.send();
}
//Elimina una persona de la base de datos a través del id que pasa el usuario en el input type text
function borrar() {
        var oBorrar = new XMLHttpRequest();
        //Obtener el id introducido
        var idBorrar = document.getElementById("idPersonaBorrar").value;
        if (idBorrar == "" || idBorrar == null) {
            alert("Debe introducir un valor");
        } else {
            if (oBorrar) {
                oBorrar.open("DELETE", "../api/Persona/" + idBorrar);
                oBorrar.onreadystatechange = function () {
                    if (oBorrar.readyState < 4) {
                        document.getElementById("txtContenedor").innerHTML = "Cargando...";
                    } else {
                        if (oBorrar.readyState == 4 && oBorrar.status == 204) {
                            listar();
                        }
                    }
                }
            }
            oBorrar.send();
        }
    }
//Clase Persona para crear la persona nueva
class Persona {
    constructor(id, nombre, apellidos, fechaNac, telefono, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.fechaNac = fechaNac;
        this.telefono = telefono;
        this.direccion = direccion;
    }
}
//Formato de la fecha para crear: 1996-01-01T00:00:00
//Crea un nuevo usuario que se inserta en la base de datos
function crear() {
    //1º Creamos una nueva persona, para ello definimos una clase Persona
    var nombreNuevo = document.getElementById("nombrePersonaNueva").value;
    var apellidosNuevo = document.getElementById("apesPersonaNueva").value;
    var fechaNacNuevo = document.getElementById("fechaNacPersonaNueva").vale;
    var telefonoNuevo = document.getElementById("telefonoPersonaNueva").vale;
    var direccionNuevo = document.getElementById("direccionPersonaNueva").value;
    miPersona = new Persona(0, nombreNuevo, apellidosNuevo, fechaNacNuevo, telefonoNuevo, direccionNuevo);
    oCrear = new XMLHttpRequest();
    oCrear.open("POST", "../api/Persona", true);
    //2º Le pasamos la cabecera con el Json
    oCrear.setRequestHeader("Content-type", "application/json; charset=utf-8");
    oCrear.onreadystatechange = function () {
        if (oCrear.readyState == 4 && oCrear.status == 204) {
            alert(oCrear.responseText);
        }
    }
    //3º Convertimos la persona que creamos anteriormente en JSON para meterlo en la Base de Datos
    oCrear.send(JSON.stringify(miPersona));
}

function actualizar() {
    var oActualizar = new XMLHttpRequest();
    //Obtener el id introducido

    var idActualizar = document.getElementById("idPersonaActualizada").value;
    if (idActualizar == "" || idActualizar == null) {
        alert("Debe introducir un valor");
    } else {
        oActualizar.open("PUT", "../api/Persona/" + idActualizar, true);
        oActualizar.setRequestHeader("Content-type", "application/json; charset=utf-8")
        var personaActualizada = new Persona(document.getElementById("idPersonaActualizada").value, document.getElementById("nombrePersonaActualizada").value, document.getElementById("apesPersonaActutalizada").value, document.getElementById("fechaNacPersonaActualizada").value, document.getElementById("telefonoPersonaActualizada").value, document.getElementById("direccionPersonaActualizada").value);
        oActualizar.onreadystatechange = function () {
            if (oActualizar.readyState < 4) {
                document.getElementById("txtContenedor").innerHTML = "Cargando...";
            } else {
                if (oActualizar.readyState == 4 && oActualizar.status == 204) {
                    listar();
                }
            }
        }
        oActualizar.send(JSON.stringify(personaActualizada));
    }         
}

function escribirTabla(arrayPersonas) {

    var table = document.createElement("TABLE");
    table.setAttribute("border", "1");
    var fila = document.createElement("TR");
    var columna = document.createElement("TH");
    var texto;
    texto = document.createTextNode("ID");
    columna.appendChild(texto);
    fila.appendChild(columna);

    columna = document.createElement("TH");
    texto = document.createTextNode("Nombre");
    columna.appendChild(texto);
    fila.appendChild(columna);

    columna = document.createElement("TH");
    texto = document.createTextNode("Apellidos");
    columna.appendChild(texto);
    fila.appendChild(columna);

    columna = document.createElement("TH");
    texto = document.createTextNode("Fecha de nacimiento");
    columna.appendChild(texto);
    fila.appendChild(columna);

    columna = document.createElement("TH");
    texto = document.createTextNode("Telefono");
    columna.appendChild(texto);
    fila.appendChild(columna);

    columna = document.createElement("TH");
    texto = document.createTextNode("Direccion");
    columna.appendChild(texto);
    fila.appendChild(columna);

    for (i = 0; i < arrayPersonas.length; i++) {
        var persona = new Persona(arrayPersonas[i].id, arrayPersonas[i].nombre, arrayPersonas[i].apellidos,arrayPersonas[i].fechaNac, arrayPersonas[i].direccion, arrayPersonas[i].telefono);
        fila = document.createElement("TR");
        columna = document.createElement("TD");
        texto = document.createTextNode(persona.id);
        columna.appendChild(texto);
        fila.appendChild(columna);

        columna = document.createElement("TD");
        texto = document.createTextNode(persona.nombre);
        columna.appendChild(texto);
        fila.appendChild(columna);

        columna = document.createElement("TD");
        texto = document.createTextNode(persona.apellidos);
        columna.appendChild(texto);
        fila.appendChild(columna);

        columna = document.createElement("TD");
        texto = document.createTextNode(persona.fechaNac);
        columna.appendChild(texto);
        fila.appendChild(columna);

        columna = document.createElement("TD");
        texto = document.createTextNode(persona.direccion);
        columna.appendChild(texto);
        fila.appendChild(columna);

        columna = document.createElement("TD");
        texto = document.createTextNode(persona.telefono);
        columna.appendChild(texto);
        fila.appendChild(columna);

        table.appendChild(fila);
    }

    document.getElementById("txtContenedor").innerHTML = "";

    document.getElementById("txtContenedor").appendChild(table);
}