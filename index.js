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
    precio.textContent = `Precio: $${producto.precio
      .toFixed(2)
      .replace(".", ",")}`;

    precio.classList.add("carrito-precio");
    productoDiv.appendChild(precio);

    const accionesDiv = document.createElement("div");
    accionesDiv.classList.add("boton-cantidad");

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
    subtotal.textContent = `Subtotal: $${(producto.precio * producto.cantidad)
      .toFixed(2)
      .replace(".", ",")}`;

    subtotal.classList.add("carrito-subtotal");
    productoDiv.appendChild(subtotal);

    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("btn-trash");
    const iconoBasurero = document.createElement("i");
    iconoBasurero.className = "bi bi-trash";
    botonEliminar.appendChild(iconoBasurero);
    botonEliminar.addEventListener("click", () =>
      eliminarProducto(producto.descripcion)
    );
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
  totalHTML.classList.add("resumen-total");
  totalHTML.innerHTML = `
          
          <p class="total-carrito">Total del carrito: $${total
            .toFixed(2)
            .replace(".", ",")}</p>
          <p class="unidades-carrito">Cantidad de productos: ${cantidadTotal} </p>
          <button onclick="finalizarCompra()" class="btn btn-secondary">Finalizar Compra</button>
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
  // Guardar los datos en el local storage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Limpiar el carrito
  carrito = [];

  // Mostrar un mensaje de compra exitosa
  alert("¡Su compra fue realizada con éxito!");

  // Cerrar el offcanvas
  const offcanvas = new bootstrap.Offcanvas(
    document.getElementById("offcanvasExample")
  );
  offcanvas.hide();

  // Actualizar el contenido del carrito
  actualizarCarrito();
}

// Función para abrir el offcanvas
function abrirCarro() {
  // Verificar si el carrito está vacío
  if (carrito.length === 0) {
    const offcanvasBody = document.querySelector(".offcanvas-body");
    offcanvasBody.innerHTML = `<p class="mensaje-vacio">El carrito está vacío.</p>`;

    // Agregar un botón para redirigir a la página de productos
    const redirigirBtn = document.createElement("button");
    redirigirBtn.textContent = "Agregar Productos";
    redirigirBtn.classList.add("btn-redirigir");
    redirigirBtn.addEventListener("click", () => {
      window.location.href = "http://127.0.0.1:5500/pages/productos.html";
    });

    offcanvasBody.appendChild(redirigirBtn);
  } else {
    const offcanvas = new bootstrap.Offcanvas(
      document.getElementById("offcanvasExample")
    );
    offcanvas.show();
  }
}
