'use strict'

const cart = () => {
  const cartBtn = document.querySelector('.button-cart'),
      card = document.getElementById('modal-cart'),
      closeBtn = card.querySelector('.modal-close');

  // console.dir(cartBtn);
  // console.log(card);

  cartBtn.addEventListener('click', () => {
    card.style.display = 'flex';
  })

  closeBtn.addEventListener('click', () => {
    card.style.display = 'none'
  })
};

cart();