class Controller {

    renderMainPage() {
        let view = new ViewMainPage();
        view.renderPhotographersList(Model.getPhotographe());
    }

    renderPhotographerPage(id) {
        console.log(id);
        let view = new ViewPhotographerPage();
        let photographe = Model.getPhotographeById(id);
        view.renderPhotographerPage(photographe, Model.getMedia());
    }

    renderModal() {
        let view = new ViewModal();
        view.renderModal(Model.getPhotographe());
    }

    renderLightbox() {
        let view = new ViewLightbox();
        view.renderLightbox(Model.getPhotographe(), Model.getMedia());
    }
}