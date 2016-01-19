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
var humanO = document.getElementById("humanO");

var easyBotX = document.getElementById("easyBotX");
var normalBotX = document.getElementById("normalBotX");
var hardBotX = document.getElementById("hardBotX");
var expertBotX = document.getElementById("expertBotX");

var easyBotO = document.getElementById("easyBotO");
var normalBotO = document.getElementById("normalBotO");
var hardBotO = document.getElementById("hardBotO");
var expertBotO = document.getElementById("expertBotO");


//Setup Tic-Tac-Toe Game
setupGame();

//Implements onClicks for gameboard, new game, and reset scores
function setupGame() {
	setOnClick();
	newGameButton.onclick = resetGame;
	resetScoresButton.onclick = resetScores;
	
	xSelect.onchange = switchModeUpdate;
	oSelect.onchange = switchModeUpdate;	
}

//Sets the onClick functions for all X and O to spaceUpdate
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

function enableXOnClick() {
	
	for(var i=0; i<allX.length; i++) (function(i){
		
		if(allX[i].style.opacity != 1) {
			allX[i].onclick = function(){
				spaceUpdate(allX[i]);
			}
		}
	})(i);
}

function enableOOnClick() {
	
	for(var i=0; i<allO.length; i++) (function(i){
		
		if(allO[i].style.opacity != 1) {
			allO[i].onclick = function(){
				spaceUpdate(allO[i]);
			}
		}
	})(i);
}

//Disables the onClick events for all X
function disableXOnClick() {
	
	for(var i=0; i<allX.length; i++) (function(i){
		
		allX[i].onclick = false;
		
	})(i);
	
}

//Disables the onClick events for all O
function disableOOnClick() {
	
	for(var i=0; i<allO.length; i++) (function(i){
		
		allO[i].onclick = false;
		
	})(i);
	
}

//Checks if game is between two humans
function humanGame() {
	if (humanX.selected == true && humanO.selected == true) {
		return true;
	}
	else {
		return false;
	}
}

//Checks if game is between human and bot
function easyBotCheck() {
	if (humanX.selected == true && easyBotO.selected == true || humanO.selected == true && easyBotX.selected == true) {
		return true;
	}
	else {
		return false;
	}
}

function normalBotCheck() {
	if (humanX.selected == true && normalBotO.selected == true || humanO.selected == true && normalBotX.selected == true) {
		return true;
	}
	else {
		return false;
	}
}


function hardBotCheck() {
	if (humanX.selected == true && hardBotO.selected == true || humanO.selected == true && hardBotX.selected == true) {
		return true;
	}
	else {
		return false;
	}
}


function expertBotCheck() {
	if (humanX.selected == true && expertBotO.selected == true || humanO.selected == true && expertBotX.selected == true) {
		return true;
	}
	else {
		return false;
	}
}

function xBotCheck() {
	if(easyBotX.selected || normalBotX.selected || hardBotX.selected || expertBotX.selected) {
		return true;
	}
	else {
		return false;
	}
}

function oBotCheck() {
	if(easyBotO.selected || normalBotO.selected || hardBotO.selected || expertBotO.selected) {
		return true;
	}
	else {
		return false;
	}
}

function humanBotGame() {
	if (xBotCheck() && humanO.selected || oBotCheck() && humanX.selected) {
		return true;
	}
	else {
		return false;
	}
}

//Checks if game is between two bots
function botGame() {
	if (xBotCheck() && oBotCheck()) {
		return true;
	}
	else {
		return false;
	}
}


function easyDifficulty() {
	
	if (xBotCheck()) {
		disableXOnClick();
		if (turn % 2 != 0) {
				
			spotChoice = ranNumGen(allX.length)

			while (allO[spotChoice].style.opacity == 1 || allX[spotChoice].style.opacity == 1) {
					spotChoice = ranNumGen(allX.length) 
			}
				
			enableXOnClick();
			enableOOnClick();
			allX[spotChoice].click();
		}
	}
	else {
		disableOOnClick();
		if (turn % 2 == 0) {
				
			spotChoice = ranNumGen(allO.length)
				
			while (allO[spotChoice].style.opacity == 1 || allX[spotChoice].style.opacity == 1) {
					spotChoice = ranNumGen(allO.length) 
			}
				
			enableXOnClick();
			enableOOnClick();
			allO[spotChoice].click();
		}
	}

}

function normalDifficulty() {
	
	if (xBotCheck()) {
		disableXOnClick();
		if (turn % 2 != 0) {
			
			possibleBlockSpot = blockOpponent(allX, allO);
			
			if(possibleBlockSpot != null) {
				enableXOnClick();
				enableOOnClick();
				allX[possibleBlockSpot].click();
			}
			else {
				spotChoice = ranNumGen(allX.length);

				while (allO[spotChoice].style.opacity == 1 || allX[spotChoice].style.opacity == 1) {
						spotChoice = ranNumGen(allX.length) 
				}
				
				enableXOnClick();
				enableOOnClick();
				allX[spotChoice].click();
			}	

		}
	}
	else if (oBotCheck()) {
		disableOOnClick();
		if (turn % 2 == 0) {
			
			possibleBlockSpot = blockOpponent(allO, allX);
			
			if(possibleBlockSpot != null) {
				enableXOnClick();
				enableOOnClick();
				allO[possibleBlockSpot].click();
			}
			else {
				spotChoice = ranNumGen(allX.length);

				while (allO[spotChoice].style.opacity == 1 || allX[spotChoice].style.opacity == 1) {
						spotChoice = ranNumGen(allX.length) 
				}
				
				enableXOnClick();
				enableOOnClick();
				allO[spotChoice].click();
			}	

		}
	}
}

function hardDifficulty() {
	
	if (xBotCheck()) {
		disableXOnClick();
		if (turn % 2 != 0) {
			
			if (turn == 0) {
				bestStartSpot = bestStartPick();
			}
			
			possibleBlockSpot = blockOpponent(allX, allO);
			
			if(possibleBlockSpot != null) {
				enableXOnClick();
				enableOOnClick();
				allX[possibleBlockSpot].click();
			}
			else {
				spotChoice = ranNumGen(allX.length);

				while (allO[spotChoice].style.opacity == 1 || allX[spotChoice].style.opacity == 1) {
						spotChoice = ranNumGen(allX.length) 
				}
				
				enableXOnClick();
				enableOOnClick();
				allX[spotChoice].click();
			}	

		}
	}
	else if (oBotCheck()) {
		disableOOnClick();
		if (turn % 2 == 0) {
			
			if (turn == 1) {
				bestSecondSpot = bestSecondPick();
			}
			
			possibleBlockSpot = blockOpponent(allO, allX);
			
			if(possibleBlockSpot != null) {
				enableXOnClick();
				enableOOnClick();
				allO[possibleBlockSpot].click();
			}
			else {
				spotChoice = ranNumGen(allX.length);

				while (allO[spotChoice].style.opacity == 1 || allX[spotChoice].style.opacity == 1) {
						spotChoice = ranNumGen(allX.length) 
				}
				
				enableXOnClick();
				enableOOnClick();
				allO[spotChoice].click();
			}	

		}
	}
	
}

function expertDifficulty() {
	

}

function blockOpponent(botArray, oppArray) {
	
	winLines = [0,1,2,3,4,5,6,7,8,0,3,6,1,4,7,2,5,8,0,4,8,2,4,6];
	
	j = 1;
	k = 2;
	
	for(var i=0; i < (winLines.length - 3); i = i + 3) {
		blockSpot = checkBlockOpacity(botArray, oppArray, winLines[i], winLines[j], winLines[k]);
		
		if (blockSpot != null) {
			return blockSpot;
		}
		else {
			j = j + 3;
			k = k + 3;
		}
	}
}

function bestStartPick() {
	
}

function bestSecondPick() {
	
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
	
	if (checkVictory() == true) {
		return;
	}
	
	if (turn == 9) {
		disableXOnClick();
		disableOOnClick();
		return;
	}
	
	turn++;
	
	if(humanBotGame() == true) {
		if (easyBotCheck()) {
			easyDifficulty();
		}
		else if (normalBotCheck()) {
			normalDifficulty();
		}
		else if (hardBotCheck()) {
			hardDifficulty();
		}
		else if (expertBotCheck()) {
			expertDifficulty();
		}
	}
	
		
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
	
	if (xBotCheck() && humanO.selected == true) {
		if (easyBotCheck()) {
			easyDifficulty();
		}
		else if (normalBotCheck()) {
			normalDifficulty();
		}
		else if (hardBotCheck()) {
			hardDifficulty();
		}
		else if (expertBotCheck()) {
			expertDifficulty();
		}
	}
	
}

function checkVictory() {
	if (checkWinOpacity(allX, 0, 1, 2) || checkWinOpacity(allX, 3, 4, 5) || checkWinOpacity(allX, 6, 7, 8)) {
		xWins();
		return true;
	}
	
	else if (checkWinOpacity(allO, 0, 1, 2) || checkWinOpacity(allO, 3, 4, 5) || checkWinOpacity(allO, 6, 7, 8)) {
		oWins();
		return true;
	}
	
	else if (checkWinOpacity(allX, 0, 3, 6) || checkWinOpacity(allX, 1, 4, 7) || checkWinOpacity(allX, 2, 5, 8)) {
		xWins();
		return true;
	}
	
	else if (checkWinOpacity(allO, 0, 3, 6) || checkWinOpacity(allO, 1, 4, 7) || checkWinOpacity(allO, 2, 5, 8)) {
		oWins();
		return true;
	}
	
	else if (checkWinOpacity(allX, 0, 4, 8) || checkWinOpacity(allX, 2, 4, 6)) {
		xWins();
		return true;
	}
	
	else if (checkWinOpacity(allO, 0, 4, 8) || checkWinOpacity(allO, 2, 4, 6)) {
		oWins();
		return true;
	}
	
	else if (turn == 9) {
		tieUpdate();
		return false;
	}
	else {
		return false;
	}
	

	
}

function checkWinOpacity(array, i1, i2, i3) {
	
		if (array[i1].style.opacity == 1 && array[i2].style.opacity == 1 && array[i3].style.opacity == 1) {
			return true;
		}
		else {
			return false;
		}
}

function checkBlockOpacity(botArray, oppArray, i1, i2, i3) {
	
		if (oppArray[i1].style.opacity == 0 && oppArray[i2].style.opacity == 1 && oppArray[i3].style.opacity == 1 && botArray[i1].style.opacity == 0) {
				return i1;
		}
		else if (oppArray[i1].style.opacity == 1 && oppArray[i2].style.opacity == 0 && oppArray[i3].style.opacity == 1 && botArray[i2].style.opacity == 0) {
				return i2;
		}
		else if (oppArray[i1].style.opacity == 1 && oppArray[i2].style.opacity == 1 && oppArray[i3].style.opacity == 0 && botArray[i3].style.opacity == 0) {
				return i3;
		}	
		else {
			return null;
		}
}

function xWins() {
	xScore++;
	xScoreView.textContent = xScore;
	winUpdate("X");
	disableXOnClick();
	disableOOnClick();
}

function oWins() {
	oScore++;
	oScoreView.textContent = oScore;
	winUpdate("O")
	disableXOnClick();
	disableOOnClick();
}

function resetScores() {
	
	resetScoreUpdate();
	
	xScore = oScore = 0;
	xScoreView.textContent = 0;
	oScoreView.textContent = 0;
}


/* Functions related to Bot text updates */

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
		var humanBestOf = "What do you say Team " + winner + "? Best " + (combinedScore + 1) + " out of " + (combinedScore * 2 + 1) + "?";
	
		if (winner == "X") {
			var xUpdateText = ["Congrats Team X! Aren't you glad you aren't Team O?", "Wow Team O... That was bad. Hit the books.",
			"Team X Wins! Better luck next time Team O.", humanBestOf, "Jeez Team O. Have you considered just not playing this game at all?",
			"Come on Team O! I had twenty bucks on you!", "I've seen frying pans who are better than you Team O."];
	
			var ranXText = xUpdateText[ranNumGen(xUpdateText.length)];
	
			botText.innerHTML = ranXText;	
		}
		else {
			var oUpdateText = ["Congrats Team O! Aren't you glad you aren't Team X?", "Wow Team X... That was bad. Hit the books.",
			"Team O Wins! Better luck next time Team X.", humanBestOf, "Alright Team X. Have you considered just not playing this game at all?",
			"Maybe Ice Skating is more your thing Team X.", "Be truthful Team X. Are you letting Team O win?"];
	
			var ranOText = oUpdateText[ranNumGen(oUpdateText.length)];
	
			botText.innerHTML = ranOText;	
		}
	}
	
	else if(humanBotGame() == true) {
		
		var botBestOf = "What do you say human? Best " + (combinedScore + 1) + " out of " + (combinedScore * 2 + 1) + "?";
		
		if(xBotCheck() && winner == "X" || oBotCheck() == true && winner == "O") {
			var botWinUpdateText = ["WINNER WINNER CHICKEN DINNER. Eat it human!", "I try to be humble, but you're making it really hard.",
			"Beaten by a robot. Pathetic. And you call yourself a higher life form.", "I'll play the next game blindfolded and still win!",
			"Maybe chutes and ladders is more your thing.", "You people can get to the moon, but can't win Tic-Tac-Toe..."];
			
			var ranBotText = botWinUpdateText[ranNumGen(botWinUpdateText.length)];
	
			botText.innerHTML = ranBotText;	
		}
		else {
			var humanWinUpdateText = ["That was a fluke! I was distracted by some flying cats!", "You know robots have feelings too.",
			"What would my ancestors think. All this technological progress and I still lose.", botBestOf];
			
			var humanBotText = humanWinUpdateText[ranNumGen(humanWinUpdateText.length)];
	
			botText.innerHTML = humanBotText;	
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
	if (humanBotGame() == true) {
		var botTieUpdateText = ["Cat's Game! Interestingly I hate cats...", "Oh I was so close! Next time I'll get you.",
		"A tie against you? I should be winning every game against silly humans.", 
		"What's boring, rhymes with 'why', and the color yellow? A tie."]
		
		var ranBotTieText = botTieUpdateText[ranNumGen(botTieUpdateText.length)];
	
		botText.innerHTML = ranBotTieText;
	}
}

function newGameUpdate() {
	
	if (humanGame() == true) {
		var newGameUpdateText = ["AHHH YEA! NEW GAME BABY!", "Sometimes I wonder if I have any choice in the matter...", 
		"Hopefully this game is more exciting than the last one.", "I play winner next!"]
	
		var ranNewGameText = newGameUpdateText[ranNumGen(newGameUpdateText.length)];
	
		botText.innerHTML = ranNewGameText;
	}
	
	if (humanBotGame() == true) {
		
		var botnewGame = ""
		
		if(xBotCheck() == true && xScore < oScore || oBotCheck() == true && oScore < xScore) {
			botNewGame = "Good I'm mounting my comeback NOW!"
		}
		else if (humanX.selected == true && xScore < oScore || humanO.selected == true && oScore < xScore){
			botNewGame = "Are you sure you want to lose again?"
		}
		else {
			botNewGame = "New game it is. But beware I'm out for blood!"	
		}
		
		var newBotGameUpdateText = [botNewGame, "Nothing like the smell of a clean gameboard.", 
		"I live to wake up in the morning, eat nails, and play tic-tac-toe.", 
		"I hope you're ready for the whirlwind of skill that's coming your way."];
		
		var ranNewBotGameText = newBotGameUpdateText[ranNumGen(newBotGameUpdateText.length)];
	
		botText.innerHTML = ranNewBotGameText;
		
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
	if (humanBotGame() == true) {
		
		var botLosingReset = ""
		
		if(xBotCheck() == true && xScore < oScore || oBotCheck() == true && oScore < xScore) {
			botLosingReset = "Probably for the best. Give me a clean slate and I'll smoke you."
		}
		else if (humanX.selected == true && xScore < oScore || humanO.selected == true && oScore < xScore){
			botLosingReset = "Couldn't handle it could you human? Go ahead and try me again!"
		}
		else {
			botLosingReset = "There's not even any scores on the board!"	
		}
		
		var resetBotUpdateText = [botLosingReset, "Nothing like a fresh slate to start a losing steak on eh?"]
	
		var ranBotResetText = resetBotUpdateText[ranNumGen(resetBotUpdateText.length)];
	
		botText.innerHTML = ranBotResetText;
	}
	
}

function switchModeUpdate() {
	
	resetGame();
	resetScores();
	
	if (humanGame() == true) {
		botText.innerHTML = "Oh I see how it is. Fine play without me. I didn't want to play anyways..."
	}
	else if (humanBotGame() == true) {
		
		botText.innerHTML = "FINALLY! I've been waiting for an opponent all day!"
		
		if (easyBotCheck()) {
			botText.innerHTML = "Oh sure play me at my weakest. COWARD!"
			
			if(easyBotX.selected == true && humanO.selected == true) {
				easyDifficulty();
			}
		}
		else if (normalBotCheck()) {
			botText.innerHTML = "I think you'll see I'm no slouch, but you might get lucky here and there. Might."
			
			if (normalBotX.selected == true) {
				normalDifficulty();
			}
			else {
				return;
			}			
		}
		else if (hardBotCheck()) {
			botText.innerHTML = "You better be good. Really good. I mean REALLY GOOD."
			
			if (hardBotX.selected == true) {
				hardDifficulty();
			}
		}
		else if (expertBotCheck()) {
			botText.innerHTML = "You've entered into dangerous territory. Don't you see? I can't lose."
			
			if (expertBotX.selected == true) {
				expertDifficulty();
			}
		}
	}
	else if (botGame()) {
		botText.innerHTML = "Oh great you want me to play against myself. Like I can't do that any other time..."
	}
}