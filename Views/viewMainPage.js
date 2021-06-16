class ViewMainPage extends AbstractView {

    renderPhotographersList(listPhotographer, listTags) {
        this.listPhotographer = listPhotographer;
        this.listTags = listTags;
        let content = `
        <header>
            <div id="header__section">
                <a id="logo" href="#">
                    <img id="logo__img" src="Images/fisheye-logo.png" title="Logo de FishEye" alt="logo fisheye" onclick="goToRoute('viewMainPage')"/>
                </a>
                <h1 id="header__title">Nos photographes</h1>
            </div>
            <nav id="filters" aria-label="photographer categories">` 
            + this.renderArrayTags(listTags) + `
            </nav>
        </header>`;

        content += `<div id="list__photographers">`

        for(let i = 0; i < listPhotographer.length; i++) {
            content += `<div id="photographer__profile">` + this.renderDetailPhotographer(listPhotographer[i]) + this.renderTagsPhotographersList(listPhotographer[i], listTags) + `</div>`;
        }
        content += `</div>`

        this.display(content);
        this.initClickOnTag(listTags);
    }

    renderArrayTags(listTags) {
        let content = ``;
        // -- Filtre les tags pour n'en garder qu'un de chaque
        // -- Sépare les tags du tableau pour les afficher un par un
        for(let i = 0; i < listTags.length; i++) {
            content += `<a class="filter" id="${listTags[i]}" href="#" title="#${listTags[i]}">#${listTags[i]}</a>`;
        }

        return content
    }

    initClickOnTag(listTags) {
        for(let i = 0; i < listTags.length; i++) {
            let mainTag = document.getElementById(`${listTags[i]}`);
            mainTag.addEventListener("click", function() {
                this.renderPhotographerByTag(mainTag.id)
            }.bind(this))
        }
    }

    renderPhotographerByTag(tagId) {
        let baliseListPhotographer = document.getElementById("list__photographers");
        let content = ``
        for(let i = 0; i < this.listPhotographer.length; i++) {
            let currentPhotographer = this.listPhotographer[i];
            if(currentPhotographer.tags.includes(tagId)) {
                content += `<div id="photographer__profile">` + this.renderDetailPhotographer(currentPhotographer) + this.renderTagsPhotographersList(currentPhotographer, this.listTags) + `</div>`;
            }
        }
        baliseListPhotographer.innerHTML = content
    }

    renderTagsPhotographersList(listPhotographer) {
        let content = `<div id="photographer__tags">`;
        for(let i = 0; i < listPhotographer.tags.length; i++) {
            let tags = listPhotographer.tags;
            for(let tag of tags) {
                content += `<a class="filter photographer__tag" href="#" title="#${tag}">#${tag}</a>`;
            }

            content += `</div>`;
            return content
        }
    }

    renderDetailPhotographer(currentPhotographer) {
        let content = 
            `<a class="photographer__link" href="#" onclick="goToRoute('photographerPage', ${currentPhotographer.id})" title="Profil de ${currentPhotographer.name}">
                <img class="photographer__portrait" src="Images/Photographers ID Photos/${currentPhotographer.portrait}">
                <h2 class="photographer__name">${currentPhotographer.name}</h2>
            </a>
            <div id="photographer__text">
                <p class="photographer__city">${currentPhotographer.city}, ${currentPhotographer.country}</p>
                <p class="photographer__tagline">${currentPhotographer.tagline}</p>
                <p class="photographer__price">${currentPhotographer.price}€/jour</p>
            </div>`;

        return content;
    }
}