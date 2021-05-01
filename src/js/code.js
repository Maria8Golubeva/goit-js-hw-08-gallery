import gallery from "../gallery-items.js"
const galleryEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const modalImgEl = document.querySelector('.lightbox__image')
const closeBtnEl = document.querySelector('button[data-action="close-lightbox"]');
const overlayEl = document.querySelector('.lightbox__overlay');

// ГАЛЕРЕЯ
const imgArray = [];
let imgLink = '';

function createListOfImages(object) {
  const itemArray = object.map(item => {
    imgArray.push(item.original);
    return `<li class="gallery__item">
      <a class="gallery__link"
         href="${item.original}">
      <img class="gallery__image"
           src="${item.preview}"
           data-source="${item.original}"
           alt="${item.description}"/>
      </a>
    </li>`
    });
  galleryEl.insertAdjacentHTML('beforeend', itemArray.join(''));
};

createListOfImages(gallery);

// ФОТО
galleryEl.addEventListener('click', openOriginalImg);

function openOriginalImg(event) {
    event.preventDefault();
    if (event.target.hasAttribute('data-source')) {
      imgLink = event.target.dataset.source;
      openModal();
  };
};

// МОДАЛЬНОЕ ОКНО
function openModal() {
  modalEl.classList.toggle('is-open');
  modalImgEl.setAttribute('src', imgLink);
  modalEvents();
};

function modalEvents() {
  modalEl.addEventListener('click', onCloseClick);
  window.addEventListener('keydown', onEscapeClose);
  window.addEventListener('keydown', photoSlider);
};

// ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА

function onCloseClick(event) {
  if (event.target === closeBtnEl || overlayEl) {
    closeEvent()
  };
 }

function onEscapeClose(event) {
  if (event.code === 'Escape') {
    closeEvent()
  };
};

function closeEvent() {
  modalEl.classList.toggle('is-open');
  modalImgEl.setAttribute('src', '#');

  modalEl.removeEventListener('click', onCloseClick);
  window.removeEventListener('keydown', onEscapeClose);
  window.removeEventListener('keydown', photoSlider);
}

// СЛАЙДЕР
function photoSlider(event) {
  const indexOfArray = imgArray.indexOf(modalImgEl.getAttribute('src'));

  if (event.code === 'ArrowRight' && (indexOfArray + 1) < imgArray.length) {
    modalImgEl.setAttribute('src', imgArray[indexOfArray + 1]);
  } else { modalImgEl.setAttribute('src', imgArray[0]) };

  if (event.code === 'ArrowLeft' && indexOfArray !== 0) {
  modalImgEl.setAttribute('src', imgArray[indexOfArray - 1])
  } else if (event.code === 'ArrowLeft' && indexOfArray === 0) {
    modalImgEl.setAttribute('src', imgArray[imgArray.length - 1])
  };
};