/* Mi idea es armar un e-commerce para el proyecto final que ya comence a construir. En ésta primer pre-entrega arme un simulador de un carrito de compras con algunos productos y que además calcule el costo de envio segun la localidad, aunque superando algunos montos de compra el costo de envio es gratis.
 */

/* Para la segunda pre-entrega se agrego un array con productos pero no se le muestra las opciones al usuario. Este debe ingresar un producto, si existe en stock el sistema lo deja continuar, sino le arroja un mensaje de que no hay disponible el producto que ingreso. */

/* const productos = [
  "manzana",
  "banana",
  "uva",
  "pera",
  "naranja",
  "zanahoria",
  "calabaza",
  "tomate",
  "mandarina",
  "lechuga",
  "frutilla",
  "papa",
  "cebolla",
];

const productosPrecios = {
  manzana: 580,
  banana: 395,
  uva: 487,
  pera: 665,
  naranja: 700,
  zanahoria: 690,
  calabaza: 850,
  tomate: 475,
  mandarina: 632,
  lechuga: 476,
  frutilla: 890,
  papa: 567,
  cebolla: 390,
};

let carrito = {};
let total = 0;
let continuar = true;

function agregarProducto() {
  let producto = prompt("Ingrese el nombre de un producto (fruta o verdura):");

  if (producto === null || producto.trim() === "") {
    alert("Debe ingresar un producto.");
    return;
  }

  if (productos.includes(producto.toLowerCase())) {
    let cantidad = parseFloat(
      prompt(`Ingrese la cantidad de kilos de ${producto}:`)
    );

    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Cantidad no válida. Debe ingresar un número mayor a 0.");
      return;
    }

    carrito[producto] = {
      cantidad: cantidad,
      precio: productosPrecios[producto],
    };

    total += carrito[producto].precio * carrito[producto].cantidad;
  } else {
    alert(`Lo sentimos, no disponemos de ${producto}.`);
  }
}

function calcularCostoEnvio(localidad) {
  let costoEnvio = 500;

  localidad = localidad.toLowerCase();

  if (localidad === "san nicolás" || localidad === "san nicolas") {
    if (total >= 2000) {
      costoEnvio = 0;
    }
  } else if (
    localidad === "villa constitución" ||
    localidad === "villa constitucion"
  ) {
    if (total >= 3000) {
      costoEnvio = 0;
    }
  } else if (localidad === "ramallo") {
    if (total >= 4000) {
      costoEnvio = 0;
    }
  }

  return costoEnvio;
}

while (continuar) {
  agregarProducto();

  let agregarOtro = prompt("¿Desea agregar otro producto? s/n");

  if (agregarOtro === null || agregarOtro.toLowerCase() !== "s") {
    continuar = false;
  }

  if (!continuar && Object.keys(carrito).length > 0) {
    let localidad = prompt(
      "Ingrese su localidad:\nSan Nicolás\nVilla Constitución\nRamallo"
    );

    if (localidad !== null) {
      localidad = localidad.toLowerCase();
      let costoEnvio = calcularCostoEnvio(localidad);

      let resumenCompra = "Productos en el carrito:\n";
      for (let producto in carrito) {
        resumenCompra += `${producto} - ${
          carrito[producto].cantidad
        } kilos ($${(
          carrito[producto].precio * carrito[producto].cantidad
        ).toFixed(2)})\n`;
      }

      alert(
        resumenCompra +
          "\nTotal de la compra: $" +
          total.toFixed(2) +
          "\nCosto de envío: $" +
          costoEnvio.toFixed(2)
      );

      let mensajeFinal = "Gracias por su compra, vuelva pronto!";
      alert(mensajeFinal);
    }
  }
}
 */

/* function abrirOffcanvas() {
  const offcanvas = new bootstrap.Offcanvas(
    document.querySelector("#offcanvasExample")
  );
  offcanvas.show();
}

function agregarAlCarrito(boton) {
  // Obtener el elemento padre (artículo del producto)
  abrirOffcanvas();
  const articulo = boton.closest(".ofertas__articulo");

  // Obtener la descripción, imagen y precio del producto

  const imagen = articulo.querySelector("img").src;
  const descripcion = articulo.querySelector(
    ".ofertas__articulo-descripcion"
  ).textContent;
  const precio = articulo.querySelector(
    ".ofertas__articulo-precio"
  ).textContent;

  // Ahora puedes usar estos datos para agregar el producto al carrito de compras
  // (por ejemplo, utilizando la lógica que proporcioné anteriormente)
  const productoEnCarrito = document.createElement("div");
  productoEnCarrito.classList.add("producto-en-carrito");

  const descripcionElemento = document.createElement("p");
  descripcionElemento.classList.add("producto-en-carrito-desc");
  descripcionElemento.textContent = descripcion;

  const imagenElemento = document.createElement("img");
  imagenElemento.src = imagen;
  imagenElemento.alt = "Imagen del producto";

  const precioElemento = document.createElement("p");
  precioElemento.classList.add("producto-en-carrito-precio");
  precioElemento.textContent = precio;

  productoEnCarrito.appendChild(descripcionElemento);
  productoEnCarrito.appendChild(imagenElemento);
  productoEnCarrito.appendChild(precioElemento);

  const carrito = document.querySelector("#offcanvasExample .offcanvas-body");
  carrito.appendChild(productoEnCarrito);
} */

/* // Función para abrir el offcanvas al cargar un producto
function abrirOffcanvas() {
  const offcanvas = new bootstrap.Offcanvas(
    document.querySelector("#offcanvasExample")
  );
  offcanvas.show();
}

// Función para calcular el subtotal
function calcularSubtotal(precio, cantidad) {
  return parseFloat(precio) * cantidad;
}

// Función para actualizar el subtotal en el carrito
function actualizarSubtotal(elemento, precio, cantidad) {
  const subtotal = calcularSubtotal(precio, cantidad);

  const subtotalElemento = elemento.querySelector(
    ".producto-en-carrito-subtotal"
  );
  if (subtotalElemento) {
    subtotalElemento.textContent = "Subtotal: $" + subtotal.toFixed(2);
  } else {
    const nuevoSubtotalElemento = document.createElement("p");
    nuevoSubtotalElemento.classList.add("producto-en-carrito-subtotal");
    nuevoSubtotalElemento.textContent = "Subtotal: $" + subtotal.toFixed(2);
    elemento.appendChild(nuevoSubtotalElemento);
  }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(boton) {
  // Abrir el offcanvas
  abrirOffcanvas();

  // Obtener el elemento padre (artículo del producto)
  const articulo = boton.closest(".ofertas__articulo");

  // Obtener la descripción, imagen y precio del producto
  const imagen = articulo.querySelector("img").src;
  const descripcion = articulo.querySelector(
    ".ofertas__articulo-descripcion"
  ).textContent;
  const precio = parseFloat(
    articulo
      .querySelector(".ofertas__articulo-precio")
      .textContent.replace("$", "")
  );

  // Crear el elemento del producto en el carrito
  const productoEnCarrito = document.createElement("div");
  productoEnCarrito.classList.add("producto-en-carrito");

  const descripcionElemento = document.createElement("p");
  descripcionElemento.classList.add("producto-en-carrito-descripcion");
  descripcionElemento.textContent = descripcion;

  const imagenElemento = document.createElement("img");
  imagenElemento.src = imagen;
  imagenElemento.alt = "Imagen del producto";

  const precioElemento = document.createElement("p");
  precioElemento.classList.add("producto-en-carrito-precio");
  precioElemento.textContent = "$" + precio.toFixed(2);

  const offcanvasBody = document.querySelector(
    "#offcanvasExample .offcanvas-body"
  );
  const primerHijo = offcanvasBody.firstChild;

  // Agregar el producto antes del div total-carrito
  const totalCarritoElemento = document.querySelector("#total-carrito");
  totalCarritoElemento.parentNode.insertBefore(
    productoEnCarrito,
    totalCarritoElemento
  );

  // Botones para aumentar y disminuir la cantidad
  const cantidadElemento = document.createElement("div");
  cantidadElemento.classList.add("producto-en-carrito-cantidad");

  const cantidadTexto = document.createElement("span");
  cantidadTexto.textContent = "Cantidad: ";

  const cantidadInput = document.createElement("input");
  cantidadInput.type = "number";
  cantidadInput.value = 1;

  const aumentarCantidad = document.createElement("button");
  aumentarCantidad.textContent = "+";
  aumentarCantidad.addEventListener("click", () => {
    cantidadInput.value = parseInt(cantidadInput.value) + 1;
    actualizarSubtotal(
      productoEnCarrito,
      precio,
      parseInt(cantidadInput.value)
    );
    actualizarTotalCarrito();
  });

  const disminuirCantidad = document.createElement("button");
  disminuirCantidad.textContent = "-";
  disminuirCantidad.addEventListener("click", () => {
    const nuevaCantidad = parseInt(cantidadInput.value) - 1;
    if (nuevaCantidad >= 1) {
      cantidadInput.value = nuevaCantidad;
      actualizarSubtotal(productoEnCarrito, precio, nuevaCantidad);
    }
    actualizarTotalCarrito();
  });

  cantidadElemento.appendChild(cantidadTexto);
  cantidadElemento.appendChild(cantidadInput);
  cantidadElemento.appendChild(aumentarCantidad);
  cantidadElemento.appendChild(disminuirCantidad);

  productoEnCarrito.appendChild(descripcionElemento);
  productoEnCarrito.appendChild(imagenElemento);
  productoEnCarrito.appendChild(precioElemento);
  productoEnCarrito.appendChild(cantidadElemento);

  // Función para eliminar un producto del carrito
  function eliminarProductoDelCarrito(productoEnCarritoDiv) {
    const carrito = document.querySelector("#offcanvasExample .offcanvas-body");
    carrito.removeChild(productoEnCarritoDiv);
    actualizarTotalCarrito();
  }

  // ...

  // Botón para eliminar el producto del carrito
  const botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar";
  botonEliminar.addEventListener("click", () => {
    eliminarProductoDelCarrito(productoEnCarritoDiv);
  });

  productoEnCarrito.appendChild(botonEliminar);

  // Agregar el producto y el hr al carrito dentro de un div
  const carrito = document.querySelector("#offcanvasExample .offcanvas-body");
  const productoEnCarritoDiv = document.createElement("div");
  productoEnCarritoDiv.appendChild(productoEnCarrito);
  const hrElement = document.createElement("hr");
  productoEnCarritoDiv.appendChild(hrElement);

  carrito.appendChild(productoEnCarritoDiv);

  // Actualizar el subtotal y el total del carrito
  actualizarSubtotal(productoEnCarrito, precio, 1);
  actualizarTotalCarrito();
}

// Función para actualizar el total del carrito
function actualizarTotalCarrito() {
  const carrito = document.querySelector("#offcanvasExample .offcanvas-body");
  const productosEnCarrito = carrito.querySelectorAll(".producto-en-carrito");
  let total = 0;

  productosEnCarrito.forEach((producto) => {
    const subtotalElemento = producto.querySelector(
      ".producto-en-carrito-subtotal"
    );
    if (subtotalElemento) {
      const subtotal = parseFloat(
        subtotalElemento.textContent.replace("Subtotal: $", "")
      );
      total += subtotal;
    }
  });

  const totalCarritoElemento = document.querySelector("#total-carrito");
  if (totalCarritoElemento) {
    totalCarritoElemento.textContent =
      "Total del Carrito: $" + total.toFixed(2);
  } else {
    const totalCarrito = document.createElement("div");
    totalCarrito.id = "total-Carrito";
    totalCarrito.classList.add("total-carrito");
    totalCarrito.textContent = "Total del Carrito: $" + total.toFixed(2);
    carrito.appendChild(totalCarrito);
  }
}

// Evento para finalizar la compra y guardar el carrito en el Local Storage
const finalizarCompraButton = document.querySelector("#finalizarCompra");
finalizarCompraButton.addEventListener("click", () => {
  const carrito = document.querySelector("#offcanvasExample .offcanvas-body");
  const productosEnCarrito = carrito.querySelectorAll(".producto-en-carrito");

  // Crear un array para almacenar los productos en el carrito
  const carritoArray = [];

  productosEnCarrito.forEach((producto) => {
    const descripcion = producto.querySelector(
      ".producto-en-carrito-desc"
    ).textContent;
    const imagen = producto.querySelector("img").src;
    const precio = parseFloat(
      producto
        .querySelector(".producto-en-carrito-precio")
        .textContent.replace("$", "")
    );
    const cantidad = parseInt(
      producto.querySelector(".producto-en-carrito-cantidad input").value
    );

    carritoArray.push({
      descripcion,
      imagen,
      precio,
      cantidad,
    });
  });

  // Guardar el carrito en el Local Storage
  localStorage.setItem("carrito", JSON.stringify(carritoArray));

  // Mostrar un mensaje de éxito
  alert("¡Compra realizada con éxito!");

  // Cerrar el offcanvas
  const offcanvas = bootstrap.Offcanvas.getInstance(
    document.querySelector("#offcanvasExample")
  );
  if (offcanvas) {
    offcanvas.hide();
  }

  // Limpiar el carrito
  carrito.innerHTML = "";
  actualizarTotalCarrito();
});

// Evento para cargar el carrito desde el Local Storage
window.addEventListener("load", () => {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    const carritoArray = JSON.parse(carritoGuardado);

    carritoArray.forEach((producto) => {
      const boton = document.createElement("button");
      boton.textContent = "Añadir al carrito";
      boton.dataset.productDescription = producto.descripcion;
      boton.dataset.productImage = producto.imagen;
      boton.dataset.productPrice = producto.precio;
      boton.addEventListener("click", () => {
        agregarAlCarrito(boton);
      });

      agregarAlCarrito(boton);
    });
  }
});
 */
// Variables para mantener un registro de los productos en el carrito
let carrito = [];

// Función para abrir el offcanvas
function abrirCarrito() {
  const offcanvas = new bootstrap.Offcanvas(
    document.getElementById("offcanvasExample")
  );
  offcanvas.show();
}

// Función para agregar un producto al carrito
function agregarAlCarrito(boton) {
  // Abrir el offcanvas
  abrirCarrito();

  // Obtener el elemento padre (artículo del producto)
  const articulo = boton.closest(".ofertas__articulo");

  // Obtener la descripción, imagen y precio del producto
  const imagen = articulo.querySelector("img").src;
  const descripcion = articulo.querySelector(
    ".ofertas__articulo-descripcion"
  ).textContent;
  const precio = parseFloat(
    articulo
      .querySelector(".ofertas__articulo-precio")
      .textContent.replace("$", "")
  );
  // Buscar si el producto ya está en el carrito
  const productoExistente = carrito.find(
    (producto) => producto.descripcion === descripcion
  );

  if (productoExistente) {
    // Si el producto ya existe, aumentar la cantidad
    productoExistente.cantidad += 1;
  } else {
    // Si el producto no existe, agregarlo al carrito
    carrito.push({
      descripcion,
      imagen,
      precio,
      cantidad: 1,
    });
  }

  // Actualizar el carrito en el offcanvas
  actualizarCarrito();
}

// Función para actualizar el contenido del offcanvas
function actualizarCarrito() {
  const offcanvasBody = document.querySelector(".offcanvas-body");
  offcanvasBody.innerHTML = "";

  // Mostrar un mensaje si el carrito está vacío
  if (carrito.length === 0) {
    offcanvasBody.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  // Recorrer los productos en el carrito y mostrarlos
  carrito.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("carrito-item");

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = "Producto";
    productoDiv.appendChild(imagen);

    const descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;
    productoDiv.appendChild(descripcion);

    const precio = document.createElement("p");
    precio.textContent = `Precio: $${producto.precio}`;
    productoDiv.appendChild(precio);

    const accionesDiv = document.createElement("div");

    const botonDisminuir = document.createElement("button");
    botonDisminuir.textContent = "-";
    botonDisminuir.onclick = () => disminuirCantidad(producto.descripcion);
    accionesDiv.appendChild(botonDisminuir);

    const cantidad = document.createElement("span");
    cantidad.textContent = producto.cantidad;
    accionesDiv.appendChild(cantidad);

    const botonAumentar = document.createElement("button");
    botonAumentar.textContent = "+";
    botonAumentar.onclick = () => aumentarCantidad(producto.descripcion);
    accionesDiv.appendChild(botonAumentar);

    productoDiv.appendChild(accionesDiv);

    const subtotal = document.createElement("p");
    subtotal.textContent = `Subtotal: $${producto.precio * producto.cantidad}`;
    productoDiv.appendChild(subtotal);

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.onclick = () => eliminarProducto(producto.descripcion);
    productoDiv.appendChild(botonEliminar);

    const hrElement = document.createElement("hr");
    productoDiv.appendChild(hrElement);

    offcanvasBody.appendChild(productoDiv);
  });

  // Calcular y mostrar el total del carrito
  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  const cantidadTotal = carrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );

  const totalHTML = document.createElement("div");
  totalHTML.innerHTML = `
          
          <p>Total del carrito: $${total}</p>
          <p>Cantidad total: ${cantidadTotal} productos</p>
          <button onclick="finalizarCompra()">Finalizar Compra</button>
        `;

  offcanvasBody.appendChild(totalHTML);
}

// Función para aumentar la cantidad de un producto en el carrito
function aumentarCantidad(descripcion) {
  const producto = carrito.find(
    (producto) => producto.descripcion === descripcion
  );
  if (producto) {
    producto.cantidad += 1;
    actualizarCarrito();
  }
}

// Función para disminuir la cantidad de un producto en el carrito
function disminuirCantidad(descripcion) {
  const producto = carrito.find(
    (producto) => producto.descripcion === descripcion
  );
  if (producto && producto.cantidad > 1) {
    producto.cantidad -= 1;
    actualizarCarrito();
  }
}

// Función para eliminar un producto del carrito
function eliminarProducto(descripcion) {
  carrito = carrito.filter((producto) => producto.descripcion !== descripcion);
  actualizarCarrito();
}

// Función para finalizar la compra
function finalizarCompra() {
  // Guardar los datos en el local storage (puedes personalizar esto)
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Limpiar el carrito
  carrito = [];

  // Mostrar un mensaje de compra exitosa (puedes personalizar esto)
  alert("¡Su compra fue realizada con éxito!");

  // Cerrar el offcanvas
  const offcanvas = new bootstrap.Offcanvas(
    document.getElementById("offcanvasExample")
  );
  offcanvas.hide();

  // Actualizar el contenido del carrito
  actualizarCarrito();
}
