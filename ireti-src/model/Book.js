import Author from "./Author";
import LiterarySubgenre from "./LiterarySubgenre";

const OWNER_BENEFIT = 50;
const LITTLE_BOX_BENEFIT = 30;
const BENEFIT = 80;//% de ganancia (50% de ganancia vendedora y 30% para la caja chica)
//fondo de la libreria es el 20%?
const ONAT = 15;//%

class Book{
    #title;
    #editionYear;
    #editionNumber;
    #acquisitionPrice;
    #transportPrice;
    #marketingMegas;
    #difficultPrice;    
    #authors;    
    #literarySubgenre;
    #amount;

    constructor(){        
        this.#editionNumber = 1;
        this.#acquisitionPrice = 0;
        this.#transportPrice = 0;
        this.#marketingMegas = 0;
        this.#difficultPrice = 0;        
        this.#authors = [];        
        this.#literarySubgenre = null;
        this.#amount = 1;
    }

    /**
     * @param {Author} author 
     */
    addAuthor(author){
        if(!author instanceof Author){
            throw new Error('author must be type of Author');
        }
        
        if(this.#authors.indexOf(author) === -1){
            this.#authors.push(author);
        }
    }

    getAuthors(){
        if(this.#authors.length === 0){
            throw new Error('Book must has at least one author');
        }

        return this.#authors;
    }    

    /**
     * 15%
     * @returns 
     */
    getOnatBenefit(){
        return ONAT * this.#totalAcquisitionCost() / 100;
    }

    /**
     * 80%
     * @returns 
     */
    getTotalBenefit(){
        return BENEFIT * this.#totalAcquisitionCost() / 100;
    }

    getOwnerBenefit(){
        return OWNER_BENEFIT * this.#totalAcquisitionCost() / 100;
    }

    getLittleBoxBenefit(){
        return LITTLE_BOX_BENEFIT * this.#totalAcquisitionCost() / 100;
    }

    /**
     * de toda la sumatoria sacar el 80 %, sumarcelo a la sumatoria y ese es el precio de venta
     * @returns Number
     */
    salePrice(){                
        return this.#totalAcquisitionCost() + this.getTotalBenefit() + this.getOnatBenefit();
    }

    /**
     * acquisitionPrice + transportPrice + marketingMegas + difficultPrice
     * @returns Number
     */
    #totalAcquisitionCost(){        
        return this.#acquisitionPrice + this.#transportPrice + this.#megasToMoney() + this.#difficultPrice;
    }

    /**
     * TODO
     * @returns Number
     */
    #megasToMoney(){        
        //TODO: definir como transformar los megas en dinero
        return this.#marketingMegas;
    }

    getClasification(){
        //TODO: debo buscar el pais que mas prevalesca
        let country = this.#authors[0].getCountry().getInitialLetter();
        let province = '';
        if(this.#authors[0].getProvince()){
            province = this.#authors[0].getCountry().getInitialLetter();
        }
        let literarySubgenreNumber = this.#literarySubgenre.getNumber();
        return country + province + literarySubgenreNumber;
    }

    /**
     * @param {LiterarySubgenre} literarySubgenre
     */
    setLiterarySubgenre(literarySubgenre){
        if(!literarySubgenre instanceof LiterarySubgenre){
            throw new Error('literarySubgenre must be type of LiterarySubgenre');
        }
        this.#literarySubgenre = literarySubgenre;
    }

    getLiterarySubgenre(){
        if(this.#literarySubgenre === null){
            throw new Error('Book must has a literarySubgenre');
        }

        return this.#literarySubgenre;
    }

    inStock(){
        return (this.#amount > 0);
    }

    decrese(){
        this.#amount = this.#amount - 1;
    }
}