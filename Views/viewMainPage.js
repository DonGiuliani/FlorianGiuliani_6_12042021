class ViewMainPage extends AbstractView {

    renderPhotographersList(listPhotographer) {
        let content = `
        <header>
            <div id="header__section">
                <a id="logo" href="#">
                    <img id="logo__img" src="Images/fisheye-logo.png" title="Logo de FishEye" alt="logo fisheye" onclick="goToRoute('viewMainPage')"/>
                </a>
                <h1 id="header__title">Nos photographes</h1>
            </div>
            <nav id="filters" aria-label="photographer categories">
                <a class="filter" href="">#Portrait</a>
                <a class="filter" href="">#Art</a>
                <a class="filter" href="">#Fashion</a>
                <a class="filter" href="">#Architecture</a>
                <a class="filter" href="">#Travel</a>
                <a class="filter" href="">#Sport</a>
                <a class="filter" href="">#Animals</a>
                <a class="filter" href="">#Events</a>
            </nav>
        </header>
        `;

        for(let i = 0; i < listPhotographer.length; i++) {
            content += `<div id="photographer__profile">` + this.renderDetailPhotographer(listPhotographer[i]) + this.renderTagsPhotographersList(listPhotographer[i]) + `</div>`;
        }

        this.display(content);
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
        let content = `
            <a class="photographer__link" href="#" onclick="goToRoute('photographerPage', ${currentPhotographer.id})" title="Profil de ${currentPhotographer.name}">
                <img class="photographer__portrait" src="Images/Photographers ID Photos/${currentPhotographer.portrait}">
                <h2 class="photographer__name">${currentPhotographer.name}</h2>
            </a>
            <div id="photographer__text">
                <p class="photographer__city">${currentPhotographer.city}, ${currentPhotographer.country}</p>
                <p class="photographer__tagline">${currentPhotographer.tagline}</p>
                <p class="photographer__price">${currentPhotographer.price}€/jour</p>
            </div>
            `;

        return content;
    }
}