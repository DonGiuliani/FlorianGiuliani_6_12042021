class ViewPhotographerPage extends AbstractView {

    renderPhotographerPage(photographer, listMedia) {
        this.listMedia = listMedia;
        this.photographer = photographer;
        let content = ``;
        
        content += this.renderSlider(photographer, listMedia);
        content += this.renderModal(photographer)

        content += `
        <div id="header__section">
            <a id="logo" href="#" aria-label="Page d'acceuil">
                <img id="logo__img" src="Images/fisheye-logo.png" title="Logo de FishEye" alt="logo fisheye" onclick="goToRoute('viewMainPage')"/>
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
      
        content += this.renderDetailPhotographerPage(photographer) + this.renderTagsPhotographer(photographer);

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

    renderPhotographerImages(currentPhotographer, listMedia) {
        let content = `
        <div id="photographer__pictures__bloc">
            <nav class="sort" aria-label="Tri">Trier par 
                <ul>
                    <li class="sorting">
                        <span id="label__tri">Popularité <i class="fas fa-chevron-down"></i></span>
                        <ul class="deroulement">
                            <li class="roll" id="sort__popularity" aria-label="Tri popularité">Popularité</li>
                            <li class="roll" id="sort__date" aria-label="Tri date">Date</li>
                            <li class="roll" id="sort__title" aria-label="Tri titre">Titre</li>
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
                    <img class="photographer__picture" id="image__${listMedia[i].id}" src="Images/${currentPhotographer.name}/${listMedia[i].image}" aria-label="Agrandir image">
                    <div class="picture__details">
                        <p class="picture__title">${titleImage}</p>
                        <p class="picture__likes">
                            <span id="nb_like__image__${listMedia[i].id}">${listMedia[i].likes}</span>
                            <i class="fas fa-heart like" id="like__image__${listMedia[i].id}" aria-label="liker"></i>
                        </p>
                    </div>
                </div>`;
            } 
            else {
                let titleVideo = listMedia[i].video.replace(".mp4", "").replaceAll("_", " ");

                content += `
                <div class="photo">
                    <video controls class="photographer__picture" aria-label="Agrandir image">
                        <source src="Images/${currentPhotographer.name}/${listMedia[i].video}" type="video/mp4">
                    </video>
                    <div class="picture__details">
                        <p class="picture__title">${titleVideo}</p>
                        <p class="picture__likes" aria-label="likes">
                            <span id="nb_like__image__${listMedia[i].id}">${listMedia[i].likes}</span>
                            <i class="fas fa-heart like" id="like__image__${listMedia[i].id}"></i>
                        </p>
                    </div>
                 </div>`;
            }
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

        // -- Show the next picture --
        let arrowRight = document.getElementById("arrow__right");
        arrowRight.addEventListener("click", () => this.renderNextPicture());

        // -- Show the previous picture --
        let arrowLeft = document.getElementById("arrow__left");
        arrowLeft.addEventListener("click", () => this.renderPreviousPicture());
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
        let sortButtonTitle = document.getElementById("sort__title");
        sortButtonTitle.addEventListener("click", function() {
            this.sortImagesByTitle(photographer, listMedia)
        }.bind(this));

        let sortButtonPopularity = document.getElementById("sort__popularity");
        sortButtonPopularity.addEventListener("click", function() {
            this.sortImagesByPopularity(photographer, listMedia)
        }.bind(this));

        let sortButtonDate = document.getElementById("sort__date");
        sortButtonDate.addEventListener("click", function() {
            this.sortImagesByDate(photographer, listMedia)
        }.bind(this));
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

        let sortingSubtitle = document.getElementById("label__tri");
        sortingSubtitle.innerHTML = `Titre <i class="fas fa-chevron-down"></i>`
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

        let sortingSubtitle = document.getElementById("label__tri");
        sortingSubtitle.innerHTML = `Date <i class="fas fa-chevron-down"></i>`;
    }

    addModalOnImage() {
        let modalButton = document.getElementById("button__contact");
        modalButton.addEventListener("click", () => this.showModal());

        let crossModal = document.getElementById("cross__modal");
        crossModal.addEventListener("click", this.closeModal);

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
        let firstName = document.getElementById("firstName");
        console.log("Prénom : '" + firstName.value + "'");

        let lastName = document.getElementById("lastName");
        console.log("Nom : '" + lastName.value + "'");

        let email = document.getElementById("email");
        console.log("Email : '" + email.value + "'");
    }
}