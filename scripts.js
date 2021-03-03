const modal = document.querySelector("#my-modal");
const addButton = document.querySelector("#btn-add-film");
const closeButton = document.querySelector("#close-btn");
const addFilmForm = document.querySelector("#add-film-form")
const allFilmsList = document.querySelector(".all-films-items")
const finishedFilmsList = document.querySelector(".finished-films-items")
const likeFilmsList = document.querySelector(".like-films-items")

addButton.addEventListener("click", (e) => {
    // e.preventDefault();
    modal.style.display = "block";

    window.addEventListener('click', (e) => {
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
        <p>${film}</p>
        <div class="all-films-itemImg">
            <img src="img/eye.png" class="img-films move-btn">
            <img src="img/trash-bin.png" class="img-films remove-btn">
        </div>
    </div>
    `
    allFilmsList.innerHTML += newFilm
}

// удаление фильма по нажатию на иконку корзины
allFilmsList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className != "img-films remove-btn") return;

    let removeAllFilm = e.target.closest(".item-film");
    removeAllFilm.remove();
})

finishedFilmsList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className != "img-films remove-btn") return;

    let removeFinishedFilm = e.target.closest(".item-film");
    removeFinishedFilm.remove();
})


likeFilmsList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className != "img-films remove-btn") return;

    let removeLikeFilm = e.target.closest(".item-film");
    removeLikeFilm.remove();
})


// перемещение фильма по нажатию на иконку глаза
allFilmsList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className != "img-films move-btn") return;
    let moveFinishedFilm = e.target.closest(".item-film");

    finishedFilmsList.insertAdjacentHTML("beforeend", `
    <div class="item-film item-finished-film">
        <p> ${moveFinishedFilm.textContent
            // .replace(/\s{2,}/g,' ')
            .trim()} </p>
        <div class="all-films-itemImg">
            <img src="img/heart.png" class="img-films like-btn" >
            <img src="img/trash-bin.png" class="img-films remove-btn">
        </div>
    </div>`);

    moveFinishedFilm.remove();
})

// перемещение фильма по нажатию на иконку сердечка
finishedFilmsList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className != "img-films like-btn") return;
    let moveLikeFilm = e.target.closest(".item-film");

    likeFilmsList.insertAdjacentHTML("beforeend", `
    <div class="item-film">
        <p> ${moveLikeFilm.textContent
            // .replace(/[\n\r]+|[\s]{2,}/g,' ')
            .trim()} </p>
        <div class="all-films-itemImg">
            <img src="img/broken-heart.png" class="img-films unlike-btn">
            <img src="img/trash-bin.png" class="img-films remove-btn">
        </div>
    </div>`);

    moveLikeFilm.remove();
})

// перемещение фильма по нажатию на иконку разбитого сердечка
likeFilmsList.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className != "img-films unlike-btn") return;
    let moveUnlikeFilm = e.target.closest(".item-film");

    finishedFilmsList.insertAdjacentHTML("beforeend", `
    <div class="item-film item-finished-film">
        <p> ${moveUnlikeFilm.textContent
            // .replace(/\s{2,}/g,' ')
            .trim()} </p>
        <div class="all-films-itemImg">
            <img src="img/heart.png" class="img-films like-btn">
            <img src="img/trash-bin.png" class="img-films remove-btn">
        </div>
    </div>`);

    moveUnlikeFilm.remove();
})