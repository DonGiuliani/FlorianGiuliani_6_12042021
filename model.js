class Model {

    static getPhotographer() {
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

    static getAllMedia() {
        return jsonData.media;
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

    static getOneMediaById(mediaId) {
        console.log(mediaId);
        for(let i = 0; i < jsonData.media.length; i++) {
            let currentMediaId = jsonData.media[i].id;
            if(mediaId == currentMediaId) {
                console.log(jsonData.media[i].id);

            }

        }
    }
}