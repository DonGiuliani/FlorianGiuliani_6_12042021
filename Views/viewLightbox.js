class ViewLightbox extends AbstractView {

    renderLightbox(currentPhotographer, currentMedia) {
        let content = `
        <div id="lightbox">
            <img class="photographer__picture lightbox__picture" src="Images/${currentPhotographer.name}/${currentMedia.image}" />
            <p class="picture__title lightbox__title">${currentMedia.image}</p>
        </div>
        `;

        this.display(content);
    }
}