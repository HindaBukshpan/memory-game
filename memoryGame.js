
document.getElementById("divButton").addEventListener("click", function (event) {
  document.getElementById("divButton").classList.add("d-none");
  if (event.target.classList.contains("dog-button")) {
    dogApi();
  }
  if (event.target.classList.contains("character-button")){
  characterApi();
  }
  if (event.target.classList.contains("cat-button")){
    catApi();
    }
  if (event.target.classList.contains("random-button")){
    let randomArray = [];
    randomArray.push(dogApi, characterApi, catApi);
    randomArray[Math.floor(Math.random() * randomArray.length)]();
  }})


  
function dogApi() {
    fetch("https://dog.ceo/api/breeds/image/random/30")
    .then(response => response.json())
    .then((data) =>{
    // console.log(data.message);
    pick6DogCards(data.message);
  } )   
}

function pick6DogCards(data) { 
  // console.log(data);
    let cardsarray = [];
    while (cardsarray.length < 12) {
        let randomCards = Math.floor(Math.random() * data.length);
            cardsarray.push(data[randomCards]);
            cardsarray.push(data[randomCards]);
          }
        // console.log(cardsarray);
    createDogBord(cardsarray);
}

function createDogBord(cardsArr) {
        cardsArr.forEach((card) => {
          let div = document.createElement("div");
          div.className = "memory-card";
          div.setAttribute("data-framework", card);
          document.querySelector(".memory-game").appendChild(div);
          let frontImg = document.createElement("img");
          frontImg.className = "front-face";
          frontImg.setAttribute("src", card);
          frontImg.setAttribute("alt", card);
          div.appendChild(frontImg);
          let backImg = document.createElement("img");
          backImg.className = "back-face";
          backImg.setAttribute("src", "img/10088267ב.jpg");
          backImg.setAttribute("alt", `${card} badge`);
          div.appendChild(backImg); 
        })
        let gameCards = document.querySelectorAll(".memory-card");
          console.log(gameCards);
          playTheGame (gameCards);
      }

    function characterApi() {
        fetch("https://hp-api.onrender.com/api/characters")
        .then(response => response.json())
        .then((data) => pick6CharactehCards(data)) 
    }
    function pick6CharactehCards(data) { 
        let cardsarray = [];
        while (cardsarray.length < 12) {
        let randomCards = Math.floor(Math.random() * data.length);
        if (data[randomCards].image){
            cardsarray.push(data[randomCards]);
            cardsarray.push(data[randomCards]);}
        }
    createCharacterBord(cardsarray);
    }
    
    function createCharacterBord(cardsArr) {
        cardsArr.forEach(card => {
          let div = document.createElement("div");
          div.className = "memory-card";
          div.setAttribute("data-framework", card.name);
          document.querySelector(".memory-game").appendChild(div);
          let frontImg = document.createElement("img");
          frontImg.className = "front-face";
          frontImg.setAttribute("src", card.image);
          frontImg.setAttribute("alt", card.name);
          div.appendChild(frontImg);
          let backImg = document.createElement("img");
          backImg.className = "back-face";
          backImg.setAttribute("src", "img/10088267ב.jpg");
          backImg.setAttribute("alt", `${card.name} badge`);
          div.appendChild(backImg); 
        })
        let gameCards = document.querySelectorAll(".memory-card");
          console.log(gameCards);
          playTheGame (gameCards);
    }

function catApi() {
    fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    .then(response => response.json())
    .then((data) =>{
    console.log(data);
    pick6CatCards(data);
    } )  
  }

function pick6CatCards(data) { 
    let cardsarray = [];
    while (cardsarray.length < 12) {
        let randomCards = Math.floor(Math.random() * data.length);
        if (data[randomCards].url){
            cardsarray.push(data[randomCards]);
            cardsarray.push(data[randomCards]);}
        }
        console.log(cardsarray);
    createCatBord(cardsarray);
}

function createCatBord(cardsArr) {
        cardsArr.forEach(card => {
          let div = document.createElement("div");
          div.className = "memory-card";
          div.setAttribute("data-framework", card.id);
          document.querySelector(".memory-game").appendChild(div);
          let frontImg = document.createElement("img");
          frontImg.className = "front-face";
          frontImg.setAttribute("src", card.url);
          frontImg.setAttribute("alt", card.id);
          div.appendChild(frontImg);
          let backImg = document.createElement("img");
          backImg.className = "back-face";
          backImg.setAttribute("src", "img/10088267ב.jpg");
          backImg.setAttribute("alt", `${card.id} badge`);
          div.appendChild(backImg);
        })
        let gameCards = document.querySelectorAll(".memory-card");
          console.log(gameCards);
          playTheGame (gameCards);
    }

function playTheGame (gameCards) {
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let countMatches=0;


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  countMatches++;
if (countMatches == 6) {
  document.querySelector(".win-message").classList.remove("d-none");
}
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function() {
  gameCards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

gameCards.forEach((card) => card.addEventListener("click", flipCard));
 
}
