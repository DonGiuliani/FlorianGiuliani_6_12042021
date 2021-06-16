class Controller {

    renderMainPage() {
        let view = new ViewMainPage();
        let photographers = Model.getPhotographers();
        let listTags = Model.getAllTags();
        view.renderPhotographersList(photographers, listTags);
    }

    renderPhotographerPage(id) {
        let view = new ViewPhotographerPage();
        let photographer = Model.getPhotographerPageById(id);
        let listMedia = Model.getAllMediaByPhotographerId(id);
        view.renderPhotographerPage(photographer, listMedia);
    }

    renderModal() {
        let view = new ViewModal();
        view.renderModal(Model.getPhotographers());
    }
}