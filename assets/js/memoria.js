const cards = document.querySelectorAll(".card")
const verso = document.querySelectorAll(".card-back")
let bloquearCarta = false
let hadFlippedCard = false
let firstCard, secondCard


function flipCard() {
    if(bloquearCarta) return;
    if(this===firstCard) return;
    this.classList.add('flip')

    if (!hadFlippedCard) {
        hadFlippedCard = true;
        firstCard = this;
        return
    }
    secondCard = this;
    hadFlippedCard = false;

    compararCarta()
    

    function compararCarta() {
        if (firstCard.dataset.card === secondCard.dataset.card) {
            desativarCarta()
            return
        }else{desvirarCarta()}
    }

    function desativarCarta(){
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetarTabuleiro()
    }

    function desvirarCarta() {
        bloquearCarta = true
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            bloquearCarta = false
        },1000)
    }

    function resetarTabuleiro(){
        [hadFlippedCard, bloquearCarta] = [false, false]
        [firstCard, secondCard] = [null, null]
    }

}
    (function embaralharCarta(){
        cards.forEach(card => {
            let posicao = Math.floor(Math.random()*12);
            card.style.order = posicao
        })
    })();

cards.forEach(card => card.addEventListener('click', flipCard))
