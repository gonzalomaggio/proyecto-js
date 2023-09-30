

/* // Declaración de una variable para almacenar los productos en el carrito
let carrito = [];


// Función para abrir el offcanvas
function abrirCarrito() {
  const offcanvas = new bootstrap.Offcanvas(
    document.getElementById("offcanvasExample")
  );

  offcanvas.show();
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
  console.log("Hiciste clic en el botón Añadir al carrito");
  // Abrir el offcanvas
  abrirCarrito();


  // Obtener el producto correspondiente desde la base de datos
  const producto = productos.find((producto) => producto.id === id);
  console.log("Producto:", producto);

  if (!producto) {
    console.error("Producto no encontrado en la base de datos.");
    return;
  }


  // Buscar si el producto ya está en el carrito
  const productoExistente = carrito.find((p) => p.id === id);

  if (productoExistente) {
    // Si el producto ya existe, aumentar la cantidad
    productoExistente.cantidad += 1;
  } else {
    // Si el producto no existe, agregarlo al carrito
    carrito.push({
      id: producto.id,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      precio: producto.precio,
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

    abrirCarro();

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
    botonDisminuir.onclick = () => disminuirCantidad(producto.id);
    accionesDiv.appendChild(botonDisminuir);

    const cantidad = document.createElement("span");
    cantidad.textContent = producto.cantidad;
    accionesDiv.appendChild(cantidad);

    const botonAumentar = document.createElement("button");
    botonAumentar.textContent = "+";
    botonAumentar.onclick = () => aumentarCantidad(producto.id);
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
      eliminarProducto(producto.id)
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
function aumentarCantidad(id) {
  const producto = carrito.find((producto) => producto.id === id);
  if (producto) {
    producto.cantidad += 1;
    actualizarCarrito();
  }
}

// Función para disminuir la cantidad de un producto en el carrito
function disminuirCantidad(id) {
  const producto = carrito.find((producto) => producto.id === id);
  if (producto && producto.cantidad > 1) {
    producto.cantidad -= 1;
    actualizarCarrito();
  }
}

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
  carrito = carrito.filter((producto) => producto.id !== id);
  actualizarCarrito();
}



// Función para finalizar la compra
function finalizarCompra() {
  // Guardar los datos en el local storage
  localStorage.setItem("carrito", JSON.stringify(carrito));





  // Limpiar el carrito
  carrito = [];

  // Cerrar el offcanvas
  const offcanvasElement = document.getElementById("offcanvasExample");
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);

  if (offcanvas) {
    offcanvas.hide();
  }

  // Mostrar un mensaje de compra exitosa
  alert("¡Su compra fue realizada con éxito!");

  // Actualizar el contenido del carrito
  actualizarCarrito();
}




// Cargar productos desde un archivo JSON simulando una base de datos
let productos = [];

fetch("productos.json")
  .then((response) => response.json())
  .then((data) => {
    console.log("Datos cargados:", data);
    productos = data;
    mostrarProductosEnHTML(productos);
  })
  .catch((error) => console.error("Error al cargar los productos:", error));

// Función para mostrar productos en el HTML
function mostrarProductosEnHTML(productos) {
  const contenedorProductos = document.querySelector(".ofertas__contenedor");

  productos.forEach((producto) => {
    const articulo = document.createElement("article");
    articulo.classList.add("ofertas__articulo");
    articulo.dataset.id = producto.id;

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.descripcion;
    articulo.appendChild(imagen);

    const contenedorDescripcion = document.createElement("div");
    contenedorDescripcion.classList.add("mt-1", "contenedor-descripcion");

    const descripcion = document.createElement("p");
    descripcion.classList.add("ofertas__articulo-descripcion");
    descripcion.textContent = producto.descripcion;
    contenedorDescripcion.appendChild(descripcion);

    const precio = document.createElement("p");
    precio.classList.add("ofertas__articulo-precio");
    precio.textContent = `$${producto.precio.toFixed(2).replace(".", ",")}`;
    contenedorDescripcion.appendChild(precio);

    const descuento = document.createElement("p");
    descuento.classList.add("ofertas__articulo-desc");
    descuento.textContent = `${producto.descuento}% off`;
    contenedorDescripcion.appendChild(descuento);

    const botonAgregar = document.createElement("button");
    botonAgregar.classList.add("btn", "btn-primary", "btn-sm", "agregarAlCarritoBtn");
    botonAgregar.textContent = "Añadir al carrito";
    botonAgregar.addEventListener("click", () => agregarAlCarrito(producto.id)); // Pasa el id del producto


    contenedorDescripcion.appendChild(botonAgregar);

    articulo.appendChild(contenedorDescripcion);


    contenedorProductos.appendChild(articulo);
    // Agregar un <hr> después de cada artículo
    const hrElement = document.createElement("hr");
    contenedorProductos.appendChild(hrElement);
  });


}

// / / / Seleccionar todos los elementos con la clase "abrir-carro"
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
      window.location.href = "http://127.0.0.1:5500/productos.html";
    });

    offcanvasBody.appendChild(redirigirBtn);
  } else {
    const offcanvas = new bootstrap.Offcanvas(
      document.getElementById("offcanvasExample")
    );
    offcanvas.show();
  }
}

 */

// Declaración de una variable para almacenar los productos en el carrito
// Declaración de una variable para almacenar los productos en el carrito

/* ------------------------------------------------------------------------------------------------------------ */

let carrito = [];

// Variable para mantener un seguimiento de la categoría seleccionada
let categoriaSeleccionada = '';

// Función para obtener el carrito desde el Local Storage
function obtenerCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Función para guardar el carrito en el Local Storage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para actualizar el carrito en tiempo real en ambas páginas
function actualizarCarritoEnTiempoReal() {
  // Escuchar cambios en el Local Storage relacionados con el carrito
  window.addEventListener("storage", (event) => {
    if (event.key === "carrito") {
      carrito = obtenerCarritoDesdeLocalStorage();
      actualizarCarrito();
    }
  });
}

// Función para abrir el offcanvas
function abrirCarrito() {
  const offcanvas = new bootstrap.Offcanvas(
    document.getElementById("offcanvasExample")
  );
  offcanvas.show();
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
  console.log("Hiciste clic en el botón Añadir al carrito");
  // Abrir el offcanvas
  abrirCarrito();

  // Obtener el producto correspondiente desde la base de datos
  const producto = productos.find((producto) => producto.id === id);
  console.log("Producto:", producto);

  if (!producto) {
    console.error("Producto no encontrado en la base de datos.");
    return;
  }

  // Buscar si el producto ya está en el carrito
  const productoExistente = carrito.find((p) => p.id === id);

  if (productoExistente) {
    // Si el producto ya existe, aumentar la cantidad
    productoExistente.cantidad += 1;
  } else {
    // Si el producto no existe, agregarlo al carrito
    carrito.push({
      id: producto.id,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      precio: producto.precio,
      cantidad: 1,
    });
  }
  // Actualizar el carrito en el Local Storage
  guardarCarritoEnLocalStorage();

  // Actualizar el carrito en el offcanvas
  actualizarCarrito();
}

// Función para actualizar el contenido del offcanvas
function actualizarCarrito() {
  const offcanvasBody = document.querySelector(".offcanvas-body");
  offcanvasBody.innerHTML = '';

  // Mostrar un mensaje si el carrito está vacío
  if (carrito.length === 0) {
    abrirCarro();
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
    botonDisminuir.onclick = () => disminuirCantidad(producto.id);
    accionesDiv.appendChild(botonDisminuir);

    const cantidad = document.createElement("span");
    cantidad.textContent = producto.cantidad;
    accionesDiv.appendChild(cantidad);

    const botonAumentar = document.createElement("button");
    botonAumentar.textContent = "+";
    botonAumentar.onclick = () => aumentarCantidad(producto.id);
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
      eliminarProducto(producto.id)
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
function aumentarCantidad(id) {
  const producto = carrito.find((producto) => producto.id === id);
  if (producto) {
    producto.cantidad += 1;
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
  }
}

// Función para disminuir la cantidad de un producto en el carrito
function disminuirCantidad(id) {
  const producto = carrito.find((producto) => producto.id === id);
  if (producto && producto.cantidad > 1) {
    producto.cantidad -= 1;
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
  }
}

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
  carrito = carrito.filter((producto) => producto.id !== id);
  guardarCarritoEnLocalStorage();
  actualizarCarrito();
}

// Función para finalizar la compra
function finalizarCompra() {
  // Guardar los datos en el local storage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Limpiar el carrito
  carrito = [];

  // Cerrar el offcanvas
  const offcanvasElement = document.getElementById("offcanvasExample");
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);

  if (offcanvas) {
    offcanvas.hide();
  }

  // Mostrar un mensaje de compra exitosa
  alert("¡Su compra fue realizada con éxito!");

  // Actualizar el contenido del carrito
  actualizarCarrito();
}

// Cargar productos desde un archivo JSON simulando una base de datos
let productos = [];

fetch("productos.json")
  .then((response) => response.json())
  .then((data) => {
    console.log("Datos cargados:", data);
    productos = data;
    /* / Filtra los productos con descuento mayor a 0 */
    const productosConDescuento = productos.filter((producto) => producto.descuento > 0).slice(0, 6);

    // Verificar si estamos en la página de inicio (index.html)
    const body = document.querySelector("body.pagina-index");

    if (body) {
      // Si estamos en la página de inicio, selecciona el contenedor de ofertas
      const ofertasContenedor = body.querySelector(".ofertas__contenedor");

      if (ofertasContenedor) {
        // Limpia el contenido actual de ofertas
        ofertasContenedor.innerHTML = '';

        // Muestra los productos con descuento en el contenedor de ofertas
        mostrarProductosEnHTML(productosConDescuento);
      }
      else { mostrarProductosPorCategoria(categoriaSeleccionada); }
    }
    // Cargar el carrito desde el Local Storage al cargar la página
    carrito = obtenerCarritoDesdeLocalStorage();
    actualizarCarrito();
    actualizarCarritoEnTiempoReal();
  })
  .catch((error) => console.error("Error al cargar los productos:", error));



// Función para mostrar productos en el HTML
function mostrarProductosEnHTML(productos) {
  const contenedorProductos = document.querySelector(".ofertas__contenedor");

  // Filtrar productos con descuento mayor a 0
  const productosConDescuento = productos.filter(producto => producto.descuento > 0);

  // Verificar si hay productos con descuento
  if (productosConDescuento.length > 0) {
    // Crear el div del título
    const tituloDiv = document.createElement("div");
    tituloDiv.classList.add("ofertas__titulo");

    // Crear el título (h2)
    const tituloH2 = document.createElement("h2");
    tituloH2.textContent = "Ofertas"; // Establecer el texto del título como "Ofertas"
    tituloDiv.appendChild(tituloH2);

    // Crear la línea divisoria (hr)
    const hrElement = document.createElement("hr");

    // Agregar el título y la línea divisoria al contenedor de productos
    contenedorProductos.appendChild(tituloDiv);
    contenedorProductos.appendChild(hrElement);
  }

  productos.forEach((producto) => {

    const articulo = document.createElement("article");
    articulo.classList.add("ofertas__articulo");
    articulo.dataset.id = producto.id;

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.descripcion;
    articulo.appendChild(imagen);

    const contenedorDescripcion = document.createElement("div");
    contenedorDescripcion.classList.add("mt-1", "contenedor-descripcion");

    const descripcion = document.createElement("p");
    descripcion.classList.add("ofertas__articulo-descripcion");
    descripcion.textContent = producto.descripcion;
    contenedorDescripcion.appendChild(descripcion);

    const precio = document.createElement("p");
    precio.classList.add("ofertas__articulo-precio");
    precio.textContent = `$${producto.precio.toFixed(2).replace(".", ",")}`;
    contenedorDescripcion.appendChild(precio);

    const descuento = document.createElement("p");
    descuento.classList.add("ofertas__articulo-desc");
    descuento.textContent = `${producto.descuento}% off`;
    contenedorDescripcion.appendChild(descuento);

    const botonAgregar = document.createElement("button");
    botonAgregar.classList.add("btn", "btn-primary", "btn-sm", "agregarAlCarritoBtn");
    botonAgregar.textContent = "Añadir al carrito";
    botonAgregar.addEventListener("click", () => agregarAlCarrito(producto.id)); // Pasa el id del producto

    contenedorDescripcion.appendChild(botonAgregar);

    articulo.appendChild(contenedorDescripcion);

    contenedorProductos.appendChild(articulo);

    // Agregar un <hr> después de cada artículo
    const hrElement = document.createElement("hr");
    contenedorProductos.appendChild(hrElement);
  });
}

// Función para abrir el offcanvas del carrito
function abrirCarro() {
  // Verificar si el carrito está vacío
  if (carrito.length === 0) {
    const offcanvasBody = document.querySelector(".offcanvas-body");
    offcanvasBody.innerHTML = '<p class="mensaje-vacio">El carrito está vacío.</p>';

    // Agregar un botón para redirigir a la página de productos
    const redirigirBtn = document.createElement("button");
    redirigirBtn.textContent = "Agregar Productos";
    redirigirBtn.classList.add("btn-redirigir");
    redirigirBtn.addEventListener("click", () => {
      window.location.href = "http://127.0.0.1:5500/productos.html";
    });

    offcanvasBody.appendChild(redirigirBtn);
  } else {
    const offcanvas = new bootstrap.Offcanvas(
      document.getElementById("offcanvasExample")
    );
    offcanvas.show();
  }
}

// Función para mostrar productos por categoría
function mostrarProductosPorCategoria(categoria) {
  // Actualizar la categoría seleccionada
  categoriaSeleccionada = categoria;

  const contenedorProductos = document.querySelector(".ofertas__contenedor");
  contenedorProductos.innerHTML = ''; // Limpiar contenido anterior

  // Obtener el título correspondiente a la categoría
  let titulo = "Ofertas"; // Título predeterminado

  if (categoria === 'Ofertas') {
    // Mostrar solo productos con descuento en la categoría "Ofertas"
    const productosOfertas = productos.filter(producto => producto.descuento > 0);
    mostrarProductosEnHTML(productosOfertas);
  } else {
    // Filtrar y mostrar los productos de la categoría seleccionada
    const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
    mostrarProductosEnHTML(productosFiltrados);

    // Actualizar el título según la categoría seleccionada
    titulo = categoria;
  }

  // Actualizar el título en el HTML
  const tituloCategoria = document.querySelector(".ofertas__titulo h2");
  tituloCategoria.textContent = titulo;
}



// Asignar event listeners a las etiquetas del menú de filtros por su id
document.getElementById('categoria-panales').addEventListener('click', function () {
  mostrarProductosPorCategoria('Pañales');
});

document.getElementById('categoria-hogar').addEventListener('click', function () {
  mostrarProductosPorCategoria('Hogar');
});

document.getElementById('categoria-higiene').addEventListener('click', function () {
  mostrarProductosPorCategoria('Higiene');
});

document.getElementById('categoria-gift').addEventListener('click', function () {
  mostrarProductosPorCategoria('Gift');
});

document.getElementById('categoria-accesorios').addEventListener('click', function () {
  mostrarProductosPorCategoria('Accesorios');
});

document.getElementById('categoria-ofertas').addEventListener('click', function () {
  mostrarProductosPorCategoria('Ofertas');
});

document.getElementById('categoria-maternidad').addEventListener('click', function () {
  mostrarProductosPorCategoria('Maternidad');
});

document.getElementById('categoria-alimentacion').addEventListener('click', function () {
  mostrarProductosPorCategoria('Alimentación');
});
// Puedes agregar más categorías y event listeners según tus necesidades

