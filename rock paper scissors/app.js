let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");


const generateComputerChoice =() =>{
    const options = ["rock","paper","scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
}

//  Draw game
 const DrawGame  = ()=>{
    console.log("Game was Draw");
    msg.innerText = "Game was Draw, Play again";
    msg.style.backgroundColor = "#081b31";
    setBodyBg('draw');
 }

//   Show winner
const  showwinner = (userWin) =>{
    if(userWin){
        userScore++;
        document.getElementById("user-score").innerText = userScore;
        console.log("YOU WIN");
        msg.innerText = "YOU WIN";
        msg.style.backgroundColor = "green";
        setBodyBg('win');
    }
    else{
        compScore++;
        document.getElementById("computer-score").innerText = compScore;
        console.log(" YOU LOSE");
        msg.innerText = "YOU LOSE";
        msg.style.backgroundColor = "red";
        setBodyBg('lose');
    }
}

//  Playing the game
const playGame = (userChoice) => {
    console.log("User choice =", userChoice);
    // Generating computer choice
    const computerChoice = generateComputerChoice();
    console.log("Computer choice =", computerChoice);

    if(userChoice === computerChoice){
        // Draw game
        DrawGame();
    }else{
        let userWin = true;
        if(userChoice === "rock"){
            // scissior, paper
            userWin = computerChoice == "paper"? false : true;
        
        }else if(userChoice === "paper"){
            // rock, scissior
            userWin = computerChoice === "scissors" ? false : true;
        }else{
        // rock, paper
        userWin = computerChoice === "rock" ? false : true;
        }showwinner(userWin);}
}

choices.forEach((choice) => {
    choice.addEventListener('click', () =>{
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
    });
});

// Function to prompt for and set the user's name
function setUserName() {
    let storedName = localStorage.getItem("userName");
    let name;
    if (storedName) {
        name = storedName;
    } else {
        name = prompt("Enter your name:") || "Player";
        localStorage.setItem("userName", name);
    }
    const userNameElement = document.getElementById("user-name");
    if (userNameElement) {
        userNameElement.innerText = name;
    }
}

// Call setUserName on page load
setUserName();

// Optional: Expose setUserName to window for manual update
window.setUserName = setUserName;

const resetNameBtn = document.getElementById("reset-name");
if (resetNameBtn) {
    resetNameBtn.addEventListener("click", () => {
        localStorage.removeItem("userName");
        setUserName();
    });
}

function setBodyBg(result) {
    const body = document.body;
    body.classList.remove('win-bg', 'lose-bg', 'draw-bg');
    if (result === 'win') body.classList.add('win-bg');
    else if (result === 'lose') body.classList.add('lose-bg');
    else if (result === 'draw') body.classList.add('draw-bg');
}
//   40 min