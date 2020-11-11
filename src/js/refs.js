export default function refsHanler () {
   return {
        body: document.querySelector('body'),
        searchForm: document.querySelector('#search-form'),
        galleryPicture: document.querySelector('.gallery'),
        searchInput: document.querySelector('.search-form input'),
        searchBtn: document.querySelector('.search-form__btn'),
        loadMorehBtn: document.querySelector('.load-more__btn'),
        spinerOfSerarchBtn: document.querySelector('.btn-search__wrapper'),
        spinerOfLoadMorehBtn: document.querySelector('.btn-loader__wrapper'),
        abc: document.querySelector('.load-more__btn--wrapper')
   }
}
