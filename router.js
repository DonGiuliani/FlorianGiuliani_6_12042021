function goToRoute(page, ...arguments) {

    let controller = new Controller;

    switch(page) {
        case "viewMainPage":
            controller.renderMainPage()
            break;

        case "photographerPage":
            let photographerId = arguments[0]
            controller.renderPhotographerPage(photographerId)
            break;
            
        default : 
        //controller.renderErrorPage
    }
}

goToRoute("viewMainPage");