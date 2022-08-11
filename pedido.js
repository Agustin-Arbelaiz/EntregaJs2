const carrito = localStorage.getItem("pedido");
carrito= JSON.parse(carrito); 

function sumaTotal(carrito){
    let resultado = 0;
    carrito.forEach(e => {
        resultado = resultado + e.precio;
    });

    return resultado;
}

function mostrarPedido(carrito){
   
    const pedidoFinal= document.getElementById("contenedor-de-birras");
    let resultado = sumaTotal(carrito);
    pedidoFinal.innerHTML ="<h1> Su cuenta</h1>";
  
    
    carrito.forEach(e => {
        const divCarrito = document.createElement("div");
        divCarrito.classList.add("div-compra");
        divCarrito.innerHTML = `
        <h3>${e.estilo}</h3>
        <p>${e.precio}pesitos</p>`;
    
    pedidoFinal.appendChild(divCarrito);
    });

    const divTotal = document.createElement("div");
    divTotal.classList.add("div-total");
    divTotal.innerHTML = `<h2>Total: ${resultado}</h2>`;
    pedidoFinal.appendChild(divTotal);
    botonVolver();
}

mostrarPedido();