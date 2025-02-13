// Navbar
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('active');
}

// Card produtos
// Selecionar todos os elementos com a classe "card"
const cards = document.querySelectorAll(".card");

// Adicionar eventos separados para cada elemento com a classe "card"
cards.forEach(card => {
  card.onmousemove = e => updateMousePosition(e, card);
});

// Função para atualizar as propriedades CSS com as coordenadas do mouse
function updateMousePosition(event, card) {
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  card.style.setProperty("--mouse-x", `${x}px`);
  card.style.setProperty("--mouse-y", `${y}px`);
}

// Toggle filtro visível
document.querySelectorAll('.toggle-filter').forEach(element => {
  element.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const filterOptions = document.getElementById(targetId);

    // No mobile, alterna a visibilidade das opções
    if (window.innerWidth <= 768) {
      filterOptions.style.display = filterOptions.style.display === 'none' ? 'block' : 'none';
    }
  });
});

// Filtro 1 (notebooks/laptops)
const priceSlider = document.getElementById('price-slider');
const priceDisplay = document.getElementById('price-display');
const colorFilters = document.querySelectorAll('.color-filter');
const categoryFilters = document.querySelectorAll('.category-filter');
const keywordFilters = document.querySelectorAll('.keyword-filter');

// Verificar se os elementos existem
if (!priceSlider || !priceDisplay) {
  console.error('Elementos de preço não encontrados.');
} else {
  // Inicializa os filtros no carregamento
  window.onload = function() {
    priceSlider.value = 5000; // Define o valor inicial do slider
    priceDisplay.textContent = `Até R$ 5000`; // Exibe o valor inicial
    filterProducts1(); // Chama o filtro ao carregar a página
  };
}

// Adiciona os eventos de mudança de filtro
priceSlider.addEventListener('input', function() {
  priceDisplay.textContent = `Até R$ ${this.value}`;
  filterProducts1();
});

colorFilters.forEach(filter => {
  filter.addEventListener('change', function() {
    filterProducts1();
  });
});

categoryFilters.forEach(filter => {
  filter.addEventListener('change', function() {
    filterProducts1();
  });
});

keywordFilters.forEach(filter => {
  filter.addEventListener('change', function() {
    filterProducts1();
  });
});

function filterProducts1() {
  const maxPrice = parseFloat(priceSlider.value); // Obtém o valor do slider
  console.log(`Max Price selected: R$ ${maxPrice}`);

  const selectedColors = Array.from(colorFilters)
    .filter(input => input.checked)
    .map(input => input.value.toLowerCase());
  const selectedCategories = Array.from(categoryFilters)
    .filter(input => input.checked)
    .map(input => input.value.toLowerCase());
  const selectedKeywords = Array.from(keywordFilters)
    .filter(input => input.checked)
    .map(input => input.value.toLowerCase());

  const productContainer = document.getElementById('productContainer');
  
  if (!productContainer) {
    console.error('Container de produtos não encontrado.');
    return;
  }

  const products = productContainer.querySelectorAll('.product');

  products.forEach(product => {
    const productPriceText = product.querySelector('.price') ? product.querySelector('.price').textContent : '0';
    const productPrice = parseFloat(productPriceText.replace('R$', '').replace('.', '').replace(',', '.').trim());
    console.log(`Price of product: R$ ${productPrice}`);

    if (productPrice > maxPrice) {
      product.style.display = 'none';
    } else {
      product.style.display = '';
    }

    const productColor = product.getAttribute('data-color').toLowerCase();
    if (selectedColors.length > 0 && !selectedColors.includes(productColor)) {
      product.style.display = 'none';
    }

    const productCategory = product.getAttribute('data-category').toLowerCase();
    if (selectedCategories.length > 0 && !selectedCategories.includes(productCategory)) {
      product.style.display = 'none';
    }

    const productKeywords = product.getAttribute('data-keywords') ? product.getAttribute('data-keywords').toLowerCase().split(', ') : [];
    if (selectedKeywords.length > 0 && !selectedKeywords.some(keyword => productKeywords.includes(keyword))) {
      product.style.display = 'none';
    }
  });
}

// Filtro 2 (monitores)
function filterProducts2() {
  const selectedCategories = Array.from(document.querySelectorAll('.category-filter2:checked')).map(checkbox => checkbox.value);
  const selectedKeywords = Array.from(document.querySelectorAll('.keyword-filter2:checked')).map(checkbox => checkbox.value.toLowerCase());
  const selectedColors = Array.from(document.querySelectorAll('.color-filter2:checked')).map(checkbox => checkbox.value.toLowerCase());
  const priceLimit = document.querySelector('#price-slider2').value;

  const products = document.querySelectorAll('.product2');

  products.forEach(product => {
    const productCategory = product.dataset.category;
    const productKeywords = product.dataset.keywords.split(', ');
    const productColor = product.dataset.color;
    const productPrice = parseInt(product.dataset.price);

    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(productCategory);
    const keywordMatch = selectedKeywords.length === 0 || selectedKeywords.some(keyword => productKeywords.includes(keyword));
    const colorMatch = selectedColors.length === 0 || selectedColors.includes(productColor);
    const priceMatch = productPrice <= priceLimit;

    if (categoryMatch && keywordMatch && colorMatch && priceMatch) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Adiciona os eventos para filtro 2
document.querySelectorAll('.category-filter2, .keyword-filter2, .color-filter2').forEach(input => {
  input.addEventListener('change', filterProducts2);
});

document.querySelector('#price-slider2').addEventListener('input', function () {
  document.querySelector('#price-display2').textContent = `Até R$ ${this.value}`;
  filterProducts2();
});

// Função de toggle para abrir/fechar os filtros no mobile
document.querySelectorAll('.toggle-filter2').forEach(button => {
  button.addEventListener('click', function() {
    const target = document.getElementById(button.getAttribute('data-target'));
    target.style.display = target.style.display === 'none' ? 'flex' : 'none';
  });
});

// Inicializar os filtros ao carregar a página
window.onload = filterProducts2;



// filtro perifericos
// Filtro de produtos
function filterProducts3(category) {
  const products = document.querySelectorAll('.products');
  const buttons = document.querySelectorAll('.shine-button');

  // Remove o estado ativo de todos os botões
  buttons.forEach(button => button.classList.remove('active'));

  // Adiciona o estado ativo ao botão correspondente
  document.querySelector(`.shine-button.${category}`).classList.add('active');

  products.forEach(product => {
      if (category === 'todos') {
          product.style.display = 'block'; // Mostra todos os produtos
      } else {
          if (product.classList.contains(category)) {
              product.style.display = 'block'; // Mostra produtos da categoria
          } else {
              product.style.display = 'none'; // Esconde os outros produtos
          }
      }
  });
}

// Ativa o botão "Todos" e exibe todos os produtos ao carregar
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.shine-button.todos').click(); // Simula um clique no botão "Todos"
});


