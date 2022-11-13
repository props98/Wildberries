'use strict';

(function () {
  const links = document.querySelectorAll('.navigation-link');

  function getData() {
    fetch('/db/db.json')
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);

      const dataArr = JSON.stringify(data);
      localStorage.setItem('goods', dataArr);
    })
  }

  links.forEach(link => {
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      getData();
    })
  });

  console.log(JSON.parse(localStorage.getItem(dataArr)));

  // localStorage.setItem('goods1', JSON.stringify({name: 'Neo'}));
  // localStorage.setItem('goods2', JSON.stringify([1, 2, 3, 4, 5]));

  // const goods2 = JSON.parse(localStorage.getItem('goods2'));
  // console.log(goods2);

  // console.log(localStorage);
  // localStorage.removeItem('goods2');
  // console.log(localStorage);



})();

