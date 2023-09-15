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





// Seleccionar todos los elementos con la clase "abrir-carro"
const elementosAbrirCarro = document.querySelectorAll(".abrir-carro");

// Agregar un event listener a cada elemento
elementosAbrirCarro.forEach((elemento) => {
  elemento.addEventListener("click", (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace o botón

    // Lógica para abrir el carrito aquí
    abrirCarro();
  });
});

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





/* Selecciona todos los botones con la clase "agregarAlCarritoBtn" */
const botonesAgregarAlCarrito = document.querySelectorAll(
  ".agregarAlCarritoBtn"
);

// Agrega un evento de clic a cada botón
botonesAgregarAlCarrito.forEach((boton) => {
  boton.addEventListener("click", function () {
    agregarAlCarrito(this);
  });
});
