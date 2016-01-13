//Set turn number to 1
var turn = 1

var xScore = 0;

var oScore = 0;

var botText = document.getElementById("bottalk");

var allX = document.getElementsByClassName("x");
var allO = document.getElementsByClassName("o");
var newGameButton = document.getElementById("newGame");
var resetScoresButton = document.getElementById("resetScore")
var xScoreView = document.getElementById("xScore");
var oScoreView = document.getElementById("oScore");

playGame();


function playGame() {
	setOnClick();
	newGameButton.onclick = resetGame;
	resetScoresButton.onclick = resetScores;
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
	disableOnClick();
}

function oWins() {
	oScore++;
	oScoreView.textContent = oScore;
	disableOnClick();
}

function resetScores() {
	xScore = oScore = 0;
	xScoreView.textContent = 0;
	oScoreView.textContent = 0;
}

