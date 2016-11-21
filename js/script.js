function getElement(elementId) {
	return document.getElementById(elementId)
};

var elHeader = getElement('header'),
	elGameGround = getElement('gamePlayground'),
	elScoreGround = getElement('gameScoreGround'),
	elGameButton = getElement('newGameButton'),
	elPlayerScore = getElement('playerScore'),
	elPlayerName = getElement('playerName'),
	elPlayerPick = getElement('playerPick'),
	elRoundForPlayer = getElement('roundForPlayer'),
	elComputerScore = getElement('computerScore'),
	elComputerPick = getElement('computerPick'),
	elRoundForComp = getElement('roundForComputer'),
	elWinner = getElement('winner'),
	elRepeatButton = getElement('repeatButton'),
	elRock = getElement('rock'),
	elPaper = getElement('paper'),
	elScissor = getElement('scissor'),
	player = {
		name: '',
		score: 0
	},
	computer = {
		score: 0
	},
	gameState = {
		NOT_STARTED: 'nonStarted',
		STARTED: 'started',
		ENDED: 'ended'
	};

elGameButton.addEventListener('click',gameStart, false);
elRepeatButton.addEventListener('click', function() {setGameElements(gameState.NOT_STARTED);} , false); 

elRock.addEventListener('click', function() { getPlayerPick('rock');}, false);
elPaper.addEventListener('click', function() { getPlayerPick('paper');}, false);
elScissor.addEventListener('click',function() { getPlayerPick('scissor');}, false);


setGameElements(gameState.NOT_STARTED);

function resetGame(){
	player.score = 0;
	computer.score = 0;
	elPlayerScore.innerHTML = player.score;
	elComputerScore.innerHTML = computer.score;
	elRoundForPlayer.innerHTML = 'Who will win ?';
	elRoundForComp.innerHTML = 'Who will win ?';
	elRoundForComp.style.color = 'white';
	elRoundForPlayer.style.color = 'white';
}

function setGameElements(gamestate){
	switch(gamestate) {
		case gameState.STARTED:
			elHeader.style.display = 'none';
			elGameGround.style.display = 'block';
			elScoreGround.style.display = 'none';
			resetGame();
			break;
		case gameState.ENDED:
			elHeader.style.display = 'none';
			elGameGround.style.display = 'none';
			elScoreGround.style.display = 'block';
			break;
		case gameState.NOT_STARTED:
			elHeader.style.display = 'block';
			elGameGround.style.display = 'none';
			elScoreGround.style.display = 'none';
	}
}

function gameStart() {
	player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
	elPlayerName.innerHTML = player.name;
	setGameElements(gameState.STARTED);
}

var possiblePicks = ['rock', 'paper', 'scissors'];

function getComputerPick() {
	// @TODO: fix math random pick
	return possiblePicks[Math.floor(Math.random() * 3)];
}

function getPlayerPick(playerPick) {
	var computerPick = getComputerPick();

	elPlayerPick.innerHTML = playerPick;
	elComputerPick.innerHTML = computerPick;

	checkWhoWon(playerPick, computerPick);
}

function checkWhoWon(playerPick, computerPick) {
	var theWinner = 'player';

	if (playerPick === computerPick) {
		theWinner = 'noone';
	}
	
	else if (
		(playerPick === 'scissors' && computerPick === 'rock') ||
		(playerPick === 'paper' && computerPick === 'scissors') ||
		(playerPick === 'rock' && computerPick === 'paper')) {
		theWinner = 'computer';
	}

	function setWinner(whoWon) {
		elRoundForPlayer.innerHTML = whoWon === 'player' ? 'You won!' : 'You lost!';
		elRoundForPlayer.style.color = whoWon === 'player' ? '#47ff47' : '#9e2323';
		elRoundForComp.innerHTML = whoWon === 'player' ? 'You lost!' : 'You won!';
		elRoundForComp.style.color = whoWon === 'player' ? '#9e2323' : '#47ff47';
		
		if(whoWon === 'player') {
			player.score++;
		} else {
			computer.score++;
		}

		elPlayerScore.innerHTML = player.score;
		elComputerScore.innerHTML = computer.score;
	}

	if (theWinner === 'player') {
		setWinner('player');
	}

	else if (theWinner === 'computer'){
		setWinner('computer');
	}

	else if (theWinner === 'noone') {
		elRoundForPlayer.innerHTML = 'Draw!';
		elRoundForPlayer.style.color = 'orange';
		elRoundForComp.innerHTML = 'Draw!';
		elRoundForComp.style.color = 'orange';
	}

	checkGameWinner();
}

function checkGameWinner(){
	if (computer.score == 10 || player.score === 10) {
		setGameElements(gameState.ENDED);
		elWinner.innerHTML = player.score === 10 ? player.name : 'computer';
		elScoreGround.style.backgroundColor = player.score === 10 ? '#e74c3c' : '#2ecc71';
	}
}
