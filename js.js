let allMaps = [];
let wholeMaze;
let squares = [];
let level = 0;
let currentMap;
let squareType = ["grass", "wall", "playerDown"];
let components;
window.addEventListener("load", startGame);


let columnPos;
let rowPos;
let menu;
let lastRandom;
let currentRandom;

let intervalTimer;
let time;
let divTime;
let fullTime;

let overlay;
let popUp;
let activePopUp = false;
let gameOverButton;

let lives = 3;
let HP1;
let HP2;
let HP3;

let levelScore;
let totalScore = 0;
let timeScore;
let diaScore;
let diaArray = [
	120,
	650,
	1300,
	2000,
	3000
];


let ikons = document.getElementsByClassName("ikons");

function renderMap() {
	chooseRandMap();
	wholeMaze.setAttribute("class", "l" + level);
	menu.setAttribute("class", "lmenu" + level);
	components.setAttribute("class", "components" + level);
	menu.textContent = "MAZE LVL " + (level + 1);
	timer();
	for (let row = 0; row < currentMap.length; row++) {
		let divRow = document.createElement("div");
		divRow.setAttribute("class", "row");
		wholeMaze.appendChild(divRow);
		squares[row] = [];
		for (let column = 0; column < currentMap[row].length; column++) {
			squares[row][column] = document.createElement("div");
			divRow.appendChild(squares[row][column]);
			if (currentMap[row][column] === 99) {
				squares[row][column].setAttribute("class", "invisible");
			} else if (currentMap[row][column] === 3) {
				if (level === 0) {
					squares[row][column].setAttribute("class", "diaG");
				} else if (level === 1) {
					squares[row][column].setAttribute("class", "diaY");
				} else if (level === 2) {
					squares[row][column].setAttribute("class", "diaR");
				} else if (level === 3) {
					squares[row][column].setAttribute("class", "diaP");
				} else {
					squares[row][column].setAttribute("class", "diaB");
				}
			} else {
				squares[row][column].setAttribute("class", squareType[currentMap[row][column]]);
			}
			if (currentMap[row][column] === 2) {
				rowPos = row;
				columnPos = column;
			}
		}
	}
}


function removeOldMap() {
	for (let x = 0; x < squares.length; x++) {
		for (let y = 0; y < squares[x].length; y++) {
			squares[x][y].remove();
		}
	}

}

function startGame() {
	menu = document.getElementById("menu");
	wholeMaze = document.getElementById("whole-maze");
	components = document.getElementById("components");
	divTime = document.getElementById("count");
	popUp = document.getElementById("popUp");
	overlay = document.getElementById("overlay");

	HP1 = document.getElementById("HP1");
	HP2 = document.getElementById("HP2");
	HP3 = document.getElementById("HP3");

	renderMap();
	document.addEventListener("keydown", movement);

	document.getElementById("next").addEventListener("click", function () {
		level++;
	});
	document.getElementById("next").addEventListener("click", hidePopUp);

	document.getElementById("again").addEventListener("click", function () {
		lives--;
	});
	document.getElementById("again").addEventListener("click", hidePopUp);

}

let waitFor = function () {
	setTimeout(function () {
		if (activePopUp) {
			waitFor();
		} else {
			removeOldMap();
			renderMap();
		}
	});
};


function setGrass() {
	currentMap[rowPos][columnPos] = 0;
	squares[rowPos][columnPos].setAttribute("class", "grass");
}

function changeMoveWin() {
	document.getElementById("lvlText").textContent = "You completed level!";
	document.getElementById("lvlText").setAttribute("class", "completed");


	document.getElementsByClassName("textRemove2")[0].textContent = "Next level";
	document.getElementById("next").setAttribute("class", "show");

	diaScore = diaArray[level];
	if (level > 4) {
		window.location = "win.html";
	} else {
		showPopUp();
		waitFor();
	}
}

function movePlayer(newRowPos, newColumnPos, side) {
	if (currentMap[newRowPos][newColumnPos] !== 3) {
		currentMap[newRowPos][newColumnPos] = 2;
	}
	squares[newRowPos][newColumnPos].setAttribute("class", side);

	rowPos = newRowPos;
	columnPos = newColumnPos;

}

function movement(event) {
	if (activePopUp) {
		return;
	}

	if (event.code === "KeyW" || event.code === "ArrowUp") {
		if (currentMap[rowPos - 1][columnPos] === 1 || currentMap[rowPos - 1][columnPos] === 99) {
			movePlayer(rowPos, columnPos, "playerUp");
		} else if (currentMap[rowPos - 1][columnPos] === 3 || currentMap[rowPos - 1][columnPos] === 0) {
			setGrass();
			movePlayer(rowPos - 1, columnPos, "playerUp");
		}
		if (currentMap[rowPos][columnPos] === 3) {
			changeMoveWin();
		}
	} else if (event.code === "KeyD" || event.code === "ArrowRight") {
		if (currentMap[rowPos][columnPos + 1] === 1 || currentMap[rowPos][columnPos + 1] === 99) {
			movePlayer(rowPos, columnPos, "playerRight");
		} else if (currentMap[rowPos][columnPos + 1] === 3 || currentMap[rowPos][columnPos + 1] === 0) {
			setGrass();
			movePlayer(rowPos, columnPos + 1, "playerRight");
		}
		if (currentMap[rowPos][columnPos] === 3) {
			changeMoveWin()
		}
	} else if (event.code === "KeyS" || event.code === "ArrowDown") {
		if (currentMap[rowPos + 1][columnPos] === 1 || currentMap[rowPos][columnPos + 1] === 99) {
			movePlayer(rowPos, columnPos, "playerDown");
		} else if (currentMap[rowPos + 1][columnPos] === 3 || currentMap[rowPos + 1][columnPos] === 0) {
			setGrass();
			movePlayer(rowPos + 1, columnPos, "playerDown");
		}
		if (currentMap[rowPos][columnPos] === 3) {
			changeMoveWin()
		}
	} else if (event.code === "KeyA" || event.code === "ArrowLeft") {
		if (currentMap[rowPos][columnPos - 1] === 1 || currentMap[rowPos][columnPos - 1] === 99) {
			movePlayer(rowPos, columnPos, "playerLeft");
		} else if (currentMap[rowPos][columnPos - 1] === 3 || currentMap[rowPos][columnPos - 1] === 0) {
			setGrass();
			movePlayer(rowPos, columnPos - 1, "playerLeft");
		}
		if (currentMap[rowPos][columnPos] === 3) {
			changeMoveWin();
		}
	}

}

function chooseRandMap() {
	while (currentRandom === lastRandom) {
		currentRandom = Math.floor(Math.random() * 3);
	}
	lastRandom = currentRandom;

	currentMap = [];
	for (let i = 0; i < allMaps[level][lastRandom].length; i++) {
		currentMap[i] = [];
		for (let j = 0; j < allMaps[level][lastRandom][i].length; j++) {
			currentMap[i][j] = allMaps[level][lastRandom][i][j];
		}
	}
}

function timer() {
	if (level === 0) {
		time = 20;
	} else if (level === 1) {
		time = 30;
	} else if (level === 2) {
		time = 45;
	} else if (level === 3) {
		time = 55;
	} else if (level === 4) {
		time = 65;
	}
	let minutes = (time / 60) | 0;
	let seconds = (time % 60) | 0;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	divTime.textContent = minutes + ":" + seconds;
	fullTime = time;
	divTime.removeAttribute("class", "close");
	clearInterval(intervalTimer);
	intervalTimer = setInterval(function () {

		if (!activePopUp) {
			time--;

			let minutes = (time / 60) | 0;
			let seconds = (time % 60);
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			if (time >= 0) {
				divTime.textContent = minutes + ":" + seconds;
			}
			if (fullTime / 5 >= time) {
				divTime.setAttribute("class", "close");
			}
			if (time === 0) {
				if(lives === 0) {
					document.getElementById("lvlText").textContent = "Game Over!";
					document.getElementById("lvlText").setAttribute("class","black");
					gameOverButton = document.getElementById("restart");
					gameOverButton.setAttribute("class","show");
				} else {
					document.getElementById("lvlText").textContent = "You were lost in the maze!";
					document.getElementById("lvlText").setAttribute("class", "lost");
				}

				diaScore = 0;

				showPopUp();
				waitFor();

				document.getElementsByClassName("textRemove2")[0].textContent = "";
				document.getElementById("next").setAttribute("class", "hide");
			}
		}
	}, 1000);
}

function hidePopUp() {
	livesCounter();
	activePopUp = false;
	overlay.setAttribute('class', 'hide');
	popUp.setAttribute("class", "hide");
}

function showPopUp() {
	activePopUp = true;
	overlay.setAttribute("class", "show");
	popUp.setAttribute("class", "show");
	countScore();
}

function livesCounter() {
	if (lives === 0) {
		document.getElementsByClassName("textRemove")[0].textContent = "";
		document.getElementById("again").setAttribute("class", "hide");
		HP3.setAttribute("class", "empty");
	} else if (lives === 1) {
		HP2.setAttribute("class", "empty");
	} else if (lives === 2) {
		HP1.setAttribute("class", "empty");
	}
}

function countScore() {
	let levelWeight = diaArray[level]/40 | 0;
	if(time >= 11){
		timeScore = time * levelWeight;
	}else if(time>11 && time<6){
		timeScore = 0;
	} else{
		timeScore = -((5-time) * levelWeight);
	}

	levelScore = diaScore + timeScore;
	totalScore += levelScore;
	document.getElementById("lvlSc").textContent = levelScore;
	document.getElementById("ttlSc").textContent = totalScore;
}



