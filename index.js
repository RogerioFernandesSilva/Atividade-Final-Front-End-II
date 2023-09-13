const showListCharacter = document.querySelector('.characters-list');
const buttonNextPage = document.getElementById('button-next');
const buttonBackPage = document.getElementById('button-back');

// const cardCharacter = document.querySelector('.character-card');
// const divImgCharacter = document.querySelector('.character-img');

let currentPage = 42;
let totalPages = 0;

async function listCharacters() {
  try {
    const response = await api.get("/character/?page=" + currentPage);
    const pages = response.data.info.pages;
    const characters = response.data.results;

    console.log(response);
    console.log(characters);
    console.log(pages)

    totalPages = pages

    characters.forEach(character => {

      // div principal
      const showCharacter = document.createElement("div");
      showCharacter.classList.add('character-card');

      // div no qual vai ter o card de img e texto
      const cardCharacter = document.createElement("div");
      cardCharacter.classList.add('character-card');

      // section da img:
      const sectionImg = document.createElement("section");
      sectionImg.innerHTML = `<img src="${character.image}"/>`

      // section dos textos:

      const sectionText = document.createElement("section");
      sectionText.classList.add('character-text');
      sectionText.innerHTML = `
        <h3 class='title-character'>${character.name}</h3>
        <div class="cardStatus">
          <div class='${character.status == 'Dead'
          ? 'dead' : character.status == 'Alive' ? 'alive'
            : 'unknown'}'>
         </div> 
         <span>${character.status == 'Dead'
          ? 'Morto' : character.status == 'Alive' ? 'Vivo'
            : 'Desconhecido'}</span> &nbsp - &nbsp <span> ${character.species ==
              'Human' ? "Humano" : character.species} </span>
        </div>
        <p>Última localização conhecida:</p>
        <h4>${character.location.name}</h4>

      `

      // sectionText.innerHTML = `
      //   <h3>${character.name}</h3>
      //   <h5>${character.status} - ${character.species}</h5>
      //   <p>Última localização conhecida:</p>
      //   <h4>${character.location.name}</h4>

      // `
      // fazendo os appendChild

      cardCharacter.appendChild(sectionImg);
      cardCharacter.appendChild(sectionText)
      showListCharacter.appendChild(cardCharacter);

      // showCharacter.innerHTML = `
      // <img src="${character.image}"/>
      // <h3>${character.name}</h3>
      // <h5>${character.status}</h5>
      // `

    });
  } catch (error) {
    console.log(`Erro ao buscar: ${error} `);
  }
  stateSetButton();
}

listCharacters()

async function nextPage() {
  currentPage++;
  showListCharacter.innerHTML = ``;
  await listCharacters();
}

async function backPage() {
  currentPage--;
  showListCharacter.innerHTML = ``;
  await listCharacters();
}

function stateSetButton() {
  if (currentPage === 1) {
    buttonBackPage.setAttribute('disabled', true);
    buttonBackPage.setAttribute('style', 'cursor: not-allowed');

  } else {
    buttonBackPage.removeAttribute('disabled');
    buttonBackPage.removeAttribute('style', 'cursor: not-allowed');
  }
  if (currentPage === totalPages) {
    buttonNextPage.setAttribute('disabled', true);
    buttonNextPage.setAttribute('style', 'cursor: not-allowed');

  } else {
    buttonNextPage.removeAttribute('disabled');
    buttonNextPage.removeAttribute('style', 'cursor: not-allowed')
  }
}