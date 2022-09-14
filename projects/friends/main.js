
VK.init({
  apiId: 51425092
});

function auth() {
  return new Promise((resolve, reject) => {
    VK.Auth.login(data => {
      if (data.session) {
        resolve();
      } else {
        reject(new Error('error'));
      }
    }, 2);
  });
}

function callAPI(method, params) {
  params.v = '5.131';
  return new Promise((resolve, reject) => {
    VK.api(method, params, data => {
      if (data.error) {
        reject(data.error);
      } else {
        resolve(data.response);
      }
    });
  });
}

function updateFilter(val, divs) {
  // console.log(divs);
  for (const div of divs) {
    if (isMatching(div.id, val)) {
      // console.log(div);
      div.classList.remove('hidden');
    } else {
      div.classList.add('hidden');
    }
  }
  function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
  }
}

function onDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}
function onDragOver(event) {
  event.preventDefault();
}
function onDrop(event) {
  const id = event.dataTransfer.getData('text/plain');
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  dropzone.appendChild(draggableElement);
  event.dataTransfer.clearData();
  init();
}

function init() {
  // const friendsDivs = document.querySelector('#result').querySelectorAll('.friend');
  // const friendsDivs2 = document.querySelector('#result2').querySelectorAll('.friend');
  // filterInput.addEventListener('input', function () { updateFilter(this.value, friendsDivs); });
  // filterInput2.addEventListener('input', function () { updateFilter(this.value, friendsDivs2); });
  filterInput.oninput = function () { updateFilter(this.value, res.querySelectorAll('.friend')); };
  filterInput2.oninput = function () { updateFilter(this.value, res2.querySelectorAll('.friend')); };
}

const filterInput = document.querySelector('#t1');
const filterInput2 = document.querySelector('#t2');
const res = document.querySelector('#result');
const res2 = document.querySelector('#result2');

(async () => {
  try {
    await auth();
    const friends = await callAPI('friends.get', { fields: 'photo_100' });
    const template = document.querySelector('#user-template').textContent;
    const result = document.querySelector('#result');
    const render = Handlebars.compile(template);
    const html = render(friends);
    result.innerHTML = html;
    init();
  } catch (e) {
    console.log(e.message);
  }
})();