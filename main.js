
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav-menu_visible");

  if (navMenu.classList.contains("nav-menu_visible")) {
    navToggle.setAttribute("aria-label", "Cerrar menú");
  } else {
    navToggle.setAttribute("aria-label", "Abrir menú");
  }
});

// Objeto base
class Birra {
    constructor (estilo, ibu, alcohol, precio, imagen,descripcion){
        this.estilo = estilo;
        this.ibu = ibu;
        this.alcohol = alcohol;
        this.precio = precio;
        this.imagen = imagen;
        this.descripcion = descripcion;
    }
}
//carga de objetos
const birra1 = new Birra ("Indian Pale Ale","45","6", 450, "./images/jamineta.jpg", "American Ipa hecha y derecha. Balanceada y con alta tomabilidad. La vieja confiable. ");
const birra2 = new Birra ("Scottish export", "18", "5", 300, "./images/scottish.jpg", "Caramelo intenso, maltas tostadas y ahumadas. Gran tomabilidad, excelente balance.");
const birra3 = new Birra ("Session Ipa", "25","4,5", 400 ,"./images/sessionipa.jpg", "Suave, fresca, tomable y ligeramente amarga. Para los que no saben con que arrancar, esta es la indicada.");
const birra4 = new Birra ("Neipa","x","6,5",550,"./images/neipa.jpg", "La reina del lupulo, frutada, seca, adictiva. Ideal para los amantes del lupulo");
const birra5 = new Birra ("Catharina sour", "8","4,5",400, "./images/sour.jpg", "Mezcla de frutas de estacion, fresca y compleja. La frutilla del postre. En esta reina la acidez.");
const birra6 = new Birra ("Golden Summer Ale","20","5,5",300,"./images/goldeneta.webp", "Cerveza suave, de alta tomabilidad, y cuerpo cedoso.");
const birra7 = new Birra ("Doble Hazy Ipa", "x", "7,1",550,"./images/copaipa.webp", "Una bomba lupulada, con alta graduación alcoholica, pero mucha tomabilidad. ");
//array de objetos
const cervezas = [];
const pedido = [];

cervezas.push(birra1);
cervezas.push(birra2);
cervezas.push(birra3);
cervezas.push(birra4);
cervezas.push(birra5);
cervezas.push(birra6);
cervezas.push(birra7);

//detalle objeto

function mostrarDetalles(cerveza){
    const contenedorDeBirras = document.getElementById("contenedor-de-birras");
    contenedorDeBirras.innerHTML= "";
    
    contenedorDeBirras.innerHTML= `
    <img src= "${cerveza.imagen}" alt="${cerveza.estilo}" >
    <h3>${cerveza.estilo}</h3>

    <h4> ${cerveza.descripcion}</h4>

    <p>${cerveza.ibu} ibu</p>
    <p>${cerveza.alcohol}%</p>
    <h5>${cerveza.precio} Pesitos </h5>

    `;

};

//estructura principal
fetch('/data/data.json')
    .then(res => res.json())
    .then(data=> {
        
            const contenedorDeBirras = document.getElementById("contenedor-de-birras");
            contenedorDeBirras.innerHTML ="";
    
        data.forEach(cerveza => {
            const divCerveza = document.createElement ("div");
            divCerveza.classList.add("cerveza");
            divCerveza.innerHTML = `
                <img src= "${cerveza.img}" alt="${cerveza.estilo}" >
                <h3>${cerveza.estilo}</h3>
            `;
            const detalleBirra = document.createElement("button");
            detalleBirra.innerText = "Caracteristicas generales";
            detalleBirra.addEventListener ("click", ()=> {
                mostrarDetalles(cerveza);
                botonVolver();
                botonCompra(cerveza);
                botonVerPedido();
                
            });
            divCerveza.appendChild(detalleBirra);
            contenedorDeBirras.appendChild(divCerveza);
        });
    }
    )



function botonVolver(){
    const backButton = document.createElement("button");
    backButton.classList.add("boton-volver");
    backButton.innerText = "Atras";
    backButton.addEventListener("click", ()=>{
        mostrarBirras(cervezas);
    });
    document.getElementById("contenedor-de-birras").prepend(backButton);
}

function botonCompra(cerveza){
    const orderButton = document.createElement("button");
    orderButton.classList.add("boton-orden");
    orderButton.innerText= "Ordenar";
    orderButton.addEventListener("click",()=> {
        pedido.push(cerveza);
        console.log(cerveza);
    });
    document.getElementById("contenedor-de-birras").append(orderButton);
}

function botonVerPedido (){
    const buyButton = document.createElement("button");
    buyButton.classList.add("boton-carrito");
    buyButton.innerText= "Ver Pedido";
    buyButton.addEventListener("click", () =>{
        mostrarPedido(pedido);
    });
    document.getElementById("contenedor-de-birras").append(buyButton);
}

mostrarBirras(cervezas);

localStorage.setItem('pedido', JSON.stringify(pedido));

