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

async function onSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  imageApi.query = form.elements.query.value;
  if (imageApi.query==='') {
    return
  }
  await imageApi.resetInput()
  await clearHtmlMarckup()
  await beforePromiseOnSearchFoo()
  const img = await imageApi.fetchImage()
  await afterPromiseOnSearchFoo();
  await imageMarkupHandler(img);
}

async function loadMoreBtnHandler() {
  try {
    disabelBtn ()
    const img = await imageApi.fetchImage()
    await imageMarkupHandler(img);
    enableBtn();
    scrollTo (refs.loadMorehBtn)
  }
  catch {
    console.log('aaa');
  }
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
  refs.loadMorehBtn.classList.remove('is-hidden');
  disabelBtn();
}

function enableBtn() {
  refs.loadMorehBtn.disabled = false;
  refs.searchBtn.disabled = false;
  refs.spinerOfLoadMorehBtn.classList.add('is-hidden');
  refs.spinerOfSerarchBtn.classList.add('is-hidden');
}

function disabelBtn () {
  refs.loadMorehBtn.disabled = true;
  refs.searchBtn.disabled = true;
  refs.spinerOfLoadMorehBtn.classList.remove('is-hidden');
  refs.spinerOfSerarchBtn.classList.remove('is-hidden');
}

function scrollTo (el) {
  console.log(el.offsetTop);
window.scrollTo({
  left: 0,
  top: el.offsetTop,
  behavior: 'smooth'
})
}