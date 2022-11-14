'use strict';

(function () {
  const links = document.querySelectorAll('.navigation-link'),
        more = document.querySelector('.more');

  function renderGoods(goods) {
    // console.log(goods);
    const goodsContainer = document.querySelector('.long-goods-list');
    // console.log(goodsContainer);
    goodsContainer.innerHTML = '';

    goods.forEach(good => {
      const goodBlock = document.createElement('div');

      goodBlock.classList.add('col-lg-3');
      goodBlock.classList.add('col-sm-6');

      goodBlock.innerHTML = `
        <div class="goods-card">
          <span class="label ${good.label ? null : 'd-none'} ">${good.label}</span>
          <img src="/db/${good.img}" alt="${good.name}" class="goods-image">
          <h3 class="goods-title">${good.name}</h3>
          <p class="goods-description">${good.description}</p>
          <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
            <span class="button-price">$${good.price}</span>
          </button>
        </div>
      `;

      goodsContainer.append(goodBlock);

      // console.log(good);
    })
  }

  function getData(value, category) {
    fetch('/db/db.json')
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const array = category ? data.filter(item => item[category] === value) : data;

      // Обычное условие
      // if (category) {
      //   console.log('has');
      // } else {
      //   console.log('no');
      // }

      // Тернарный оператор
      // category ? console.log('has') : console.log('no');

      localStorage.setItem('goods', JSON.stringify(array));

      if (window.location.pathname !== '/goods.html') {
        window.location.href = '/goods.html'
      } else {
        renderGoods(array);
      }
      // window.location.href = '/goods.html';
      // console.log(window.location);
    })
  }

  links.forEach(link => {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      const linkValue = link.textContent;
      const category = link.dataset.field;
      // console.log(category);

      getData(linkValue, category);
    })
  });

  if (localStorage.getItem('goods') && window.location.pathname === '/goods.html') {
    renderGoods(JSON.parse(localStorage.getItem('goods')));
  }

  if (more) {
    more.addEventListener('click', (e) => {
      e.preventDefault();
      getData();
    });
  } 


  // localStorage.setItem('goods1', JSON.stringify({name: 'Neo'}));
  // localStorage.setItem('goods2', JSON.stringify([1, 2, 3, 4, 5]));

  // const goods2 = JSON.parse(localStorage.getItem('goods2'));
  // console.log(goods2);

  // console.log(localStorage);
  // localStorage.removeItem('goods2');
  // console.log(localStorage);



})();

