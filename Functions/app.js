document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});
//------ TRAEMOS DATOS DE UN JSON LOCAL
const fetchData = async () => {
    const res = await fetch("/Functions/stock.json");
    const data = await res.json();
    // console.log(data)
    pintarProductos(data);
    detectarBotones(data);
};

//-----EVENTO IMAGEN HEADER CON JQUERY (PARA 3RA ENTREGA FINAL)
$(".img-welcome").hover(() => {
    Swal.fire({
        title: "<strong>Bienvenido a GAME OVER</strong>",
        icon: "info",
        html: `
        Recorda que para comprar debes ser mayor de 18 años`,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Entendido',
        confirmButtonAriaLabel: "Thumbs up, great!",
    });
});

//-----MOSTRAR PRODUCTOS EN EL DOM
//VARIABLE CAPTURANDO ID
const contendorProductos = document.querySelector("#contenedor-productos");
//FUNCION PARA TOMAR VALOR DE LOS TEMPLATE
const pintarProductos = (data) => {
    const template = document.querySelector("#template-productos").content;
    const fragment = document.createDocumentFragment();

    data.forEach((producto) => {
        template.querySelector("img").setAttribute("src", producto.img);
        template.querySelector("h5").textContent = producto.nombre;
        template.querySelector("p span").textContent = producto.precio;
        template.querySelector("button").dataset.id = producto.id;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    contendorProductos.appendChild(fragment);
};

//CARRITO = OBJETO VACIO
let carrito = {};

//DETECTAMOS EL BOTON DE LAS CARDS
const detectarBotones = (data) => {
    const botones = document.querySelectorAll(".card button");
    //RECORREMOS Y CLONAMOS EL CARRITO
    botones.forEach((btn) => {
        btn.addEventListener("click", () => {
            // console.log(btn.dataset.id)
            const producto = data.find(
                (item) => item.id === parseInt(btn.dataset.id)
            );
            producto.cantidad = 1;
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1;
            }
            carrito[producto.id] = { ...producto };

            pintarCarrito();
        });
    });
    //EVENTO "AGREGADO AL CARRITO"
    botones.forEach((btn) => {
        btn.addEventListener("click", () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Agregado al carrito",
                showConfirmButton: false,
                timer: 1000,
            });
        });
    });
};

//VARIABLE
const items = document.querySelector("#items");
//FUNCION
const pintarCarrito = () => {
    //pendiente innerHTML
    items.innerHTML = "";

    const template = document.querySelector("#template-carrito").content;
    const fragment = document.createDocumentFragment();

    Object.values(carrito).forEach((producto) => {
        template.querySelector("th").textContent = producto.id;
        template.querySelectorAll("td")[0].textContent = producto.nombre;
        template.querySelectorAll("td")[1].textContent = producto.cantidad;
        template.querySelector("span").textContent =
            producto.precio * producto.cantidad;

        //BOTONES
        template.querySelector(".btn-info").dataset.id = producto.id;
        template.querySelector(".btn-danger").dataset.id = producto.id;
        //CLONAR EL TEMPLATE + APPEND
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    //APPEND
    items.appendChild(fragment);

    pintarFooter();
    accionBotones();
};

//----- PINTAR FOOTER
//VARIABLE
const footer = document.querySelector("#footer-carrito");
//FUNCION
const pintarFooter = () => {
    footer.innerHTML = "";

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `;
        return;
    }

    const template = document.querySelector("#template-footer").content;
    const fragment = document.createDocumentFragment();

    //SUMAR CANTIDAD Y TOTALES
    const nCantidad = Object.values(carrito).reduce(
        (acc, { cantidad }) => acc + cantidad,
        0
    );
    const nPrecio = Object.values(carrito).reduce(
        (acc, { cantidad, precio }) => acc + cantidad * precio,
        0
    );

    //APPENDS
    template.querySelectorAll("td")[0].textContent = nCantidad;
    template.querySelector("span").textContent = nPrecio;

    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    //EVENTO
    const boton = document.querySelector("#vaciar-carrito");
    boton.addEventListener("click", () => {
        carrito = {};
        pintarCarrito();
    });
};

//----- ACCIONES DE LOS BOTONES FOOTER DEL CARRIO
const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll("#items .btn-info");
    const botonesEliminar = document.querySelectorAll("#items .btn-danger");

    botonesAgregar.forEach((btn) => {
        btn.addEventListener("click", () => {
            // console.log(btn.dataset.id)
            const producto = carrito[btn.dataset.id];
            producto.cantidad++;
            carrito[btn.dataset.id] = { ...producto };
            pintarCarrito();
        });
    });
    botonesEliminar.forEach((btn) => {
        btn.addEventListener("click", () => {
            // console.log('eliminando...')
            const producto = carrito[btn.dataset.id];
            producto.cantidad--;
            if (producto.cantidad === 0) {
                delete carrito[btn.dataset.id];
            } else {
                carrito[btn.dataset.id] = { ...producto };
            }
            pintarCarrito();
        });
    });
};

//----- FORMULARIO DE CONTACTO  //
//VARIABLES
const abrirModal = document.getElementById("modal-abrir");
const cerrarModal = document.getElementById("modal-cerrar");
const modalContainer = document.getElementById("modal-container");
const modal = document.getElementById("modal");
const openModal = () => {
    modalContainer.classList.toggle("modal-active");
};
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const textArea = document.getElementById("textarea");
const submit = document.getElementById("submit");

//EVENTOS
abrirModal.addEventListener("click", openModal);
cerrarModal.addEventListener("click", openModal);
modalContainer.addEventListener("click", openModal);
modal.addEventListener("click", (e) => {
    e.stopPropagation();
});

$("#modal-abrir").click((event) => {
    event.preventDefault();
    console.log("Boton clickeado");
    $("#modal-abrir").trigger("submit");
});
