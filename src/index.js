import './normalize.css';
import './styles.css';

import ImageApi from './js/pixabay-api';
import galleryItemTemplate from './handlebars/picture-list.hbs'

import refsHanler from './js/refs'

const refs = refsHanler();


const imageApi = new ImageApi ();
imageApi.onSearch()
.then(img=>{console.log(img); imageMarkupHandler(img)})

function imageMarkupHandler(img) {
  refs.body.insertAdjacentHTML('beforeend', galleryItemTemplate(img))
;}

