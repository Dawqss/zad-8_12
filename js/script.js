var elHeader = document.getElementById('header'),
	elGameGround = document.getElementById('gamePlayground'),
	elScoreGround = document.getElementById('gameScoreGround'),
	elGameButton = document.getElementById('newGameButton'),
	elPlayerScore = document.getElementById('playerScore'),
	elPlayerName = document.getElementById('playerName'),
	elPlayerPick = document.getElementById('playerPick'),
	elRoundForPlayer = document.getElementById('roundForPlayer'),
	elComputerScore = document.getElementById('computerScore'),
	elComputerPick = document.getElementById('computerPick'),
	elRoundForComp = document.getElementById('roundForComputer'),
	elWinner = document.getElementById('winner'),
	elRepeatButton = document.getElementById('repeatButton'),
	elRock = document.getElementById('rock'),
	elPaper = document.getElementById('paper'),
	elScissor = document.getElementById('scissor'),
	player = {
		name: '',
		score: 0
	},
	computer = {
		score: 0
	};

setGameElements('nonStarted');

function setGameReset(){
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
		case 'started':
		elHeader.style.display = 'none';
		elGameGround.style.display = 'block';
		elScoreGround.style.display = 'none';
		setGameReset();
		break;
		case 'ended':
		elHeader.style.display = 'none';
		elGameGround.style.display = 'none';
		elScoreGround.style.display = 'block';
		break;
		case 'nonStarted':
		elHeader.style.display = 'block';
		elGameGround.style.display = 'none';
		elScoreGround.style.display = 'none';
	}
}

function gameStart() {
	player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
	elPlayerName.innerHTML = player.name;
	setGameElements('started');
}

function getComputerPick() {
	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)];
}

function getPlayerPick(number) {
	var possiblePickPlayer = ['rock', 'paper', 'scissors'];
	var playerPick = possiblePickPlayer[number];
	var computerPick = getComputerPick();

	elPlayerPick.innerHTML = playerPick;
	elComputerPick.innerHTML = computerPick;

	checkWhoWon(playerPick, computerPick);
}

function checkWhoWon(playerPick, computerPick) {

	var theWinner = 'player';

	if (playerPick == computerPick) {
		theWinner = 'noone';
	}
	
	else if (
		(playerPick == 'scissors' && computerPick == 'rock') ||
		(playerPick == 'paper' && computerPick == 'scissors') ||
		(playerPick == 'rock' && computerPick == 'paper')) {
		theWinner = 'computer';
	}

	if (theWinner == 'player') {
		elRoundForPlayer.innerHTML = 'You Won!';
		elRoundForPlayer.style.color = '#47ff47';
		elRoundForComp.innerHTML = 'You Lost!';
		elRoundForComp.style.color = '#9e2323';
		player.score++;
		elPlayerScore.innerHTML = player.score;
	}

	else if (theWinner == 'computer'){
		elRoundForPlayer.innerHTML = 'You Lost!';
		elRoundForPlayer.style.color = '#9e2323';
		elRoundForComp.innerHTML = 'You Won!';
		elRoundForComp.style.color = '#47ff47';
		computer.score++;
		elComputerScore.innerHTML = computer.score;
	}

	else if (theWinner == 'noone') {
		elRoundForPlayer.innerHTML = 'Draw!';
		elRoundForPlayer.style.color = 'orange';
		elRoundForComp.innerHTML = 'Draw!';
		elRoundForComp.style.color = 'orange';
	}

	checkGameWinner(player.score, computer.score);
}


function checkGameWinner(playerScore, computerScore){

	if ( computerScore == 10) {
		setGameElements('ended');
		elWinner.innerHTML = 'computer';
		elScoreGround.style.backgroundColor = '#e74c3c';
	}

	else if ( playerScore == 10) {
		setGameElements('ended');
		elWinner.innerHTML = player.name;
		elScoreGround.style.backgroundColor = '#2ecc71';
	}
}	

function gameAgain() {
	setGameElements('nonStarted');

}


elGameButton.addEventListener('click',gameStart, false);

elRock.addEventListener('click', function() { getPlayerPick(0);}, false);
elPaper.addEventListener('click', function() { getPlayerPick(1);}, false);
elScissor.addEventListener('click',function() { getPlayerPick(2);}, false);
elRepeatButton.addEventListener('click', gameAgain , false); 