class Model {

    static getPhotographers() {
        return jsonData.photographers;
    }

    static getPhotographerPageById(id) {
        for(let i = 0; i < jsonData.photographers.length; i++) {
            let currentPhotographerId = jsonData.photographers[i].id;
            if(id == currentPhotographerId) {
                return jsonData.photographers[i];
            }
        }
        return null;
    }

    static getAllTags() {
        let arrayTags = [];
        // -- Stock tous les tags dans un tableau
        for(let i = 0; i < jsonData.photographers.length; i++) {
            let tags = jsonData.photographers[i].tags;
            for(let tag of tags) {
                arrayTags.push(tag);
            }
        }
        // -- Filtre les tags pour n'en garder qu'un de chaque
        let arrayTagsFiltered = [...new Set(arrayTags)];
        return arrayTagsFiltered;
    }

    static getAllMediaByPhotographerId(id) {
        let arrayMedia = [];
        for(let i = 0; i < jsonData.media.length; i++) {
            let currentMedia = jsonData.media[i];
            if(id == currentMedia.photographerId) {
                arrayMedia.push(currentMedia);
            }
        }
        return arrayMedia;
    }
}