let allMaps = [];
let wholeMaze;
let squares = [];
let level = 0;
let currentMap;
let squareType = ["grass", "wall", "playerDown", "goal"];
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

let popUp;
let activePopUp = false;

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

	renderMap();
	document.addEventListener("keydown", movement);

	document.getElementById("next").addEventListener("click", hidePopUp);
	document.getElementById("again").addEventListener("click", hidePopUp);
	document.getElementById("next").addEventListener("click", function () {
		level++;
	});
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

function changeMoveWin()
{
	if (level > 4) {
		window.location = "win.html";
	} else {
		showPopUp();
		waitFor();
	}
}

function movePlayer(newRowPos, newColumnPos, side)
{
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

function chooseRandMap()
{
	while (currentRandom === lastRandom){
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
		time = 50;
	} else if (level === 3) {
		time = 60;
	} else if (level === 4) {
		time = 70;
	}
	divTime.textContent = time;
	let fullTime = time;
	divTime.removeAttribute("class", "close");
	clearInterval(intervalTimer);
	intervalTimer = setInterval(function () {

		if (!activePopUp) {
			time--;
		}
		if (time >= 0) {
			divTime.textContent = time;
		}
		if (fullTime / 5 >= time) {
			divTime.setAttribute("class", "close");
		}
		if (time === 0) {
			showPopUp();
			waitFor();
		}
	}, 1000);
}

function hidePopUp() {
	activePopUp = false;
	popUp.setAttribute("class", "hide");
}

function showPopUp() {
	activePopUp = true;
	popUp.setAttribute("class", "show");
}



