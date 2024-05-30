class Catalogo {
    #peliculas = [];

    agregarPelicula(pelicula) {
        this.#peliculas.push(pelicula);
        this.mostrarPeliculas();
    }

    actualizarPelicula(index, nuevaPelicula) {
        this.#peliculas[index] = nuevaPelicula;
        this.mostrarPeliculas();
    }

    eliminarPelicula(index) {
        this.#peliculas.splice(index, 1);
        this.mostrarPeliculas();
    }

    mostrarPeliculas() {
        const contenedor = document.querySelector('.row.row-cols-1.row-cols-md-4.g-4');
        contenedor.innerHTML = '';

        for (let index = 0; index < this.#peliculas.length; index++) {
            const pelicula = this.#peliculas[index];
            const card = `
                <div class="col" id="pelicula-${index}">
                    <div class="card h-80">
                        <img src="${pelicula.url}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${pelicula.titulo}</h5>
                            <p class="card-text">Género: ${pelicula.genero}</p>
                            <p class="card-text">Año De Producción: ${pelicula.ano}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-warning btn-sm" onclick="actualizar(${index})">Actualizar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminar(${index})">Eliminar</button>
                        </div>
                    </div>
                </div>`;
            contenedor.innerHTML += card;
        }
    }
}

const catalogo = new Catalogo();

//  agrega una nueva película
const obtener = () => {
    const titulo = document.querySelector('#titulo').value;
    const genero = document.querySelector('#genero').value;
    const ano = document.querySelector('#ano').value;
    

    if (!titulo || !genero || !ano ) {
        // Mostrar SweetAlert indicando que algún campo está vacío
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, rellene todos los campos',
        });
    } else {
        const nuevaPelicula = { titulo, genero, ano };
        catalogo.agregarPelicula(nuevaPelicula);
        limpiarFormulario();
        // Mostrar SweetAlert indicando que la película ha sido agregada
        Swal.fire({
            icon: 'success',
            title: '¡Agregado!',
            text: 'La película ha sido agregada al catálogo',
        });
    }
};

// actualiza una película existente
const actualizar = (index) => {
    const titulo = prompt('Nuevo título:');
    const genero = prompt('Nuevo género:');
    const ano = prompt('Nuevo año de producción:');
    
    if (titulo && genero && ano) {
        const nuevaPelicula = { titulo, genero, ano };
        catalogo.actualizarPelicula(index, nuevaPelicula);
    } else {
        alert('Por favor, rellene todos los campos');
    }
};

//  elimina una película existente
const eliminar = (index) => {
    catalogo.eliminarPelicula(index);
};

// limpia el formulario después de agregar una película
const limpiarFormulario = () => {
    document.querySelector('#titulo').value = '';
    document.querySelector('#genero').value = '';
    document.querySelector('#ano').value = '';
};

document.querySelector('#agregarPelicula').addEventListener('click', obtener);
