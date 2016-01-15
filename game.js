//Set turn number to 1
var turn = 1

//Team X Score
var xScore = 0;

//Team O Score
var oScore = 0;

//Sets default lastRanNum for keeping track of RanNumGen function
var lastRanNum = 0;

//Assigns bottalk span element to var botText
var botText = document.getElementById("bottalk");

//Assigns sideboard elements to vars
var allX = document.getElementsByClassName("x");
var allO = document.getElementsByClassName("o");
var newGameButton = document.getElementById("newGame");
var resetScoresButton = document.getElementById("resetScore")
var xScoreView = document.getElementById("xScore");
var oScoreView = document.getElementById("oScore");


var humanX = document.getElementById("humanX");
var botX = document.getElementById("botX");
var humanO = document.getElementById("humanO");
var botO = document.getElementById("botO");

var easy = document.getElementById("easy");
var moderate = document.getElementById("moderate");
var advanced = document.getElementById("advanced");
var expert = document.getElementById("expert");


//Setup Tic-Tac-Toe Game
setupGame();

//Implements onClicks for gameboard, new game, and reset scores
function setupGame() {
	setOnClick();
	newGameButton.onclick = resetGame;
	resetScoresButton.onclick = resetScores;
	
	xSelect.onchange = switchModeUpdate;
	oSelect.onchange = switchModeUpdate;
		
	easy.onclick = easyDifficulty;
	moderate.onclick = moderateDifficulty;
	advanced.onclick = advancedDifficulty;
    expert.onclick = expertDifficulty;	
}

function humanGame() {
	if (humanX.selected == true && humanO.selected == true) {
		return true;
	}
	else {
		return false;
	}
}

function humanBotGame() {
	if ((botX.selected == true && humanO.selected == true) || (botO.selected == true && humanX.selected == true)) {
		return true;
	}
	else {
		return false;
	}
}

function botGame() {
	if (botX.selected == true && botO.selected == true) {
		return true;
	}
	else {
		return false;
	}
}

function easyDifficulty() {
	
	switchDifficultyUpdate();

}

function moderateDifficulty() {
	
	switchDifficultyUpdate();

}

function advancedDifficulty() {
	
	switchDifficultyUpdate();
	
}

function expertDifficulty() {
	
	switchDifficultyUpdate();

}


function setOnClick() {
	
	for(var i=0; i<allX.length; i++) (function(i){
		
		allX[i].onclick = function(){
			spaceUpdate(allX[i]);
		}
		
		allO[i].onclick = function(){
			spaceUpdate(allO[i]);
		}
	})(i);

}

function disableOnClick() {
	
	for(var i=0; i<allX.length; i++) (function(i){
		
		allX[i].onclick = false;
		
		allO[i].onclick = false;
	})(i);
	
}

function spaceUpdate(space) {
	
	if (turn % 2 != 0) {
		
		if(allX.length > 0) {
			
			for(var i=0; i<allX.length; i++) {
				if (allX[i].style.opacity != 1) {
					allX[i].style.visibility = "hidden";
				}
				
			}
		}
		
		space.style.opacity = 1;
		space.style.visibility = "visible";
		space.style.cursor = "not-allowed";	
		space.onclick = false;		
		
		if(allO.length > 0) {
			
			for(var i=0; i<allO.length; i++) {
				if(allX[i].style.opacity != 1) {
					allO[i].style.visibility = "visible";
				}
			}
		}
	}
	else {
		
		if(allO.length > 0) {
			
			for(var i=0; i<allO.length; i++) {
				if (allO[i].style.opacity != 1) {
					allO[i].style.visibility = "hidden";
				}
			}
		}
			
		space.style.opacity = 1;
		space.style.visibility = "visible";	
		space.style.cursor = "not-allowed";	
		space.onclick = false;
		
		if(allX.length > 0) {
			
			for(var i=0; i<allX.length; i++) {
				if(allO[i].style.opacity != 1) {
					allX[i].style.visibility = "visible";
				}
				
			}
		}		
	}
	
	checkVictory();
	
	if (turn == 9) {
		disableOnClick();
		return;
	}
	
	turn++;
		
}

function resetGame() {
	
	newGameUpdate();

	if(allX.length > 0) {
		for(var i=0; i<allX.length; i++) {
			allX[i].style.opacity = 0;
			allX[i].style.visibility = "visible";
			allX[i].style.cursor = "pointer";
		}
		
	}
	
	if(allO.length > 0) {
		for(var i=0; i<allO.length; i++) {
			allO[i].style.visibility = "hidden";
			allO[i].style.opacity = 0;
			allO[i].style.cursor = "pointer";
		}	
	}
	
	setOnClick();
	
	turn = 1;
	
}

function checkVictory() {
	if (checkOpacity(allX, 0, 1, 2) || checkOpacity(allX, 3, 4, 5) || checkOpacity(allX, 6, 7, 8)) {
		xWins();
		return;
	}
	
	else if (checkOpacity(allO, 0, 1, 2) || checkOpacity(allO, 3, 4, 5) || checkOpacity(allO, 6, 7, 8)) {
		oWins();
		return;
	}
	
	else if (checkOpacity(allX, 0, 3, 6) || checkOpacity(allX, 1, 4, 7) || checkOpacity(allX, 2, 5, 8)) {
		xWins();
		return;
	}
	
	else if (checkOpacity(allO, 0, 3, 6) || checkOpacity(allO, 1, 4, 7) || checkOpacity(allO, 2, 5, 8)) {
		oWins();
		return;
	}
	
	else if (checkOpacity(allX, 0, 4, 8) || checkOpacity(allX, 2, 4, 6)) {
		xWins();
		return;
	}
	
	else if (checkOpacity(allO, 0, 4, 8) || checkOpacity(allO, 2, 4, 6)) {
		oWins();
		return;
	}
	
	else if (turn == 9) {
		tieUpdate();
		return;
	}
	
	
	
}

function checkOpacity(array, i1, i2, i3) {
	
		if (array[i1].style.opacity == 1 && array[i2].style.opacity == 1 && array[i3].style.opacity == 1) {
			return true;
		}
}

function xWins() {
	xScore++;
	xScoreView.textContent = xScore;
	winUpdate("X");
	disableOnClick();
}

function oWins() {
	oScore++;
	oScoreView.textContent = oScore;
	winUpdate("O")
	disableOnClick();
}

function resetScores() {
	
	resetScoreUpdate();
	
	xScore = oScore = 0;
	xScoreView.textContent = 0;
	oScoreView.textContent = 0;
}


/* Functions related to human vs human text updates */

function ranNumGen(size) {
	
	var ranNumber = Math.floor(Math.random() * size);
	
	while (lastRanNum == ranNumber) {
		ranNumber = Math.floor(Math.random() * size);
	}
	
	lastRanNum = ranNumber;
	return ranNumber;
}

function winUpdate(winner) {
	
	var combinedScore = xScore + oScore;
	
	if (humanGame() == true) {
		var bestOf = "What do you say Team " + winner + "? Best " + (combinedScore + 1) + " out of " + (combinedScore * 2 + 1) + "?";
	
		if (winner == "X") {
			var xUpdateText = ["Congrats Team X! Aren't you glad you aren't Team O?", "Wow Team O... That was bad. Hit the books.",
			"Team X Wins! Better luck next time Team O.", bestOf, "Jeez Team O. Have you considered just not playing this game at all?",
			"Come on Team O! I had twenty bucks on you!", "I've seen frying pans who are better than you Team O."];
	
			var ranXText = xUpdateText[ranNumGen(xUpdateText.length)];
	
			botText.innerHTML = ranXText;	
		}
		else {
			var oUpdateText = ["Congrats Team O! Aren't you glad you aren't Team X?", "Wow Team X... That was bad. Hit the books.",
			"Team O Wins! Better luck next time Team X.", bestOf, "Alright Team X. Have you considered just not playing this game at all?",
			"Maybe Ice Skating is more your thing Team X.", "Be truthful Team X. Are you letting Team O win?"];
	
			var ranOText = oUpdateText[ranNumGen(oUpdateText.length)];
	
			botText.innerHTML = ranOText;	
		}
	}
	

}

function tieUpdate() {
	
	if (humanGame() == true) {
		var tieUpdateText = ["BOOOOOOOORRRRINNNG.", "Do I need to step in and show you two how to win?", 
		"Ahhh a tie game... How interesting.", "WOW! What an action packed game! Not."]
	
		var ranTieText = tieUpdateText[ranNumGen(tieUpdateText.length)];
	
		botText.innerHTML = ranTieText;
	}
	
}

function newGameUpdate() {
	
	if (humanGame() == true) {
		var newGameUpdateText = ["AHHH YEA! NEW GAME BABY!", "Sometimes I wonder if I have any choice in the matter...", 
		"Hopefully this game is more exciting than the last one.", "I play winner next!"]
	
		var ranNewGameText = newGameUpdateText[ranNumGen(newGameUpdateText.length)];
	
		botText.innerHTML = ranNewGameText;
	}

	
}

function resetScoreUpdate() {
	
	if (humanGame() == true) {
		var losingReset = "Just couldn't take losing could you";
	
		if (xScore < oScore) {
			losingReset = losingReset + " Team X?"
		}
		else if (oScore < xScore) {
			losingReset += " Team O?"
		}
		else {
			losingReset = "There's not even any scores on the board!"
		}
	
		var resetUpdateText = [losingReset, "Nothing like a fresh slate to start a losing steak on eh?"]
	
		var ranResetText = resetUpdateText[ranNumGen(resetUpdateText.length)];
	
		botText.innerHTML = ranResetText;
	}
}

function switchModeUpdate() {
	
	resetGame();
	resetScores();
	
	if (humanGame() == true) {
		botText.innerHTML = "Oh I see how it is. Fine play without me. I didn't want to play anyways..."
	}
	else if ((humanX.selected == true || humanO.selected == true) && (botX.selected == true || botO.selected == true)){
		botText.innerHTML = "FINALLY! I've been waiting for an opponent all day!"
	}
	else {
		botText.innerHTML = "Oh great you want me to play against myself. Like I can't do that any other time..."
	}
}

function switchDifficultyUpdate() {
	
	if (humanBotGame() == true) {
		
		resetGame();
		
		if (easy.checked == true) {
			botText.innerHTML = "Oh sure play me at my weakest. COWARD!"
		}
		else if (moderate.checked == true) {
			botText.innerHTML = "I think you'll see I'm no slouch, but you might get lucky here and there. Might."
		}
		else if (advanced.checked == true) {
			botText.innerHTML = "You better be good. Really good. I mean REALLY GOOD."
		}
		else {
			botText.innerHTML = "You've entered into dangerous territory. Don't you see? I can't lose."
		}
	}
}