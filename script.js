function addItem() {
    const newItemInput = document.getElementById('newItem');
    const newItemText = newItemInput.value;
    const list = document.getElementById('myList');

    if (newItemText !== '') {
        const li = document.createElement('li');
        li.classList.add('tiene-boton');

        // Crear span para el texto del ítem
        const span = document.createElement('span');
        span.textContent = newItemText;
        li.appendChild(span);

        // Crear contenedor para los botones
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        // Crear botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('eliminar');
        deleteButton.addEventListener('click', removeItem);
        buttonContainer.appendChild(deleteButton);

        // Crear botón de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('editar');
        editButton.addEventListener('click', () => editItem(li));
        buttonContainer.appendChild(editButton);

        // Añadir el contenedor de botones al li
        li.appendChild(buttonContainer);

        list.appendChild(li);
        newItemInput.value = '';

        actualizarLocalStorage();
    }
}

function removeItem(event) {
    const li = event.target.parentNode.parentNode;
    const list = document.getElementById('myList');
    list.removeChild(li);

    actualizarLocalStorage();
}

function editItem(li) {
    const span = li.querySelector('span');
    const currentText = span.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;

    // Reemplazar el span con el input
    li.insertBefore(input, span);
    li.removeChild(span);

    // Cambiar botón de Editar a Guardar
    const editButton = li.querySelector('.editar');
    editButton.textContent = 'Guardar';
    editButton.removeEventListener('click', () => editItem(li));
    editButton.addEventListener('click', () => saveItem(li, input));

    input.focus();
}

function saveItem(li, input) {
    const newText = input.value;
    const span = document.createElement('span');
    span.textContent = newText;

    // Reemplazar el input con el span
    li.insertBefore(span, input);
    li.removeChild(input);

    // Cambiar botón de Guardar a Editar
    const editButton = li.querySelector('.editar');
    editButton.textContent = 'Editar';
    editButton.removeEventListener('click', () => saveItem(li, input));
    editButton.addEventListener('click', () => editItem(li));

    actualizarLocalStorage();
}

function actualizarLocalStorage() {
    const listaItems = Array.from(document.getElementById('myList').children)
                            .map(li => li.querySelector('span').textContent);
    localStorage.setItem('miLista', JSON.stringify(listaItems));
}

function cargarLista() {
    const listaItems = localStorage.getItem('miLista');
    if (listaItems) {
        const lista = JSON.parse(listaItems);
        lista.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('tiene-boton');

            // Crear span para el texto del ítem
            const span = document.createElement('span');
            span.textContent = item;
            li.appendChild(span);

            // Crear contenedor para los botones
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            // Botón de eliminar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('eliminar');
            deleteButton.addEventListener('click', removeItem);
            buttonContainer.appendChild(deleteButton);

            // Botón de editar
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('editar');
            editButton.addEventListener('click', () => editItem(li));
            buttonContainer.appendChild(editButton);

            // Añadir el contenedor de botones al li
            li.appendChild(buttonContainer);

            document.getElementById('myList').appendChild(li);
        });
    }
}

cargarLista();
