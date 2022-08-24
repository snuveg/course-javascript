/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {
  const dd = e.target;
  if (dd.contains('draggable-div')) {
    // dd.addEventListener - ctrl+c из интернета
    dd.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      let xStart = evt.clientX;
      let yStart = evt.clientY;
      const onMouseMove = function (evtMove) {
        evtMove.preventDefault();

        const xNew = xStart - evtMove.clientX;
        const yNew = yStart - evtMove.clientY;
        xStart = evtMove.clientX;
        yStart = evtMove.clientY;
        dd.style.top = dd.offsetTop - yNew + 'px';
        dd.style.left = dd.offsetLeft - xNew + 'px';
      };
      const onMouseUp = function (evtUp) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
});

export function createDiv() {
  const div = document.createElement('div');
  div.classList.add('draggable-div');
  div.style.background = 'red';
  div.style.top = '10px';
  div.style.left = '20px';
  div.style.width = '30px';
  div.style.height = '40px';
  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
