import {Book} from "./Book";

export default class {
    #moment;
    #book;

    constructor(book){
        if(!book instanceof Book){
            throw new Error('book must be type of Book');
        }
        this.#book = book;
        this.#book.decrese();
        this.#moment = new Date();        
    }
    
}