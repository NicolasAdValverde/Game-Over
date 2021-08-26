// ---------- INSERTAMOS LAS CARDS AL DOM DINAMICAMENTE ---------- //

const contenedor = document.getElementById("tarjetas");

stockProductos.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
            <img src=${producto.img} >
            <h3>${producto.nombre}</h3>
            <p>Categoria: ${producto.categoria}</p>
            <p class="precioProducto">Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})"class="btn btn-primary" >Añadir a Carrito</button>
            `;

    contenedor.appendChild(div);
});

// ---------- AGREGAR AL CARRITO + MOSTRAR COMPRA ---------- //
// AGREGAR AL CARRITO
const carrito = [];

function agregarAlCarrito(productoId) {
    let producto = stockProductos.find((el) => el.id === productoId);
    carrito.push(producto);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(JSON.parse(localStorage.getItem("carrito")));

    mostrarCompra();
}

// MOSTRAR COMPRA
const tableBody = document.getElementById("tabla-contenedor");

const mostrarCompra = () => {
    tableBody.innerHTML = "";

    carrito.forEach((producto) => {
        const tr = document.createElement("tr");
        tr.className = "table-striped";
        tr.innerHTML = `
            <th scope="row">${producto.id}</th>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>$${producto.precio}</td>

        `;

        tableBody.appendChild(tr);
    });
};

// ---------- MODAL EN BOTON FORM  ----------- //
const abrirModal = document.getElementById("modal-abrir");
const cerrarModal = document.getElementById("modal-cerrar");
const modalContainer = document.getElementById("modal-container");

const openModal = () => {
    modalContainer.classList.toggle("modal-active");
};

abrirModal.addEventListener("click", openModal);
cerrarModal.addEventListener("click", openModal);
modalContainer.addEventListener("click", openModal);

const modal = document.getElementById("modal");

modal.addEventListener("click", (e) => {
    e.stopPropagation();
});

// funciones a trabajar
// añadir boton "añadido al carrito" cuando se añada con un if
// que sume la compra
// funcion quitar elemento del carrito
// sumar o restar cuentas del carrito
// restar stock del carrito
