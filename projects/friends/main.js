
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
  for (const div of divs) {
    if (isMatching(div.id, val)) {
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
  const dropzone = event.currentTarget;
  dropzone.appendChild(draggableElement);
  event.dataTransfer.clearData();
  localStorage.setItem('vk', JSON.stringify(result2.innerHTML));
  init();
}

function init() {
  filterInput.oninput = function () { updateFilter(this.value, result.querySelectorAll('.friend')); };
  filterInput2.oninput = function () { updateFilter(this.value, result2.querySelectorAll('.friend')); };
}

function localFilter() {
  const r1 = result.querySelectorAll('.friend');
  const r2 = result2.querySelectorAll('.friend');
  for (const f1 of r1) {
    for (const f2 of r2) {
      if (f1.id === f2.id) {
        const p = f1.closest('#result');
        p.removeChild(f1);
        continue;
      }
    }
  }
}

const filterInput = document.querySelector('#t1');
const filterInput2 = document.querySelector('#t2');
const result = document.querySelector('#result');
const result2 = document.querySelector('#result2');

(async () => {
  try {
    await auth();
    const friends = await callAPI('friends.get', { fields: 'photo_100' });
    const template = document.querySelector('#user-template').textContent;
    const render = Handlebars.compile(template);
    const html = render(friends);
    result.innerHTML = html;
    result2.innerHTML = JSON.parse(localStorage.vk);
    localFilter();
    init();
  } catch (e) {
    console.log(e.message);
  }
})();