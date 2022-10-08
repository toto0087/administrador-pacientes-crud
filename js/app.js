
// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

class Citas {
    constructor() {
        this.citas = [];
    }
    agregarCitas(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas)
    }
    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id)
    }
    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }
}


class UI {
    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center' , 'col-12', 'alert', 'd-block' );

        if( tipo === 'Error') {
            divMensaje.classList.add('alert-danger')
        } else {
            divMensaje.classList.add('alert-success')
        }
        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Agregamos contenido
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }
    imrpimirCitas({citas}) {

        this.limpiarHTML();
        
        citas.forEach(cita => {
            
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            // Creamos Div
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting elementos de Cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.textContent = mascota;
            mascotaParrafo.classList.add('card-title','font-weight-bolder')

            const propietarioParrafo = document.createElement('p')
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propietario: </span> ${propietario} 
            `;
            const telefonoParrafo = document.createElement('p')
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono: </span> ${telefono} 
            `;
            const fechaParrafo = document.createElement('p')
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha: </span> ${fecha} 
            `;
            const horaParrafo = document.createElement('p')
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora: </span> ${hora} 
            `;
            const sintomasParrafo = document.createElement('p')
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Sintomas: </span> ${sintomas} 
            `;

            // Boton eliminado
            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('btn','btn-danger','mr-2')
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>';
            
            btnEliminar.onclick = () => eliminarCita(id);

            // Boton Editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>'

            btnEditar.onclick = () => cargarEdicion(cita);

            // Agregar parrafos al div de cita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            // Agregamos al html
            contenedorCitas.appendChild(divCita)
        });
    }
    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}


const ui = new UI();
const administrarCitas = new Citas();



// Registro de eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);


    formulario.addEventListener('submit',nuevaCita);
}
// Objeto con informacion de la cita
const citasObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Agrega datos al OBJ de cita
function datosCita(e) {
    citasObj[e.target.name] = e.target.value;
}

function nuevaCita(e) {
    e.preventDefault();

    // Extrae info de objeto
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citasObj;

    // Validar
    if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'Error');
        return;
    }

    if (editando) {
        ui.imprimirAlerta('Editado correctamente')

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // Quitar modo edicion
        editando = false;

        // Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citasObj})

    } else {

        // generar un ID unico
        citasObj.id = Date.now();

        // Creando nuevo objeto
        administrarCitas.agregarCitas({...citasObj});

        // Mensaje 
        ui.imprimirAlerta('Se agrego correctamente')

    }


    // Reiniciar Formulario
    formulario.reset();

    // Reiniciar Objero para validacion
    reiniciarObj();

    // Mostrar el HTML
    ui.imrpimirCitas(administrarCitas);
}

function reiniciarObj() {
    citasObj.mascota = '',
    citasObj.propietario = '',
    citasObj.telefono = '',
    citasObj.fecha = '',
    citasObj.hora = '',
    citasObj.sintomas = ''
}

function eliminarCita(id) {
    // Elimina
    administrarCitas.eliminarCita(id);

    // Muestra msj
    ui.imprimirAlerta('La cita se elimino correctamente', 'Error');

    // Refresque
    ui.imrpimirCitas(administrarCitas);
}

function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenar los Inputs
     mascotaInput.value = mascota;
     propietarioInput.value = propietario;
     telefonoInput.value = telefono;
     fechaInput.value = fecha;
     horaInput.value = hora;
     sintomasInput.value = sintomas;

     // Llenar el objeto
     citasObj.mascota = mascota;
     citasObj.propietario = propietario;
     citasObj.telefono = telefono;
     citasObj.fecha = fecha;
     citasObj.hora = hora;
     citasObj.sintomas = sintomas;
     citasObj.id = id;

     // Cambiar el texto del boton
     formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

     editando = true;
}