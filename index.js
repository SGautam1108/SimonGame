$(document).ready(() => {

    // Variables Declaration
    let gameEnable = false;
    let currLevel = 1;
    let currSeq = [];
    let userSeq = [];

    const colors = ["green", "red", "yellow", "blue"];
    const title = $("#level-title");
    const allButtons = $("button");
    const greenBtn =  $(".green");
    const yellowBtn =  $(".yellow");
    const redBtn =  $(".red");
    const blueBtn =  $(".blue");

    // Functions Declaration

    const resetAll = () => {
        gameEnable = false;
        currSeq = [];
        userSeq = [];
        resetTitle();
        disableButtons();
        disableButtonClicks();

    }

    const enableButtons = () => {
        allButtons.attr("aria-disabled", "false");
    }

    const disableButtons = () => {
        allButtons.attr("aria-disabled", "true");
    } 

    const changeTitle = () => {
        const titleString = `Level ${currLevel}`;
        title.text(titleString);
    }

    const resetTitle = () => {
        title.text("Game Over, Press 'S' Key to Restart");
    }

    const enableButtonClicks = () => {
        
        allButtons.on("click", (e) => {


            const currColor = e.target.id;
            const currBtn = $(`#${currColor}`);
            
            // add user input to the sequence
            userSeq.push(currColor);

            currBtn.addClass("pressed");
            setTimeout(() => {
                currBtn.removeClass("pressed");
            }, 100);

            playSound(currColor);

            verifyAns();
        })

    } 

    const disableButtonClicks = () => {
        allButtons.off("click");
    } 


    const playSound = (color) => {
        let audio = new Audio(`sounds/${color}.mp3`);
        audio.play();
    }

    const btnShowPlay = (btn, color) => {
        if(!btn) return;

        btn.fadeOut(200).fadeIn(200);
        playSound(color);
    } 

    const generateSequence = () => {
        let randomColor = colors[Math.floor(Math.random() * 4)];
        currSeq.push(randomColor);
    }

    const showSequence = () => {

        let currColor = currSeq[currSeq.length - 1];
        let currBtn;

        switch(currColor){
            case "green":
                currBtn = greenBtn;
                break;
            case "red":
                currBtn = redBtn;
                break;
            case "yellow":
                currBtn = yellowBtn;
                break;
            case "blue":
                currBtn = blueBtn;
                break;
            default:
                currBtn = null;
                console.log("No sequence found");
        }

        btnShowPlay(currBtn, currColor);

        

    }

    const sequenceOutput = () => {
        generateSequence();
        showSequence();
        
        //Enable the button clicks once whole sequence shown
        enableButtonClicks();
    }

    const gameOverOutput = () => {
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);
    } 

    const verifyAns = () => {

        let gameOver = false;

        for(let i = 0; i < userSeq.length; i++){
            if(userSeq[i] != currSeq[i]){
                gameOver = true;
                break;
            }
        } 

        if(gameOver){
            currLevel = 1;
            gameOverOutput();
            resetAll();
        } else if(userSeq.length == currSeq.length){
            currLevel++;
            setTimeout(() => {
                //disable buttons once level completed
                disableButtonClicks();
                playGame();
            }, 1000);
        }
    } 

    const playGame = () => {

        userSeq = [];  //refresh user moves with each round
        changeTitle();
        sequenceOutput();

    }

    const startGame = () => {
        currLevel = 1;
        currSeq = [];
        enableButtons();

        playGame();

    }

    // Main code

    $(document).on("keydown", (e) => {
        console.log(e.key);
        if((e.key == 's' || e.key == 'S') && !gameEnable) {
            gameEnable = true;
            startGame();
        }
    })

})