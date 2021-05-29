class Controller {

    renderMainPage() {
        let view = new ViewMainPage();
        view.renderPhotographersList(Model.getPhotographer());
    }

    renderPhotographerPage(id) {
        let view = new ViewPhotographerPage();
        let photographer = Model.getPhotographerPageById(id);
        let listMedia = Model.getAllMediaByPhotographerId(id);
        view.renderPhotographerPage(photographer, listMedia);
    }

    renderModal() {
        let view = new ViewModal();
        view.renderModal(Model.getPhotographer());
    }
}