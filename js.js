let allMaps = [];
let wholeMaze;
let squares = [];
let level = 0;
let currentMap;
let squareType = ["grass", "wall", "player", "goal", "success"];
window.addEventListener("load", startGame);


let columnPos;
let rowPos;

let firstMap;
let SecondMap;
let ThirdMap;


function renderMap() {
	chooseRandMap();
	for (let row = 0; row < currentMap.length; row++) {
		let divRow = document.createElement("div");
		divRow.setAttribute("class", "row");
		wholeMaze.appendChild(divRow);
		squares[row] = [];
		for (let column = 0; column < currentMap[row].length; column++){
			squares[row][column] = document.createElement("div");
			squares[row][column].setAttribute("class", squareType[currentMap[row][column]]);
			divRow.appendChild(squares[row][column]);
			if (currentMap[row][column] === 2) {
				rowPos = row;
				columnPos = column;
			}
		}
	}

}



function removeOldMap() {
	for (let x = 0; x < squares.length; x++){
		for (let y = 0; y < squares[x].length; y++) {
			squares[x][y].remove();
		}
	}

}

function startGame() {

	wholeMaze = document.getElementById("whole-maze");

	renderMap();
	document.addEventListener("keydown", movement);
}




function setGrass() {
	currentMap[rowPos][columnPos] = 0;
	squares[rowPos][columnPos].setAttribute("class", "grass");
}

function changeMoveWin() {
	currentMap[rowPos][columnPos] = 0;
	squares[rowPos][columnPos].setAttribute("class", "grass");
	squares[currentMap.length-3][currentMap[0].length-2].setAttribute("class", "success");
	removeOldMap();
	level++;
	console.log(level);
	renderMap();
}

function movePlayer(newRowPos, newColumnPos) {
	currentMap[newRowPos][newColumnPos] = 2;
	squares[newRowPos][newColumnPos].setAttribute("class", "player");

	rowPos = newRowPos;
	columnPos = newColumnPos;

}

function movement(event) {
	if (event.code === "KeyW" || event.code === "ArrowUp") {
		if (currentMap[rowPos-1][columnPos] === 1 || currentMap[rowPos-1][columnPos] === 99) {
		} else if (currentMap[rowPos-1][columnPos] === 3){
			changeMoveWin();
		} else {
			setGrass();
			movePlayer(rowPos-1, columnPos);
		}
	} else if (event.code === "KeyD" || event.code === "ArrowRight") {
		if (currentMap[rowPos][columnPos+1] === 1 || currentMap[rowPos][columnPos+1] === 99) {
		} else if (currentMap[rowPos][columnPos+1] === 3){
			changeMoveWin();
		} else {
			setGrass();
			movePlayer(rowPos, columnPos + 1);
		}
	} else if (event.code === "KeyS" || event.code === "ArrowDown") {
		if (currentMap[rowPos+1][columnPos] === 1 || currentMap[rowPos][columnPos+1] === 99) {
		} else if (currentMap[rowPos+1][columnPos] === 3){
			changeMoveWin();
		} else {
			setGrass();
			movePlayer(rowPos +1, columnPos);
		}
	} else if (event.code === "KeyA" || event.code === "ArrowLeft") {
		if (currentMap[rowPos][columnPos-1] === 1 ||currentMap[rowPos][columnPos-1] === 99) {
		} else if (currentMap[rowPos][columnPos-1] === 3){
			changeMoveWin();
		} else {
			setGrass();
			movePlayer(rowPos, columnPos - 1);
		}
	}

}

function chooseRandMap() {
	firstMap = Math.floor(Math.random()*3);
	currentMap = allMaps[level][firstMap];
}








