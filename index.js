/* Mi idea es armar un e-commerce para el proyecto final que ya comence a construir. En ésta primer pre-entrega arme un simulador de un carrito de compras con algunos productos y que además calcule el costo de envio segun la localidad, aunque superando algunos montos de compra el costo de envio es gratis.
 */

const productos = {
  manzana: 580,
  banana: 395,
  uva: 487,
  pera: 665,
  naranja: 700,
};

let carrito = {};
let total = 0;
let continuar = true;

function agregarProducto() {
  let producto = prompt(
    "Ingrese el nombre de un producto (" +
      Object.keys(productos).join(", ") +
      "):"
  );

  if (producto === null || producto.trim() === "") {
    alert("Debe ingresar un producto.");
    return;
  }

  if (productos.hasOwnProperty(producto)) {
    let cantidad = parseFloat(
      prompt(`Ingrese la cantidad de kilos de ${producto}:`)
    );

    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Cantidad no válida. Debe ingresar un número mayor a 0.");
      return;
    }

    carrito[producto] = {
      cantidad: cantidad,
      precio: productos[producto],
    };

    total += carrito[producto].precio * carrito[producto].cantidad;
  } else {
    alert("Producto no válido. Por favor, ingrese un producto de la lista.");
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
