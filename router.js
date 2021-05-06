function goToRoute(page, ...arguments) {

    let controller = new Controller;

    switch(page) {
        case "viewMainPage":
            controller.renderMainPage()
            break;

        case "photographerPage":
            let id = arguments[0]
            controller.renderPhotographerPage(id)
            break;

        case "modalPage":
            controller.renderModal()
            break;
        
        case "lightboxPage":
            controller.renderLightbox()
            break;

        default : 
        //controller.renderErrorPage
    }
}

goToRoute("viewMainPage");