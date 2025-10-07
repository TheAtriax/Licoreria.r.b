// Inicializar carrito desde localStorage o vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const carritoItems = document.getElementById('carritoItems');
const btnPagar = document.getElementById('btnPagar');

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarCarrito() {
  carritoItems.innerHTML = '';
  if (carrito.length === 0) {
    carritoItems.innerHTML = '<tr><td colspan="6" class="empty-msg">El carrito está vacío.</td></tr>';
    btnPagar.disabled = true;
    return;
  }
  btnPagar.disabled = false;

  let total = 0;
  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    carritoItems.innerHTML += `
      <tr>
        <td data-label="Producto">${item.nombre}</td>
        <td data-label="Imagen"><img src="${item.img}" alt="${item.nombre}" class="product-img"></td>
        <td data-label="Cantidad">
          <input type="number" min="1" max="100" value="${item.cantidad}" aria-label="Cantidad de ${item.nombre}" onchange="cambiarCantidad(${index}, this.value)">
        </td>
        <td data-label="Precio Unitario">$${item.precio.toFixed(2)}</td>
        <td data-label="Subtotal">$${subtotal.toFixed(2)}</td>
        <td data-label="Eliminar">
          <button onclick="eliminarItem(${index})" aria-label="Eliminar ${item.nombre} del carrito">×</button>
        </td>
      </tr>
    `;
  });

  carritoItems.innerHTML += `
    <tr style="font-weight:bold; color:#f4be3d; font-size:1.2em;">
      <td colspan="4" style="text-align:right;">Total:</td>
      <td colspan="2">$${total.toFixed(2)}</td>
    </tr>
  `;

  guardarCarrito();
}

function agregarCarrito(nombre, precio, img) {
  const index = carrito.findIndex(item => item.nombre === nombre);
  if (index !== -1) {
    carrito[index].cantidad++;
  } else {
    carrito.push({ nombre, precio, img, cantidad: 1 });
  }
  actualizarCarrito();
}

function cambiarCantidad(index, cantidad) {
  cantidad = parseInt(cantidad);
  if (isNaN(cantidad) || cantidad < 1) cantidad = 1;
  carrito[index].cantidad = cantidad;
  actualizarCarrito();
}

function eliminarItem(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

btnPagar.addEventListener('click', () => {
  alert('Gracias por su compra! (Funcionalidad de pago no implementada en demo)');
});

// Inicializa la tabla al cargar la página
actualizarCarrito();
