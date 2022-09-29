const contenedor = document.getElementById("contenedor");
const card = document.getElementById("card");
const cardNombre = document.getElementById("nombre");
const cardPrecio = document.getElementById("precio");
const cardImagen = document.getElementById("imagen");

const form = document.getElementById("form");
const inputSearch = document.getElementById("search");
const pizzasGuardadas = JSON.parse(localStorage.getItem("pizzas")) || {};
const pizzas = [
  {
    id: 1,
    nombre: "Mozzarella",
    ingredientes: [
      "salsa de tomate",
      "queso mozzarella",
      "orégano",
      "aceitunas",
    ],
    precio: 1200,
    imagen: "/assets/img/Pizza-Muzzarella.jpg",
  },
  {
    id: 2,
    nombre: "Napolitana",
    ingredientes: [
      "salsa de tomate",
      "queso mozzarella",
      "albahaca",
      "aceite de oliva",
    ],
    precio: 1400,
    imagen: "/assets/img/Pizza-Napolitana.jpg",
  },
  {
    id: 3,
    nombre: "Fugazza",
    ingredientes: ["queso mozzarella", "cebolla", "orégano", "aceitunas"],
    precio: 1400,
    imagen: "/assets/img/Pizza-Fugazza.webp",
  },
  {
    id: 4,
    nombre: "Cuatro Quesos",
    ingredientes: [
      "salsa de tomate",
      "queso mozzarella",
      "queso gorgonzola",
      "queso fontina",
      "queso parmesano",
    ],
    precio: 1900,
    imagen: "/assets/img/Pizza-Cuatro-Quesos.jpg",
  },
  {
    id: 5,
    nombre: "Especial",
    ingredientes: [
      "salsa de tomate",
      "queso mozzarella",
      "jamón",
      "huevo",
      "morrones",
      "aceitunas",
    ],
    precio: 1500,
    imagen: "/assets/img/Pizza-Especial.webp",
  },
  {
    id: 6,
    nombre: "Rúcula y Jamón",
    ingredientes: [
      "salsa de tomate",
      "queso mozzarella",
      "jamón crudo",
      "rúcula",
      "aceitunas",
    ],
    precio: 1600,
    imagen: "/assets/img/Pizza-Rucula-y-Jamon-Crudo.jpg",
  },
];
window.addEventListener("DOMContentLoaded", () => {
  if (Object.values(pizzasGuardadas).length) {
    renderPizza(pizzasGuardadas);
  }
});
form.addEventListener("submit", enviarId);

const saveLocalStorage = (pizzaList) => {
  localStorage.setItem("pizzas", JSON.stringify(pizzaList));
};

function enviarId(e) {
  e.preventDefault();
  const pizzaId = parseInt(inputSearch.value);
  if (!pizzaId) {
    mostrarAlerta("Elegí un id válido (1-6)");
    return;
  }
  if (pizzaId <= 0 || pizzaId > pizzas.length) {
    mostrarAlerta("Elegí un id válido (1-6)");
    return;
  }
  const resultado = pizzas.find((pizza) => pizza.id === pizzaId);
  renderPizza(resultado);
  saveLocalStorage(resultado);
}
const renderPizza = (pizza) => {
  limpiarHTML();
  const { id, nombre, precio, imagen, ingredientes } = pizza;
  contenedor.innerHTML += `
  <div class="card" id="card">
    <p class="card__nombre text-center font-bold" id="nombre">#${id} ${nombre}</p>
    <p class="card__precio text-center text-gray" id="precio">${precio}</p>
    <div class="card__info">
      <div class="card__imagen">
        <img id="imagen" src="${imagen}" alt="">
      </div>
      <ul class="card__ingredientes" id="ingredientes">✔ Ingredientes: </ul>
    </div>
  </div>
  `;
  const cardIngredientes = document.getElementById("ingredientes");
  ingredientes.map((ingrediente) => {
    cardIngredientes.innerHTML += `
    <li>${ingrediente}</li>
    `;
  });
};

const mostrarAlerta = (mensaje) => {
  const existeAlerta = document.querySelector(".alerta");
  if (existeAlerta) {
    existeAlerta.remove();
  }
  const divAlert = document.createElement("div");
  divAlert.classList.add("alerta");
  divAlert.innerHTML = `
    <p>${mensaje}</p>
    `;
  contenedor.appendChild(divAlert);
  setTimeout(() => {
    divAlert.remove();
  }, 3000);
};
function limpiarHTML() {
  contenedor.innerHTML = "";
}
