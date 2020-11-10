import './normalize.css';
import './styles.css';

import ImageApi from './js/pixabay-api';
import galleryItemTemplate from './handlebars/picture-list.hbs'

import refsHanler from './js/refs'

const refs = refsHanler();

const imageApi = new ImageApi ();


refs.searchForm.addEventListener('submit', onSearch)
refs.loadMorehBtn.addEventListener('click', loadMoreBtnHandler)

function imageMarkupHandler(img) {
  const markup = galleryItemTemplate(img);
  refs.galleryPicture.insertAdjacentHTML('beforeend',markup )
;}

function onSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  imageApi.query = form.elements.query.value;
  if (imageApi.query==='') {
    return
  }
  imageApi.resetInput()
  clearHtmlMarckup()
  beforePromiseOnSearchFoo()
  imageApi.fetchImage()
  .then(img=>{
    afterPromiseOnSearchFoo();
    imageMarkupHandler(img);})
}

function loadMoreBtnHandler() {
  imageApi.fetchImage()
  .then(img=>{imageMarkupHandler(img)})
}

function clearHtmlMarckup () {
  refs.galleryPicture.innerHTML = ''
}

function afterPromiseOnSearchFoo() {
  refs.loadMorehBtn.disabled = false;
  refs.spinerOfSerarchBtn.classList.add('is-hidden');
  refs.spinerOfLoadMorehBtn.classList.add('is-hidden');
  refs.searchBtn.disabled = false;
}

function beforePromiseOnSearchFoo() {
  refs.loadMorehBtn.classList.remove('is-hidden')
  refs.loadMorehBtn.disabled = true;
  refs.spinerOfLoadMorehBtn.classList.remove('is-hidden');
  refs.spinerOfSerarchBtn.classList.remove('is-hidden');
  refs.searchBtn.disabled = true;
}
