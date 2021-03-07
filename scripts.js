const modal = document.querySelector("#my-modal");
const addButton = document.querySelector("#btn-add-film");
const closeButton = document.querySelector("#close-btn");
const addFilmForm = document.querySelector("#add-film-form")
const allFilmsList = document.querySelector(".all-films-items")
const finishedFilmsList = document.querySelector(".finished-films-items")
const likeFilmsList = document.querySelector(".like-films-items")
const searchForm = document.querySelectorAll('.search-form')

addButton.addEventListener("click", (e) => {
    // e.preventDefault();
    modal.style.display = "block";

    addFilmForm.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.target === modal) {
            modal.style.display = "none"
            addFilmForm.addFilmInput.value = ""
        }
        // window.removeEventListener()
    })

})

closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "none";
    addFilmForm.addFilmInput.value = ""
})

addFilmForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newFilm = addFilmForm.addFilmInput.value;
    addFilm(newFilm);

    addFilmForm.addFilmInput.value = "";
})

const addFilm = (film) => {
    // console.log(film)

    if (film == "") return;

    const newFilm = `
    <div class="item-film">
        <p class="film-name">${film}</p>
        <div class="img-item-film">
            <img src="img/eye.png" class="img-films-L move-btn">
            <img src="img/trash-bin.png" class="img-films-R remove-btn">
        </div>
    </div>
    `
    allFilmsList.innerHTML += newFilm
}

// удаление фильма по нажатию на иконку корзины
allFilmsList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className != "img-films-R remove-btn") return;

    let removeAllFilm = e.target.closest(".item-film");
    removeAllFilm.remove();
})

finishedFilmsList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className != "img-films-R remove-btn") return;

    let removeFinishedFilm = e.target.closest(".item-film");
    removeFinishedFilm.remove();
})


likeFilmsList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className != "img-films-R remove-btn") return;

    let removeLikeFilm = e.target.closest(".item-film");
    removeLikeFilm.remove();
})


// перемещение фильма по нажатию на иконку глаза
allFilmsList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className != "img-films-L move-btn") return;
    let moveFinishedFilm = e.target.closest(".item-film");

    finishedFilmsList.insertAdjacentHTML("beforeend", `
    <div class="item-film item-finished-film">
        <p class="film-name">${moveFinishedFilm.textContent
            // .replace(/\s{2,}/g,' ')
            .trim()}</p>
        <div class="img-item-film">
            <img src="img/heart.png" class="img-films-L like-btn" >
            <img src="img/trash-bin.png" class="img-films-R remove-btn">
        </div>
    </div>`);

    moveFinishedFilm.remove();
})

// перемещение фильма по нажатию на иконку сердечка
finishedFilmsList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className != "img-films-L like-btn") return;
    let moveLikeFilm = e.target.closest(".item-film");

    likeFilmsList.insertAdjacentHTML("beforeend", `
    <div class="item-film">
        <p class="film-name">${moveLikeFilm.textContent
            // .replace(/[\n\r]+|[\s]{2,}/g,' ')
            .trim()}</p>
        <div class="img-item-film">
            <img src="img/broken-heart.png" class="img-films-L unlike-btn">
            <img src="img/trash-bin.png" class="img-films-R remove-btn">
        </div>
    </div>`);

    moveLikeFilm.remove();
})

// перемещение фильма по нажатию на иконку разбитого сердечка
likeFilmsList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className != "img-films-L unlike-btn") return;
    let moveUnlikeFilm = e.target.closest(".item-film");

    finishedFilmsList.insertAdjacentHTML("beforeend", `
    <div class="item-film item-finished-film">
        <p class="film-name">${moveUnlikeFilm.textContent
            // .replace(/\s{2,}/g,' ')
            .trim()}</p>
        <div class="img-item-film">
            <img src="img/heart.png" class="img-films-L like-btn">
            <img src="img/trash-bin.png" class="img-films-R remove-btn">
        </div>
    </div>`);

    moveUnlikeFilm.remove();
})


// поиск фильма
function searchGoal(word, listName) {
    let list;

    switch (listName) {
        case "searchLike": 
            list = Array.from(likeFilmsList.children)
            break;
        case "searchWatched": 
            list = Array.from(finishedFilmsList.children)
            break;
        default:  
            list = Array.from(allFilmsList.children)
            break;
    }

    list.forEach(film => {
      const content = film.querySelector(".film-name").innerText.toLowerCase();
      if (!content.includes(word.toLowerCase())) {
        film.classList.add("hide");
      } else {
        film.classList.remove("hide");
      }
    });
  }

  for (let i = 0; i < searchForm.length; i++) { 
    searchForm[i].addEventListener("keyup", (event) => {
        event.preventDefault();
        const searchWord = searchForm[i][event.target.name].value;

        searchGoal(searchWord, event.target.name);
    });
  }

