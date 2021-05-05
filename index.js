function createPhotographer(portrait, name, city, country, tagline, price, tags) {
  
  return {
    portrait,
    name,
    city,
    country,
    tagline,
    price,
    tags
  }
}

let photographer = new createPhotographer(
  jsonData.photographers[0].portrait,
  jsonData.photographers[0].name,
  jsonData.photographers[0].city,
  jsonData.photographers[0].country,
  jsonData.photographers[0].tagline,
  jsonData.photographers[0].price,
  jsonData.photographers[0].tags
  )

  console.log(photographer);


  let photographersNames = [];
  for(i = 0; i < jsonData.photographers.length; i++) {
    photographersNames.push(jsonData.photographers[i].name);
  }
  console.log(photographersNames);

  function afficherUnPhotographe(page, portrait, name, city, tagline, price, tags) {

    let photographerLink = document.createElement("a");
    photographerLink.setAttribute("class", "photographer__link");
    photographerLink.setAttribute("href", "''");
    photographerLink.setAttribute("title", "Profil de " + name);
    page.appendChild(photographerLink);

    let creerLePortrait = document.createElement("img");
    creerLePortrait.setAttribute("class", "photographer__portrait")
    creerLePortrait.setAttribute("src", "Images/Photographers ID Photos/" + portrait);
    photographerLink.appendChild(creerLePortrait);

    let creerLeNom = document.createElement("h2");
    creerLeNom.setAttribute("class", "photographer__name");
    creerLeNom.innerHTML = name;
    photographerLink.appendChild(creerLeNom);

    let photographerText = document.createElement("div");
    photographerText.setAttribute("class", "photographer__text");
    page.appendChild(photographerText);

    let creerLaVille = document.createElement("p");
    creerLaVille.setAttribute("class", "photographer__city");
    creerLaVille.innerHTML = city;
    photographerText.appendChild(creerLaVille);

    let creerLaTagline = document.createElement("p");
    creerLaTagline.setAttribute("class", "photographer__tagline");
    creerLaTagline.innerHTML = tagline;
    photographerText.appendChild(creerLaTagline);

    let creerLePrix = document.createElement("p");
    creerLePrix.setAttribute("class", "photographer__price");
    creerLePrix.innerHTML = price;
    photographerText.appendChild(creerLePrix);

    let photographerTags = document.createElement("div");
    photographerTags.setAttribute("id", "photographer__tags");
    page.appendChild(photographerTags);
    for(tag of tags) {
      let creerLeTag = document.createElement("a");
      creerLeTag.setAttribute("class", "filter photographer__tag");
      creerLeTag.setAttribute("href", "''");
      creerLeTag.setAttribute("title", "#" + tag);
      creerLeTag.innerHTML = "#" + tag;
      photographerTags.appendChild(creerLeTag);
    }
  }

  
  let indexPage = document.getElementById("index__page");

  for(i = 0; i < jsonData.photographers.length; i++) {
    afficherUnPhotographe(
    indexPage,
    jsonData.photographers[i].portrait,
    photographersNames[i],
    jsonData.photographers[i].city + ", " + jsonData.photographers[i].country,
    jsonData.photographers[i].tagline,
    jsonData.photographers[i].price + "€/jour",
    jsonData.photographers[i].tags
    )
  }