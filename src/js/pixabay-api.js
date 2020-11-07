const API_KEY = '18984826-9a089bf93f102eeea865f0aeb';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal'

export default class ImageApi {
    constructor(inputValue) {
        // this.page = '';
        // this.inputValue = inputValue;
    }

    onSearch () {
        // this.page += 1;
        return fetch(`${BASE_URL}&q=dog&page=1&per_page=12&key=${API_KEY}`)
        .then(responce => responce.json())
        .then(data => {
            return data.hits;
        })
    }
} 
// ${this.inputValue}