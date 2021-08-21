//obtenemos el id del dom y lo guardamos en la variable header
const header = document.getElementById("header");
// ahora insertamos HTML en la variable header
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
            <a class="links" href="#">contacto</a>
        </li>
        <li>
            <a class="links" href="#">Carrito</a>
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

//obtenemos el id del DOM y lo guardamos en la variable main
const main = document.getElementById("main");
//insertamos html en la variable main
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

//obetemos el id y lo guardamos en la variable contenedor
const contenedor = document.getElementById("tarjetas");
// usamos un for of para recorrer el stock
for (const producto of stockProductos) {
    //creamos una variable div y creamos un elemento div
    const div = document.createElement("div");
    //le damos una clase al div creado (que tenemos los estilos en css)
    div.className = "producto";
    //insertamos html al div creado
    div.innerHTML = `
      <img src=${producto.img} >
      <h3>${producto.nombre}</h3>
      <p>Talle: ${producto.categoria}</p>
      <p class="precioProducto">Precio: ${producto.precio}</p>
  `;
    //le agregamos el div creado al contenedor
    contenedor.appendChild(div);
}
