const contenedor = document.getElementById("tarjetas");

for (const producto of stockProductos) {
    const div = document.createElement("div");
    // div.classList.add('producto')
    div.className = "producto";

    div.innerHTML = `
      <img src=${producto.img} >
      <h3>${producto.nombre}</h3>
      <p>Talle: ${producto.categoria}</p>
      <p class="precioProducto">Precio: ${producto.precio}</p>
  `;

    contenedor.appendChild(div);
}
