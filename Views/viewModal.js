class ViewModal extends AbstractView {
    
    renderModal(currentPhotographer) {
        let content = `
        <div class="modal__page">
            <div class="modal__header">
                <h1 class="modal__title">
                    Contactez-moi</br>
                    ${currentPhotographer[0].name}
                </h1>
                <span class="button__close">
                    <i class="fas fa-times modal__close"></i>
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
                    <input class="modal__input message" id="message" type="text" />
                </div>

                <div class="modal__submit">
                    <input class="button__submit" type="submit" id="submit" value="Envoyer">
                </div>
        </div>
        `

        this.display(content);
    }

    /*closeModal() {
        let closeButton = document.querySelector("button__close");
        console.log(closeButton);
        closeButton.addEventListener("click", goToRoute("photographerPage"));
    }*/
}