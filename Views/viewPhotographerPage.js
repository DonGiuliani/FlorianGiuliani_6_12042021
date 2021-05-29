class ViewPhotographerPage extends AbstractView {

    renderPhotographerPage(photographer, listMedia) {
        this.listMedia = listMedia;
        this.photographer = photographer;
        let content = ``;
        
        content += this.renderSlider(photographer, listMedia);

        content += `
        <div id="header__section">
            <a id="logo" href="#">
                <img id="logo__img" src="Images/fisheye-logo.png" title="Logo de FishEye" alt="logo fisheye" onclick="goToRoute('viewMainPage')"/>
            </a>
        </div>
        <button class="button__contact" onclick="goToRoute('modalPage')">Contactez-moi</button>
        `;

      
        content += this.renderDetailPhotographerPage(photographer) + this.renderTagsPhotographer(photographer);

        content += this.renderPhotographerImages(photographer, listMedia);

        this.display(content);
        this.addSliderOnImage(listMedia);
    }
    
    renderDetailPhotographerPage(currentPhotographer) {
        let content = `
        <div id="photographer__biography">
            <div id="photographer__details">
                <h1 class="photographer__name biography">${currentPhotographer.name}</h1>
                <p class="photographer__city biography">${currentPhotographer.city}, ${currentPhotographer.country}</p>
                <p class="photographer__tagline biography">${currentPhotographer.tagline}</p>
            </div>
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

    renderPhotographerImages(currentPhotographer, listMedia) {

        let content = `
        <div id="photographer__pictures__bloc">
        <nav class="sort">Trier par 
            <ul>
                <li class="sorting sort__popularity">Popularité
                    <ul class="deroulement">
                        <li class="sort__date">Date</li>
                        <li class="sort__title">Titre</li>
                    </ul>
                </li>
            </ul>
        </nav>
        `;

        for(let i = 0; i < listMedia.length; i++) {
            if(listMedia[i].image !== undefined) {
                let titleImage = listMedia[i].image.replace(".jpg", "").replaceAll("_", " ");
                content += `
                <div class="photo">
                    <img class="photographer__picture" id="image__${listMedia[i].id}" src="Images/${currentPhotographer.name}/${listMedia[i].image}" aria-label="image closeup view">
                    <div class="picture__details">
                        <p class="picture__title">${titleImage}</p>
                        <p class="picture__likes" aria-label="likes">${listMedia[i].likes}
                            <i class="fas fa-heart"></i>
                        </p>
                    </div>
                </div>`
            } else {
                let titleVideo = listMedia[i].video.replace(".mp4", "").replaceAll("_", " ");

                content += `
                <div class="photo">
                    <video controls class="photographer__picture" onclick="goToRoute('lightboxPage')" aria-label="image closeup view">
                        <source src="Images/${currentPhotographer.name}/${listMedia[i].video}" type="video/mp4">
                    </video>
                    <div class="picture__details">
                        <p class="picture__title">${titleVideo}</p>
                        <p class="picture__likes" aria-label="likes">${listMedia[i].likes}
                            <i class="fas fa-heart"></i>
                        </p>
                    </div>
                 </div>`
            }
        }
        content += `</div>`
        return content
    }

    addSliderOnImage(listMedia) {
        for(let i = 0; i < listMedia.length; i++) {
            if(listMedia[i].image !== undefined) {
                let tagImage = document.getElementById(`image__${listMedia[i].id}`);
                tagImage.addEventListener("click", () => this.showSlider(i, listMedia));
            }
        }

        // -- Close the slider --
        let cross = document.getElementById("cross");
        cross.addEventListener("click", this.closeSlider);

        // -- Show the next picture --
        let arrowRight = document.getElementById("arrow__right");
        arrowRight.addEventListener("click", this.renderNextPicture);

        // -- Show the previous picture --
        let arrowLeft = document.getElementById("arrow__left");
        arrowLeft.addEventListener("click", this.renderPreviousPicture);
    }

    showSlider(indexImage, listMedia) {
        console.log("Ca marche " + indexImage);
        console.log(this.listMedia);

        for(let i = 0; i < listMedia.length; i++) {
            let tagImage = document.getElementById(`image_slider__${listMedia[i].id}`);
            let slider = document.getElementById("slider");

            if(indexImage == i) {
                console.log(i);
                slider.style.display = "flex";
                tagImage.classList.add("active");
            } else {
                tagImage.classList.remove('active');
            }
        }
    }

    closeSlider() {
        let slider = document.getElementById("slider");
        slider.style.display = "none";
    }

    renderSlider(currentPhotographer, listMedia) {
        let content = `<div id="slider">
        <i class="fas fa-times" id="cross"></i>
        <i class="fas fa-chevron-left" id="arrow__left"></i>
        `

        for(let i = 0; i < listMedia.length; i++) {
            content += `
            <img class="image__slider" id="image_slider__${listMedia[i].id}" src="images/${currentPhotographer.name}/${listMedia[i].image}">
            `;
            }

        content += `
        <i class="fas fa-chevron-right" id="arrow__right"></i>
        </div>
       `

        return content
    }

    renderNextPicture() {
        console.log("oui");
    }

    renderPreviousPicture() {
        console.log("non");
    }
}