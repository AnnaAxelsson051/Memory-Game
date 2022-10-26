const section = document.querySelector("section");
const playerAttemptsCount = document.querySelector("span");
let playerAttempts = 6;

//link text
playerAttemptsCount.textContent = playerAttempts;

//generate data, array of objects
//a function that returns an array of objects
const getData = () => [
  { imgSrc: "rose.jpeg", name: "rose" },
  { imgSrc: "blåklocka.jpeg", name: "blåklocka" },
  { imgSrc: "tussilago.jpeg", name: "tussilago" },
  { imgSrc: "vitsippa.jpeg", name: "vitsippa" },
  { imgSrc: "pelargon.jpeg", name: "pelargon" },
  { imgSrc: "pelargon2.jpeg", name: "pelargon2" },
  { imgSrc: "nejlika.jpeg", name: "nejlika" },
  { imgSrc: "prästkrage.jpeg", name: "prästkrage" },
  { imgSrc: "rose.jpeg", name: "rose" },
  { imgSrc: "blåklocka.jpeg", name: "blåklocka" },
  { imgSrc: "tussilago.jpeg", name: "tussilago" },
  { imgSrc: "vitsippa.jpeg", name: "vitsippa" },
  { imgSrc: "pelargon.jpeg", name: "pelargon" },
  { imgSrc: "pelargon2.jpeg", name: "pelargon2" },
  { imgSrc: "nejlika.jpeg", name: "nejlika" },
  { imgSrc: "prästkrage.jpeg", name: "prästkrage" },
];

//funct that randomize all tha cards for unescape
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

const cardGenerator = () => {
  const cardData = randomize();
  //generate html

  cardData.forEach((item, index) => {
    //index to access each one
    //loop tru and generate each item below:
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //attach info to the cards
    face.src = item.imgSrc;
    //for card source
    card.setAttribute("name", item.name);
    //attach cards to the section (img src and names)
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
      //everytime we toggle the cards we wanna check
    });
  });
};

//check if cards match
const checkCards = (e) => {
  const clickedCard = e.target;
  const flippedCards = document.querySelectorAll(".flipped");
  //select the flipped cards
  const toggleCard = document.querySelectorAll(".toggleCard");
  clickedCard.classList.add("flipped");
  //add a class of flipped to it
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
        //so its uncklickeable
      });
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        //if not a match we remove flipped
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerAttempts--;
      playerAttemptsCount.textContent = playerAttempts;
      if (playerAttempts === 0) {
        restart("You are out of attempts, try again!");
        //if anyone looses restart
      }
    }
  }
  if ((toggleCard, length === 16)) {
    restart("You won!");
  }
  //check if we won the game
};
//to restar the game
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  //nothing is clickeable til the game restarts
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    //randomize:
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      //if we guessed correct we remove the pointerevents on them so they are not clickeable so now we add them back again
      faces[index].src = item.imgSrc;
      //so we get a randomized version when we restart the game
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
      //update the name to the new randomized name
    }, 1000);
  });
  //if we loose flip all cards back to original position
  playerAttempts = 6;
  playerAttemptsCount.textContent = playerAttempts;
  //set the lives back to 6
  setTimeout(() => window.alert(text), 100);
  //a congrats window with text on 100 ms delay
};

cardGenerator();
