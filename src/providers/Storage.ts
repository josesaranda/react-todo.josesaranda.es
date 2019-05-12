export class Storage {

    private storage : any;

    constructor(rememberMe : boolean){
        if(rememberMe) this.storage = localStorage;
        else this.storage = sessionStorage;
    }

    setItem(name : string, value : string){
        this.storage.setItem(name,value);
    }

    getItem(name : string){
        return this.storage.getItem(name);
    }
}