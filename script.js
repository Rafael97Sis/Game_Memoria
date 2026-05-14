const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

/**
 * Função para virar a carta
 */
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // Primeiro clique
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Segundo clique
  secondCard = this;
  checkForMatch();
}

/**
 * Checa se as cartas são iguais comparando o data-card
 */
function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  // Se forem iguais, desabilita. Se não, desvira.
  isMatch ? disableCards() : unflipCards();
}

/**
 * Mantém as cartas viradas e remove o evento de clique
 */
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

/**
 * Desvira as cartas caso não sejam iguais
 */
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000); // Reduzi para 1s para o jogo ficar mais dinâmico no mobile
}

/**
 * Limpa as variáveis de controle do tabuleiro
 */
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

/**
 * Função Autoinvocável para embaralhar as cartas
 * O uso do order do CSS Grid/Flexbox faz o posicionamento aleatório
 */
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

/**
 * Adiciona o evento de clique em cada carta
 */
cards.forEach(card => card.addEventListener('click', flipCard));