'use strict';

(function () {
  const cartBtn = document.querySelector('.button-cart'),
        card = document.getElementById('modal-cart'),
        closeBtn = card.querySelector('.modal-close'),
        goodsContainer = document.querySelector('.long-goods-list'),
        cartTable = document.querySelector('.cart-table__goods'),
        modalForm = document.querySelector('.modal-form');

  // console.dir(cartBtn);
  // console.log(card);

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    const newCard = cart.filter(good => {
      return good.id !== id;
    })

    localStorage.setItem('cart', JSON.stringify(newCard));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const plusCardItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    const newCart = cart.map(good => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const minusCardItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    const newCart = cart.map(good => {
      if (good.id === id) {
        if (good.count > 0) {
          good.count--;
        }
      }
      return good;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem('cart')));
  };

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem('goods')),
          clickedGood = goods.find(good => good.id === id),
          cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    if (cart.some(good => good.id === clickedGood.id)) {
      // console.log('clickedGood++');
      cart.map(good => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      // console.log('add to card');
      clickedGood.count = 1;
      cart.push(clickedGood);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  const renderCartGoods = (goods) => {
    cartTable.innerHTML = '';
    goods.forEach(good => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${good.name}</td>
        <td>${good.proce}$</td>
        <td><button class="cart-btn-minus"">-</button></td>
        <td>${good.count}</td>
        <td><button class=" cart-btn-plus"">+</button></td>
        <td>${+good.price * +good.count}$</td>
        <td><button class="cart-btn-delete"">x</button></td>
      `;

      cartTable.append(tr);

      tr.addEventListener('click', (e) => {
        // console.log(e.target);
        if (e.target.classList.contains('cart-btn-minus')) {
          console.log('minus');
          minusCardItem(good.id)
        } else if (e.target.classList.contains('cart-btn-plus')) {
          console.log('plus');
          plusCardItem(good.id)
        } else if (e.target.classList.contains('cart-btn-delete')) {
          console.log('delete');
          deleteCartItem(good.id);
        }
      });

    })
  };

  const sendForm = () => {
    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'POST',
      body: JSON.stringify({
        cart: cartArray,
        name: '',
        phone: ''
      })
    }).then(() => {
      card.style.display = 'none';
    })
  };

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submit');
    sendForm();
  })

  cartBtn.addEventListener('click', () => {
    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    renderCartGoods(cartArray);
    card.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    card.style.display = 'none';
  });
  cart.addEventListener('click', (e) => {
    if (!e.target.closest('.modal' && e.target.classList.contains('overlay'))) {
      cart.style.display = 'none';
    }
  })

  if (goodsContainer) {
    goodsContainer.addEventListener('click', (evt) => {
      if (evt.target.closest('.add-to-cart')) {
        const buttonToCart = evt.target.closest('.add-to-cart'),
              goodId = buttonToCart.dataset.id;

        addToCart(goodId);
      }
    })
  }

})();