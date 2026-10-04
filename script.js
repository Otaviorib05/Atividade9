const data = {
  produtos: [
    { id: 1, nome: "Smartphone Galaxy X", preco: 2499.9, categoria: "Celulares", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCvvIP5Tfdx_TJLOh29WRykl4SNnXXyc52w3aOJw07cw&s=10", descricao: "Tela AMOLED de 6,5 polegadas, 128 GB e câmera tripla.", emEstoque: true },
    { id: 2, nome: "iPhone Pro Mini", preco: 5999.0, categoria: "Celulares", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYgzBF8qnwip336tkP7Y9xvdPSb6e_ZQHytrjSK50vgw&s=10", descricao: "Chip de última geração e câmera com estabilização óptica.", emEstoque: false },
    { id: 3, nome: "Notebook UltraBook 14", preco: 4299.5, categoria: "Notebooks", imagem: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRMGRvVOEoqHiyBQS5afgzGureE28121NdQlCAxqY8D4cf03_fyqJOPCvc9mwW2-24ZJ3vMqfHJU3V_-Hkh2V6oyuybnmf9M1CF3YRdhq4MHeE8goOnVN1_-ehsejgmc_-OLV3-6g6Hbg&usqp=CAc", descricao: "Intel i7, 16 GB de RAM, SSD de 512 GB e tela Full HD.", emEstoque: true },
    { id: 4, nome: "Notebook Gamer Titan", preco: 7899.9, categoria: "Notebooks", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlcSuTGj_I2RC3uj5aMksfmQwFmESC1xMhgqlwmEwJJA&s=10", descricao: "RTX 4060, 32 GB de RAM e tela de 165 Hz.", emEstoque: true },
    { id: 5, nome: "Fone Bluetooth Pro", preco: 349.9, categoria: "Acessórios", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGqJXdRV5xwOaLDUADkTfTxPsWR5og-JhIC_0rTMaQNw&s=10", descricao: "Cancelamento de ruído ativo e 30 horas de bateria.", emEstoque: true },
    { id: 6, nome: "Mouse Sem Fio Ergo", preco: 129.0, categoria: "Acessórios", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgrZv9BTkbgxACWMrToJVULt-H2q28Nc_l4YxEk5xrVg&s=10", descricao: "Design ergonômico, 1600 DPI e bateria de longa duração.", emEstoque: false },
    { id: 7, nome: "Console PlayStation 5", preco: 3799.0, categoria: "Games", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRySmOAlcS_q_vOUCCoDly0pukEylRfPw9Y3aPL-8gfvQ&s=10", descricao: "SSD ultrarrápido, 4K e controle DualSense.", emEstoque: true },
    { id: 8, nome: "Controle Gamer Sem Fio", preco: 399.9, categoria: "Games", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5JWyzug29kaz4LKz8JS5taE7lKi2dAXCTVgHk8sbjHg&s=10", descricao: "Compatível com PC e consoles, com vibração e bateria recarregável.", emEstoque: true }
  ]
};

// Seleção de elementos (getElementById, querySelector)
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
  const card = document.createElement("div");
  card.setAttribute("data-id", produto.id);
  card.classList.add("card");
  card.style.padding = "12px"; // ajuste visual via style

  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);
  img.setAttribute("alt", produto.nome);

  const title = document.createElement("h3");
  title.classList.add("card-title");
  title.textContent = produto.nome;

  const price = document.createElement("span");
  price.classList.add("card-price");
  price.textContent = formatPrice(produto.preco);

  const category = document.createElement("span");
  category.classList.add("card-category");
  category.textContent = produto.categoria;

  const actions = document.createElement("div");
  actions.classList.add("card-actions");

  const btnDetails = document.createElement("button");
  btnDetails.textContent = "Ver detalhes";
  btnDetails.addEventListener("click", () => showProductDetails(produto));

  const btnHighlight = document.createElement("button");
  btnHighlight.textContent = "Destacar";
  btnHighlight.addEventListener("click", () => {
    card.classList.toggle("highlight"); // alterna o destaque (inclui classList.add/remove)
  });

  actions.appendChild(btnDetails);
  actions.appendChild(btnHighlight);

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(category);
  card.appendChild(actions);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";
  produtos.forEach((p) => productList.appendChild(createProductCard(p)));

  // querySelectorAll: ação simples em cada card
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    console.log("Card renderizado, data-id:", card.getAttribute("data-id"));
    card.style.transition = "transform .2s";
  });
  if (cards.length === 0) {
    productList.innerHTML = "<p>Nenhum produto encontrado.</p>";
  }
}

function renderCategories() {
  const categorias = [...new Set(data.produtos.map((p) => p.categoria))];
  categorySelect.innerHTML = '<option value="Todas">Todas</option>';
  categorias.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h3>${produto.nome}</h3>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Estoque:</strong>
      <span class="${produto.emEstoque ? "stock-yes" : "stock-no"}">
        ${produto.emEstoque ? "Em estoque" : "Indisponível"}
      </span>
    </p>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;
}

function filterProducts() {
  const texto = searchInput.value.trim().toLowerCase();
  const categoria = categorySelect.value;
  return data.produtos.filter((p) =>
    p.nome.toLowerCase().includes(texto) &&
    (categoria === "Todas" || p.categoria === categoria)
  );
}

// Eventos
searchInput.addEventListener("input", () => renderProducts(filterProducts()));
categorySelect.addEventListener("change", () => renderProducts(filterProducts()));
btnRender.addEventListener("click", () => renderProducts(filterProducts()));

// Inicialização
renderCategories();
renderProducts(filterProducts());