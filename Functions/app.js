const bienvenida = document.getElementById("condiciones");
bienvenida.addEventListener("click", () => {
    Swal.fire({
        title: `Bienvenido a Game Over
        Te ofrecemos la mejor calidad y variedad en juegos
        ¡A jugar!`,
        width: 600,
        padding: "3em",
        background: "#fff url(/images/trees.png)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://c.tenor.com/TtjXGU2TZtUAAAAi/gamer-girl-sexy.gif")
          left top
          no-repeat
        `,
    });
});

// DECLARAMOS UN ARRAY VACIO Y OBTENEMOS LOS PRODUCTOS DE UN JSON LOCAL
let stockProductos = [];
const obtenerProductos = async () => {
    const resp = await fetch("functions/stock.json");
    const data = await resp.json();
    stockProductos = data;
    //LLAMAMOS A LA FUNCION MOSTRAR PRODUCTOS
    mostrarProductos(stockProductos);
};

obtenerProductos();

const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const selectFiltro = document.getElementById("categoria");
const selectPrecios = document.getElementById("precios");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
const carrito = [];

//FUNCION MOSTRAR PRODUCTOS
function mostrarProductos(array) {
    contenedorProductos.innerHTML = "";

    array.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
                    <img class="imagen-cards" src=${producto.img} alt="">
                    <h3 class="nombreJuego">${producto.nombre}</h3>
                    <p>${producto.categoria}</p>
                    <p class="precio">Precio: $${producto.precio}</p>
                    <button onclick=agregarAlCarrito(${producto.id}) class="btn-cards">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(div);
    });
}

//FUNCION AGREGAR AL CARRITO
function agregarAlCarrito(itemId) {
    let itemEnCarrito = carrito.find((el) => el.id == itemId);
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Agregado al carrito`,
        showConfirmButton: false,
        timer: 1200,
    });

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1;
    } else {
        let { id, nombre, precio } = stockProductos.find(
            (el) => el.id == itemId
        );
        carrito.push({ id: id, nombre: nombre, precio: precio, cantidad: 1 });
    }
    //GUARDAMOS EL CARRITO EN EL LS
    localStorage.setItem("carrito", JSON.stringify(carrito));
    //LLAMAMOS A LA FUNCION ACTUALIZAR CARRITO
    actualizarCarrito();
}

const contenedorModal = document.getElementsByClassName("modal-contenedor")[0];
const botonAbrir = document.getElementById("boton-carrito");
const botonCerrar = document.getElementById("carritoCerrar");
const modalCarrito = document.getElementsByClassName("modal-carrito")[0];

botonAbrir.addEventListener("click", () => {
    contenedorModal.classList.toggle("modal-active");
});
botonCerrar.addEventListener("click", () => {
    contenedorModal.classList.toggle("modal-active");
});
contenedorModal.addEventListener("click", () => {
    botonCerrar.click();
});
modalCarrito.addEventListener("click", (event) => {
    event.stopPropagation();
});

//FUNCION ELIMINAR PRODUCTOS DEL CARRITO

function eliminarProducto(id) {
    let productoAEliminar = carrito.find((el) => el.id == id);

    productoAEliminar.cantidad--;

    if (productoAEliminar.cantidad == 0) {
        let indice = carrito.indexOf(productoAEliminar);
        carrito.splice(indice, 1);
    }

    console.log(carrito);
    actualizarCarrito();
}

//FUNCION ACTUALIZAR CARRITO
function actualizarCarrito() {
    contenedorCarrito.innerHTML = "";

    carrito.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("productoEnCarrito");
        div.innerHTML = `
                        
                        <p class="colorProducto-modal" >${producto.nombre}</p>
                        <p class="colorProducto-modal">Precio: $${
                            producto.precio * producto.cantidad
                        }</p>
                        <p class="colorProducto-modal">Cantidad: ${
                            producto.cantidad
                        }</p>
                        <button onclick=eliminarProducto(${
                            producto.id
                        }) class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                    `;

        contenedorCarrito.appendChild(div);
    });

    //METODO REDUCE PARA SUMAR LOS ITEMS DEL CARRITO
    contadorCarrito.innerText = carrito.length;
    precioTotal.innerText = carrito.reduce(
        (acc, el) => acc + el.precio * el.cantidad,
        0
    );
}

//FUNCION PARA FILTRAR LOS PRODUCTOS DEL DOM
function filtrar() {
    let valorFiltroTalles = selectFiltro.value;
    let valorFiltroPrecios = selectPrecios.value;

    let arrayFiltrado = [];

    if (valorFiltroTalles == "all") {
        arrayFiltrado = stockProductos;
    } else {
        arrayFiltrado = stockProductos.filter(
            (el) => el.categoria == selectFiltro.value
        );
    }

    if (valorFiltroPrecios == 1) {
        arrayFiltrado = arrayFiltrado.filter((el) => el.precio <= 5000);
    } else if (valorFiltroPrecios == 2) {
        arrayFiltrado = arrayFiltrado.filter((el) => el.precio >= 5000);
    }
    //LLAMAMOS A LA FUNCION MOSTRAR PRODUCTOS CON LOS VALORES FILTRADOS
    mostrarProductos(arrayFiltrado);
}
//EVENTOS
selectFiltro.addEventListener("change", () => {
    filtrar();
});
selectPrecios.addEventListener("change", () => {
    filtrar();
});

//API MERCADO PAGO

const finalizarCompra = async () => {
    const productosMP = carrito.map((prod) => {
        return {
            title: prod.nombre,
            description: "",
            picture_url: "",
            category_id: prod.id,
            quantity: prod.cantidad,
            currency_id: "ARS",
            unit_price: prod.precio,
        };
    });

    const resp = await fetch(
        "https://api.mercadopago.com/checkout/preferences",
        {
            method: "POST",
            headers: {
                Authorization:
                    "Bearer TEST-530625010370198-052019-70dec8c67253a7ded8355f1a098731e3-418556460",
            },
            body: JSON.stringify({
                items: productosMP,
                back_urls: {
                    success:
                        "http://127.0.0.1:5500/Clase15/Ajax2/Ej2/index.html",
                    failure:
                        "http://127.0.0.1:5500/Clase15/Ajax2/Ej2/index.html",
                },
            }),
        }
    );

    const data = await resp.json();

    window.location.replace(data.init_point);
};

/// FORMULARIO

const botonFormulario = document.getElementById("contacto");

botonFormulario.addEventListener("submit", (e) => {
    e.stopPropagation();
});
