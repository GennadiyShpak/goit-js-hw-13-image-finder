import './normalize.css';
import './styles.css';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import ImageApi from './js/pixabay-api';
import imgTemplate from './handlebars/picture.hbs';
import error from './js/pnotify/pnotify.js'

import refs from './js/refs'

const imageApi = new ImageApi ();


refs.searchForm.addEventListener('submit', onSearch);
refs.galleryPicture.addEventListener('click', openModal);
refs.toInputBtn.addEventListener('click', scrollTo )

async function imageMarkupHandler(img) {
  const markup = imgTemplate(img);
  refs.galleryPicture.insertAdjacentHTML('beforeend',markup )
;};

async function onSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  imageApi.query = form.elements.query.value;
  if (imageApi.query==='') {
    return
  }
  try {  await imageApi.resetInput()
    clearHtmlMarckup()
    beforePromiseOnSearchFoo()
    const img = await imageApi.fetchImage()
    if (img.length !== 0) {
      afterPromiseOnSearchFoo();
      imageMarkupHandler(img);
      enableBtn()
    }
    errorInputHandler()
    enableBtn()
  }
  catch {
    errorInputHandler()
  }
};

function clearHtmlMarckup () {
  refs.galleryPicture.innerHTML = ''
};

function afterPromiseOnSearchFoo() {
  refs.spinerOfSerarchBtn.classList.add('is-hidden');
  refs.searchBtn.disabled = false;
};

function beforePromiseOnSearchFoo() {
  disabelBtn();
};

function enableBtn() {
  refs.searchBtn.disabled = false;
  refs.spinerOfSerarchBtn.classList.add('is-hidden');
};

function disabelBtn () {
  refs.searchBtn.disabled = true;
  refs.spinerOfSerarchBtn.classList.remove('is-hidden');
};


function openModal (e) {
  if (e.target.nodeName !== 'IMG') {
    return
  }
  const instance = basicLightbox.create(`
  <img src="${e.target.dataset.src}" alt="${e.target.attributes.alt.textContent}">`)
  instance.show()
};

const callback = (entries) => {
    entries.forEach(async entry => {
      imageApi.query = refs.searchInput.value;
    if (entry.isIntersecting && refs.searchInput.value !== '') {
      try {
        const img = await imageApi.fetchImage()
        imageMarkupHandler(img);
        imageApi.incrementPage()
      }
      catch {
        errorInputHandler()
      }
    }
  });
};

const options = {
  rootMargin: '600px',
  
};
const observer = new IntersectionObserver(callback, options);
observer.observe(refs.iOHelper);

function errorInputHandler() {
  const incorrectError =  error({
      text: "Incorrect request please send the request with correct format",
      sticker: false,
      delay: 3000,
    })
    return incorrectError;
}

function scrollTo () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth'
  })
  }