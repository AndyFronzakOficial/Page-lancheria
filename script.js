const addButtonList = document.querySelectorAll('.add-button');
const carrinhoButton = document.getElementById('carrinho-button');
const carrinhoCount = document.getElementById('carrinho-count');
const carrinhoList = document.getElementById('carrinho-list');
const totalElement = document.getElementById('total');
const finalizarPedidoButton = document.getElementById('finalizar-pedido');

let carrinho = [];
let total = 0;

function atualizarCarrinho() {
  carrinhoList.innerHTML = '';
  total = 0;

  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
    carrinhoList.appendChild(li);
    total += item.price;
  });

  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

addButtonList.forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    carrinho.push({ name, price });
    updateCarrinho();
  });
});

carrinhoButton.addEventListener('click', () => {
  atualizarCarrinho();
});

finalizarPedidoButton.addEventListener('click', () => {
    const pedido = carrinho.map(item => `${item.name} (R$ ${item.price.toFixed(2)})`).join(', ');
    const mensagem = `Olá, gostaria de fazer o pedido das seguintes pizzas: ${pedido}. Total: R$ ${total.toFixed(2)}.`;
    const url = `https://api.whatsapp.com/send?phone=5551984743961&text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  });
  

function updateCarrinho() {
  carrinhoCount.textContent = carrinho.length;
  atualizarCarrinho(); // Adicione esta linha para atualizar o carrinho imediatamente após adicionar um item
}
