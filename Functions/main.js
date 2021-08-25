const header = document.getElementById("header");
header.innerHTML = `
<div class="nav-container">
<img
    class="imagen-header"
    src="../Img/logoGameOver.png"
    alt="logo game over"
/>

<nav>
    <ul>
        <li>
            <a class="links" href="#tarjetas">Juegos</a>
        </li>
        <li>
            <a class="links" href="#">Sobre nosotros</a>
        </li>
        <li>
            <a class="links" href="#contacto">contacto</a>
        </li>
        <li>
            <a class="links" href="#carrito">Carrito</a>
        </li>
    </ul>
</nav>
</div>
<div class="welcome-container">
<img
    class="img-welcome"
    src="../Img/welcome.png"
    alt="welcome "
/>
</div>
`;

const main = document.getElementById("main");
main.innerHTML = `
<div class="letsplay-container">
<img
    class="img-letsplay"
    src="../Img/letsplaty2.jpg"
    alt="letsplay"
/>
<img
    src="../Img/joistick.png"
    alt="piezas"
    class="img-joistick"
/>
<img
    class="gameOver-img"
    src="../Img/OrderNow.png"
    alt="ordernNow"
/>
`;

const contenedor = document.getElementById("tarjetas");

// for (const producto of stockProductos)
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
    // eventos

    contenedor.appendChild(div);
});

// funcion pushear elemento al carrito
// filter o find
const carrito = [];

function agregarAlCarrito(productoId) {
    let producto = stockProductos.find((el) => el.id === productoId);
    carrito.push(producto);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(JSON.parse(localStorage.getItem("carrito")));

    mostrarCompra();
}

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

// añadir boton añadido al carrito cuando se añada con un if
// evento al boton welcome
// comentar el codigo para exposicion.
// que sume la compra
// funcion quitar elemento del carrito
// sumar o restar cuentas del carrito
