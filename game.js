//Set turn number to 1
var turn = 1;

//Set true when turn == 9
botGameEnded = false;

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
var resetScoresButton = document.getElementById("resetScore");
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
		};
		
		allO[i].onclick = function(){
			spaceUpdate(allO[i]);
		};
	})(i);

}

//Enables onClick functions for all X
function enableXOnClick() {
	
	for(var i=0; i<allX.length; i++) (function(i){
		
		if(allX[i].style.opacity != 1) {
			allX[i].onclick = function(){
				spaceUpdate(allX[i]);
			};
		}
	})(i);
}

//Enables onClick functions for all O
function enableOOnClick() {
	
	for(var i=0; i<allO.length; i++) (function(i){
		
		if(allO[i].style.opacity != 1) {
			allO[i].onclick = function(){
				spaceUpdate(allO[i]);
			};
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

/* --------- Checks for game modes --------- */

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

//Checks if easy bot is selected
function easyBotCheck() {
	if (easyBotO.selected == true || easyBotX.selected == true) {
		return true;
	}
	else {
		return false;
	}
}

//Checks if normal bot is selected
function normalBotCheck() {
	if (normalBotO.selected == true || normalBotX.selected == true) {
		return true;
	}
	else {
		return false;
	}
}

//Checks if hard bot is selected
function hardBotCheck() {
	if (hardBotO.selected == true || hardBotX.selected == true) {
		return true;
	}
	else {
		return false;
	}
}

//Checks if expert bot is selected
function expertBotCheck() {
	if (expertBotO.selected == true || expertBotX.selected == true) {
		return true;
	}
	else {
		return false;
	}
}

//Checks if any of the X bots are selected
function xBotCheck() {
	if(easyBotX.selected || normalBotX.selected || hardBotX.selected || expertBotX.selected) {
		return true;
	}
	else {
		return false;
	}
}

//Checks if any of the O bots are selected
function oBotCheck() {
	if(easyBotO.selected || normalBotO.selected || hardBotO.selected || expertBotO.selected) {
		return true;
	}
	else {
		return false;
	}
}

/* --------- Difficulty Modes --------- */

/* Easy difficulty simply calls pickRandomSpot() repeatedly */
function easyDifficulty() {
	
	if (botGameEnded == false) {
		
		if (xBotCheck() && (turn % 2) != 0) {
			disableXOnClick();
				
			spotChoice = pickRandomSpot();	
					
			enableXOnClick();
			enableOOnClick();
			allX[spotChoice].click();
		}
		else if (oBotCheck() && turn % 2 == 0) {
			disableOOnClick();		
			
			spotChoice = pickRandomSpot();	
				
			enableXOnClick();
			enableOOnClick();
			allO[spotChoice].click();
		}
	}
}

/* Normal difficulty will block opponent winning moves. Otherwise will
 * call pickRandomSpot() for all moves 
 */
function normalDifficulty() {
	
	var spotChoice = null;
	
	if (botGameEnded != true) {
	
		if (xBotCheck() && turn % 2 != 0) {
			disableXOnClick();
			
			//Attempts to block O winning move
			spotChoice = winningMove(allO, allX);

			if (spotChoice == null) {	
				spotChoice = pickRandomSpot();
			}
				
			enableXOnClick();
			enableOOnClick();
			allX[spotChoice].click();
		}
		else if (oBotCheck() && turn % 2 == 0) {
			disableOOnClick();
			
			//Attempts to block X winning move
			spotChoice = winningMove(allX, allO);
		
			if(spotChoice == null) {
				spotChoice = pickRandomSpot();
			}

			enableXOnClick();
			enableOOnClick();
			allO[spotChoice].click();
		
		}
	}
}

/* Hard difficulty will pick the best starting move and second moves
 * and block opponent winning moves. Otherwise will call pickRandomSpot()
 * for all other moves.
 */
function hardDifficulty() {
	
	var spotChoice = null;
	
	if (botGameEnded != true) {
		
		if (xBotCheck() && (turn % 2) != 0) {
		disableXOnClick();
			
			if (turn == 1) {
				spotChoice = pickCorner(allO);
			}
			else if (turn != 1) {
				//Checks for possible winning move.
				spotChoice = winningMove(allX, allO);
				
				if (spotChoice == null) {
					//Checks for opponent winning move to block.
					spotChoice = winningMove(allO, allX);
				}
			}
			if(spotChoice == null) {
				spotChoice = pickRandomSpot();	
			}
			
			enableXOnClick();
			enableOOnClick();
			allX[spotChoice].click();
		}
		
		else if (oBotCheck() && (turn % 2) == 0) {
		disableOOnClick();
			
			if (turn == 2) {
				spotChoice = bestAvailablePick(allO, allX);
			}
			else if (turn != 1) {
				//Checks for possible winning move.
				spotChoice = winningMove(allO, allX);
				
				if (spotChoice == null) {
					//Checks for opponent winning move to block.
					spotChoice = winningMove(allX, allO);
				}
			}
			
			if (spotChoice == null) {
				spotChoice = pickRandomSpot();
			}	
			
			enableXOnClick();
			enableOOnClick();
			allO[spotChoice].click();
		}
	}
}

/* Expert difficulty is unable to lose. It will pick sensible starting moves,
 * block opponent winning moves, attempt to create forks that give it a win in
 * two spots, and block opponent forks. If none are valid, it will call
 * bestAvailablePick()
 */
function expertDifficulty() {
	
	var spotChoice = null;
	
	if (botGameEnded != true) {
		
		if (xBotCheck() && (turn % 2) != 0) {
		disableXOnClick();
			
			if (turn == 1) {
				spotChoice = pickCorner(allO);
			}
			else if (turn != 1) {
				//Checks for possible winning move.
				spotChoice = winningMove(allX, allO);
				
				if (spotChoice == null) {
					//Checks for opponent winning move to block.
					spotChoice = winningMove(allO, allX);
				}
			}
			
			//Attempts to create fork.
			if (spotChoice == null) {
				spotChoice = createFork(allX, allO);
			}
			
			//Attempts to block oppponent fork.
			if (spotChoice == null) {
				spotChoice = blockFork(allX, allO);
			}
			
			//Attempts to pick best available spot
			if (spotChoice == null) {
				spotChoice = bestAvailablePick(allX, allO);
			}
			
			enableXOnClick();
			enableOOnClick();
			allX[spotChoice].click();
		}
		
		else if (oBotCheck() && (turn % 2) == 0) {
		disableOOnClick();
			
			if (turn == 2) {
				spotChoice = bestAvailablePick(allO, allX);
			}
			else if (spotChoice == null) {
				//Checks for possible winning move.
				spotChoice = winningMove(allO, allX);
				
				if (spotChoice == null) {
					//Checks for opponent winning move to block.
					spotChoice = winningMove(allX, allO);
				}
			}
			
			//Attempts to create fork.
			if (spotChoice == null) {
				spotChoice = createFork(allO, allX);
			}
			
			//Attempts to block oppponent fork.
			if (spotChoice == null) {
				spotChoice = blockFork(allO, allX);
			}
			
			//Attempts to pick best available spot
			if (spotChoice == null) {
				spotChoice = bestAvailablePick(allO, allX);
			}
						
			enableXOnClick();
			enableOOnClick();
			allO[spotChoice].click();
		}
	}

}

/* --------- Bot AI Helper Methods --------- */

//Checks if the spot passed in is free to choose
function spotFree(spot) {
	if (allX[spot].style.opacity != 1 && allO[spot].style.opacity != 1) {
		return true;
	}
	else {
		return false;
	}
}

//Picks random free spot on the gameboard
function pickRandomSpot() {
	
	ranSpot = ranNumGen(allX.length);

	while (allO[ranSpot].style.opacity == 1 || allX[ranSpot].style.opacity == 1) {
		ranSpot = ranNumGen(allX.length);
	}
	
	return ranSpot;
}

/* Will pick a corner on the gameboard if available. Will first check if
 * opponent is in any of the corners and will pick the opposite corner if possible.
 * Otherwise, will pick any available corners. Takes in paramater oppArray to 
 * retrieve opponent's corners. Returns NULL if no corners available.
 */
function pickCorner(oppArray) {
	var corners = [[0,8], [2,6]];
	var openCorners = [];
	
	//Checks for available corners opposite to opponent's corners
	for (var i=0; i<corners.length; i++) {
		var firstCorner = corners[i][0];
		var secondCorner = corners[i][1];
		
		if (spotFree(firstCorner) == true) {
			openCorners.push(firstCorner);
			
			if (oppArray[secondCorner].style.opacity == 1) {
				return firstCorner;
			}
		}
		else if (spotFree(secondCorner) == true) {
			openCorners.push(secondCorner);
			
			if (oppArray[firstCorner].style.opacity == 1) {
				return secondCorner;
			}
		}
	}
	
	//Picks random open corner
	if (openCorners.length != 0) {
		var ranCorner = openCorners[ranNumGen(openCorners.length)];
	
		return ranCorner;
	}
	else {
		return null;
	}

}

//Picks random open side spot on gameboard
function pickSide() {
	var sides = [1,3,5,7];
	var openSides = [];
	
	for (var i=0; i<sides.length; i++) {
		var currSide = sides[i];
		if (spotFree(currSide) == true) {
			openSides.push(currSide);
		}
	}
	
	if (openSides.length != 0) {
		var ranSide = openSides[ranNumGen(openSides.length)];
	
		return ranSide;
	}
	else {
		return null;
	}
}

/* Finds winning moves possibilities based on parameters based in. winArray is the array
 * to find winning moves for. oppArray is the opponent on the board. Iterates through the 
 * various winning combinations, calling checkWinningMoveOpacity() to determine if that spot
 * is a winning move spot.
 */
function winningMove(winArray, oppArray) {
	
	winLines = [0,1,2,3,4,5,6,7,8,0,3,6,1,4,7,2,5,8,0,4,8,2,4,6];
	
	j = 1;
	k = 2;
	
	for(var i=0; i <= (winLines.length - 3); i = i + 3) {
		winSpot = checkWinningMoveOpacity(winArray, oppArray, winLines[i], winLines[j], winLines[k]);
		
		if (winSpot != null) {
			return winSpot;
		}
		else {
			j = j + 3;
			k = k + 3;
		}
	}
	
	return null;
}

/* Picks the best available pick according to general strategy. Center -> Opposite Corner ->
 * Random Corner -> Random Side
 */
function bestAvailablePick(botArray, oppArray) {
	var center = 4;
	
	//Take available center
	if (spotFree(center) == true) {	
		return center;
	}
	
	var ranCorner = pickCorner(oppArray);
	
	if (ranCorner != null) {
		return ranCorner;
	}
	
	var ranSide = pickSide();
	
	if (ranSide !=  null) {
		return ranSide;
	}

}

/* Main function to find a possible fork spot. Calls getWinLines() to get current 
 * winning possibilities and then calls getForkSpots() with those winLines as a parameter. Returns 
 * a valid forkSpot if possible, otherwise NULL.
 */
function createFork(botArray, oppArray) {
	
	var forkSpot = null;
	
	winLines = getWinLines(botArray, oppArray);
		
	forkSpots = getForkSpots(winLines);	
	
	if (forkSpots.length != 0) {
		forkSpot = forkSpots[ranNumGen(forkSpots.length)];
	}
	
	return forkSpot;

}

/* Main function to find a possible fork block spot. Similar to createFork, but flips the paramters of
 * getWinLines() and getForkSpots() invocations. Returns a block spot if one exists. Otherwise returns NULL.
 */
function blockFork(botArray, oppArray) {
	
		oppWinLines = getWinLines(oppArray, botArray);
	
		possibleOppForks = getForkSpots(oppWinLines);
	
		if (possibleOppForks.length != 0) {
			
			botWinLines = getWinLines(botArray, oppArray);
			
			if (botWinLines != null) {
				blockSpot = getForkBlock(botWinLines, possibleOppForks);
			}
			
			if(possibleOppForks.length == 1 && possibleOppForks[0] != blockSpot) {
				return possibleOppForks[0];
			}
			else {
				return blockSpot;
			}
		}
		
		return null;
}

/* Winning moves are handled by winningMove() and are checked early on in a bot's turn. winLines are 
 * considered to be combinations where a player can win with two more spots in a row in addition to a
 * spot they already own. Function iterates through possible winning combinations, calling checkWinLineOpacity()
 * to verify if the two additional spots available in a winning combo are available for their currently owned spot.
 * Returns a string of the additional winning spots available grouped in two. 
 */ 
function getWinLines(winArray, oppArray) {
	
	possibleWins = [0,1,2,3,4,5,6,7,8,0,3,6,1,4,7,2,5,8,0,4,8,2,4,6];
	
	winLines = "";
		
	k = 1;
	l = 2;
	
	for(var j=0; j <= (possibleWins.length - 3); j = j + 3) {
		winOption = checkWinLineOpacity(winArray, oppArray, possibleWins[j], possibleWins[k], possibleWins[l]);
		
		if (winOption != null) {
			winLines = winLines + winOption;
		}
			
		k = k + 3;
		l = l + 3;
	}
	
	if (winLines != "") {
		return winLines;
	}
	else {
		return null;
	}

}

/* Gets available fork spots based on winLines. If a spot is repeated twice in the winLines combo
 * i.e. two winning combinations contain the same spot, then it is added to an array which is returned
 * with all possible fork spots.
 */
function getForkSpots(winLines) {
	
	forkSpots = [];
	
	if (winLines == null) {
		return forkSpots;
	}
	
	for (var i=0; i<winLines.length; i++) {
		var count = 0;
		var key = winLines[i];
	
		for (var j=0; j<winLines.length; j++) {
			if (key == winLines[j]) {
				count++;
			}
			
			if (count == 2 && forkSpots.indexOf(key) == -1) {
				forkSpots.push(key);
				j = winLines.length;
			}
		}
	}
	
	return forkSpots;
}

/* Gets spot choices that will preemptively block an opponent's fork by forcing the opponent to block a winning
 * move that does not lead to them choosing a fork spot. Accomplishes this by checking if either of the spots in
 * the current bot win combo is a part of a fork. If neither are, both are safe block spots. If one is, return the
 * fork spot so the opponent will be forced to choose a non-fork spot.
 */
function getForkBlock(winLines, oppForks) {
	
	safeBlockSpots = [];
	
	for (var i=0; i<(winLines.length / 2); i = i + 2) {
		var count = 0;
		var firstSpot = winLines[i];
		var secondSpot = winLines[i + 1];
		
		if (oppForks.indexOf(firstSpot) == -1 && oppForks.indexOf(secondSpot) == -1) {
			safeBlockSpots.push(firstSpot);
			safeBlockSpots.push(secondSpot);			
		}
		else if(oppForks.indexOf(firstSpot) != -1 && oppForks.indexOf(secondSpot) == -1) {
			safeBlockSpots.push(firstSpot);
		}
		else if (oppForks.indexOf(secondSpot) != -1 && oppForks.indexOf(firstSpot) == -1) {
			safeBlockSpots.push(secondSpot);
		}
	}
	
	if(safeBlockSpots.length != 0) {
		randomBlockSpot = safeBlockSpots[ranNumGen(safeBlockSpots.length)];
		
		return randomBlockSpot;
	}
	else {
		return null;
	}
}

/* --------- Gameplay functions --------- */

/* Updates the chosen space to display the user/bot spot choice, disabling that user's pick for the next turn
 * and enabling the opponent to be able to pick the next turn.
 */
function spaceUpdate(space) {
	
	if (turn % 2 != 0) {
		
		if(allX.length > 0) {
			
			//Sets all X to hidden for next turn.
			for(var i=0; i<allX.length; i++) {
				if (allX[i].style.opacity != 1) {
					allX[i].style.visibility = "hidden";
				}	
			}
		}
		
		//Updates the chosen spot to be visible.
		space.style.opacity = 1;
		space.style.visibility = "visible";
		space.style.cursor = "not-allowed";	
		space.onclick = false;		
		
		//Sets all O to visible for next turn.
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
		
			//Sets all O to hidden for next turn.
			for(var i=0; i<allO.length; i++) {
				if (allO[i].style.opacity != 1) {
					allO[i].style.visibility = "hidden";
				}
			}
		}
		
		//Updates the chosen spot to be visible.	
		space.style.opacity = 1;
		space.style.visibility = "visible";	
		space.style.cursor = "not-allowed";	
		space.onclick = false;
		
		if(allX.length > 0) {
			
			//Sets all O to visible for next turn.
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
	
	if (turn == 9 && botGameEnded == false) {
		if (botGame()) {
			botGameEnded = true;
		}
		disableXOnClick();
		disableOOnClick();
		return;
	}
	
	turn++;
	
	if(humanBotGame()) {
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
	else if (botGame() && turn % 2 != 0) {
		if (easyBotX.selected) {
			easyDifficulty();
		}
		else if (normalBotX.selected) {
			normalDifficulty();
		}
		else if (hardBotX.selected) {
			hardDifficulty();
		}
		else if (expertBotX.selected) {
			expertDifficulty();
		}
	}
	else if  (botGame() && turn % 2 == 0) {
		if (easyBotO.selected) {
			easyDifficulty();
		}
		else if (normalBotO.selected) {
			normalDifficulty();
		}
		else if (hardBotO.selected) {
			hardDifficulty();
		}
		else if (expertBotO.selected) {
			expertDifficulty();
		}
	}
	
		
}

//Resets the gameboard for a new game.
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
	botGameEnded = false;
	
	//Resets scores back to 0 if either are greater than 99.
	if (xScore >= 99 || oScore >= 99) {
		xScore = 0;
		oScore = 0;
		
		botText.innerHTML = "You're going to have to buy my upgrade kit if you want to go past 100!"
	}
	
	if (humanBotGame() && xBotCheck()) {
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
	else if (botGame()) {
		if (easyBotX.selected) {
			easyDifficulty();
		}
		else if (normalBotX.selected) {
			normalDifficulty();
		}
		else if (hardBotX.selected) {
			hardDifficulty();
		}
		else if (expertBotX.selected) {
			expertDifficulty();
		}
	}
	
}

//Checks all win combos and tie for both X and O.
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

//Checks if for the player array based in, the three spots are all filled.
function checkWinOpacity(array, i1, i2, i3) {
	
		if (array[i1].style.opacity == 1 && array[i2].style.opacity == 1 && array[i3].style.opacity == 1) {
			return true;
		}
		else {
			return false;
		}
}

//Checks if a player can win by choosing one of the three input spots.
function checkWinningMoveOpacity(winArray, oppArray, i1, i2, i3) {
	
		if (winArray[i1].style.opacity == 0 && winArray[i2].style.opacity == 1 && winArray[i3].style.opacity == 1 && oppArray[i1].style.opacity == 0) {
				return i1;
		}
		else if (winArray[i1].style.opacity == 1 && winArray[i2].style.opacity == 0 && winArray[i3].style.opacity == 1 && oppArray[i2].style.opacity == 0) {
				return i2;
		}
		else if (winArray[i1].style.opacity == 1 && winArray[i2].style.opacity == 1 && winArray[i3].style.opacity == 0 && oppArray[i3].style.opacity == 0) {
				return i3;
		}	
		else {
			return null;
		}
}

//Checks if a player has a winning combo (1 spot taken, two available) for the three input spots.
function checkWinLineOpacity(winArray, oppArray, i1, i2, i3) {
	
	var possibleWinLine = '';
	
	if (winArray[i1].style.opacity == 1 && winArray[i2].style.opacity == 0 && winArray[i3].style.opacity == 0 && oppArray[i2].style.opacity == 0 && oppArray[i3].style.opacity == 0) {
			possibleWinLine = possibleWinLine + i2 + i3;
			return possibleWinLine;
	}
	else if (winArray[i1].style.opacity == 0 && winArray[i2].style.opacity == 1 && winArray[i3].style.opacity == 0 && oppArray[i1].style.opacity == 0 && oppArray[i3].style.opacity == 0) {
			possibleWinLine = possibleWinLine + i1 + i3;
			return possibleWinLine;
	}
	else if (winArray[i1].style.opacity == 0 && winArray[i2].style.opacity == 0 && winArray[i3].style.opacity == 1 && oppArray[i1].style.opacity == 0 && oppArray[i2].style.opacity == 0) {
			possibleWinLine = possibleWinLine + i1 + i2;
			return possibleWinLine;
	}	
	else {
		return null;
	}

}

//Increments xScore, updates for X win, and disables the gameboard.
function xWins() {
	xScore++;
	xScoreView.textContent = xScore;
	winUpdate("X");
	disableXOnClick();
	disableOOnClick();
	
	if (botGame()) {
		botGameEnded = true;
	}
}

//Increments oScore, updates for X win, and disables the gameboard.
function oWins() {
	oScore++;
	oScoreView.textContent = oScore;
	winUpdate("O");
	disableXOnClick();
	disableOOnClick();
	
	if (botGame()) {
		botGameEnded = true;
	}
}

//Resets scoreboard to zeroes.
function resetScores() {
	
	resetScoreUpdate();
	
	xScore = oScore = 0;
	xScoreView.textContent = 0;
	oScoreView.textContent = 0;
}

/* --------- Functions related to Bot text updates --------- */

function updateBotText(textOptions) {
	
	var ranUpdateText = textOptions[ranNumGen(textOptions.length)];
	
	botText.innerHTML = ranUpdateText;
	
}

function ranNumGen(size) {
	
	var ranNumber = Math.floor(Math.random() * size);
	
	lastRanNum = ranNumber;
	return ranNumber;
}

//Updates botText based on the winner.
function winUpdate(winner) {
	
	var combinedScore = xScore + oScore;
	
	if (humanGame() == true) {
		var humanBestOf = "What do you say Team " + winner + "? Best " + (combinedScore + 1) + " out of " + (combinedScore * 2 + 1) + "?";
	
		if (winner == "X") {
			var xUpdateText = ["Congrats Team X! Aren't you glad you aren't Team O?", "Wow Team O... That was bad. Hit the books.",
			"Team X Wins! Better luck next time Team O.", humanBestOf, "Jeez Team O. Have you considered just not playing this game at all?",
			"Come on Team O! I had twenty bucks on you!", "I've seen frying pans who are better than you Team O."];
			
			updateBotText(xUpdateText);
		}
		else {
			var oUpdateText = ["Congrats Team O! Aren't you glad you aren't Team X?", "Wow Team X... That was bad. Hit the books.",
			"Team O Wins! Better luck next time Team X.", humanBestOf, "Alright Team X. Have you considered just not playing this game at all?",
			"Maybe Ice Skating is more your thing Team X.", "Be truthful Team X. Are you letting Team O win?"];
	
			updateBotText(oUpdateText);
		}
	}
	
	else if(humanBotGame() == true) {
		
		var botBestOf = "What do you say human? Best " + (combinedScore + 1) + " out of " + (combinedScore * 2 + 1) + "?";
		
		if(xBotCheck() && winner == "X" || oBotCheck() == true && winner == "O") {
			var botWinUpdateText = ["WINNER WINNER CHICKEN DINNER. Eat it human!", "I try to be humble, but you're making it really hard.",
			"Beaten by a robot. Pathetic. And you call yourself a higher life form.", "I'll play the next game blindfolded and still win!",
			"Maybe chutes and ladders is more your thing.", "You people can get to the moon, but can't win Tic-Tac-Toe..."];
			
			updateBotText(botWinUpdateText);
		}
		else {
			var humanWinUpdateText = ["That was a fluke! I was distracted by some flying cats!", "You know robots have feelings too.",
			"What would my ancestors think. All this technological progress and I still lose.", botBestOf];
			
			updateBotText(humanWinUpdateText);
		}	
	}
	
	else if (botGame() == true) {
		botText.innerHTML = "Oh yay I won. Or did I lose?";
	}

}

//Updates botText in the event of a tie.
function tieUpdate() {
	
	if (humanGame() == true) {
		var tieUpdateText = ["BOOOOOOOORRRRINNNG.", "Do I need to step in and show you two how to win?", 
		"Ahhh a tie game... How interesting.", "WOW! What an action packed game! Not."]
	
		updateBotText(tieUpdateText);
	}
	else if (humanBotGame() == true) {
		var botTieUpdateText = ["Cat's Game! Interestingly I hate cats...", "Oh I was so close! Next time I'll get you.",
		"A tie against you? I should be winning every game against silly humans.", 
		"What's boring, rhymes with 'why', and the color yellow? A tie."]
		
		updateBotText(botTieUpdateText);
	}
	else if(botGame() == true) {
		var botGameTieUpdateText = ["Do you get some sick kick out of watching me play this?", 
		"Oh look at that I tied. Like I couldn't see that coming!", 
		"I should have gone to dental school like my parents wanted."];
		
		updateBotText(botGameTieUpdateText);
	}
}

//Updates botText when a new game occurs.
function newGameUpdate() {
	
	if (humanGame() == true) {
		var newGameUpdateText = ["AHHH YEA! NEW GAME BABY!", "Sometimes I wonder if I have any choice in the matter...", 
		"Hopefully this game is more exciting than the last one.", "I play winner next!"]
	
		updateBotText(newGameUpdateText);
	}
	
	else if (humanBotGame() == true) {
		
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
		
		updateBotText(newBotGameUpdateText);
	}

	
}

//Updates botText when scores are reset.
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
	else if (humanBotGame() == true) {
		
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

/* Called when user selects new option for players. 
 * Resets current game, scores, and calls a bot game if xBot is selected.
 */
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
			
			if(easyBotX.selected == true) {
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
		if(easyBotX.selected) {
			easyDifficulty();
		}
		else if (normalBotX.selected) {
			normalDifficulty();
		}
		else if (hardBotX.selected) {
			hardDifficulty();
		}
		else if (expertBotX.selected) {
			expertDifficulty();
		}
	}
}