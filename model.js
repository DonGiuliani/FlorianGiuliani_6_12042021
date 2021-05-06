class Model {

    static getPhotographe() {
        return jsonData.photographers;
    }

    static getPhotographeById(id) {
        for(let i = 0; i < jsonData.photographers.length; i++) {
            let photographeId = jsonData.photographers[i].id;
            if(id == photographeId){
                return jsonData.photographers[i]
            }
        } 
        return null
    }
    
    static isFruitDansPanier(fruit) {
        let panier = ['pomme', 'poire', 'fraise', 'framboise'];
        for(let i = 0; i < panier.length; i++) {
            if(fruit == panier[i]) {
                return true
            }
        }
        return false
    }

    static getMedia() {
        return jsonData.media;
    }
}