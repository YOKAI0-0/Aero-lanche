let carrinho = [];

const cardapio = {
  burguer: [
    { nome: "X-Salada", preco: 20 },
    { nome: "X-Salada Duplo", preco: 26 },
    { nome: "X-Burguer", preco: 19 },
    { nome: "X-Egg", preco: 21 },
    { nome: "X-Bacon", preco: 25 },
    { nome: "X-Calabresa", preco: 20 },
    { nome: "X-Frango", preco: 18 },
    { nome: "X-Frango com Catupiry", preco: 24 },
    { nome: "X-Frango com Hambúrguer", preco: 24 },
    { nome: "X-Frango Especial", preco: 25 },
    { nome: "X-Alcatra", preco: 35 },
    { nome: "X-Da Casa", preco: 33 },
    { nome: "X-Vegetariano", preco: 20 },
    { nome: "X-Misto Quente", preco: 13 }
  ],
  dogs: [
    { nome: "Dog Simples", preco: 10 },
    { nome: "Dog Duplo", preco: 12 },
    { nome: "Dog Duplo com Queijo", preco: 16 },
    { nome: "Dog Burguer", preco: 17 },
    { nome: "Dog Bacon", preco: 17 },
    { nome: "Dog Bacon Cheddar", preco: 24 },
    { nome: "Dog Frango", preco: 14 },
    { nome: "Dog Frango com Catupiry", preco: 21 },
    { nome: "Dog da Casa", preco: 23 }
  ],
  porcoes: [
    { nome: "Batata Individual", preco: 8 },
    { nome: "Batata Porção", preco: 15 },
    { nome: "Batata com Bacon e Cheddar", preco: 30 },
    { nome: "Calabresa Acebolada", preco: 20 }
  ],
  bebidas: [
    { nome: "Água", preco: 4 },
    { nome: "Refrigerante Lata", preco: 6 },
    { nome: "Refrigerante 600ml", preco: 8 },
    { nome: "Suco Pequeno", preco: 8 },
    { nome: "Suco Grande", preco: 15 }
  ]
};

montarCardapio();

function montarCardapio() {
  const div = document.getElementById("cardapio");

  for (let categoria in cardapio) {
    const secao = document.createElement("div");
    secao.className = "categoria";
    secao.innerHTML = `<h2>${categoria.toUpperCase()}</h2>`;

    cardapio[categoria].forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";

      itemDiv.innerHTML = `
        <strong>${item.nome}</strong><br>
        R$ ${item.preco.toFixed(2)}<br>
        <button onclick="adicionarAoCarrinho('${item.nome}', ${item.preco})">
          Adicionar
        </button>
      `;

      secao.appendChild(itemDiv);
    });

    div.appendChild(secao);
  }
}

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const ul = document.getElementById("carrinho");
  ul.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    ul.appendChild(li);
    total += item.preco;
  });

  document.getElementById("total").innerText =
    `Total: R$ ${total.toFixed(2)}`;
}

function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  let texto = "Pedido - Aero Lanche\n\n";
  let total = 0;

  carrinho.forEach(item => {
    texto += `${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    total += item.preco;
  });

  texto += `\nTotal: R$ ${total.toFixed(2)}`;

  const telefone = "5543991547109"; // número real aqui
  const mensagem = encodeURIComponent(texto);

  const url = `https://wa.me/${telefone}?text=${mensagem}`;

  // força abrir fora do Acode
  window.open(url, "_system");
}