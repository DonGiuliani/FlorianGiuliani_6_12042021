class AbstractView {

    constructor() {
        this.container = document.getElementById("container");
    }

    display(content) {
        this.container.innerHTML = content;
    }
}