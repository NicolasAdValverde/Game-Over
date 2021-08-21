let usuario = localStorage.getItem("usuario");

if (usuario == null) {
    usuario = prompt("Ingrese su nombre");
    localStorage.setItem("usuario", usuario);
}

alert(`Bienvenido ${usuario}`);
