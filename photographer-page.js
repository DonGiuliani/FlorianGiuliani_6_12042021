const headerTitle = document.getElementById("header__title");
const filters = document.getElementById("filters");

function changerDePage() {
    indexPage.style.display = "none";
    headerTitle.style.display = "none";
    filters.style.display = "none";
    afficherLesPhotos();
}

let bouton = document.createElement("button");
indexPage.appendChild(bouton);
bouton.innerHTML = "Changer de page";
bouton.addEventListener("click", changerDePage);

//function afficherLesPhotos(/*photographerId, image, tags, likes, date, price*/) {
    
//}

/*for(i = 0; i < jsonData.media.length; i++) {
    if(jsonData.media[i].photographerId == jsonData.photographers[i].id) {
        console.log(jsonData.media[i].image);
    }
}*/

let photographerPage = document.getElementById("photographer__page")
let numeroPhoto = 0;
function afficherLesPhotos() {
    for(i = 0; i < jsonData.media.length; i++) {
    let creerPhoto = document.createElement("img");
    creerPhoto.setAttribute("class", "photographer__image");
    creerPhoto.setAttribute("src", "Images/" + jsonData.photographers[0].name + "/" + jsonData.media[0].image);
    photographerPage.appendChild(creerPhoto);
    numeroPhoto +=1;
    console.log(jsonData.media[i].image + " " + numeroPhoto);
    }
}

console.log("Images/" + jsonData.photographers[0].name + "/" + jsonData.media[0].image);


//afficherLesPhotos()

/*afficherUnPhotographe(
    photographerPage,
    jsonData.photographers[0].portrait,
    photographersNames[0],
    jsonData.photographers[0].city + ", " + jsonData.photographers[0].country,
    jsonData.photographers[0].tagline,
    jsonData.photographers[0].price + "€/jour",
    jsonData.photographers[0].tags
    )*/