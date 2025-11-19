    let Score = JSON.parse(localStorage.getItem('score')) ||  {
            Wins : 0,
            Loose : 0,
            Ties : 0
        };

    updateScore();
    
    let autoPlaying = false;
    let intervalID;
    function autoPlay() {
        if(!autoPlaying) {
            intervalID = setInterval(function() {
            let pMove = pickComputerMove();
            playGame(pMove);
        } , 1500);
        autoPlaying = true;
        }
    }
    function stopautoPlay() {
    if (autoPlaying) {
        clearInterval(intervalID);
        autoPlaying = false;
    }
}

    document.querySelector('.rock').addEventListener('click' ,
        () => { playGame('Rock'); } )
    
    document.querySelector('.paper').addEventListener('click' ,
        () => { playGame('Paper'); } )
    
    document.querySelector('.scissor').addEventListener('click' ,
        () => { playGame('Scissor'); } )
    
    document.querySelector('.auto').addEventListener('click' ,autoPlay )

    document.querySelector('.stop').addEventListener('click' ,stopautoPlay)

    //key down
    document.body.addEventListener('keydown' , 
        (event) => {
            if(event.key === 'r') {
                playGame('Rock');
            } else if (event.key === 'p'){
                playGame('Paper');
            } else if (event.key === 's'){
                playGame('Scissor');
            } 
        } );
    

    function playGame(playerMove) {
        let comMove = pickComputerMove();
        let result = '';
        if (playerMove === 'Scissor') {
            if (comMove === 'Rock') {
                result = 'You Loose!!';
            } else if (comMove === 'Paper') {
                result = 'You Win!!'
            } else if (comMove === 'Scissor') {
                result = 'Tie'
            }

        } else if (playerMove == 'Paper') {
            if (comMove === 'Rock') {
                result = 'You Win!!';
            } else if (comMove === 'Paper') {
                result = 'Tie'
            } else if (comMove === 'Scissor') {
                result = 'You Loose!!'
            }

        } else {
            if (comMove === 'Rock') {
                result = 'Tie';
            } else if (comMove === 'Paper') {
                result = 'You Loose!!'
            } else if (comMove === 'Scissor') {
                result = 'You Win!!'
            }
        }

        if (result === 'You Win!!') {
            Score.Wins++;
        } else if (result === 'You Loose!!') {
            Score.Loose++;
        } else if (result === 'Tie') {
            Score.Ties++;
        }

        // Here we update in LocalStoreage
        localStorage.setItem('score', JSON.stringify(Score));
        updateScore();
        
        document.querySelector('.js-moves')
            .innerHTML = ` You <img src="images/${playerMove}-icon.png" class="move-icon"> 
                <img src="images/${comMove}-icon.png" class="move-icon"> Computer.`

            document.querySelector('.js-result')
            .innerHTML = `${result}`;
    }

    function updateScore(){
            document.querySelector('.js-score')
            .innerHTML = `Wins : ${Score.Wins} ,Looses : ${Score.Loose} ,Ties : ${Score.Ties}`;
    }

    function pickComputerMove() {
        let randomNumber = Math.random();
        let comMove = '';
        if (randomNumber >= 0 && randomNumber < 1 / 3) {
            comMove = 'Rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
            comMove = 'Paper';
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
            comMove = 'Scissor';
        }
        return comMove;

    }