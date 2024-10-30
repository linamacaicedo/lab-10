// script.js

class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.estado = 'pendiente';
    }

    cambiarEstado(nuevoEstado) {
        this.estado = nuevoEstado;
    }
}

const tareas = [];

function agregarTarea() {
    const nombreTarea = document.getElementById('nuevaTarea').value;
    if (nombreTarea) {
        const tarea = new Tarea(nombreTarea);
        tareas.push(tarea);
        document.getElementById('nuevaTarea').value = '';
        actualizarInterfaz();
    }
}

function moverTarea(index, nuevoEstado) {
    tareas[index].cambiarEstado(nuevoEstado);
    actualizarInterfaz();
}

function actualizarInterfaz() {
    const listaPendientes = document.getElementById('listaPendientes');
    const listaHaciendo = document.getElementById('listaHaciendo');
    const listaCompletada = document.getElementById('listaCompletada');

    listaPendientes.innerHTML = '';
    listaHaciendo.innerHTML = '';
    listaCompletada.innerHTML = '';

    tareas.forEach((tarea, index) => {
        const tareaDiv = document.createElement('div');
        tareaDiv.classList.add('tarea');
        tareaDiv.innerHTML = `<span>${tarea.nombre}</span>`;

        if (tarea.estado === 'pendiente') {
            const btnMover = `<button onclick="moverTarea(${index}, 'haciendo')">→</button>`;
            tareaDiv.innerHTML += btnMover;
            listaPendientes.appendChild(tareaDiv);
        } else if (tarea.estado === 'haciendo') {
            const btnMoverHaciendo = `
                <button onclick="moverTarea(${index}, 'pendiente')">←</button>
                <button onclick="moverTarea(${index}, 'completada')">→</button>
            `;
            tareaDiv.innerHTML += btnMoverHaciendo;
            listaHaciendo.appendChild(tareaDiv);
        } else if (tarea.estado === 'completada') {
            listaCompletada.appendChild(tareaDiv);
        }
    });
}
