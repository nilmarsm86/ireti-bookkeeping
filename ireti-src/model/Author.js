import Province from "./Province";
import Country from "./Country";

export default class {
    #name;
    #gender;
    #province;
    #country;

    constructor(name, isMale){
        this.#name = name;        
        this.#gender = (isMale) ? 'm' : 'f';
        this.#province = null;
        this.#country = null;      
    }    

    getName(){
        return this.#name;
    }

    getGender(){
        return this.#gender;
    }

    /**
     * @param {Province} province
     */
    setProvince(province){
        if(!province instanceof Province){
            throw new Error('province must be type of Province');
        }
        this.#province = province;
    }

    getProvince(){
        return this.#province;
    }

    /**
     * @param {Province} province
     */
    setCountry(country){
        if(!country instanceof Country){
            throw new Error('country must be type of Country');
        }
        this.#country = country;
    }

    getCountry(){
        if(this.#country === null){
            throw new Error('Author must has a country');
        }

        return this.#country;
    }
}