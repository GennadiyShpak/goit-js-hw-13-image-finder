const API_KEY = '18984826-9a089bf93f102eeea865f0aeb';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal'

export default class ImageApi {
    constructor() {
        this.page = 1;
        this.searchQuery = '';
    }

    fetchImage () {
        console.log(this);
        return fetch(`${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
        .then(responce => responce.json())
        .then(data => {
            this.incrementPage();
            return data.hits;
        })
    }

    get query () {
        return this.searchQuery;
    }

    set query (newSearchQuery) {
        this.searchQuery=newSearchQuery;
    }

    incrementPage () {
        this.page += 1;
    }

    resetInput () {
        this.page =1;
    }
} 
// ${this.inputValue}