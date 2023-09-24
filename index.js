const showListCharacter = document.querySelector('.characters-list');
const buttonNextPage = document.getElementById('button-next');
const buttonBackPage = document.getElementById('button-back');
const infCurrentPage = document.getElementById('current-page');
const formEl = document.getElementById('query-api');
formEl.addEventListener('submit', searchPersonagem);

let currentPage = 1;
let totalPages = 0;

async function listCharacters() {

  try {

    const response = await api.get("/character/?page=" + currentPage ?? 1);
    const pages = response.data.info.pages;
    const characters = response.data.results;

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
      // fazendo os appendChild

      cardCharacter.appendChild(sectionImg);
      cardCharacter.appendChild(sectionText)
      showListCharacter.appendChild(cardCharacter);
    });

    const infPage = document.createElement('section');
    infPage.innerHTML = `
    <p> Página: ${currentPage} / ${totalPages}</p>
    `
    infCurrentPage.appendChild(infPage);
  } catch (error) {
    console.log(`Erro ao buscar: ${error} `);
  }
  stateSetButton();
}

listCharacters()
async function nextPage() {
  currentPage++;
  showListCharacter.innerHTML = ``;
  infCurrentPage.innerHTML = ``;

  await listCharacters();

}
async function backPage() {
  currentPage--;
  showListCharacter.innerHTML = ``;
  infCurrentPage.innerHTML = ``;
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

async function searchPersonagem(e) {
  try {
    e.preventDefault()

    let endpoint = "/character"

    const characterName = formEl["character-name"].value.trim();
    if (characterName) {

      endpoint += `?page=${currentPage}&name=${characterName}`;
      console.log(currentPage)
      const { data } = await api.get(endpoint);

      const content = data.results ?? data;

      showListCharacter.innerHTML = ``
      infCurrentPage.innerHTML = ``
      content.forEach(character => {

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
        // fazendo os appendChild

        cardCharacter.appendChild(sectionImg);
        cardCharacter.appendChild(sectionText)
        showListCharacter.appendChild(cardCharacter);

      });
      const infPage = document.createElement('section');
      infPage.innerHTML = `
        <p> Página: ${currentPage} / ${totalPages}</p>
        `
      infCurrentPage.appendChild(infPage);

    } else {
      showListCharacter.innerHTML = ``
      infCurrentPage.innerHTML = ``
      currentPage = 1
      listCharacters()
    }

    console.log(characterName)

  } catch (error) {
    console.log(`Error: ${error}`)
  }
}