class ViewPhotographerPage extends AbstractView {

    renderPhotographerPage(photographer, listMedia) {
        this.listMedia = listMedia;
        this.photographer = photographer;
        let content = ``;
        
        content += this.renderSlider(photographer, listMedia);
        content += this.renderModal(photographer)

        content += `
        <div id="header__section">
            <a id="logo" href="#">
                <img id="logo__img" class="logo__photographer__page" src="Images/fisheye-logo.png" alt="logo fisheye" aria-label="Lien Page d'accueil" onclick="goToRoute('viewMainPage')"/>
            </a>
        </div>
        <button class="button" id="button__contact" aria-label="Contacter photographe">Contactez-moi</button>
        <div id="likes__count" aria-label="Bouton like">
            <p>
                <span id="total__like">${this.countTotalLikes(listMedia)}</span>
                <i class="fas fa-heart"></i>
            </p>
            <p>
                ${photographer.price}€ / jour
            </p>
        </div>
        `;
      
        content += this.renderDetailPhotographerPage(photographer);

        content += this.renderPhotographerImages(photographer, listMedia);

        this.display(content);
        this.initSorting(photographer, listMedia);
        this.addSliderOnImage(listMedia);
        this.addModalOnImage();
        this.addEventListenerOnLikeButton(listMedia);
    }
    
    renderDetailPhotographerPage(currentPhotographer) {
        let content = `
        <div id="photographer__biography" aria-label="Biographie photographe">
            <div id="photographer__details">
                <h1 class="photographer__name biography__name">${currentPhotographer.name}</h1>
                <p class="photographer__city biography">${currentPhotographer.city}, ${currentPhotographer.country}</p>
                <p class="photographer__tagline biography">${currentPhotographer.tagline}</p>
                ${this.renderTagsPhotographer(currentPhotographer)}
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
                content += `<a class="filter photographer__tag" href="#" title="#${tag}" aria-label="Filtre">#${tag}</a>`;
            }

            content += `</div>`;
            return content;
        }
    }

    getMediaContentFactory(currentPhotographer, media) {
        if(media.image) {
            let titleImage = media.image.replace(".jpg", "").replaceAll("_", " ");

            let content = `
            <div class="photo">
                <a href="#" id="image__${media.id}">
                    <img class="photographer__picture" src="Images/${currentPhotographer.name}/${media.image}" aria-label="Agrandir image">
                </a>
                <div class="picture__details">
                    <p class="picture__title">${titleImage}</p>
                    <p class="picture__likes">
                        <span id="nb_like__image__${media.id}">${media.likes}</span>
                        <button class="like" aria-label="like">
                            <i class="fas fa-heart like" id="like__image__${media.id}" aria-label="liker"></i>
                        </button>
                    </p>
                </div>
            </div>
                `;

            return content;
        } else {
            let titleVideo = media.video.replace(".mp4", "").replaceAll("_", " ");

            let content = `
            <div class="photo">
                <video controls class="photographer__picture" aria-label="Agrandir image">
                    <source src="Images/${currentPhotographer.name}/${media.video}" type="video/mp4">
                </video>
                <div class="picture__details">
                    <p class="picture__title">${titleVideo}</p>
                    <p class="picture__likes" aria-label="likes">
                        <span id="nb_like__image__${media.id}">${media.likes}</span>
                        <button type="button" class="like" aria-label="like">
                            <i class="fas fa-heart" id="like__image__${media.id}" aria-label="liker"></i>
                        </button>
                    </p>
                </div>
            </div>`;

            return content;
        }
    }

    renderPhotographerImages(currentPhotographer, listMedia) {
        let content = `
            <nav id="sort" role="navigation" aria-label="Tri">Trier par 
                <ul>
                    <li class="sorting">
                        <button id="sort__button">
                            <span id="label__tri">Popularité <i class="fas fa-chevron-down"></i></span>
                        </button>
                        <ul id="deroulement">
                            <button id="sort__button__popularity">
                                <li class="roll" id="sort__popularity" aria-label="Tri popularité">
                                    Popularité
                                </li>
                            </button>
                            <button id="sort__button__date">
                                <li class="roll" id="sort__date" aria-label="Tri date">
                                    Date
                                </li>
                            </button>
                            <button id="sort__button__title">
                                <li class="roll" id="sort__title" aria-label="Tri titre">
                                    Titre
                                </li>
                            </button>
                        </ul>
                    </li>
                </ul>
            </nav>

            <div id="photographer__pictures__bloc">
            `;

        for(let i = 0; i < listMedia.length; i++) {
            content += this.getMediaContentFactory(currentPhotographer, listMedia[i])
        }
        
        content += ` </div>`;
        return content;
    }

    addEventListenerOnLikeButton(listMedia) {
        let totalLikes = this.countTotalLikes(listMedia);

        for(let i = 0; i < listMedia.length; i++) {
            let likeButton = document.getElementById(`like__image__${listMedia[i].id}`);
            likeButton.setAttribute("checked", "false");

            let likes = listMedia[i].likes;
            let countTotalLikes = document.getElementById("total__like")
            
            likeButton.addEventListener("click", function(event) {
                let currentButton = event.target;
                let idNbLikeTag = "nb_" + currentButton.id;

                if(currentButton.getAttribute("checked") == "false") {
                    likes++;
                    totalLikes++;
                    document.getElementById(idNbLikeTag).innerHTML = likes;
                    countTotalLikes.innerHTML = totalLikes;
                    currentButton.setAttribute("checked", "true");
                }
                else if(currentButton.getAttribute("checked") == "true") {
                    likes--;
                    totalLikes--;
                    document.getElementById(idNbLikeTag).innerHTML = likes;
                    countTotalLikes.innerHTML = totalLikes;
                    currentButton.setAttribute("checked", "false");
                }
            });
        }
    }
    
    countTotalLikes(listMedia) {
        let total = 0;
        for(let i = 0; i < listMedia.length; i++) {
            total += listMedia[i].likes
        }
        return total;
    }

    addSliderOnImage(listMedia) {
        for(let i = 0; i < listMedia.length; i++) {
            if(listMedia[i].image !== undefined) {
                let tagImage = document.getElementById(`image__${listMedia[i].id}`);
                tagImage.addEventListener("click", () => this.showSlider(i, listMedia));
            }
        }

        // -- Close the slider --
        let crossSlider = document.getElementById("cross__slider");
        // Fonction fléchée
        crossSlider.addEventListener("click", () => this.closeSlider());
        document.addEventListener("keydown", (event) => {
            if(event.code == "Escape") {
                this.closeSlider();
            }
        })

        // -- Show the next picture --
        let arrowRight = document.getElementById("arrow__right");
        arrowRight.addEventListener("click", () => this.renderNextPicture());
        document.addEventListener("keydown", (event) => {
            if(event.code == "ArrowRight") {
                this.renderNextPicture();
            }
        })

        // -- Show the previous picture --
        let arrowLeft = document.getElementById("arrow__left");
        arrowLeft.addEventListener("click", () => this.renderPreviousPicture());
        document.addEventListener("keydown", (event) => {
            if(event.code == "ArrowLeft") {
                this.renderPreviousPicture();
            }
        })
    }

    showSlider(indexImage, listMedia) {
        this.indexImage = indexImage;
        for(let i = 0; i < listMedia.length; i++) {
            let tagImage = document.getElementById(`image_slider__${listMedia[i].id}`);
            let titleImage = document.getElementById(`image_title__${listMedia[i].id}`)
            let slider = document.getElementById("slider");
            if(indexImage == i) {
                slider.style.display = "flex";
                tagImage.classList.add("active");
                titleImage.classList.add("active");
            } else {
                tagImage.classList.remove("active");
                titleImage.classList.remove("active");
            }
        }
    }

    closeSlider() {
        let slider = document.getElementById("slider");
        slider.style.display = "none";
    }

    renderSlider(currentPhotographer, listMedia) {
        let content = `<div id="slider">
        <i class="fas fa-times" id="cross__slider" aria-label="Fermer slider"></i>
        <i class="fas fa-chevron-left" id="arrow__left" aria-label="Photo précédente"></i>
        `;

        for(let i = 0; i < listMedia.length; i++) {
            if(listMedia[i].image !== undefined)  {
                let titleImage = listMedia[i].image.replace(".jpg", "").replaceAll("_", " ");

                content += `
                <div id="slider__box">
                    <img class="image__slider" id="image_slider__${listMedia[i].id}" src="images/${currentPhotographer.name}/${listMedia[i].image}">
                    <p class="image__title" id="image_title__${listMedia[i].id}">${titleImage}</p>
                </div>
                `;
            } else {
                let titleVideo = listMedia[i].video.replace(".mp4", "").replaceAll("_", " ");

                content += `
                <div id="slider__box">
                    <video controls class="image__slider" id="image_slider__${listMedia[i].id}">
                        <source src="Images/${currentPhotographer.name}/${listMedia[i].video}" type="video/mp4">
                    </video>
                    <p class="image__title" id="image_title__${listMedia[i].id}">${titleVideo}</p>
                </div>
                `;
            }
        }

        content += `
        <i class="fas fa-chevron-right" id="arrow__right" aria-label="Photo suivante"></i>
        </div>
       `;

        return content
    }

    renderNextPicture() {
        let tagImage = document.getElementById(`image_slider__${this.listMedia[this.indexImage].id}`);
        tagImage.classList.remove('active');

        let titleImage = document.getElementById(`image_title__${this.listMedia[this.indexImage].id}`)
        titleImage.classList.remove('active');

        if(this.indexImage < this.listMedia.length - 1) {
            this.indexImage++;
        } else {
            this.indexImage = 0;
        }

        tagImage = document.getElementById(`image_slider__${this.listMedia[this.indexImage].id}`);
        tagImage.classList.add('active');

        titleImage = document.getElementById(`image_title__${this.listMedia[this.indexImage].id}`);
        titleImage.classList.add('active');
    }

    renderPreviousPicture() {
        let tagImage = document.getElementById(`image_slider__${this.listMedia[this.indexImage].id}`);
        tagImage.classList.remove('active');
        
        let titleImage = document.getElementById(`image_title__${this.listMedia[this.indexImage].id}`)
        titleImage.classList.remove('active');

        if(this.indexImage > 0) {
            this.indexImage--;
        } else {
            this.indexImage = this.listMedia.length - 1;
        }

        tagImage = document.getElementById(`image_slider__${this.listMedia[this.indexImage].id}`);
        tagImage.classList.add('active');

        titleImage = document.getElementById(`image_title__${this.listMedia[this.indexImage].id}`);
        titleImage.classList.add('active');        
    }

    initSorting(photographer, listMedia) {
        let sortButton = document.getElementById("sort__button");
        sortButton.addEventListener("keydown", (event) => {
            if(event.code == "Enter") {
                let deroulement = document.getElementById("deroulement");
                let labelTri = document.getElementById("label__tri");
                deroulement.style.display = "flex";
                deroulement.style.flexDirection = "column"
                labelTri.style.display = "none"
            }
        })

        let sortTitle = document.getElementById("sort__title");
        sortTitle.addEventListener("click", function() {
            this.sortImagesByTitle(photographer, listMedia)
        }.bind(this));

        let sortButtonTitle = document.getElementById("sort__button__title");
        sortButtonTitle.addEventListener("keydown", (event) => {
            if(event.code == "Enter") {
                this.sortImagesByTitle(photographer, listMedia)
            }
        })

        let sortPopularity = document.getElementById("sort__popularity");
        sortPopularity.addEventListener("click", function() {
            this.sortImagesByPopularity(photographer, listMedia)
        }.bind(this));

        let sortButtonPopularity = document.getElementById("sort__button__popularity");
        sortButtonPopularity.addEventListener("keydown", (event) => {
            if(event.code == "Enter") {
                this.sortImagesByPopularity(photographer, listMedia)
            }
        })

        let sortDate = document.getElementById("sort__date");
        sortDate.addEventListener("click", function() {
            this.sortImagesByDate(photographer, listMedia)
        }.bind(this));

        let sortButtonDate = document.getElementById("sort__button__date");
        sortButtonDate.addEventListener("keydown", (event) => {
            if(event.code == "Enter") {
                this.sortImagesByDate(photographer, listMedia)
            }
        })
    }

    sortImagesByTitle(photographer, listMedia) {
        let baliseListMedia = document.getElementById("photographer__pictures__bloc");

        let content = ``;
        let arrayMediaTitle = [];

        for(let i = 0; i < listMedia.length; i++) {
            let currentMedia = this.listMedia[i];
            arrayMediaTitle.push(currentMedia);
        }

        arrayMediaTitle.sort(function (a, b) {
            if(a.image !== undefined) {
                if(b.image !== undefined) {
                    return a.image.localeCompare(b.image);
                }
                else {
                    return a.image.localeCompare(b.video);
                }
            }
            else {
                if(b.image !== undefined) {
                    return a.video.localeCompare(b.image);
                }
                else {
                    return a.video.localeCompare(b.video);
                }
            }
        });

        content += this.renderPhotographerPage(photographer, arrayMediaTitle);
        baliseListMedia.innerHTML = content;

        let labelTri = document.getElementById("label__tri");
        labelTri.innerHTML = `Titre <i class="fas fa-chevron-down"></i>`
    }

    sortImagesByPopularity(photographer, listMedia) {
        let baliseListMedia = document.getElementById("photographer__pictures__bloc");

        let content = ``;
        let arrayMediaLikes = [];

        for(let i = 0; i < listMedia.length; i++) {
            let currentMedia = this.listMedia[i];
            arrayMediaLikes.push(currentMedia);
        }
        arrayMediaLikes.sort(function (a, b) {
            return b.likes - a.likes;
        });

        console.log(arrayMediaLikes);
        content += this.renderPhotographerPage(photographer, arrayMediaLikes)
        baliseListMedia.innerHTML = content;

        let labelTri = document.getElementById("label__tri");
        labelTri.innerHTML = `Popularité <i class="fas fa-chevron-down"></i>`

    }

    sortImagesByDate(photographer, listMedia) {
        let baliseListMedia = document.getElementById("photographer__pictures__bloc");

        let content = ``;
        let arrayMediaDate = [];

        for(let i = 0; i < listMedia.length; i++) {
            let currentMedia = this.listMedia[i];
            arrayMediaDate.push(currentMedia);
        }
        arrayMediaDate.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        console.log(arrayMediaDate);
        content += this.renderPhotographerPage(photographer, arrayMediaDate)
        baliseListMedia.innerHTML = content;

        let labelTri = document.getElementById("label__tri");
        labelTri.innerHTML = `Date <i class="fas fa-chevron-down"></i>`

    }

    addModalOnImage() {
        let modalButton = document.getElementById("button__contact");
        modalButton.addEventListener("click", () => this.showModal());

        let crossModal = document.getElementById("cross__modal");
        crossModal.addEventListener("click", this.closeModal);
        document.addEventListener("keydown", (event) => {
            if(event.code == "Escape") {
                this.closeModal();
            }
        })

        let submitButton = document.getElementById("submit");
        submitButton.addEventListener("click", this.sendInfoModal);
    }

    showModal() {
        let modal = document.getElementById("modal__page");
        modal.style.display = "flex";        
    }

    closeModal() {
        let modal = document.getElementById("modal__page");
        modal.style.display = "none";
    }

    renderModal(currentPhotographer) {
        let content = `
        <div id="modal__page">
            <div class="modal__header">

                <h1 class="modal__title">
                    Contactez-moi</br>
                    ${currentPhotographer.name}
                </h1>
                <span class="button__close">
                    <i class="fas fa-times" id="cross__modal"></i>
                </span>
            </div>

            <form id="modal__form" method="GET">
                <div class="modal__field">
                    <label class="modal__label" for="firstName">Prénom</label>
                    <input class="modal__input" id="firstName" type="text" />
                </div>

                <div class="modal__field">
                    <label class="modal__label" for="lastName">Nom</label>
                    <input class="modal__input" id="lastName" type="text" />
                </div>
                
                <div class="modal__field">
                    <label class="modal__label" for="email">Email</label>
                    <input class="modal__input" id="email" type="email" />
                </div>

                <div class="modal__field">
                    <label class="modal__label" for="message">Votre message</label>
                    <textarea class="modal__input message" id="message" type="text"></textarea>
                </div>

                <div class="modal__submit">
                    <input class="button__submit" type="submit" id="submit" value="Envoyer">
                </div>
            </form>
        </div>
        `;
        return content;
    }

    sendInfoModal() {
        let modal = document.getElementById("modal__page");
        modal.addEventListener("submit", function(event) {
            event.preventDefault();
        })

        let firstName = document.getElementById("firstName");
        console.log("Prénom : '" + firstName.value + "'");

        let lastName = document.getElementById("lastName");
        console.log("Nom : '" + lastName.value + "'");

        let email = document.getElementById("email");
        console.log("Email : '" + email.value + "'");
    }
}