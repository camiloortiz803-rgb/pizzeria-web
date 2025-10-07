// Número de la pizzería (actualizado)
const WHATSAPP_NUMBER = "573153693952";

// Precio de la porción individual
const PORTION_PRICE = 8000;

// Tamaños de pizza con precios
const PIZZA_SIZES = [
  { id: 'mini', name: 'Mini (21x21)', price: 14000 },
  { id: 'personal', name: 'Personal (26x26)', price: 21000 },
  { id: 'junior', name: 'Junior (33x35)', price: 38000 },
  { id: 'mediana', name: 'Mediana (43x45)', price: 48000 },
  { id: 'familiar', name: 'Familiar (50x50)', price: 73000 }
];

// Datos del menú (sin precios ya que el precio lo define el tipo)
const PIZZAS = [
  { id: 'haw', name: 'Hawaiana', desc: 'Piña, jamón y queso.' },
  { id: 'camp', name: 'Campesina', desc: 'Chorizo, maíz, maduro y queso.' },
  { id: 'polloch', name: 'Pollo con Champiñón', desc: 'Pollo desmechado, champiñones, jamón y queso.' },
  { id: 'kab', name: 'Kabano', desc: 'Kabano y queso.' },
  { id: 'jam', name: 'Jamón y Queso', desc: 'Jamón y queso.' },
  { id: 'pepp', name: 'Pepperoni', desc: 'Pepperoni y queso.' },
  { id: 'mex', name: 'Mexicana', desc: 'Carne desmechada, maduro, maíz, jamón y queso.' },
  { id: 'samba', name: 'Samba', desc: 'Tocineta, Kabano, maduro, maíz y queso.' },
  { id: 'tres', name: 'Tres Carnes', desc: 'Chorizo, pollo en BBQ, carne molida y queso.' },
  { id: 'tent', name: 'Tentación', desc: 'Piña, pollo, kabano, jamón y queso.' },
  { id: 'mad', name: 'Maduro', desc: 'Maduro, tocineta y queso.' },
  { id: 'polloesp', name: 'Pollo Especial', desc: 'Pollo en salsa BBQ, tocineta, maíz y queso.' },
  { id: 'veg', name: 'Vegetariana', desc: 'Champiñón, tomate, cebolla, maíz y queso.' },
  { id: 'marga', name: 'Margarita', desc: 'Tomates, albahaca y queso.' }
];

const ADDITIONS = [
  { id: 'piña', name: 'Piña', price: 2000 },
  { id: 'proteina', name: 'Proteína (carne o pollo)', price: 3000 },
  { id: 'tocineta', name: 'Tocineta', price: 3000 },
  { id: 'maz', name: 'Maíz', price: 2000 },
  { id: 'queso', name: 'Queso', price: 3000 },
  { id: 'pepin', name: 'Pepinillo', price: 2500 },
  { id: 'jalap', name: 'Jalapeños', price: 3000 }
];

const DRINKS = [
  { id: 'post250', name: 'Gaseosa Postobón (250 ml)', price: 2500 },
  { id: 'post400', name: 'Gaseosa Postobón (400 ml)', price: 3500 },
  { id: 'post15', name: 'Gaseosa Postobón (1.5 L)', price: 6500 },
  { id: 'post20', name: 'Gaseosa Postobón (2.0 L)', price: 9000 },
  { id: 'hit350', name: 'Jugo Hit (350 ml)', price: 3500 },
  { id: 'hit500', name: 'Jugo Hit (500 ml)', price: 3500 },
  { id: 'hit1', name: 'Jugo Hit (1.0 L)', price: 5500 },
  { id: 'agua', name: 'Agua (600 ml)', price: 1800 },
  { id: 'coca400', name: 'Gaseosa Coca-Cola (400 ml)', price: 3500 },
  { id: 'coca15', name: 'Gaseosa Coca-Cola (1.5 L)', price: 8000 },
  { id: 'sodap', name: 'Soda Personal', price: 3800 },
  { id: 'aguila', name: 'Cerveza Águila', price: 5000 },
  { id: 'corona', name: 'Cerveza Corona (pequeña)', price: 5000 },
  { id: 'italiana', name: 'Soda Italiana', price: 10000 },
  { id: 'michelada', name: 'Michelada', price: 8000 }
];

// Estado actual del pedido
let currentOrder = {
  pizza: null,
  type: 'portion', // 'portion' o 'size'
  quantity: 1,
  size: null,
  additions: [],
  drink: null
};

// Elementos DOM
const pizzasContainer = document.getElementById('pizzas');
const orderModal = document.getElementById('orderModal');
const pizzaTitle = document.getElementById('pizzaTitle');

// Steps
const steps = {
  type: document.getElementById('stepType'),
  additions: document.getElementById('stepAdditions'),
  drinks: document.getElementById('stepDrinks'),
  checkout: document.getElementById('stepCheckout')
};

// Botones de navegación
const nextToAdditions = document.getElementById('nextToAdditions');
const nextToDrinks = document.getElementById('nextToDrinks');
const nextToCheckout = document.getElementById('nextToCheckout');
const backToType = document.getElementById('backToType');
const backToAdditions = document.getElementById('backToAdditions');
const backToDrinks = document.getElementById('backToDrinks');

// Utilidades
function money(n) {
  return n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}

function placeholderSVG(text) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
    <rect width='100%' height='100%' fill='#222'/>
    <text x='50%' y='50%' fill='#fff' font-size='18' text-anchor='middle' dominant-baseline='middle'>${text}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

// Renderizado inicial de pizzas
function renderPizzas() {
  pizzasContainer.innerHTML = '';
  PIZZAS.forEach(pizza => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb"><img src="${placeholderSVG(pizza.name)}" alt="${pizza.name}" /></div>
      <div>
        <h4>${pizza.name}</h4>
        <p>${pizza.desc}</p>
      </div>
    `;
    card.addEventListener('click', () => startNewOrder(pizza));
    pizzasContainer.appendChild(card);
  });
}

// Iniciar nuevo pedido
function startNewOrder(pizza) {
  currentOrder = {
    pizza: pizza,
    type: 'portion',
    quantity: 1,
    size: null,
    additions: [],
    drink: null
  };
  
  pizzaTitle.textContent = `¿Cómo quieres tu ${pizza.name}?`;
  renderSizes();
  showStep('type');
  orderModal.classList.remove('hidden');
}

// Navegación entre steps
function showStep(stepName) {
  Object.values(steps).forEach(step => {
    step.classList.add('hidden');
    step.classList.remove('active');
  });
  
  steps[stepName].classList.remove('hidden');
  steps[stepName].classList.add('active');
}

// Renderizar tamaños
function renderSizes() {
  const container = document.getElementById('sizeSelection');
  container.innerHTML = '';
  
  PIZZA_SIZES.forEach(size => {
    const option = document.createElement('div');
    option.className = `size-option`;
    option.innerHTML = `
      <div class="type-info">
        <strong>${size.name}</strong>
        <span class="price">${money(size.price)}</span>
      </div>
    `;
    option.addEventListener('click', () => {
      // Seleccionar tamaño
      document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
      document.querySelector('.portion-option').classList.remove('selected');
      option.classList.add('selected');
      
      currentOrder.type = 'size';
      currentOrder.size = size;
      currentOrder.quantity = 1;
    });
    container.appendChild(option);
  });
}

// Renderizar adiciones (step 2)
function renderAdditions() {
  const container = document.getElementById('additionsSelection');
  container.innerHTML = '';
  
  ADDITIONS.forEach(addition => {
    const isSelected = currentOrder.additions.some(a => a.id === addition.id);
    const option = document.createElement('div');
    option.className = `addition-option ${isSelected ? 'selected' : ''}`;
    option.innerHTML = `
      <span>${addition.name}</span>
      <span class="price">+${money(addition.price)}</span>
    `;
    option.addEventListener('click', () => {
      option.classList.toggle('selected');
      if (option.classList.contains('selected')) {
        currentOrder.additions.push(addition);
      } else {
        currentOrder.additions = currentOrder.additions.filter(a => a.id !== addition.id);
      }
    });
    container.appendChild(option);
  });
}

// Renderizar bebidas (step 3)
function renderDrinks() {
  const container = document.getElementById('drinksSelection');
  container.innerHTML = '';
  
  // Opción sin bebida
  const noDrinkOption = document.createElement('div');
  noDrinkOption.className = `drink-option ${!currentOrder.drink ? 'selected' : ''}`;
  noDrinkOption.innerHTML = `
    <span>Sin bebida</span>
    <span class="price">$0</span>
  `;
  noDrinkOption.addEventListener('click', () => {
    document.querySelectorAll('.drink-option').forEach(opt => opt.classList.remove('selected'));
    noDrinkOption.classList.add('selected');
    currentOrder.drink = null;
  });
  container.appendChild(noDrinkOption);
  
  // Opciones de bebidas
  DRINKS.forEach(drink => {
    const isSelected = currentOrder.drink?.id === drink.id;
    const option = document.createElement('div');
    option.className = `drink-option ${isSelected ? 'selected' : ''}`;
    option.innerHTML = `
      <span>${drink.name}</span>
      <span class="price">${money(drink.price)}</span>
    `;
    option.addEventListener('click', () => {
      document.querySelectorAll('.drink-option').forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      currentOrder.drink = drink;
    });
    container.appendChild(option);
  });
}

// Renderizar resumen del pedido (step 4)
function renderOrderSummary() {
  const container = document.getElementById('orderSummary');
  const totalElement = document.getElementById('orderTotal');
  
  let total = 0;
  container.innerHTML = '';
  
  // Pizza según el tipo
  if (currentOrder.pizza) {
    let pizzaPrice = 0;
    let description = '';

    if (currentOrder.type === 'portion') {
      pizzaPrice = PORTION_PRICE * currentOrder.quantity;
      description = `${currentOrder.pizza.name} - ${currentOrder.quantity} porción(es)`;
    } else if (currentOrder.type === 'size') {
      pizzaPrice = currentOrder.size.price;
      description = `${currentOrder.pizza.name} - ${currentOrder.size.name}`;
    }

    total += pizzaPrice;
    const item = document.createElement('div');
    item.className = 'summary-item';
    item.innerHTML = `
      <span>${description}</span>
      <span>${money(pizzaPrice)}</span>
    `;
    container.appendChild(item);
  }
  
  // Adiciones (se multiplican por la cantidad si es porción)
  currentOrder.additions.forEach(addition => {
    const additionPrice = currentOrder.type === 'portion' ? 
      addition.price * currentOrder.quantity : addition.price;
    total += additionPrice;
    const item = document.createElement('div');
    item.className = 'summary-item';
    item.innerHTML = `
      <span>+ ${addition.name}</span>
      <span>${money(additionPrice)}</span>
    `;
    container.appendChild(item);
  });
  
  // Bebida
  if (currentOrder.drink) {
    total += currentOrder.drink.price;
    const item = document.createElement('div');
    item.className = 'summary-item';
    item.innerHTML = `
      <span>${currentOrder.drink.name}</span>
      <span>${money(currentOrder.drink.price)}</span>
    `;
    container.appendChild(item);
  }
  
  totalElement.textContent = money(total);
}

// Enviar pedido por WhatsApp
function sendOrder() {
  const name = document.getElementById('customerName').value.trim();
  const address = document.getElementById('customerAddress').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const paymentMethod = document.getElementById('paymentMethod').value;
  
  if (!name || !address || !phone || !paymentMethod) {
    alert('Por favor completa todos los campos obligatorios');
    return;
  }
  
  const message = buildWhatsAppMessage(name, address, phone, paymentMethod);
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  
  window.open(url, '_blank');
  orderModal.classList.add('hidden');
}

// Construir mensaje de WhatsApp
function buildWhatsAppMessage(name, address, phone, paymentMethod) {
  let lines = [];
  lines.push(`🍕 *NUEVO PEDIDO - PIZZERÍA EL BAMBINO D' ORO*`);
  lines.push(``);
  lines.push(`*Cliente:* ${name}`);
  lines.push(`*Dirección:* ${address}`);
  lines.push(`*Teléfono:* ${phone}`);
  lines.push(`*Método de pago:* ${getPaymentMethodName(paymentMethod)}`);
  lines.push(``);
  lines.push(`*DETALLE DEL PEDIDO:*`);
  lines.push(``);
  
  let total = 0;
  
  // Pizza según el tipo
  if (currentOrder.pizza) {
    let pizzaPrice = 0;
    let description = '';

    if (currentOrder.type === 'portion') {
      pizzaPrice = PORTION_PRICE * currentOrder.quantity;
      description = `${currentOrder.pizza.name} - ${currentOrder.quantity} porción(es)`;
      lines.push(`*${description}*`);
      lines.push(`Precio: ${money(pizzaPrice)}`);
    } else if (currentOrder.type === 'size') {
      pizzaPrice = currentOrder.size.price;
      description = `${currentOrder.pizza.name} - ${currentOrder.size.name}`;
      lines.push(`*${description}*`);
      lines.push(`Precio: ${money(pizzaPrice)}`);
    }

    total += pizzaPrice;
  }
  
  // Adiciones
  if (currentOrder.additions.length > 0) {
    lines.push(`Adiciones: ${currentOrder.additions.map(a => a.name).join(', ')}`);
    currentOrder.additions.forEach(addition => {
      const additionPrice = currentOrder.type === 'portion' ? 
        addition.price * currentOrder.quantity : addition.price;
      total += additionPrice;
      lines.push(`+ ${addition.name}: ${money(additionPrice)}`);
    });
  }
  
  // Bebida
  if (currentOrder.drink) {
    total += currentOrder.drink.price;
    lines.push(`Bebida: ${currentOrder.drink.name} - ${money(currentOrder.drink.price)}`);
  }
  
  lines.push(``);
  lines.push(`*TOTAL A PAGAR: ${money(total)}*`);
  lines.push(``);
  lines.push(`¡Gracias por tu pedido!`);
  
  return lines.join('\n');
}

function getPaymentMethodName(method) {
  const methods = {
    'efectivo': 'Efectivo',
    'nequi': 'Nequi',
    'daviplata': 'DaviPlata'
  };
  return methods[method] || method;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  renderPizzas();
  
  // Navegación entre steps
  nextToAdditions.addEventListener('click', () => {
    if (!currentOrder.pizza) {
      alert('Por favor selecciona una pizza');
      return;
    }
    renderAdditions();
    showStep('additions');
  });
  
  nextToDrinks.addEventListener('click', () => {
    renderDrinks();
    showStep('drinks');
  });
  
  nextToCheckout.addEventListener('click', () => {
    renderOrderSummary();
    showStep('checkout');
  });
  
  backToType.addEventListener('click', () => showStep('type'));
  backToAdditions.addEventListener('click', () => showStep('additions'));
  backToDrinks.addEventListener('click', () => showStep('drinks'));
  
  // Cerrar modal
  document.getElementById('closeOrder').addEventListener('click', () => {
    orderModal.classList.add('hidden');
document.getElementById("orderModal").classList.add("active");
document.getElementById("orderModal").classList.remove("active");

  });
  
  // Enviar pedido
  document.getElementById('sendWhats').addEventListener('click', sendOrder);

  // Control de cantidad para porciones
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('qty-btn')) {
      const action = e.target.getAttribute('data-action');
      const quantityElement = document.getElementById('portionQty');
      let quantity = parseInt(quantityElement.textContent);
      
      if (action === 'increase') {
        quantity++;
      } else if (action === 'decrease' && quantity > 1) {
        quantity--;
      }
      
      quantityElement.textContent = quantity;
      currentOrder.quantity = quantity;
      
      // Seleccionar automáticamente la opción de porción
      document.querySelector('.portion-option').classList.add('selected');
      document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
      currentOrder.type = 'portion';
      currentOrder.size = null;
    }
  });

  // Seleccionar porción individual al hacer clic
  document.querySelector('.portion-option').addEventListener('click', function() {
    document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
    this.classList.add('selected');
    currentOrder.type = 'portion';
    currentOrder.size = null;
  });
});