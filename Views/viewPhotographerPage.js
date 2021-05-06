class ViewPhotographerPage extends AbstractView {

    renderPhotographerPage(photographer, listMedia) {
        let content = `
        <div id="header__section">
            <a id="logo" href="#">
                <img id="logo__img" src="Images/fisheye-logo.png" title="Logo de FishEye" alt="logo fisheye" onclick="goToRoute('viewMainPage')"/>
            </a>
        </div>
        <button class="button__contact" onclick="goToRoute('modalPage')">Contactez-moi</button>
        `;

      
        content += this.renderDetailPhotographerPage(photographer) + this.renderTagsPhotographer(photographer);

        for(let i = 0; i < listMedia.length; i++) {
            if(listMedia[i].photographerId === 243) {
                content += this.renderPhotographerImages(photographer, listMedia[i]);
            } 
        }

        this.display(content);
    }
    
    renderDetailPhotographerPage(currentPhotographer) {
        let content = `
        <div id="photographer__biography">
            <h1 class="photographer__name biography">${currentPhotographer.name}</h1>
            <p class="photographer__city biography">${currentPhotographer.city}, ${currentPhotographer.country}</p>
            <p class="photographer__tagline biography">${currentPhotographer.tagline}</p>
            <img class="photographer__portrait biography__portrait" src="Images/Photographers ID Photos/${currentPhotographer.portrait}">
        </div>
        `;

        return content;
    }

    renderTagsPhotographer(listPhotographer) {
        let content = `<div id="photographer__tags--biography">`;
        for(let i = 0; i < listPhotographer.tags.length; i++) {
            let tags = listPhotographer.tags;
            for(let tag of tags) {
                content += `<a class="filter photographer__tag" href="#" title="#${tag}">#${tag}</a>`;
            }

            content += `</div>`
            return content
        }
    }

    renderPhotographerImages(currentPhotographer, currentMedia) {

        let content = `
        <img class="photographer__picture" src="Images/${currentPhotographer.name}/${currentMedia.image}" onclick="goToRoute('lightboxPage')" aria-label="image closeup view" />
        <div class="picture__details">
            <p class="picture__title">${currentMedia.image}</p>
            <p class="picture__likes" aria-label="likes">${currentMedia.likes}
                <i class="fas fa-heart"></i>
            </p>
        </div>
        `;

        return content;
    }
}